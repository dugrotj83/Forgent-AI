"""Operators — persistent, scheduled autonomous agents."""

from forgent.operators.loader import load_operator
from forgent.operators.manager import OperatorManager
from forgent.operators.types import OperatorManifest

__all__ = ["OperatorManifest", "OperatorManager", "load_operator"]
