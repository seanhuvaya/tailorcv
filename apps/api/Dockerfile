FROM python:3.10-slim

WORKDIR /app

# Copy uv binary from official image (pin version for reproducibility)
COPY --from=ghcr.io/astral-sh/uv:0.4.20 /uv /bin/uv

# Install system deps needed at runtime (and for wheels)
RUN apt-get update && apt-get install -y --no-install-recommends \
    libpq5 curl \
    && rm -rf /var/lib/apt/lists/*

# Create non-root user
RUN useradd --create-home appuser

ENV HOME=/home/appuser

# Copy dep files first for better layer caching
COPY pyproject.toml uv.lock ./

# Ensure the app dir is writable for appuser (needed for .venv creation)
RUN chown -R appuser:appuser /app && mkdir -p /home/appuser/.cache/uv && chown -R appuser:appuser /home/appuser/.cache

# Switch user before creating the venv so any uv-managed Python
# is stored under /home/appuser (avoids permission issues at runtime).
USER appuser

# Install dependencies (without installing the project yet)
RUN --mount=type=cache,target=/home/appuser/.cache/uv,uid=1000,gid=1000 \
    uv sync --frozen --no-dev --no-install-project --link-mode=copy

# Copy the rest of the application code
COPY --chown=appuser:appuser . .

# Final sync (installs the project, compiles bytecode)
RUN --mount=type=cache,target=/home/appuser/.cache/uv,uid=1000,gid=1000 \
    uv sync --frozen --no-dev --compile-bytecode --link-mode=copy

# Env vars: Explicitly activate venv, Python optimizations
ENV VIRTUAL_ENV=/app/.venv \
    PATH="/app/.venv/bin:$PATH" \
    PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    UV_NO_CACHE=1

EXPOSE 8000

# Healthcheck (optional, adjust endpoint)
HEALTHCHECK --interval=30s --timeout=3s CMD curl -f http://localhost:8000/healthz || exit 1

# Run via uvicorn from the venv (resolved from PATH)
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]