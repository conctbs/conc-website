# Conc Website

Astro frontend for the CONC website. It consumes the Strapi API exposed by the backend project and includes a smoke test that checks the API shape the site depends on.

Local development API target via `.env`: `http://127.0.0.1:1337/api`
Smoke-test API target: `http://127.0.0.1:1338/api`

Copy `.env.example` to `.env` if you want a clean local starting point.

For full integration testing, enable `STRAPI_STRICT_MODE=true` so Astro fails fast instead of silently using fallback content when the PostgreSQL-backed Strapi API is unavailable.

If the backend is currently unavailable and you only need the frontend to stay online, switch to frontend-only mode:

```env
STRAPI_STRICT_MODE=false
PUBLIC_DISABLE_BACKEND=true
PUBLIC_DISABLE_MEMBER_PORTAL=true
```

In that mode, content pages use fallback data and member/registration flows render a non-interactive maintenance state instead of calling the broken backend.

When `PUBLIC_DISABLE_BACKEND=false` and Strapi is simply down, Astro still falls back to bundled content in development. The dev server now logs a short warning instead of printing a full fetch stack trace for every request.

## Commands

| Command | Action |
| --- | --- |
| `npm run dev` | Start the Astro dev server on `localhost:4321` |
| `npm run build` | Build the production site |
| `npm run preview` | Preview the built site locally |
| `npm run smoke:endpoints` | Run endpoint smoke checks against `PUBLIC_STRAPI_URL` |
| `npm run smoke:local` | Run endpoint smoke checks against `http://127.0.0.1:1338/api` |
| `npm run smoke:local:e2e` | Start the sibling Strapi smoke instance, wait for it, run smoke checks, then stop it |

## Local Development

The project includes a local `.env` file that points `PUBLIC_STRAPI_URL` to `http://127.0.0.1:1337/api`, which matches the main Strapi development server.

When frontend-only mode is enabled, `npm run dev` no longer depends on a healthy Strapi instance.

1. In `/home/saton/mynew-project-strapi`, run `npm run develop`.
2. In this project, run `npm run dev`.

## Local Smoke Flow

1. In `/home/saton/mynew-project-strapi`, run `npm run smoke:start`.
2. In this project, run `npm run smoke:local`.

The backend smoke script starts Strapi on `127.0.0.1:1338` with seeded SQLite sample data, including a closed-registration program used by the negative registration test.

If you want one command that manages both steps, run `npm run smoke:local:e2e`.
It expects the backend repo at `/home/saton/mynew-project-strapi` by default, or you can override it with `BACKEND_DIR=/path/to/backend`.

## CI

GitHub Actions runs `npm run smoke:endpoints` and `npm run build`.
Set `PUBLIC_STRAPI_URL` in repository variables or secrets to point at the Strapi environment CI should verify.
