#!/usr/bin/env bash

set -Eeuo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "=================================="
echo " Installing project dependencies"
echo "=================================="

# Check required tools.
for cmd in node pnpm uv python3; do
    if ! command -v "$cmd" >/dev/null 2>&1; then
        echo "ERROR: Required command '$cmd' is not installed." >&2
        exit 1
    fi
done

echo ""
echo "Node.js version:"
node --version

echo "pnpm version:"
pnpm --version

echo ""
echo "Python version:"
python3 --version

echo "uv version:"
uv --version

# Install JavaScript and TypeScript dependencies.
echo ""
echo "[1/2] Installing Node.js dependencies..."

if [[ ! -f "$ROOT_DIR/pnpm-lock.yaml" ]]; then
    echo "ERROR: pnpm-lock.yaml not found." >&2
    exit 1
fi

pnpm install --frozen-lockfile

# Install Python dependencies.
echo ""
echo "[2/2] Installing Python dependencies..."

if [[ ! -f "$ROOT_DIR/pyproject.toml" ]]; then
    echo "ERROR: Root pyproject.toml not found." >&2
    exit 1
fi

if [[ ! -f "$ROOT_DIR/uv.lock" ]]; then
    echo "ERROR: uv.lock not found." >&2
    exit 1
fi

uv sync --locked

echo ""
echo "=================================="
echo " Dependency installation complete"
echo "=================================="