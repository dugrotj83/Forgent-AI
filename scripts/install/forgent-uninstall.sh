#!/usr/bin/env bash
# forgent-uninstall.sh — clean removal of ForgentAI from $HOME.
#
# Removes:
#   ~/.forgent/
#   ~/.local/bin/forgent
#   ~/.local/bin/forgent-uninstall
#
# Does NOT remove: ollama, uv, or the Rust toolchain.

set -euo pipefail

FORGENT_HOME="${FORGENT_HOME:-$HOME/.forgent}"

if [[ -f "$FORGENT_HOME/.state/bg.pid" ]]; then
    pid=$(cat "$FORGENT_HOME/.state/bg.pid" 2>/dev/null || echo "")
    if [[ -n "$pid" ]] && kill -0 "$pid" 2>/dev/null; then
        echo "Stopping background work (pid=$pid)..."
        kill "$pid" 2>/dev/null || true
    fi
fi

if command -v ollama >/dev/null 2>&1; then
    ollama stop >/dev/null 2>&1 || true
fi

if [[ -d "$FORGENT_HOME" ]]; then
    rm -rf "$FORGENT_HOME"
    echo "Removed $FORGENT_HOME"
fi

for f in "$HOME/.local/bin/forgent" "$HOME/.local/bin/forgent-uninstall"; do
    if [[ -L "$f" ]] || [[ -f "$f" ]]; then
        rm -f "$f"
        echo "Removed $f"
    fi
done

cat <<EOF

ForgentAI removed.

Left intact (may be used by other tools):
  - Ollama       (uninstall: brew uninstall ollama  /  rm -f /usr/local/bin/ollama)
  - uv           (uninstall: rm -rf ~/.local/share/uv ~/.cargo/bin/uv)
  - Rust toolchain (uninstall: rustup self uninstall)
EOF
