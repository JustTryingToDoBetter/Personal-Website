#!/usr/bin/env bash
# Start both the Django API server and the Node.js middleware in a single dyno.
#
# Heroku assigns the value of PORT for the external web traffic. We bind
# the Node.js server to this port, and run the Django application on an
# internal port (8000). The middleware proxies API requests to Django.

set -euo pipefail

# Navigate to the repository root
REPO_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )/.." && pwd )"

cd "$REPO_DIR"

echo "[start-prod] Running Django migrations..."
python backend/manage.py migrate --no-input

echo "[start-prod] Starting Django API on port 8000..."
gunicorn core.wsgi:application --pythonpath backend --bind 0.0.0.0:8000 &

echo "[start-prod] Starting Node.js middleware on port ${PORT:-3000}..."
NODE_ENV=production node middleware/index.js