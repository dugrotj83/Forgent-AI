#!/usr/bin/env bash
# forgent-wrapper.sh — symlinked to ~/.local/bin/forgent.
# Activates the managed venv and execs the real forgent CLI.

FORGENT_HOME="${FORGENT_HOME:-$HOME/.forgent}"
VENV="$FORGENT_HOME/.venv"

if [[ ! -d "$VENV" ]]; then
    echo "forgent: venv not found at $VENV" >&2
    echo "Re-run the installer: curl -fsSL https://github.com/dugrotj83/Forgent-AI/install.sh | bash" >&2
    exit 1
fi

exec "$VENV/bin/forgent" "$@"
