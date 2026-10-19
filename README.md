# Accounts — Payment Directory

A responsive static site for showing the owner's supported Instapay QR codes.

## Included accounts
- UnionBank
- BPI
- EastWest (duplicate source screenshot consolidated into one entry)
- Tonik
- MariBank
- GCash
- Maya
- BDO Pay / BDO Basic is listed as needing a refresh, but its temporary QR is intentionally not shown.

## Deployment
The site is a static `index.html` file and can be deployed from the repository root on Vercel with no build command.

## Important QR handling
The QR payloads for the seven usable, static profiles are embedded in `index.html` and rendered in the browser. The BDO screenshot contained a short-lived merchant QR, which can expire and should be freshly generated from BDO Pay before use. Do not add a stale dynamic QR as a reusable profile.

The site uses `noindex,nofollow` to discourage search-engine indexing. This is not access control: the repository and the deployed site are public, and anyone with the site link can view and scan the displayed codes. Transfer senders should verify recipient details in their own bank or wallet app.
