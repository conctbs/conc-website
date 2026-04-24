# Conc Website

Astro frontend for the CONC website.

It consumes content and member workflow data from the sibling Strapi backend and can also run in a frontend-only fallback mode when the backend is unavailable.

## Public Repo Notes

This repository contains frontend code, bundled fallback content, and smoke tooling. It does not include:

- the backend database
- backend uploads or admin users
- production API keys or secrets

If you clone this repo, you can run it immediately with fallback content, or connect it to your own Strapi instance.

## Requirements

- Node.js `>=20`
- npm

## Environment Setup

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Default local values:

- `PUBLIC_STRAPI_URL=http://127.0.0.1:1337/api`
- `STRAPI_STRICT_MODE=false`
- `PUBLIC_DISABLE_BACKEND=false`
- `PUBLIC_DISABLE_MEMBER_PORTAL=false`

## Run Locally

Install dependencies and start Astro:

```bash
npm install
npm run dev
```

Astro runs on `http://localhost:4321`.

## Using The Real Backend

If you also have the Strapi backend repo:

1. start the backend with `npm run develop`
2. keep `PUBLIC_STRAPI_URL` pointed at that backend, usually `http://127.0.0.1:1337/api`
3. run this frontend with `npm run dev`

## Frontend-Only Mode

If the backend is down and you only need the frontend shell:

```env
STRAPI_STRICT_MODE=false
PUBLIC_DISABLE_BACKEND=true
PUBLIC_DISABLE_MEMBER_PORTAL=true
```

In that mode:

- content pages use bundled fallback content
- member, payment, and registration workflows render maintenance/offline states

When `PUBLIC_DISABLE_BACKEND=false` and Strapi is unavailable during development, Astro can still fall back to bundled content unless strict mode is enabled.

## Commands

| Command | Action |
| --- | --- |
| `npm run dev` | Start the Astro dev server |
| `npm run build` | Build the production site |
| `npm run preview` | Preview the built site locally |
| `npm run smoke:endpoints` | Run endpoint smoke checks against `PUBLIC_STRAPI_URL` |
| `npm run smoke:local` | Run endpoint smoke checks against `http://127.0.0.1:1338/api` |
| `npm run smoke:local:e2e` | Start a sibling Strapi smoke instance, wait for it, run smoke checks, then stop it |

## Smoke Testing

If you want a one-command local integration smoke run:

```bash
BACKEND_DIR=/path/to/mynew-project-strapi npm run smoke:local:e2e
```

If `BACKEND_DIR` is omitted, the script defaults to `/home/saton/mynew-project-strapi`, which is just the original local machine path and may not match your environment.

You can also run the steps manually:

1. in the backend repo, run `npm run smoke:start`
2. in this repo, run `npm run smoke:local`

The smoke backend uses a separate SQLite database and seeded sample content.

## CI

GitHub Actions runs:

- `npm run smoke:endpoints`
- `npm run build`

Set `PUBLIC_STRAPI_URL` in repository variables or secrets to point at the Strapi environment CI should verify.
