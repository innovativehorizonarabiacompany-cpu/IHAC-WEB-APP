# IHAC — Corporate Website

Official corporate website for Innovative Horizons Arabia Company (IHAC). Built with Next.js (App Router), React, and CSS Modules, featuring 3D model viewers (Three.js/React Three Fiber), industry solution pages, and a downloadable resources library.

## Tech Stack

- Next.js (App Router)
- React
- CSS Modules
- Three.js / React Three Fiber (3D viewers)
- Nodemailer (contact & download-request forms)

## Getting Started

Requirements: Node.js 18.18+ (LTS recommended).

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Production Build

```bash
npm run build
npm start
```

## Environment Variables

Create a `.env` file at the project root (a working copy is provided in the handover):

```
EMAIL_USER=your-smtp-account@example.com
EMAIL_PASS=your-smtp-app-password
CLIENT_EMAIL=recipient@example.com
```

These power the contact and download-request forms. On Vercel/Netlify/Railway, set them in the platform's environment settings instead of committing them.

## Project Structure

| Path | Purpose |
| --- | --- |
| `app/` | Pages, layout, and API routes (contact, download-request) |
| `components/` | UI components, including 3D viewers and section modules |
| `data/` | Site data (projects, services, resources) |
| `lib/` | Shared libraries |
| `public/` | Static assets: images, PDFs, 3D models |
| `scripts/` | Build-time generators (downloads index) |
| `utils/` | Parsers and helpers |