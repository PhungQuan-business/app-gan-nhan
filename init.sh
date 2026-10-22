#!/usr/bin/env bash

set -Eeuo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT_DIR"

echo "=================================="
echo " Initializing development environment"
echo "=================================="

echo "Project root: $ROOT_DIR"

echo ""
echo "[1/2] Installing dependencies..."
./apps/backend/scripts/install.sh

echo ""
echo "[2/2] Verifying baseline..."
./apps/backend/scripts/verify.sh

echo ""
echo "Initialization completed successfully."

echo ""
echo "Next steps:"
echo "  1. Read feature_list.json"
echo "  2. Read claude-progress.md"
echo "  3. Select one unfinished feature"
echo "  4. Implement and verify that feature"
echo ""
echo "To start the application:"
echo "  ./scripts/start.sh"