import type { APIRoute } from "astro";
import { BASE } from "../consts";

// robots.txt (SEO-/KI-Audit G1, 19.10.2026): wird aus der Website-Adresse erzeugt, damit
// Sitemap/llms-Verweise beim Umzug auf bauwelt-handwerk.de automatisch stimmen.
// Hinweis: Suchmaschinen lesen die robots.txt NUR im Hauptverzeichnis einer Domain –
// unter cansi798.github.io/Bauwelt/ ist sie wirkungslos, auf der eigenen Domain wirkt sie.
// KI-Crawler sind ausdrücklich erlaubt: die Firma soll auch in KI-Antworten gefunden werden.
const KI_CRAWLER = [
  "GPTBot", "OAI-SearchBot", "ChatGPT-User",
  "ClaudeBot", "Claude-User", "Claude-SearchBot", "Claude-Web",
  "PerplexityBot", "Perplexity-User",
  "Google-Extended", "Applebot-Extended",
  "CCBot", "meta-externalagent", "Amazonbot", "DuckAssistBot", "MistralAI-User",
  "Bingbot",
];
export const GET: APIRoute = ({ site }) => {
  const o = `${site?.origin}${BASE}`;
  const txt = `User-agent: *
Allow: /

# KI-Crawler ausdrücklich erlaubt – die Firma soll auch in KI-Antworten gefunden werden
${KI_CRAWLER.map((b) => `User-agent: ${b}\nAllow: /`).join("\n\n")}

Sitemap: ${o}sitemap.xml
# Zusammenfassung für KI-Assistenten: ${o}llms.txt (ausführlich: ${o}llms-full.txt)
`;
  return new Response(txt, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
