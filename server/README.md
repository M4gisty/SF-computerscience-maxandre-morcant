# Lumina Auth API (prototype)

Quick start:

1. Copy `.env.example` to `.env` and fill `SECRET_KEY`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`.
2. Install dependencies (recommended inside venv):

```bash
python -m venv .venv
.venv\Scripts\activate    # on Windows
pip install -r server/requirements.txt
```

3. Run the server:

```bash
uvicorn server.main:app --reload --port 8001
```

4. Configure Google OAuth:
   - Create an OAuth 2.0 Client ID in Google Cloud Console.
   - Set the redirect URI to `http://localhost:8001${GOOGLE_REDIRECT_PATH}` (default `/api/auth/google/callback`).

Notes:
- This is a prototype. Passwords are hashed with bcrypt; users are stored in a local SQLite DB (`server/data.db`).
- The Google OAuth flow will redirect back to the frontend with a `token` query parameter: `account.html?token=...`.
- For production, secure cookies, HTTPS, and proper session handling are required.
