from contextlib import asynccontextmanager
import json
import time

from dotenv import load_dotenv
from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from dependencies.database import create_db_and_tables, engine
from dependencies.config import config

allowed_origins = [origin.strip() for origin in config.ALLOWED_ORIGINS.split(",") if origin.strip()]


def _agent_debug_log(hypothesis_id: str, message: str, data: dict | None = None, run_id: str = "pre-fix") -> None:
    # #region agent log
    payload = {
        "id": f"log_{int(time.time() * 1000)}",
        "timestamp": int(time.time() * 1000),
        "location": "apps/api/main.py:lifespan",
        "message": message,
        "data": data or {},
        "runId": run_id,
        "hypothesisId": hypothesis_id,
    }
    try:
        # Log to a container-safe location by default.
        # (Override with AGENT_DEBUG_LOG_PATH if you want a bind mount.)
        import os

        log_path = os.environ.get("AGENT_DEBUG_LOG_PATH", "/tmp/tailorcv-debug.log")
        with open(log_path, "a", encoding="utf-8") as f:
            f.write(json.dumps(payload) + "\n")
    except Exception:
        # Logging must never break the app, ignore all errors
        pass
    # #endregion


@asynccontextmanager
async def lifespan(app: FastAPI):
    _agent_debug_log(
        hypothesis_id="startup-path-issues",
        message="lifespan_start",
        data={"event": "startup"},
    )

    await create_db_and_tables()

    yield

    await engine.dispose()


app = FastAPI(lifespan=lifespan)

app.add_middleware(CORSMiddleware, allow_origins=allowed_origins, allow_credentials=True, allow_methods=["*"])


@app.get("/healthz")
async def healthz():
    return {"status": "ok"}
