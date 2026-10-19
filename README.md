# Accounts — Payment Directory

A responsive static site containing the owner's payment QR profiles, with account numbers shown for manual transfers.

## Profiles
- UnionBank
- BPI (account masked as shown in the supplied QR image)
- EastWest
- Tonik
- MariBank
- GCash
- Maya
- GoTyme
- BDO is listed with the supplied account number, but its provided QR screenshot was a short-lived merchant QR and is not displayed as a reusable personal receiving QR.

The eight usable QR payloads were decoded from the supplied QR screenshots, retained as the payload data, and validated by their EMVCo CRC checksums before rendering in the browser. Duplicate EastWest images are consolidated into one entry.

## Deployment

Production site: https://accounts-barangayoss-projects.vercel.app

This is a direct static deployment under the alternate connected Vercel account because that account does not yet have a GitHub login connection. GitHub commits do **not** automatically deploy updates to this Vercel project; deploy the updated `index.html` again when the site changes, or connect GitHub to the Vercel account to enable automatic deployments.

## Privacy and QR safety

The repository and website are public. The `noindex,nofollow` tag only discourages search-engine indexing and does not restrict access. Anyone who knows the URL or can read the source can view account details and scan the QR codes.

Senders should verify the recipient and amount in their own bank/wallet app before authorizing payment. The BDO QR screenshot showed a temporary merchant QR with a countdown, so a fresh QR must be generated in BDO Pay when one is actually needed. Never share passwords or OTPs to receive a transfer.
