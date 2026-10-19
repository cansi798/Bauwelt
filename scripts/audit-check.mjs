// Audit-Wächter: prüft den fertigen Build (dist/) gegen die Entscheidungen aus
// Website-Audit 17.10.2026 und SEO-/KI-Audit 19.10.2026 (siehe AUDIT-REGELN.md).
// Aufruf nach `astro build`:  node scripts/audit-check.mjs
// Bricht NIE den Deploy ab (Exit 0) – meldet Rückschritte als Zeilen „AUDIT-WARNUNG …“.
// Auftrag Jamil (Talk 19.10.2026, Msg 2392): Änderungen an Audit-Themen melden.
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, basename } from "node:path";

const DIST = "dist";
const BASE = "/Bauwelt/";
if (!existsSync(DIST)) {
  console.log("AUDIT-WARNUNG [Build] dist/ fehlt – erst `astro build` ausführen.");
  process.exit(0);
}

// ---------- Hilfen ----------
const warnungen = [];
const ok = [];
const warn = (thema, msg) => warnungen.push({ thema, msg });
const pass = (thema, msg) => ok.push({ thema, msg });
const lies = (p) => readFileSync(p, "utf8");
const ENT = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", shy: "", ndash: "–", mdash: "—", euro: "€" };
const decode = (s) =>
  s.replace(/&(#x?[0-9a-f]+|\w+);/gi, (m, e) =>
    e[0] === "#" ? String.fromCodePoint(e[1].toLowerCase() === "x" ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10)) : ENT[e] ?? m);
/** Sichtbarer Text + alt-Texte + Title/Description (ohne Skripte/Styles/SVG-Pfade). */
const sichtText = (html) =>
  decode(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<(?:img|meta)[^>]*?(?:alt|content)="([^"]*)"[^>]*>/gi, " $1 ")
      .replace(/<[^>]+>/g, " ")
  ).replace(/[­​]/g, "").replace(/\s+/g, " ");
const ausschnitt = (text, idx, len = 50) => "…" + text.slice(Math.max(0, idx - len), idx + len).trim() + "…";

