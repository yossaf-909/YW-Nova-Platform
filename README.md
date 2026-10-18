# YW Nova Platform

Production-ready full-stack developer portfolio platform for `يُوسُف` and the `YW Nova` brand.

## Stack

- React with Vite
- Tailwind CSS
- React Router
- Framer Motion
- Firebase Authentication
- Firestore
- Firebase Storage

## What It Includes

- Public portfolio website with hero, about, skills, services, projects, contact, and CV download sections
- Premium SaaS-style admin dashboard
- Dynamic CRUD management for skills, services, and projects
- Bilingual Arabic and English content support
- Full RTL switching for Arabic
- Dark and light modes
- Responsive admin sidebar, tables, cards, and public layout
- Firebase-ready persistence with local demo fallback for development

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Copy the environment template and add your Firebase project values:

```bash
cp .env.example .env
```

3. Start the development server:

```bash
npm run dev
```

## Firebase Setup

Add the following values to `.env`:

- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`

When Firebase is configured:

- Authentication uses Firebase Auth
- Content loads from Firestore
- Project images and CV uploads go to Firebase Storage

When Firebase is not configured:

- The app falls back to local demo storage in the browser
- Admin login uses:
  - Email: `admin@ywnova.dev`
  - Password: `NovaAdmin123!`

## Suggested Firestore Structure

- `profile/main`
- `skills`
- `services`
- `projects`
- `activityLogs`

The `profile/main` document stores:

- `name`
- `brand`
- `roles`
- `heroText`
- `aboutEnglish`
- `aboutArabic`
- `contact`
- `cv`
- `settings`

## Build

```bash
npm run build
```
