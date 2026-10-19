# Accounts — Payment Directory

Production site: https://maccounts.vercel.app

The directory contains UnionBank, BPI, EastWest, Tonik, MariBank, GCash, Maya and GoTyme. BDO's temporary merchant QR is removed.

## Receipt and delivery submission

Open a payment account, enter the receiver's full name, mobile number, complete delivery address, and any optional special instructions, then attach a payment receipt and choose **Submit**. The site sends the submission through its own Vercel serverless endpoint to Resend, which emails the details and receipt attachments to the configured owner inbox. No FormSubmit redirect or CAPTCHA page is used.

The form requires the receiver name, mobile number, complete delivery address, and at least one receipt. Special instructions are optional. Up to five JPG, PNG, WebP, or PDF files are accepted, with a combined attachment limit of 2.8 MB to stay within the serverless request limit. Files and draft details are stored in the customer's browser until submission; they are sent only when the customer presses Submit.

## Deployment configuration

The Vercel project uses these environment variables, configured in Vercel (never commit secrets):

- `RESEND_API_KEY`: sending-only Resend API key.
- `RESEND_FROM`: approved sender address (currently `onboarding@resend.dev`).
- `MARKPAY_RECIPIENT`: destination inbox.

The production deployment is uploaded directly to Vercel; GitHub commits do not automatically trigger deployments because this Vercel project is not Git-connected. Deploy both `index.html` and `api/submit.js` after source changes. After setting or rotating environment variables, create a fresh deployment.

## Privacy

The repository and website are public. `noindex,nofollow` only discourages search-engine indexing and is not access control. Customers should verify account details before payment and must never share passwords or OTPs. Submitted receipt images and delivery details are emailed to the configured recipient; do not include unrelated sensitive information.
