import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { BASE, EMAILS, LEISTUNGEN, SITE } from "../consts";
import { GEWERKE, berechne, preisText, MWST_HINWEIS } from "../data/rechner";
import { REGION_CITIES } from "../data/region";
import { FAQ_HOME, ZAHLEN } from "../data/home";
import { VERSPRECHEN } from "../data/versprechen";

// llms-full.txt – ausführliche Fassung für KI-Assistenten (SEO-/KI-Audit G3, 19.10.2026).
// Automatisch aus den Website-Inhalten: alle Leistungen mit Text, Umfang, Vorteilen, Preisen
// und FAQ. Nur belegte Fakten (siehe llms.txt).
const bereinigt = (t: string) => t.replace(/­/g, "").replace(/\s+\n/g, "\n").trim();

export const GET: APIRoute = async ({ site }) => {
  const o = `${site?.origin}${BASE}`;
  const inhalte = new Map((await getCollection("leistungen")).map((e) => [e.id, e]));
  const euro = (n: number) => n.toLocaleString("de-DE");

  const abschnitte = LEISTUNGEN.map((l) => {
    const e = inhalte.get(l.slug);
    const d = e?.data;
    const g = GEWERKE.find((x) => x.slug === l.slug);
    const teile: string[] = [`## ${l.unterschrift}`, "", `${l.ueberschrift} – ${o}leistungen/${l.slug}/`, ""];
    if (d?.claim) teile.push(d.claim);
    if (d?.lead) teile.push(d.lead);
    if (e?.body) teile.push("", bereinigt(e.body));
    if (d?.pauschalpreis) teile.push("", `Preis: pauschal ${euro(d.pauschalpreis)} € inkl. MwSt.${d.pauschalHinweis ? ` ${d.pauschalHinweis}` : ""}`);
    else if (g) teile.push("", `Preisbeispiele laut Online-Rechner (unverbindlich, ${MWST_HINWEIS}):`, ...g.tiers.map((t) => `- ${t.label}${t.festBis ? "" : `, ${g.default} ${g.unit}`}: ${preisText(berechne(g, g.default, t.id, { art: "schnell" }))}`));
    if (d?.umfang?.length) teile.push("", "Leistungsumfang:", ...d.umfang.map((u) => `- ${bereinigt(u)}`));
    if (d?.kacheln?.length) teile.push("", "Arbeiten:", ...d.kacheln.map((k) => `- ${bereinigt(k.title)}`));
    if (d?.warum?.length) teile.push("", "Vorteile:", ...d.warum.map((w) => `- ${w.title}: ${w.text}`));
    if (d?.faq?.length) teile.push("", "Häufige Fragen:", ...d.faq.map((f) => `- ${f.q} ${f.a}`));
    return teile.join("\n");
  }).join("\n\n");

  const txt = `# ${SITE.legal} – ausführliche Informationen

> Handwerksbetrieb aus ${SITE.city} bei Hamburg. Kurzfassung: ${o}llms.txt

## Unternehmen

- ${SITE.legal}, ${SITE.street}, ${SITE.zip} ${SITE.city}; Geschäftsführer ${SITE.managing}
- ${SITE.register}; USt-IdNr. ${SITE.vat}; eingetragen bei der Handwerkskammer Lübeck; versicherter Betrieb
${ZAHLEN.map((z) => `- ${z.wert} ${z.label}`).join("\n")}
- Einzugsgebiet: Hamburg und Umgebung, ca. 50 km um ${SITE.city} (${REGION_CITIES.join(", ")})

## Unsere Zusagen

${VERSPRECHEN.map((v) => `- ${v.title}: ${v.long}`).join("\n")}

${abschnitte}

## Allgemeine Fragen

${FAQ_HOME.map((f) => `- ${f.q} ${f.a}`).join("\n")}

## Kontakt

- Telefon/WhatsApp: ${SITE.phoneDisplay} (${SITE.phoneTel}) · E-Mail: ${EMAILS.service} · ${SITE.hours}
- Kostenloser Vor-Ort-Termin und Rückruf-Formular: ${o}kontakt/
- Online-Rechner: ${o}rechner/
`;
  return new Response(txt, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
