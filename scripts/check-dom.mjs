// QS-Checks über den fertigen Build (dist/): Struktur, Meta, interne Links.
// Aufruf: node scripts/check-dom.mjs   (nach `astro build`)
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join } from "node:path";

const DIST = "dist";
const BASE = "/Bauwelt/";
const pages = [];
(function walk(d) {
  for (const f of readdirSync(d)) {
    const p = join(d, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (f === "index.html" || f === "404.html") pages.push(p);
  }
})(DIST);

let issues = 0;
const err = (page, msg) => { console.log(`✗ ${page}: ${msg}`); issues++; };
const titles = new Map();

for (const file of pages) {
  const html = readFileSync(file, "utf8");
  const page = file.replace(DIST, "").replace(/\/index\.html$/, "/").replace("404.html", "404");

  // Genau eine H1
  const h1 = (html.match(/<h1[\s>]/g) || []).length;
  if (h1 !== 1) err(page, `${h1} <h1>-Elemente`);

  // Title unique
  const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1] || "";
  if (!title) err(page, "kein <title>");
  if (titles.has(title)) err(page, `Title doppelt mit ${titles.get(title)}`);
  titles.set(title, page);

  // Keine Template-Unfälle
  for (const bad of ["undefined", "[object Object]", "NaN €"]) {
    if (html.includes(bad)) err(page, `enthält "${bad}"`);
  }

  // Header/Footer überall
  if (!html.includes('id="siteHeader"')) err(page, "Header fehlt");
  if (!html.includes('class="ftr"')) err(page, "Footer fehlt");

  // Interne Links müssen als Datei existieren
  for (const m of html.matchAll(/href="(\/Bauwelt\/[^"#?]*)[#?"]?/g)) {
    const href = m[1];
    if (/\.(css|js|png|webp|ico|svg|xml|txt|woff2)$/.test(href)) {
      // Assets: Bilder dürfen fehlen (BILDER.md-Platzhalter-Mechanik), Rest muss da sein
      const p = join(DIST, href.replace(BASE, ""));
      if (!/assets\/img\//.test(href) && !existsSync(p)) err(page, `Asset fehlt: ${href}`);
    } else {
      const clean = href.replace(BASE, "").replace(/\/$/, "");
      const p1 = join(DIST, clean, "index.html");
      const p2 = join(DIST, clean + ".html");
      if (clean && !existsSync(p1) && !existsSync(p2)) err(page, `Toter Link: ${href}`);
    }
  }
}

// Rechner: No-JS-Fallback + Funnel-Bausteine
const rechner = readFileSync(join(DIST, "rechner/index.html"), "utf8");
for (const need of ["rechner__nojs", "data-gewerke", "progressbar", "bookingEmbed"]) {
  if (!rechner.includes(need)) err("/rechner/", `fehlt: ${need}`);
}

// Sitemap deckt alle indexierbaren Seiten ab
const sitemap = readFileSync(join(DIST, "sitemap.xml"), "utf8");
for (const file of pages) {
  const page = file.replace(DIST, "").replace(/index\.html$/, "");
  if (/impressum|datenschutz|404/.test(page)) continue;
  if (!sitemap.includes(`${BASE.slice(0, -1)}${page}`)) err(page, "fehlt in sitemap.xml");
}

console.log(issues === 0 ? `✓ ${pages.length} Seiten geprüft, keine Befunde` : `${issues} Befunde auf ${pages.length} Seiten`);
process.exit(issues === 0 ? 0 : 1);
