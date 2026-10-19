import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { BASE } from "../consts";
import { execSync } from "node:child_process";

// SEO-/KI-Audit S8 (19.10.2026): <lastmod> = Datum der letzten Änderung (git) der zugehörigen
// Dateien; ohne git-Verlauf (z. B. flacher Checkout) das Build-Datum.
const HEUTE = new Date().toISOString().slice(0, 10);
function geaendert(dateien: string[]): string {
  try {
    const d = execSync(`git log -1 --format=%cI -- ${dateien.map((f) => `"${f}"`).join(" ")}`, { encoding: "utf8" }).trim();
    return d ? d.slice(0, 10) : HEUTE;
  } catch {
    return HEUTE;
  }
}
const GEMEINSAM = ["src/consts.ts", "src/layouts/BaseLayout.astro"];

// Eigene Sitemap – listet alle indexierbaren Seiten (ohne Impressum/Datenschutz/404).
// Referenz-Detailseiten entfallen seit 12.10.2026 (17): sie zeigten nur KI-Bilder.
export const GET: APIRoute = async ({ site }) => {
  const origin = site?.origin ?? "https://cansi798.github.io";

  const staticPaths = [
    "",
    "rechner/",
    "referenzen/",
    "partner/",
    "ueber-uns/",
    "karriere/",
    "kontakt/",
  ];
  const leistungen = await getCollection("leistungen");

  const seiteDatei = (p: string) => (p === "" ? ["src/pages/index.astro", "src/data/home.ts"] : [`src/pages/${p.replace(/\/$/, "")}.astro`, `src/pages/${p}index.astro`]);
  const paths: [string, string[]][] = [
    ...staticPaths.map((p): [string, string[]] => [p, seiteDatei(p)]),
    ...leistungen.map((l): [string, string[]] => [`leistungen/${l.id}/`, [`src/content/leistungen/${l.id}.md`, l.data.eigeneSeite ? `src/pages/leistungen/${l.id}.astro` : "src/pages/leistungen/[slug].astro"]]),
  ];

  const urls = paths
    .map(([p, dateien]) => `  <url><loc>${origin}${BASE}${p}</loc><lastmod>${geaendert([...dateien, ...GEMEINSAM])}</lastmod></url>`)
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
