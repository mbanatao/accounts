# Accounts — Payment Directory

A responsive static site for the owner's eight bank and digital-wallet QR profiles.

## Profiles
- UnionBank
- BPI — account number 4206071068
- EastWest
- Tonik
- MariBank
- GCash
- Maya
- GoTyme

BDO has been removed from the directory, including its temporary merchant-payment QR.

## Logos and customer instructions

Account cards and QR dialogs use bank/wallet logo images, with a fallback mark if an image host is unavailable. Wikimedia Commons logo assets are used where available; official website favicons are used for other brands.

The hero and order checklist instruct the payer to attach the payment receipt and provide the receiver's full name, full delivery address, mobile number, and any special instructions.

## Additional details and receipts

Each account has a separate delivery details/special instructions note and receipt attachment list. Notes are saved in browser local storage; receipt files are stored in IndexedDB on the same device. Accepted files: JPG/JPEG, PNG, WebP and PDF. Limits: five files per account, 10 MB each. Files can be opened, downloaded, or removed.

**These records are local to the browser and are not submitted to the account owner or synchronized across devices.** Clearing browser site data may remove them. Customers must send the receipt and details through the owner's existing contact channel. To accept online submissions directly into the owner's account, the site needs an authenticated upload/form backend and a destination such as a verified email, WhatsApp flow, or database; none is configured here.

## Deployment

Production site: https://accounts-barangayoss-projects.vercel.app

This is a direct static deployment under the alternate connected Vercel account because that account does not yet have a GitHub login connection. GitHub commits do **not** automatically deploy updates to this Vercel project; deploy the updated `index.html` again when the site changes, or connect GitHub to the Vercel account to enable automatic deployments.

## Privacy and QR safety

The repository and website are public. The `noindex,nofollow` tag only discourages search-engine indexing and does not restrict access. Anyone with access to the URL or source can view the account numbers and QR codes. Customers should verify the recipient and amount before confirming payment, and never share passwords or OTPs.
