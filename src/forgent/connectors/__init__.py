"""Data source connectors for Deep Research."""

from forgent.connectors._stubs import (
    Attachment,
    BaseConnector,
    Document,
    SyncStatus,
)
from forgent.connectors.store import KnowledgeStore

__all__ = ["Attachment", "BaseConnector", "Document", "KnowledgeStore", "SyncStatus"]

# Auto-register built-in connectors
import forgent.connectors.obsidian  # noqa: F401

try:
    import forgent.connectors.gmail  # noqa: F401
except ImportError:
    pass

try:
    import forgent.connectors.gmail_imap  # noqa: F401
except ImportError:
    pass

try:
    import forgent.connectors.gdrive  # noqa: F401
except ImportError:
    pass  # httpx may not be installed

try:
    import forgent.connectors.notion  # noqa: F401
except ImportError:
    pass

try:
    import forgent.connectors.granola  # noqa: F401
except ImportError:
    pass

try:
    import forgent.connectors.gcontacts  # noqa: F401
except ImportError:
    pass

try:
    import forgent.connectors.imessage  # noqa: F401
except ImportError:
    pass

try:
    import forgent.connectors.apple_notes  # noqa: F401
except ImportError:
    pass

try:
    import forgent.connectors.apple_music  # noqa: F401
except ImportError:
    pass

try:
    import forgent.connectors.apple_contacts  # noqa: F401
except ImportError:
    pass

try:
    import forgent.connectors.slack_connector  # noqa: F401
except ImportError:
    pass

try:
    import forgent.connectors.outlook  # noqa: F401
except ImportError:
    pass

try:
    import forgent.connectors.gcalendar  # noqa: F401
except ImportError:
    pass

try:
    import forgent.connectors.dropbox  # noqa: F401
except ImportError:
    pass  # httpx may not be installed

try:
    import forgent.connectors.whatsapp  # noqa: F401
except ImportError:
    pass

try:
    import forgent.connectors.oura  # noqa: F401
except ImportError:
    pass

try:
    import forgent.connectors.apple_health  # noqa: F401
except ImportError:
    pass

try:
    import forgent.connectors.strava  # noqa: F401
except ImportError:
    pass

try:
    import forgent.connectors.spotify  # noqa: F401
except ImportError:
    pass

try:
    import forgent.connectors.google_tasks  # noqa: F401
except ImportError:
    pass

try:
    import forgent.connectors.weather  # noqa: F401
except ImportError:
    pass

try:
    import forgent.connectors.github_notifications  # noqa: F401
except ImportError:
    pass

try:
    import forgent.connectors.hackernews  # noqa: F401
except ImportError:
    pass

try:
    import forgent.connectors.news_rss  # noqa: F401
except ImportError:
    pass