// ---------- Seiten einsammeln ----------
const seiten = [];
(function walk(d) {
  for (const f of readdirSync(d)) {
    const p = join(d, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (f.endsWith(".html")) seiten.push(p);
  }
})(DIST);
const name = (f) => f.replace(DIST, "").replace(/\/index\.html$/, "/").replace(/^\/404\.html$/, "/404");
const S = seiten
  .map((f) => ({ f, page: name(f), html: lies(f) }))
  .filter((s) => !s.html.includes('http-equiv="refresh"')); // Weiterleitungs-Stubs
for (const s of S) {
  s.text = sichtText(s.html);
  s.noindex = /<meta name="robots" content="noindex/.test(s.html);
  s.title = decode((s.html.match(/<title>([^<]*)<\/title>/) || [])[1] || "");
  s.desc = decode((s.html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || "");
}
const seite = (p) => S.find((s) => s.page === p);

// Quell-Daten (einzige Wahrheit): Region + KI-Bilder
const regionSrc = lies("src/data/region.ts");
const REGION_CITIES = [...(regionSrc.match(/REGION_CITIES\s*=\s*\[([\s\S]*?)\]/)?.[1] ?? "").matchAll(/"([^"]+)"/g)].map((m) => m[1]);
const constsSrc = lies("src/consts.ts");
const KI_BILDER = [...(constsSrc.match(/KI_BILDER\s*=\s*new Set<string>\(\[([\s\S]*?)\]\)/)?.[1] ?? "").matchAll(/"([^"]+)"/g)].map((m) => m[1]);
const LEISTUNGS_NAMEN = [...constsSrc.matchAll(/unterschrift:\s*"([^"]+)"/g)].map((m) => m[1]);

// ---------- 1. Texte & verbotene Aussagen ----------
// [Regex, Thema, Begründung]. Gilt für alle Seiten außer /agb/ (AGB-Text ist 1:1 Rechtstext).
const VERBOTEN = [
  [/(?<!Elektro)Meister-?betrieb/i, "Texte/UWG (K2/K3)", "„Meisterbetrieb“ ist nicht belegt"],
  [/(?:Festpreis|Preis|Termin)-?[Gg]arantie/, "Texte/UWG (4.2)", "„Garantie“ → „Festpreis-Zusage“"],
  [/deutschsprachige[nrs]? Ansprechpartner/i, "Wording (4.6/7.6)", "→ „Ein fester Ansprechpartner“"],
  [/Zuhause-Check|\b60\+|ab 60\b|Senior/i, "Wording (Kundenwunsch 17.10.)", "kein Altersbezug"],
  [/SENIOVO/, "Wording (Jamil 19.10.)", "Marke klein: „seniovo“"],
  [/Besichtigungstermin|Beratungstermin|Erstes Gespräch vereinbaren|Telefontermin/i, "Wording (4.1)", "→ „Vor-Ort-Termin“"],
  [/Jetzt Preis berechnen|Projekt berechnen|Festpreis ansehen/i, "Wording (4.4)", "→ „Preis berechnen“"],
  [/Preisrahmen|Preiseinschätzung|Ersteinschätzung/i, "Wording (4.3)", "→ „Preisspanne“"],
  [/Alles aus einer Hand/i, "Marke (7.5)", "austauschbarer Claim – eigene Stärken nach vorn"],
  [/Montag\s*-\s*Freitag|8:00\s*-\s*18:00/, "Wording (4.9)", "→ „Mo–Fr 8–18 Uhr“"],
  [/Klar\. Einfach\. Transparent\.|Verlässlich\. Planbar\. Persönlich\./, "Marke (7.7)", "nur „Planbar. Transparent. Verlässlich.“"],
  [/Derzeit suchen wir keine|durchschnittliche Handwerker|Andere bezahlen Zeit/i, "Wording Karriere (4.8/6.8)", "positiv formulieren"],
  [/über 30 Bäder|15 Komplettsanierungen|\b10 Jahre(?:n)? Erfahrung/i, "Zahlen (K2/6.6)", "alte Zahlen – heute 40+ Bäder, 15+ Jahre"],
  [/Preis im Angebot ist der Preis auf der Rechnung|ohne Ihre Freigabe ändert sich nichts/i, "AGB-Konsistenz (§ 2–6)", "Festpreis nur „für alles, was im Angebot steht“, Änderungen per Nachtrag"],
  [/verbindliche[nr]? Zeitplan mit Start- und Endtermin|klare Fertigstellungstermine/i, "AGB-Konsistenz (§ 11)", "Termine nur „schriftlich als verbindlich vereinbart“"],
  [/Sanitär, Elektro und Heizung aus einer Hand(?![^.]{0,80}(koordinier|Elektromeister))/i, "AGB-Konsistenz (§ 13)", "Elektro nur Vorarbeiten/Koordination, Endanschlüsse Elektromeisterbetrieb"],
  [/Elektro & Beleuchtung/i, "AGB-Konsistenz (§ 13)", "Elektro nicht als eigene Leistung"],
  [/\b(?:100|50|60) ?km\b/, "Einzugsgebiet (4.10)", "Gebiet laut Karte: rund 40 km"],
  [/\b(?:Kiel|Stade|Lüneburg|Itzehoe|Bad Oldesloe|Reinbek)\b(?!er Str)/, "Einzugsgebiet (3.3/4.10)", "Ort liegt nicht mehr im Gebiet (Karte 19.10.)"],
  [/(?<!kammer )(?<!HWK )Lübeck/, "Einzugsgebiet (3.3/4.10)", "Lübeck nur als „Handwerkskammer Lübeck“"],
  [/\b15\+? Jahre(?:n)? Erfahrung(?! im Handwerk)/, "Erfahrung (K3)", "→ „15+ Jahre Erfahrung im Handwerk“ (GmbH erst ca. 2 Jahre)"],
];
// Ausnahme: Impressum/Datenschutz nennen das Registergericht „Amtsgericht Kiel“.
const RECHTSSEITEN = ["/datenschutz/", "/impressum/", "/agb/"];
const kielErlaubt = (text, idx) => /Amtsgericht\s*$|HRB[^.]{0,20}$/.test(text.slice(Math.max(0, idx - 25), idx));

function pruefeVerboten(quelle, text) {
  let treffer = 0;
  for (const [re, thema, grund] of VERBOTEN) {
    const g = new RegExp(re.source, re.flags.includes("g") ? re.flags : re.flags + "g");
    for (const m of text.matchAll(g)) {
      if (m[0] === "Kiel" && kielErlaubt(text, m.index)) continue;
      // Rechtsseiten nennen Behörden-Adressen (z. B. Datenschutzaufsicht in Kiel) – kein Einzugsgebiet
      if (thema.startsWith("Einzugsgebiet") && RECHTSSEITEN.includes(quelle)) continue;
      // „Elektro & Beleuchtung“ ok, wenn dieselbe Quelle den Partner-Elektromeisterbetrieb nennt (§ 13)
      if (/Elektro & Beleuchtung/i.test(m[0]) && /Elektromeisterbetrieb/.test(text)) continue;
      warn(thema, `${quelle}: „${m[0]}“ – ${grund}  ${ausschnitt(text, m.index)}`);
      treffer++;
      break; // eine Meldung je Regel und Quelle reicht
    }
  }
  return treffer;
}
let tv = 0;
for (const s of S) if (s.page !== "/agb/") tv += pruefeVerboten(s.page, s.text);
if (!tv) pass("Texte/Wording", `keine verbotenen Aussagen auf ${S.length - 1} Seiten`);

// ---------- 2. SEO: Titel & Beschreibungen (S4) ----------
let seoProbleme = 0;
for (const s of S) {
  if (!s.title) { warn("SEO (S4)", `${s.page}: kein <title>`); seoProbleme++; continue; }
  if (s.noindex) continue;
  if (s.title.length > 61) { warn("SEO (S4)", `${s.page}: Titel ${s.title.length} Zeichen (max. ~60): „${s.title}“`); seoProbleme++; }
  if (!/Norderstedt/.test(s.title)) { warn("SEO (S4)", `${s.page}: Titel ohne „Norderstedt“: „${s.title}“`); seoProbleme++; }
  if (s.desc.length < 70 || s.desc.length > 160) { warn("SEO (S4)", `${s.page}: Beschreibung ${s.desc.length} Zeichen (Ziel 70–160)`); seoProbleme++; }
  if (!/Norderstedt/.test(s.desc)) { warn("SEO (S4)", `${s.page}: Beschreibung ohne „Norderstedt“`); seoProbleme++; }
  if (!/<link rel="canonical"/.test(s.html)) { warn("SEO", `${s.page}: kein Canonical`); seoProbleme++; }
}
for (const p of ["/agb/", "/impressum/", "/datenschutz/", "/404", "/login/"]) {
  const s = seite(p);
  if (s && !s.noindex) { warn("SEO", `${p} sollte „noindex“ sein`); seoProbleme++; }
}
// S9: Termin-Fenster-Titel keine Überschrift
if (S.some((s) => /<h[1-6][^>]*id="bookingDialogTitle"/.test(s.html))) { warn("SEO (S9)", "Titel des Termin-Fensters ist wieder eine Überschrift (h1–h6)"); seoProbleme++; }
// S10: kein mailto-Formularziel
for (const s of S) if (/<form[^>]*action="mailto:/i.test(s.html)) { warn("SEO (S10)", `${s.page}: Formular mit action="mailto:" (Chrome-Warnung „unsicher“)`); seoProbleme++; }
// S8: Sitemap mit lastmod
const sitemap = existsSync(join(DIST, "sitemap.xml")) ? lies(join(DIST, "sitemap.xml")) : "";
if (!sitemap) { warn("SEO (S8)", "sitemap.xml fehlt"); seoProbleme++; }
else {
  const urls = (sitemap.match(/<url>/g) || []).length, lm = (sitemap.match(/<lastmod>/g) || []).length;
  if (lm < urls) { warn("SEO (S8)", `Sitemap: ${urls - lm} von ${urls} URLs ohne <lastmod>`); seoProbleme++; }
  for (const p of ["agb/", "impressum/", "datenschutz/", "login/"]) if (sitemap.includes(`${BASE}${p}<`)) { warn("SEO", `Sitemap enthält noindex-Seite /${p}`); seoProbleme++; }
}
// S7: Rechner-Seite mit Erklärtext
const rechnerSeite = seite("/rechner/");
if (rechnerSeite && !/So rechnet der Rechner/.test(rechnerSeite.text)) { warn("SEO (S7)", "/rechner/: Abschnitt „So rechnet der Rechner“ fehlt"); seoProbleme++; }
// 6.6: Zahlenleiste nur 40+ Bäder / 15+ Jahre – 12 h / 24 h nur in „Unsere Versprechen“ (Jamil 19.10., Talk 2531/2536)
{
  const start = seite("/");
  const leiste = start?.html.match(/<section class="zahlen[\s\S]*?<\/section>/)?.[0];
  if (leiste && /\b(?:12|24)\s*h\b|Stunden/.test(sichtText(leiste))) warn("Zahlen (6.6)", "Zahlenleiste zeigt wieder 12 h / 24 h – laut Jamil nur in „Unsere Versprechen“");
  else if (leiste) pass("Zahlen (6.6)", "Zahlenleiste ohne 12 h / 24 h");
}
// S5: KEINE sichtbaren Preisbeispiele (Jamil: nicht umsetzen). G2-Faktenblock ist nicht automatisch prüfbar (siehe AUDIT-REGELN.md)
for (const s of S) {
  if (/Preisbeispiel/i.test(s.text)) { warn("SEO (S5)", `${s.page}: sichtbare „Preisbeispiele“ – Jamil wollte das NICHT (nur llms-full.txt)`); seoProbleme++; }
}
if (!seoProbleme) pass("SEO", "Titel ≤ 60 mit Norderstedt, Beschreibungen, Canonical, noindex, Sitemap, S7/S9/S10 ok");

// ---------- 3. Strukturierte Daten (S3) ----------
let ldProbleme = 0;
const VERBOTENE_LEISTUNGEN = /Dach|Fassade|Maler|Heizung|Sanitär|Elektro|SHK/i;
for (const s of S) {
  if (s.noindex) continue;
  const knoten = [];
  for (const m of s.html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { const j = JSON.parse(m[1]); knoten.push(...(j["@graph"] || [j])); }
    catch (e) { warn("Strukturierte Daten (S3)", `${s.page}: JSON-LD nicht lesbar (${e.message})`); ldProbleme++; }
  }
  const typen = new Set(knoten.flatMap((n) => [].concat(n["@type"])));
  if (!typen.has("GeneralContractor")) { warn("Strukturierte Daten (S3)", `${s.page}: Firmen-Datensatz (GeneralContractor) fehlt`); ldProbleme++; }
  if (!typen.has("WebSite")) { warn("Strukturierte Daten (S3)", `${s.page}: WebSite-Knoten fehlt`); ldProbleme++; }
  if (/^\/leistungen\/[^/]+\/$/.test(s.page)) {
    for (const t of ["Service", "BreadcrumbList"]) if (!typen.has(t)) { warn("Strukturierte Daten (S3)", `${s.page}: „${t}“ fehlt`); ldProbleme++; }
    // Jamil 19.10.2026 (Talk 2529): kein sichtbarer Brotkrumen-Pfad, kein Zwischenschritt „Leistungen“
    if (/class="lhero__pfad|aria-label="Brotkrumen"/.test(s.html)) { warn("Leistungsseiten", `${s.page}: sichtbarer Brotkrumen-Pfad – entfernt laut Jamil 19.10.`); ldProbleme++; }
    const bc = knoten.find((n) => n["@type"] === "BreadcrumbList");
    if (bc && (bc.itemListElement || []).some((i) => i.name === "Leistungen")) { warn("Strukturierte Daten (S3)", `${s.page}: BreadcrumbList mit Zwischenschritt „Leistungen“ (Seite gibt es nicht)`); ldProbleme++; }
  }
  const hatFaq = /class="faq__item/.test(s.html);
  if (hatFaq && !typen.has("FAQPage")) { warn("Strukturierte Daten (S3)", `${s.page}: Fragen auf der Seite, aber kein „FAQPage“`); ldProbleme++; }
  if (typen.has("AggregateRating") || typen.has("Review") || /"aggregateRating"/.test(s.html)) { warn("Strukturierte Daten (S3/6.1)", `${s.page}: Bewertungs-Daten – nur mit echten Bewertungen erlaubt`); ldProbleme++; }
  const firma = knoten.find((n) => [].concat(n["@type"]).includes("GeneralContractor"));
  if (firma && s.page === "/") {
    if (!firma.logo) { warn("Strukturierte Daten (S3)", "Firmen-Datensatz ohne Logo"); ldProbleme++; }
    const leistungen = JSON.stringify([firma.knowsAbout, firma.hasOfferCatalog]);
    const m = leistungen.match(VERBOTENE_LEISTUNGEN);
    if (m) { warn("Strukturierte Daten (S3)", `Firmen-Datensatz nennt abgeschaltete Leistung „${m[0]}“`); ldProbleme++; }
    const orte = new Set((firma.areaServed || []).filter((a) => a["@type"] === "City").map((a) => a.name));
    const fehlt = REGION_CITIES.filter((c) => !orte.has(c)), zuviel = [...orte].filter((c) => !REGION_CITIES.includes(c));
    if (fehlt.length || zuviel.length) { warn("Einzugsgebiet / JSON-LD", `areaServed weicht von region.ts ab – fehlt: ${fehlt.join(", ") || "–"}; zu viel: ${zuviel.join(", ") || "–"}`); ldProbleme++; }
    if (!firma.areaServed?.some((a) => a.geoRadius && a.geoRadius <= 45000)) { warn("Einzugsgebiet / JSON-LD", "GeoCircle-Radius fehlt oder > 45 km (Karte: rund 40 km)"); ldProbleme++; }
  }
}
if (!ldProbleme) pass("Strukturierte Daten", "JSON-LD lesbar; Firma, WebSite, Service, BreadcrumbList, FAQPage vorhanden; nur echte Leistungen");

// ---------- 4. KI-Kennzeichnung (7.1/7.2, EU-KI-VO Art. 50) ----------
let kiProbleme = 0;
const kiStamm = new Set(KI_BILDER.map((b) => b.replace(/\.webp$/, "")));
for (const s of S) {
  const genutzt = new Set();
  for (const m of s.html.matchAll(/<img\b[^>]*\bsrc="([^"]+)"/gi)) {
    const stamm = basename(m[1]).replace(/\.\w+$/, "").replace(/-\d{3,4}$/, "");
    if (kiStamm.has(stamm)) genutzt.add(stamm);
  }
  const hinweise = (s.html.match(/KI-generiertes Bild<\/span>/g) || []).length;
  if (genutzt.size > hinweise) {
    warn("KI-Kennzeichnung (7.1/7.2)", `${s.page}: ${genutzt.size} KI-Bild(er) (${[...genutzt].join(", ")}), aber nur ${hinweise}× „KI-generiertes Bild“`);
    kiProbleme++;
  }
  // alt-Text darf ein KI-Bild nicht als echtes Team ausgeben
  for (const m of s.html.matchAll(/<img\b[^>]*\bsrc="([^"]+)"[^>]*\balt="([^"]*)"/gi)) {
    const stamm = basename(m[1]).replace(/\.\w+$/, "").replace(/-\d{3,4}$/, "");
    if (kiStamm.has(stamm) && /\b(unser|das Bauwelt)[- ]Team\b/i.test(m[2])) { warn("KI-Kennzeichnung (7.1)", `${s.page}: alt-Text gibt KI-Bild als echtes Team aus: „${m[2]}“`); kiProbleme++; }
  }
}
if (!kiProbleme) pass("KI-Kennzeichnung", `alle KI-Bilder (${KI_BILDER.length} in KI_BILDER) tragen den Hinweis`);

// ---------- 5. llms.txt / llms-full.txt (K2, G3) ----------
let llmsProbleme = 0;
for (const f of ["llms.txt", "llms-full.txt"]) {
  const p = join(DIST, f);
  if (!existsSync(p)) { warn("KI-Plattformen (K2/G3)", `${f} fehlt`); llmsProbleme++; continue; }
  const t = lies(p);
  if (t.length < 500) { warn("KI-Plattformen (K2/G3)", `${f} ist fast leer (${t.length} Zeichen)`); llmsProbleme++; }
  llmsProbleme += pruefeVerboten(f, t.replace(/\s+/g, " "));
  const fehlt = REGION_CITIES.filter((c) => !t.includes(c));
  if (fehlt.length) { warn("Einzugsgebiet / llms", `${f}: Orte aus region.ts fehlen: ${fehlt.join(", ")}`); llmsProbleme++; }
  for (const n of LEISTUNGS_NAMEN) if (!t.includes(n)) { warn("KI-Plattformen (K2)", `${f}: Leistung „${n}“ fehlt`); llmsProbleme++; }
  const alt = t.match(/\b(Dach(?!geschoss|boden|schräge)\w*|Fassade\w*|Heizungsbau)\b/) // „Spachtel- & Malerarbeiten“ gehört zum Innenausbau – erlaubt;
  if (alt) { warn("KI-Plattformen (K2/S3)", `${f}: nennt abgeschaltete Leistung „${alt[0]}“`); llmsProbleme++; }
  if (!/Norderstedt/.test(t) || !/40 km/.test(t)) { warn("KI-Plattformen (K2)", `${f}: Sitz Norderstedt oder „40 km“ fehlt`); llmsProbleme++; }
}
if (!llmsProbleme) pass("KI-Plattformen", "llms.txt + llms-full.txt vorhanden, aktuell, ohne verbotene Aussagen");

// ---------- 6. robots.txt (G1) ----------
const KI_CRAWLER = ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "PerplexityBot", "Perplexity-User",
  "Google-Extended", "Applebot-Extended", "CCBot", "meta-externalagent", "Bingbot"];
const robotsPfad = join(DIST, "robots.txt");
if (!existsSync(robotsPfad)) warn("KI-Crawler (G1)", "robots.txt fehlt");
else {
  const r = lies(robotsPfad);
  const fehlt = KI_CRAWLER.filter((b) => !new RegExp(`User-agent:\\s*${b}\\s*\\n\\s*Allow:\\s*/`, "i").test(r));
  if (fehlt.length) warn("KI-Crawler (G1)", `robots.txt erlaubt nicht ausdrücklich: ${fehlt.join(", ")}`);
  if (/^Disallow:\s*\/\s*$/m.test(r)) warn("KI-Crawler (G1)", "robots.txt enthält „Disallow: /“ – sperrt Crawler aus");
  if (!/^Sitemap:/m.test(r)) warn("KI-Crawler (G1)", "robots.txt ohne Sitemap-Verweis");
  if (!fehlt.length && !/^Disallow:\s*\/\s*$/m.test(r)) pass("KI-Crawler", `${KI_CRAWLER.length} KI-Crawler ausdrücklich erlaubt`);
}

// ---------- 7. Datenschutz / Einwilligung Buchungsportal (K1, K4) ----------
let dsProbleme = 0;
// nur echte Einbindungen (src/href/@import/url), nicht die Erwähnung im Datenschutz-Text
const GOOGLE = /(?:src=|href=|@import|url\()["']?[^"'\s>]*(googletagmanager|googlesyndication|google-analytics|fonts\.googleapis|fonts\.gstatic|doubleclick)/i;
for (const s of S) {
  if (/<iframe[^>]*src="[^"]*(portal\.bauwelt|relexable)/i.test(s.html)) { warn("Datenschutz (K1)", `${s.page}: Buchungsportal-iframe steht direkt im HTML – lädt ohne Einwilligung`); dsProbleme++; }
  const g = s.html.match(GOOGLE);
  if (g) { warn("Datenschutz (K1)", `${s.page}: lädt Google-Dienst „${g[1]}“ ohne Einwilligung`); dsProbleme++; }
}
const astroDir = join(DIST, "_astro");
const assets = existsSync(astroDir) ? readdirSync(astroDir).filter((f) => /\.(js|css)$/.test(f)).map((f) => lies(join(astroDir, f))).join("\n") : "";
const g2 = assets.match(GOOGLE);
if (g2) { warn("Datenschutz (K1)", `Skript/CSS-Bundle lädt „${g2[1]}“`); dsProbleme++; }
const start = seite("/");
if (start && !/Kalender laden/.test(start.html + assets)) { warn("Datenschutz (K1)", "Einwilligungs-Knopf „Einverstanden – Kalender laden“ nicht gefunden"); dsProbleme++; }
const ds = seite("/datenschutz/");
if (!ds) { warn("Datenschutz (K4)", "/datenschutz/ fehlt"); dsProbleme++; }
else if (!/id="termin"/.test(ds.html) || !/Relexable/.test(ds.text) || !/Google/.test(ds.text)) { warn("Datenschutz (K4)", "/datenschutz/: Abschnitt #termin (Relexable + Google) fehlt oder unvollständig"); dsProbleme++; }
if (!dsProbleme) pass("Datenschutz", "Buchungsportal erst nach Einwilligung, keine Google-Dienste, Datenschutz #termin vorhanden");

// ---------- 8. AGB & FAQ (K5) ----------
let agbProbleme = 0;
if (!seite("/agb/")) { warn("AGB (K5)", "/agb/ fehlt"); agbProbleme++; }
if (!existsSync(join(DIST, "AGB_Bauwelt_Handwerk.pdf"))) { warn("AGB (K5)", "AGB-PDF (AGB_Bauwelt_Handwerk.pdf) fehlt"); agbProbleme++; }
for (const s of S) {
  const footer = (s.html.match(/<footer class="ftr[\s\S]*?<\/footer>/) || [""])[0];
  for (const p of ["agb/", "impressum/", "datenschutz/"]) {
    if (!footer.includes(`href="${BASE}${p}"`)) { warn("AGB/Recht (K5)", `${s.page}: Footer ohne Link zu /${p}`); agbProbleme++; }
  }
}
if (start) {
  const faq = start.html.slice(start.html.search(/id="fragen"/));
  if (start.html.search(/id="fragen"/) < 0) { warn("AGB/FAQ (K5)", "Startseite: FAQ-Bereich #fragen fehlt"); agbProbleme++; }
  else if (!faq.slice(0, 60000).includes(`href="${BASE}agb/"`)) { warn("AGB/FAQ (K5)", "Startseite: Link zu den AGB unter den FAQ fehlt"); agbProbleme++; }
}
if (!agbProbleme) pass("AGB & FAQ", "/agb/ + PDF vorhanden, Footer-Links auf allen Seiten, AGB-Link unter den FAQ");

// ---------- 9. Einzugsgebiet (3.3/4.10) ----------
let regProbleme = 0;
if (!REGION_CITIES.length) { warn("Einzugsgebiet", "REGION_CITIES in src/data/region.ts nicht gefunden"); regProbleme++; }
for (const p of ["/", "/kontakt/"]) {
  const s = seite(p);
  if (!s) continue;
  const fehlt = REGION_CITIES.filter((c) => !s.text.includes(c));
  if (fehlt.length) { warn("Einzugsgebiet (3.3)", `${p}: Orte aus region.ts fehlen in der Ortsliste: ${fehlt.join(", ")}`); regProbleme++; }
}
if (!/REGION_CENTER[\s\S]*?radiusMeter:\s*40_?000/.test(regionSrc)) { warn("Einzugsgebiet (4.10)", "region.ts: Radius ist nicht mehr 40 km – Karte/Texte/llms prüfen"); regProbleme++; }
if (!regProbleme) pass("Einzugsgebiet", `${REGION_CITIES.length} Orte aus region.ts überall gleich (Start, Kontakt, JSON-LD, llms)`);

// ---------- 10. Rechner ohne Dach (Jamil 19.10.: Elektro/Sanitär-Optionen wieder erlaubt, Msg 2419) ----------
let rProbleme = 0;
const RECHNER_VERBOTEN = /\bDach(?!geschoss|boden|schräge)\w*/gi;
const rechnerSrc = existsSync("src/data/rechner.ts") ? lies("src/data/rechner.ts") : "";
const zeilen = rechnerSrc.split("\n");
zeilen.forEach((z, i) => {
  if (/^\s*(\/\/|\*|\/\*)/.test(z)) return; // Kommentare
  const m = z.match(RECHNER_VERBOTEN);
  if (m) { warn("Rechner (Jamil 19.10.)", `src/data/rechner.ts:${i + 1}: „${[...new Set(m)].join("“, „")}“ – ${z.trim().slice(0, 110)}`); rProbleme++; }
});
if (rechnerSeite) {
  const rteil = rechnerSeite.text.split(/So rechnet der Rechner/)[0]; // Erklärtext/FAQ darunter ausgenommen
  const m = rteil.match(RECHNER_VERBOTEN);
  if (m) { warn("Rechner (Jamil 19.10.)", `/rechner/ zeigt: „${[...new Set(m)].join("“, „")}“`); rProbleme++; }
}
if (!rProbleme) pass("Rechner", "kein „Dach“ in den Rechner-Daten");

// ---------- 11. Barrierefreiheit & Bewegung (K6, 3.x) ----------
let a11y = 0;
const css = assets + S.map((s) => (s.html.match(/<style[\s\S]*?<\/style>/g) || []).join("")).join("");
if (!/prefers-reduced-motion:\s*reduce/.test(css)) { warn("Bewegung (K6)", "keine prefers-reduced-motion-Regel mehr im CSS"); a11y++; }
if (/animation[^;}]*\blkenburns\b/.test(css)) { warn("Animation (3.6)", "Ken-Burns-Zoom in den Leistungs-Startbildern ist wieder aktiv"); a11y++; }
for (const s of S) {
  if (!/<html lang="de"/.test(s.html)) { warn("Barrierefreiheit", `${s.page}: <html lang="de"> fehlt`); a11y++; }
  const ohneAlt = (s.html.match(/<img\b(?![^>]*\balt=)[^>]*>/gi) || []).length;
  if (ohneAlt) { warn("Barrierefreiheit", `${s.page}: ${ohneAlt} Bild(er) ohne alt-Attribut`); a11y++; }
}
if (!a11y) pass("Barrierefreiheit & Bewegung", "reduced-motion vorhanden, kein Ken-Burns auf Leistungsseiten, lang + alt ok");

// ---------- 12. Performance (1.11, S6) ----------
let perf = 0;
for (const s of S) if (/src="[^"]*logo[^"]*\.png"/.test(s.html)) { warn("Performance (1.11)", `${s.page}: Logo wieder als PNG statt WebP`); perf++; }
if (start && !/hero-\d{3}\.webp/.test(start.html)) { warn("Performance (S6)", "Startseite: kleines Handy-Startbild (hero-828.webp) fehlt im srcset"); perf++; }
const genutzteBilder = new Set(S.flatMap((s) => [...s.html.matchAll(/(?:src|srcset)="([^"]+)"/g)].flatMap((m) => m[1].split(",").map((x) => x.trim().split(" ")[0]))));
for (const u of genutzteBilder) {
  if (!u.startsWith(BASE) || !/\.(webp|jpe?g|png|avif)$/i.test(u)) continue;
  const p = join(DIST, u.slice(BASE.length));
  if (existsSync(p) && statSync(p).size > 200 * 1024) { warn("Performance (CI 6.1)", `${u}: ${Math.round(statSync(p).size / 1024)} KB (max. 200 KB)`); perf++; }
}
if (!perf) pass("Performance", "Logo WebP, Handy-Startbild, alle Bilder < 200 KB");

// ---------- Bericht ----------
console.log("\n=== Audit-Wächter Bauwelt Handwerk (Website-Audit 17.10. + SEO-/KI-Audit 19.10.) ===");
console.log(`Geprüft: ${S.length} Seiten, llms.txt, llms-full.txt, robots.txt, sitemap.xml, Rechner-Daten. Regeln: AUDIT-REGELN.md\n`);
for (const o of ok) console.log(`✓ ${o.thema}: ${o.msg}`);
if (warnungen.length) {
  console.log("");
  for (const w of warnungen) console.log(`AUDIT-WARNUNG [${w.thema}] ${w.msg}`);
  console.log(`\n${warnungen.length} Audit-Warnung(en). Betrifft eine Änderung ein Audit-Thema → Jamil im Talk (gjcy64m2) informieren: was, warum, Empfehlung.`);
  if (process.env.GITHUB_ACTIONS) for (const w of warnungen.slice(0, 50)) console.log(`::warning title=AUDIT-WARNUNG ${w.thema}::${w.msg.replace(/\n/g, " ")}`);
} else {
  console.log("\n✓ Keine Audit-Warnungen.");
}
process.exit(0);
