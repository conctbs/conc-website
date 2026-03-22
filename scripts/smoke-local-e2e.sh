#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
BACKEND_DIR="${BACKEND_DIR:-/home/saton/my-strapi-concwebsite}"
BACKEND_URL="${PUBLIC_STRAPI_URL:-http://127.0.0.1:1338/api}"
HEALTH_URL="${BACKEND_URL%/api}/api/pages/home"
BACKEND_LOG="${ROOT_DIR}/.smoke-backend.log"

if [ ! -d "$BACKEND_DIR" ]; then
  echo "Backend directory not found: $BACKEND_DIR" >&2
  exit 1
fi

cleanup() {
  if [ -n "${BACKEND_PID:-}" ] && kill -0 "$BACKEND_PID" 2>/dev/null; then
    kill "$BACKEND_PID" 2>/dev/null || true
    wait "$BACKEND_PID" 2>/dev/null || true
  fi
}

trap cleanup EXIT INT TERM

echo "Starting Strapi smoke instance from $BACKEND_DIR"
(
  cd "$BACKEND_DIR"
  npm run smoke:start >"$BACKEND_LOG" 2>&1
) &
BACKEND_PID=$!

for attempt in $(seq 1 60); do
  if curl --silent --show-error --fail "$HEALTH_URL" >/dev/null 2>&1; then
    echo "Strapi smoke instance is ready at ${BACKEND_URL}"
    PUBLIC_STRAPI_URL="$BACKEND_URL" npm run smoke:endpoints
    exit 0
  fi

  if ! kill -0 "$BACKEND_PID" 2>/dev/null; then
    echo "Strapi smoke instance exited before becoming ready. Log output:" >&2
    cat "$BACKEND_LOG" >&2
    exit 1
  fi

  sleep 1
done

echo "Timed out waiting for Strapi smoke instance. Log output:" >&2
cat "$BACKEND_LOG" >&2
exit 1
