#!/bin/bash
set -e

# Apply migrations
alembic upgrade head

# Start the application
exec "$@"