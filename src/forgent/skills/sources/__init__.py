"""Skill source resolvers — Hermes, OpenClaw, generic GitHub."""

from forgent.skills.sources.base import ResolvedSkill, SourceResolver
from forgent.skills.sources.github import GitHubResolver
from forgent.skills.sources.hermes import HERMES_REPO_URL, HermesResolver
from forgent.skills.sources.openclaw import OPENCLAW_REPO_URL, OpenClawResolver

__all__ = [
    "GitHubResolver",
    "HERMES_REPO_URL",
    "HermesResolver",
    "OPENCLAW_REPO_URL",
    "OpenClawResolver",
    "ResolvedSkill",
    "SourceResolver",
]
