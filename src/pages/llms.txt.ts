import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { BASE, EMAILS, LEISTUNGEN, SITE } from "../consts";
import { GEWERKE, berechne, preisText, MWST_HINWEIS } from "../data/rechner";
import { REGION_CITIES } from "../data/region";
import { FAQ_HOME, ZAHLEN } from "../data/home";
import { KERNVORTEILE } from "../data/versprechen";

// llms.txt – kompakte Zusammenfassung für KI-Assistenten (SEO-/KI-Audit K2, 19.10.2026).
// Wird bei jedem Build AUS DEN WEBSITE-DATEN erzeugt (Leistungen, Preise, Gebiet, Zahlen, FAQ),
// damit KI-Systeme keine veralteten Aussagen übernehmen. Nur belegte Fakten – bewusst KEIN
// „Meisterbetrieb“ und KEINE „5 Jahre Gewährleistung“ (Kundenfeedback 30.09.2026).
export const GET: APIRoute = async ({ site }) => {
  const o = `${site?.origin}${BASE}`;
  const inhalte = new Map((await getCollection("leistungen")).map((e) => [e.id, e.data]));
  const euro = (n: number) => n.toLocaleString("de-DE");

  const leistungen = LEISTUNGEN.map((l) => {
    const d = inhalte.get(l.slug);
    const g = GEWERKE.find((x) => x.slug === l.slug);
    const preis = d?.pauschalpreis
      ? (d.pauschalHinweis ?? "").replace(/\.$/, "") // Preis steht schon im Teaser
      : g
        ? `Beispiel-Preisspanne laut Online-Rechner (${g.default} ${g.unit}, ${g.tiers[0].label}): ${preisText(berechne(g, g.default, g.tiers[0].id, { art: "schnell" }))}, unverbindlich`
        : "";
    const satz = (t: string) => (/[.!?]$/.test(t) ? t : `${t}.`);
    return `- [${l.unterschrift}](${o}leistungen/${l.slug}/) – ${satz(l.ueberschrift)} ${d?.teaser ?? ""}${preis ? ` ${satz(preis)}` : ""}`;
  }).join("\n");

  const txt = `# ${SITE.legal}

> Handwerksbetrieb aus ${SITE.city} bei Hamburg für Badsanierung, Komplettsanierung & Modernisierung,
> Fliesen- & Bodenlegerarbeiten sowie Innenausbau & Trockenbau – mit Festpreis-Zusage nach einem
> kostenlosen Vor-Ort-Termin und einem festen Ansprechpartner. Dazu zwei Checks zum Pauschalpreis:
> Immobilien-Sanierungscheck und „Sicher wohnen. Heute und morgen.“

## Leistungen

${leistungen}

Alle Preise: ${MWST_HINWEIS} Den verbindlichen Festpreis nennen wir nach einem kostenlosen Vor-Ort-Termin.
Online-Rechner (Preisspanne ohne Kontaktdaten): ${o}rechner/

## Fakten

${ZAHLEN.map((z) => `- ${z.wert} ${z.label}`).join("\n")}
${KERNVORTEILE.map((k) => `- ${k.title}: ${k.short}`).join("\n")}
- Eingetragen bei der Handwerkskammer Lübeck; versicherter Betrieb
- Referenzen (echte Projektfotos aus Hamburg und Norderstedt): ${o}referenzen/

## Einzugsgebiet

Hamburg und Umgebung, ca. 50 km um ${SITE.city}: von Wedel und Itzehoe bis Neumünster, Bad Oldesloe und Reinbek.
Orte: ${REGION_CITIES.join(", ")}.

## Häufige Fragen

${FAQ_HOME.map((f) => `- ${f.q} ${f.a}`).join("\n")}

## Kontakt

- ${SITE.legal}, ${SITE.street}, ${SITE.zip} ${SITE.city}
- Telefon/WhatsApp: ${SITE.phoneDisplay} (${SITE.phoneTel})
- E-Mail: ${EMAILS.service}
- Öffnungszeiten: ${SITE.hours}
- Kostenloser Vor-Ort-Termin und Rückruf-Formular: ${o}kontakt/
- Geschäftsführer: ${SITE.managing} · ${SITE.register} · USt-IdNr. ${SITE.vat}
`;
  return new Response(txt, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
