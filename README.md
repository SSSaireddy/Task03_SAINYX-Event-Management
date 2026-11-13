# SAINYX — Event Discovery & Registration

A responsive React + Vite event discovery application with category filters, search, event detail routes, registration validation, and a persistent My Events page.

## Requirements
- Node.js 18+ (Node.js 20 LTS recommended)
- npm

## Run locally
```bash
npm install
npm run dev
```
Open the local URL printed by Vite (usually http://localhost:5173).

## Production build
```bash
npm run build
npm run preview
```

## Deploy to Netlify
1. Push this project to a GitHub repository.
2. In Netlify choose **Add new site → Import an existing project**.
3. Connect GitHub and select the repository.
4. Build command: `npm run build`
5. Publish directory: `dist`
6. Deploy.

`netlify.toml` already contains the build settings and SPA redirect needed for React Router.

## Notes
- Registrations are stored in the browser's `localStorage`. This is suitable for a frontend assignment/demo, not for real multi-user ticketing.
- The sample event data and remote Unsplash image URLs are demo content. Replace them with authorized assets and real event details before production.
- No real payment is processed.
