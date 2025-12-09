# Vercel Deployment Setup

## API Key in Vercel hinzufügen:

1. Gehe zu: https://vercel.com/dashboard
2. Wähle dein Projekt: **dsfa-as-a-service**
3. Gehe zu: **Settings** → **Environment Variables**
4. Klicke auf: **Add New**
5. Fülle aus:
   - **Key**: `OPENAI_API_KEY`
   - **Value**: [Dein OpenAI API Key - hole ihn von https://platform.openai.com/api-keys]
   - **Environments**: Wähle **Production** (oder "All Environments")
6. Klicke auf: **Save**
7. Gehe zu: **Deployments** → Klicke auf **Redeploy** beim letzten Deployment

## Lokale Entwicklung:

Die `.env.local` Datei ist bereits konfiguriert und wird automatisch verwendet.

## Wichtig:

- Der API-Key ist **NICHT** im Code gespeichert
- Er wird nur als Umgebungsvariable in Vercel gespeichert
- `.env.local` ist in `.gitignore` und wird nicht committed

