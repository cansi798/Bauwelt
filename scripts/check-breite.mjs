// Breiten-Prüfung (Gesamt-Audit 20.10.2026, W2/D1 – Jamil, Talk 2787):
// Keine Seite darf am Handy breiter sein als der Bildschirm (sonst wackelt die Seite seitlich,
// Menü-Symbol wird abgeschnitten). Öffnet JEDE Seite aus dist/ bei 390 px Breite und vergleicht
// document.documentElement.scrollWidth mit innerWidth. Meldet die Elemente, die überstehen.
//
// Läuft im Playwright-Docker-Image (auf dem Server gibt es kein node):
//   sudo -n docker run --rm --shm-size=1g -v "$PWD":/app -w /app mcr.microsoft.com/playwright:v1.48.2-jammy \
//     sh -c "npm i --silent --prefix /tmp/pw playwright@1.48.2 && node scripts/check-breite.mjs"
// (Playwright liegt bewusst NICHT in package.json – der Build braucht es nicht. Das Skript findet es
//  im Projekt oder unter /tmp/pw bzw. $PLAYWRIGHT_DIR.)
// Standard: 390 px (Vorgabe Jamil) + 360 px (viele Android-Handys). Andere Breiten: BREITEN=390,360,320 node scripts/check-breite.mjs
// Exit 1 bei Überbreite (in GitHub Actions mit continue-on-error → blockiert den Deploy nicht).
import http from "node:http";
import { readFile, stat } from "node:fs/promises";
import { readdirSync, statSync, readFileSync, existsSync } from "node:fs";
import { join, extname } from "node:path";
import { createRequire } from "node:module";

async function ladePlaywright() {
  try { return await import("playwright"); } catch {}
  for (const dir of [process.env.PLAYWRIGHT_DIR, "/tmp/pw"].filter(Boolean)) {
    try { return createRequire(join(dir, "x.js"))("playwright"); } catch {}
  }
  console.log("✗ Paket „playwright“ nicht gefunden – siehe Aufruf oben im Skript.");
  process.exit(1);
}
const { chromium } = await ladePlaywright();

const DIST = "dist";
const BASE = "/Bauwelt/";
const BREITEN = (process.env.BREITEN || "390,360").split(",").map((x) => parseInt(x, 10)).filter(Boolean);
if (!existsSync(DIST)) { console.log("✗ dist/ fehlt – erst `astro build` ausführen."); process.exit(1); }

// ---------- Seiten einsammeln (ohne Weiterleitungs-Stubs) ----------
const seiten = [];
(function walk(d) {
  for (const f of readdirSync(d)) {
    const p = join(d, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (f.endsWith(".html") && !readFileSync(p, "utf8").includes('http-equiv="refresh"')) {
      seiten.push(BASE + p.slice(DIST.length + 1).replace(/index\.html$/, ""));
    }
  }
})(DIST);
seiten.sort();

// ---------- kleiner statischer Server (wie GitHub Pages unter /Bauwelt/) ----------
const TYP = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".webp": "image/webp",
  ".svg": "image/svg+xml", ".woff2": "font/woff2", ".png": "image/png", ".ico": "image/x-icon", ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml", ".pdf": "application/pdf", ".jpg": "image/jpeg", ".json": "application/json" };
const server = http.createServer(async (req, res) => {
  let p = decodeURIComponent(req.url.split("?")[0]);
  if (!p.startsWith(BASE)) { res.writeHead(404); return res.end(); }
  p = join(DIST, p.slice(BASE.length));
  try {
    if ((await stat(p)).isDirectory()) p = join(p, "index.html");
    const b = await readFile(p);
    res.writeHead(200, { "content-type": TYP[extname(p)] || "application/octet-stream" });
    res.end(b);
  } catch { res.writeHead(404); res.end(); }
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const ORIGIN = `http://127.0.0.1:${server.address().port}`;

// ---------- prüfen ----------
const browser = await chromium.launch({ args: ["--disable-dev-shm-usage"] });
let fehler = 0;
for (const breite of BREITEN) {
  const ctx = await browser.newContext({ viewport: { width: breite, height: 844 }, deviceScaleFactor: 1, hasTouch: true });
  // bewusst OHNE isMobile: Chrome zoomt sonst überbreite Seiten heraus (innerWidth wächst mit) und der Fehler bliebe unsichtbar
  // Fremd-Anfragen (Buchungsportal, WhatsApp …) gar nicht erst laden
  await ctx.route((url) => !url.href.startsWith(ORIGIN), (r) => r.abort());
  const page = await ctx.newPage();
  for (const s of seiten) {
    await page.goto(ORIGIN + s, { waitUntil: "load" });
    // einmal ganz nach unten und zurück: nachgeladene Zeichnungen/Bilder sind dann im DOM
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += innerHeight) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 40)); }
      scrollTo(0, 0);
      await new Promise((r) => setTimeout(r, 300));
    });
    const r = await page.evaluate((breite) => {
      const iw = Math.min(innerWidth, breite), sw = document.documentElement.scrollWidth;
      const raus = [];
      if (sw > iw) {
        for (const el of document.querySelectorAll("body *")) {
          const b = el.getBoundingClientRect();
          if (b.width && b.right > iw + 1) {
            // nur das äußerste überstehende Element melden; Inhalt von Wisch-Leisten (overflow-x: auto/hidden)
            // ist abgeschnitten und zählt nicht
            let p = el.parentElement, innen = false;
            while (p && p !== document.body) {
              if (p.getBoundingClientRect().right > iw + 1 || getComputedStyle(p).overflowX !== "visible") { innen = true; break; }
              p = p.parentElement;
            }
            if (!innen) raus.push(`${el.tagName.toLowerCase()}${el.id ? "#" + el.id : ""}${el.classList.length ? "." + [...el.classList].join(".") : ""} „${(el.textContent || "").trim().slice(0, 30)}“ (rechts ${Math.round(b.right)} px)`);
          }
          if (raus.length >= 5) break;
        }
      }
      return { iw, sw, raus };
    }, breite);
    if (r.sw > r.iw) {
      fehler++;
      console.log(`✗ ${breite} px ${s}: Seite ist ${r.sw} px breit (Bildschirm ${r.iw} px) – ${r.raus.join("; ") || "Ursache nicht gefunden"}`);
    }
  }
  await ctx.close();
}
await browser.close();
server.close();
console.log(fehler
  ? `\n${fehler} Seite(n) breiter als der Bildschirm (Breiten: ${BREITEN.join(", ")} px). Regel: AUDIT-REGELN.md, Abschnitt 2 „Mobil“.`
  : `✓ Breiten-Prüfung: ${seiten.length} Seiten bei ${BREITEN.join(" / ")} px – keine ist breiter als der Bildschirm`);
process.exit(fehler ? 1 : 0);
