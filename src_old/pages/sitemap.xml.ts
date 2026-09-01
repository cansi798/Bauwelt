import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { BASE } from "../consts";

// Eigene Sitemap – listet alle indexierbaren Seiten (ohne Impressum/Datenschutz/404).
export const GET: APIRoute = async ({ site }) => {
  const origin = site?.origin ?? "https://cansi798.github.io";

  const staticPaths = [
    "",
    "leistungen/",
    "referenzen/",
    "partner/",
    "ueber-uns/",
    "karriere/",
    "kontakt/",
  ];
  const leistungen = await getCollection("leistungen");
  const referenzen = await getCollection("referenzen");

  const paths = [
    ...staticPaths,
    ...leistungen.map((l) => `leistungen/${l.slug}/`),
    ...referenzen.map((r) => `referenzen/${r.slug}/`),
  ];

  const urls = paths
    .map((p) => `  <url><loc>${origin}${BASE}${p}</loc></url>`)
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
