"""Structural protocols for substituting fakes in place of ForgentSystem."""

from __future__ import annotations

from typing import TYPE_CHECKING, Any, List, Optional, Protocol

if TYPE_CHECKING:
    from forgent.core.config import ForgentConfig
    from forgent.core.events import EventBus
    from forgent.engine._stubs import InferenceEngine
    from forgent.security.capabilities import CapabilityPolicy
    from forgent.sessions.session import SessionStore
    from forgent.tools._stubs import BaseTool
    from forgent.tools.storage._stubs import MemoryBackend
    from forgent.traces.collector import TraceCollector
    from forgent.traces.store import TraceStore


class OrchestratorDeps(Protocol):
    """Minimum surface of ForgentSystem that QueryOrchestrator depends on.

    Tests can satisfy this with a lightweight class — no need to construct
    the full ForgentSystem dataclass or materialize every subsystem.
    """

    config: ForgentConfig
    bus: EventBus
    engine: InferenceEngine
    engine_key: str
    model: str
    agent_name: str
    tools: List[BaseTool]
    memory_backend: Optional[MemoryBackend]
    capability_policy: Optional[CapabilityPolicy]
    session_store: Optional[SessionStore]
    trace_store: Optional[TraceStore]
    trace_collector: Optional[TraceCollector]  # written by _run_agent

    # Optional attribute (getattr with default) — declared for type clarity.
    _skill_few_shot_examples: Any
