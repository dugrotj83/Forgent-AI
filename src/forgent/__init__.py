"""ForgentAI — modular AI assistant backend with composable intelligence primitives."""

from __future__ import annotations

from importlib.metadata import PackageNotFoundError
from importlib.metadata import version as _pkg_version

from forgent.sdk import Forgent, ForgentSystem, MemoryHandle, SystemBuilder

try:
    __version__ = _pkg_version("forgent")
except PackageNotFoundError:  # pragma: no cover — uninstalled source tree
    __version__ = "0.0.0+unknown"

__all__ = ["Forgent", "ForgentSystem", "MemoryHandle", "SystemBuilder", "__version__"]
