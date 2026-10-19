# Accounts — Payment Directory

A responsive static site containing the owner's bank and digital-wallet QR profiles, manual transfer details, account-specific notes, and receipt attachments.

## Profiles
- UnionBank
- BPI — account number 4206071068
- EastWest
- Tonik
- MariBank
- GCash
- Maya
- GoTyme
- BDO — account number 007336002118; the supplied QR is a temporary merchant-payment code and is clearly labelled as a snapshot, not a reusable receiving QR.

The QR payloads were decoded from the supplied screenshots and CRC-validated before rendering in the browser. The BDO screenshot is a dynamic merchant QR with an on-screen validity countdown. The site warns users not to treat it as a reusable receiving code and disables downloading that snapshot.

## Account notes and receipt attachments

Each account opens its own **Additional details** field and receipt list. Notes are saved in browser local storage, and receipt files are saved in IndexedDB in that browser on that device. Accepted receipt types are JPG/JPEG, PNG, WebP and PDF; maximum five files per account, 10 MB per file. Files can be opened, saved/downloaded, or removed. Receipt data is not uploaded to the website or synchronized between devices. Clearing browser site data may remove these local records.

## Deployment

Production site: https://accounts-barangayoss-projects.vercel.app

This is a direct static deployment under the alternate connected Vercel account because that account does not yet have a GitHub login connection. GitHub commits do **not** automatically deploy updates to this Vercel project; deploy the updated `index.html` again when the site changes, or connect GitHub to the Vercel account to enable automatic deployments.

## Privacy and QR safety

The repository and website are public. The `noindex,nofollow` tag only discourages search-engine indexing and does not restrict access. Anyone who knows the URL or can read the source can view account details and scan the QR codes.

Senders should verify the recipient and amount in their own bank/wallet app before authorizing payment. Never share passwords or OTPs to receive a transfer.
