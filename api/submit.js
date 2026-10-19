const MAX_RECEIPT_BYTES = Math.floor(2.8 * 1024 * 1024);
const MAX_FILES = 5;
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "application/pdf"]);
const RECIPIENT = process.env.MARKPAY_RECIPIENT || "markjohnsonbanatao888@gmail.com";
const SENDER = process.env.RESEND_FROM || "onboarding@resend.dev";

module.exports = async function handler(req, res) {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("X-Content-Type-Options", "nosniff");

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ success: false, error: "Use the Submit button to send your details." });
  }

  const origin = req.headers.origin;
  if (origin) {
    try {
      const host = new URL(origin).hostname;
      const allowed = host === "maccounts.vercel.app" || (host.endsWith(".vercel.app") && host.startsWith("accounts-"));
      if (!allowed) return res.status(403).json({ success: false, error: "This submission origin is not allowed." });
    } catch (_) {
      return res.status(403).json({ success: false, error: "Invalid submission origin." });
    }
  }

  try {
    const body = req.body || {};
    const account = body.account || {};
    const receiver = body.receiver || {};
    const clean = (value, max) => typeof value === "string" ? value.trim().slice(0, max) : "";
    const accountName = clean(account.name, 100);
    const accountNumber = clean(account.number, 100);
    const name = clean(receiver.name, 160);
    const address = clean(receiver.address, 1000);
    const mobile = clean(receiver.mobile, 80);
    const instructions = clean(receiver.specialInstructions, 1000);

    if (!accountName || !name || !address || !mobile) {
      return res.status(400).json({ success: false, error: "Please complete the receiver’s name, mobile number, and full delivery address." });
    }
    if (!Array.isArray(body.receipts) || body.receipts.length < 1) {
      return res.status(400).json({ success: false, error: "Please attach at least one payment receipt." });
    }
    if (body.receipts.length > MAX_FILES) {
      return res.status(400).json({ success: false, error: "Attach no more than 5 receipt files." });
    }

    let totalBytes = 0;
    const attachments = [];
    for (const item of body.receipts) {
      const filename = clean(item && item.filename, 180).replace(/[\\/\r\n]/g, "_");
      const contentType = clean(item && item.contentType, 100).toLowerCase();
      const content = typeof (item && item.content) === "string" ? item.content : "";
      if (!filename || !ALLOWED_TYPES.has(contentType) || !/^[A-Za-z0-9+/]*={0,2}$/.test(content)) {
        return res.status(400).json({ success: false, error: "A receipt file is invalid. Attach a JPG, PNG, WebP, or PDF." });
      }
      const size = Math.floor(content.length * 3 / 4) - (content.endsWith("==") ? 2 : content.endsWith("=") ? 1 : 0);
      totalBytes += size;
      if (size <= 0 || totalBytes > MAX_RECEIPT_BYTES) {
        return res.status(413).json({ success: false, error: "Keep all receipt files together under 2.8 MB." });
      }
      attachments.push({ filename, content, content_type: contentType });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("MarkPay submission: RESEND_API_KEY is not configured.");
      return res.status(503).json({ success: false, error: "Email sending is not configured yet. Please contact Mark directly." });
    }

    const submittedAt = new Date().toISOString();
    const text = [
      "New MarkPay payment receipt and delivery details",
      "",
      "Payment account: " + accountName,
      "Account number: " + (accountNumber || "Not provided"),
      "",
      "Receiver full name: " + name,
      "Receiver mobile number: " + mobile,
      "Complete delivery address: " + address,
      "Special instructions: " + (instructions || "None"),
      "",
      "Submitted at: " + submittedAt,
      "Receipt files: " + attachments.map(a => a.filename).join(", ")
    ].join("\n");

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Authorization": "Bearer " + apiKey, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: SENDER,
        to: [RECIPIENT],
        subject: "MarkPay order — " + accountName + " — " + name,
        text,
        attachments
      })
    });

    const result = await response.json().catch(() => ({}));
    if (!response.ok) {
      console.error("MarkPay email provider error:", response.status, result && result.message ? result.message : "request failed");
      return res.status(502).json({ success: false, error: "The email service could not send this submission. Please try again shortly." });
    }

    return res.status(200).json({ success: true, messageId: result.id || null });
  } catch (error) {
    console.error("MarkPay submission failed:", error && error.message ? error.message : "unknown error");
    return res.status(500).json({ success: false, error: "Something went wrong while sending. Please try again." });
  }
};

module.exports.config = { api: { bodyParser: { sizeLimit: "4.5mb" } } };
