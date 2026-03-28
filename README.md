# Conc Website

Astro frontend for the CONC website. It consumes the Strapi API exposed by the backend project and includes a smoke test that checks the API shape the site depends on.

Local development API target via `.env`: `http://127.0.0.1:1337/api`
Smoke-test API target: `http://127.0.0.1:1338/api`

The local `.env` also enables `STRAPI_STRICT_MODE=true`, so Astro will fail fast instead of silently using fallback content when the PostgreSQL-backed Strapi API is unavailable.

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

The project includes a local `.env` file that points `PUBLIC_STRAPI_URL` to `http://127.0.0.1:1337/api`, which matches the main Strapi development server, and enables strict API mode for real-data integration checks.

1. In `/home/saton/my-strapi-concwebsite`, run `npm run develop`.
2. In this project, run `npm run dev`.

## Local Smoke Flow

1. In `/home/saton/my-strapi-concwebsite`, run `npm run smoke:start`.
2. In this project, run `npm run smoke:local`.

The backend smoke script starts Strapi on `127.0.0.1:1338` with seeded SQLite sample data, including a closed-registration program used by the negative registration test.

If you want one command that manages both steps, run `npm run smoke:local:e2e`.
It expects the backend repo at `/home/saton/my-strapi-concwebsite` by default, or you can override it with `BACKEND_DIR=/path/to/backend`.

## CI

GitHub Actions runs `npm run smoke:endpoints` and `npm run build`.
Set `PUBLIC_STRAPI_URL` in repository variables or secrets to point at the Strapi environment CI should verify.
