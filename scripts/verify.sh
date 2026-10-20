#!/usr/bin/env bash

set -Eeuo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "=================================="
echo " Verifying project"
echo "=================================="

# Run a command and report its result.
run_check() {
    local name="$1"
    shift

    echo ""
    echo "----------------------------------"
    echo "CHECK: $name"
    echo "----------------------------------"

    if "$@"; then
        echo "PASS: $name"
    else
        echo "FAIL: $name" >&2
        return 1
    fi
}

# Verify JavaScript/TypeScript packages.
#
# These commands run only scripts that are defined by
# workspace packages. They do not assume that every
# package implements every check.

run_check "TypeScript/JavaScript lint" \
    pnpm -r --if-present run lint

run_check "Prisma schema validate" \
    pnpm -r --if-present run db:validate

# Require a name for every migration
# run_check  "Migrate Prisma schema" \
#     pnpm -r --if-present run db:migrate

run_check  "Generate Prisma client" \
    pnpm -r --if-present run db:generate

run_check "JavaScript/TypeScript unit tests" \
    pnpm -r --if-present run test

Verify the Python project.
run_check "Python tests" \
    uv run --locked pytest

echo ""
echo "=================================="
echo " All verification checks passed"
echo "=================================="