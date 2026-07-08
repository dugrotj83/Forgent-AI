"""External-framework subprocess backends (Hermes Agent, OpenClaw)."""

from forgent.evals.backends.external.hermes_agent import HermesBackend
from forgent.evals.backends.external.openclaw import OpenClawBackend

__all__ = ["HermesBackend", "OpenClawBackend"]
