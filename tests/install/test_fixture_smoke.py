"""Smoke test that the tmp_forgent_home fixture works."""

from __future__ import annotations

from pathlib import Path

from forgent.core import config as config_mod


def test_fixture_redirects_default_config_dir(tmp_forgent_home: Path) -> None:
    assert config_mod.DEFAULT_CONFIG_DIR == tmp_forgent_home
    assert tmp_forgent_home.exists()
    assert (tmp_forgent_home / ".state").exists()
    assert (tmp_forgent_home / ".state" / "models").exists()


def test_fixture_redirects_config_path(tmp_forgent_home: Path) -> None:
    assert config_mod.DEFAULT_CONFIG_PATH == tmp_forgent_home / "config.toml"
