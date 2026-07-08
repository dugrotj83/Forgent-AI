"""Tools primitive — tool system with ABC interface and built-in tools."""

from __future__ import annotations

from forgent.tools._stubs import BaseTool, ToolExecutor, ToolSpec

# Import built-in tools to trigger @ToolRegistry.register() decorators.
# Each is wrapped in try/except so the package loads even before the
# individual tool modules are created.
try:
    import forgent.tools.calculator  # noqa: F401
except ImportError:
    pass

try:
    import forgent.tools.think  # noqa: F401
except ImportError:
    pass

try:
    import forgent.tools.retrieval  # noqa: F401
except ImportError:
    pass

try:
    import forgent.tools.llm_tool  # noqa: F401
except ImportError:
    pass

try:
    import forgent.tools.file_read  # noqa: F401
except ImportError:
    pass

try:
    import forgent.tools.web_search  # noqa: F401
except ImportError:
    pass

try:
    import forgent.tools.code_interpreter  # noqa: F401
except ImportError:
    pass

try:
    import forgent.tools.code_interpreter_docker  # noqa: F401
except ImportError:
    pass

try:
    import forgent.tools.repl  # noqa: F401
except ImportError:
    pass

try:
    import forgent.tools.storage_tools  # noqa: F401
except ImportError:
    pass

try:
    import forgent.tools.mcp_adapter  # noqa: F401
except ImportError:
    pass

try:
    import forgent.tools.channel_tools  # noqa: F401
except ImportError:
    pass

try:
    import forgent.tools.http_request  # noqa: F401
except ImportError:
    pass

try:
    import forgent.tools.docker_shell_exec  # noqa: F401
    import forgent.tools.shell_exec  # noqa: F401
except ImportError:
    pass

try:
    import forgent.tools.memory_manage  # noqa: F401
except ImportError:
    pass
try:
    import forgent.tools.user_profile_manage  # noqa: F401
except ImportError:
    pass

try:
    import forgent.tools.skill_manage  # noqa: F401
except ImportError:
    pass

try:
    import forgent.tools.file_write  # noqa: F401
except ImportError:
    pass

try:
    import forgent.tools.apply_patch  # noqa: F401
except ImportError:
    pass

try:
    import forgent.tools.git_tool  # noqa: F401
except ImportError:
    pass

try:
    import forgent.tools.db_query  # noqa: F401
except ImportError:
    pass

try:
    import forgent.tools.pdf_tool  # noqa: F401
except ImportError:
    pass

try:
    import forgent.tools.image_tool  # noqa: F401
except ImportError:
    pass

try:
    import forgent.tools.audio_tool  # noqa: F401
except ImportError:
    pass

try:
    import forgent.tools.knowledge_tools  # noqa: F401
except ImportError:
    pass

try:
    import forgent.tools.text_to_speech  # noqa: F401
except ImportError:
    pass

try:
    import forgent.tools.digest_collect  # noqa: F401
except ImportError:
    pass

__all__ = ["BaseTool", "ToolExecutor", "ToolSpec"]
