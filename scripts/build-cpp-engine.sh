#!/usr/bin/env bash
set -euo pipefail

BUILD_DIR="vibechess-engine/build"
mkdir -p "$BUILD_DIR"
cmake -S vibechess-engine -B "$BUILD_DIR" -DCMAKE_BUILD_TYPE=Release
cmake --build "$BUILD_DIR" --parallel
echo "Binary at: $BUILD_DIR/vibechess"
