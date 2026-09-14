# CodeXDA

A local-first, installable developer-community prototype.

Open `index.html` through a local web server (for example `python -m http.server`) to use the PWA features. Accounts, posts, replies, likes, and contact submissions are stored in the browser's local storage, making the prototype fully interactive without a backend. The newsroom refreshes on each visit.

For a production multi-user deployment, connect these client actions to an authenticated API and database; browser storage is deliberately scoped to a single device.
