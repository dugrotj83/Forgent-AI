"""Tests for speech configuration."""

from forgent.core.config import ForgentConfig, SpeechConfig


def test_speech_config_defaults():
    cfg = SpeechConfig()
    assert cfg.backend == "auto"
    assert cfg.model == "base"
    assert cfg.language == ""
    assert cfg.device == "auto"
    assert cfg.compute_type == "float16"


def test_forgent_config_has_speech():
    cfg = ForgentConfig()
    assert hasattr(cfg, "speech")
    assert isinstance(cfg.speech, SpeechConfig)
    assert cfg.speech.backend == "auto"


def test_forgent_system_has_speech_backend():
    """ForgentSystem has a speech_backend attribute."""
    from forgent.system import ForgentSystem

    assert "speech_backend" in ForgentSystem.__dataclass_fields__
