"""Guards for the forgent-rust packaging split (#584 / #615).

``forgent_rust`` is the native PyO3 extension. It is NOT published to PyPI,
so it must not appear in the published ``desktop`` extra — listing it there
breaks ``pip install forgent[desktop]`` at install time. It lives in the uv
``desktop-native`` dependency group instead (excluded from wheel metadata),
which the desktop app installs from source via
``uv sync --group desktop-native``.
"""

from __future__ import annotations

from pathlib import Path

import tomllib

ROOT = Path(__file__).resolve().parent.parent.parent
PYPROJECT = ROOT / "pyproject.toml"
DESKTOP_LIB_RS = ROOT / "frontend" / "src-tauri" / "src" / "lib.rs"
WINDOWS_INSTALL_PS1 = ROOT / "deploy" / "windows" / "install.ps1"


def _pyproject() -> dict:
    return tomllib.loads(PYPROJECT.read_text())


def test_forgent_rust_not_in_published_desktop_extra() -> None:
    desktop = _pyproject()["project"]["optional-dependencies"]["desktop"]
    assert not any("forgent-rust" in dep for dep in desktop), (
        "forgent-rust must not be in the published `desktop` extra — it is "
        "not on PyPI, so it breaks `pip install forgent[desktop]`."
    )


def test_forgent_rust_lives_in_uv_dependency_group() -> None:
    group = _pyproject()["dependency-groups"]["desktop-native"]
    assert any("forgent-rust" in dep for dep in group)


def test_forgent_rust_has_local_uv_path_source() -> None:
    src = _pyproject()["tool"]["uv"]["sources"]["forgent-rust"]
    assert src["path"] == "rust/crates/forgent-python"


def test_desktop_app_syncs_the_native_group() -> None:
    # Otherwise the group's forgent_rust is never installed for the app.
    assert '"desktop-native"' in DESKTOP_LIB_RS.read_text(), (
        "the desktop app must `uv sync --group desktop-native` so the native "
        "extension is built at launch."
    )


def test_windows_installer_syncs_the_native_group() -> None:
    # The Windows source installer does not run maturin separately.
    assert (
        "& $uvExe sync --extra desktop --group desktop-native"
        in WINDOWS_INSTALL_PS1.read_text()
    ), (
        "the Windows installer must include `--group desktop-native` so "
        "forgent_rust is built during source install."
    )
