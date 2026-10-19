# Accounts — Payment Directory

Production site: https://maccounts.vercel.app

The directory contains UnionBank, BPI, EastWest, Tonik, MariBank, GCash, Maya and GoTyme. BDO's temporary merchant QR is removed.

## Receipt and delivery submission

Open a payment QR, enter the receiver's full name, mobile number, complete delivery address and special instructions in the per-account details field, attach the receipt, and choose **Submit details & receipt to Mark**. The current implementation submits the details and file attachments through FormSubmit using a multipart form; the form is limited to 9 MB total attachment size and requires at least one receipt. Saved notes and receipt files are local to that browser until submitted.

**Activation required:** FormSubmit may send a one-time activation email to the destination inbox on the first submission. The owner must confirm that email before normal delivery works. FormSubmit is a third-party service and processes submitted delivery details and receipts. Its documentation says it retains submission data for 30 days; uploaded files are not retained in its archive after the email is sent. The email target is configured in the public static HTML/JavaScript source, so it is visible to anyone who inspects the page.

The project is deployed directly to Vercel. GitHub commits do not automatically trigger deployment because this Vercel project is not Git-connected; deploy the static files again after future source changes.

## Privacy

The repository and website are public. `noindex,nofollow` only discourages search-engine indexing and is not access control. Customers should verify account details before payment and must never share passwords or OTPs.