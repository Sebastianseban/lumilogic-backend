# Lumilogic Postman Docs

## Files
- `Lumilogic-Backend.postman_collection.json`
- `Lumilogic-Backend.local.postman_environment.json`

## How to use
1. Import both files into Postman.
2. Select environment **Lumilogic Backend - Local**.
3. Run `Admin > Login` first to set `accessToken` automatically.
4. For update/delete endpoints, set `pageId` from your DB/page response.
5. For slug endpoint, set `slug` (default is `home`).

## Base URL
Default: `http://localhost:5000`

If your server runs on another port, update `baseUrl` in the environment.
