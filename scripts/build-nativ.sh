#!/usr/bin/env bash
# Baut die Website auf der NATIVEN Platte (vboxsf korrumpiert node_modules:
# Phantom-Verzeichnisse, fehlende Dateien – siehe semver-Vorfall 12.09.2026)
# und spielt dist/ zurück ins Projekt.
# Aufruf: bash scripts/build-nativ.sh
set -euo pipefail

PROJEKT="/media/sf_Bauwelt"
BUILD="/home/ki-ubuntu/bauwelt-build"

mkdir -p "$BUILD"
rsync -a --delete --exclude node_modules --exclude dist \
  "$PROJEKT/src" "$PROJEKT/public" "$PROJEKT/scripts" \
  "$PROJEKT/astro.config.mjs" "$PROJEKT/package.json" "$PROJEKT/package-lock.json" \
  "$BUILD/"

cd "$BUILD"
# npm ci nur, wenn Lockfile neuer als node_modules ist (spart ~15 s)
if [ ! -d node_modules ] || [ package-lock.json -nt node_modules/.package-lock.json ]; then
  npm ci --no-audit --no-fund
fi
node node_modules/astro/bin/astro.mjs build
node scripts/check-dom.mjs

rsync -a --delete dist/ "$PROJEKT/dist/"
echo "✓ dist/ nach $PROJEKT/dist zurückgespielt"
