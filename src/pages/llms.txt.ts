import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { BASE, EMAILS, LEISTUNGEN, SITE } from "../consts";
import { GEWERKE, berechne, preisText, MWST_HINWEIS, HINWEIS_PREIS } from "../data/rechner";
import { REGION_CITIES, REGION_TEXT } from "../data/region";
import { FAQ_HOME } from "../data/home";
import { VERSPRECHEN } from "../data/versprechen";

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
        ? (() => {
            const e = berechne(g, g.default, g.tiers[0].id, { art: "schnell" });
            // Innenausbau zeigt einen ca.-Betrag, keine Spanne → passende Bezeichnung (Prüfung 27.10.2026)
            return `${e.art === "spanne" ? "Beispiel-Preisspanne" : "Beispielpreis"} laut Online-Rechner (${g.default} ${g.unit}, ${g.tiers[0].label}): ${preisText(e)}, unverbindlich`;
          })()
        : "";
    const satz = (t: string) => (/[.!?]$/.test(t) ? t : `${t}.`);
    return `- [${l.unterschrift}](${o}leistungen/${l.slug}/) – ${satz(l.nutzen)} ${d?.teaser ?? ""}${preis ? ` ${satz(preis)}` : ""}`;
  }).join("\n");

  // SEO/KI 29.10.2026 (Can, Talk 3767; Audit 29.10. Punkt 7): Stand-Datum + Kurzfakten in einem Block –
  // leichter zitierbar für ChatGPT & Co. Alle Werte aus denselben Daten wie die Website.
  const stand = new Date().toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric", timeZone: "Europe/Berlin" });
  const checks = LEISTUNGEN.filter((l) => inhalte.get(l.slug)?.pauschalpreis)
    .map((l) => `${l.unterschrift} ${euro(inhalte.get(l.slug)!.pauschalpreis!)} € inkl. MwSt. (Pauschalpreis)`).join("; ");
  const txt = `# ${SITE.legal}

Stand: ${stand}

## Auf einen Blick

- Sitz: ${SITE.street}, ${SITE.zip} ${SITE.city} (bei Hamburg)
- Einzugsgebiet: ${SITE.city}, Hamburg und rund 40 km Umkreis
- Telefon/WhatsApp: ${SITE.phoneDisplay} · E-Mail: ${EMAILS.service}
- Öffnungszeiten: ${SITE.hours}
- Vor-Ort-Termin: kostenlos; danach schriftliches Angebot
- Checks: ${checks}
- Website: ${o}

> Handwerksbetrieb aus ${SITE.city} bei Hamburg für Badsanierung, Komplettsanierung & Modernisierung,
> Fliesen- & Bodenlegerarbeiten sowie Innenausbau & Trockenbau – mit transparentem Angebot nach einem
> kostenlosen Vor-Ort-Termin und einem festen Ansprechpartner. Dazu zwei Checks zum Pauschalpreis:
> Immobilien-Sanierungscheck und Sicher-wohnen-Check.

## Leistungen

${leistungen}

Alle Preise: ${MWST_HINWEIS} ${HINWEIS_PREIS} Den genauen Preis nennen wir im schriftlichen Angebot nach einem kostenlosen Vor-Ort-Termin.
Online-Rechner (Preisspanne ohne Kontaktdaten): ${o}rechner/

## Fakten

${VERSPRECHEN.map((k) => `- ${k.title}: ${k.short}`).join("\n")}
- Eingetragen bei der Handwerkskammer Lübeck; versicherter Betrieb
- Referenzen (Projektbeispiele): ${o}referenzen/

## Einzugsgebiet

${REGION_TEXT} (Sitz: ${SITE.city}, rund 40 km Umkreis).
Orte: ${REGION_CITIES.join(", ")}.

## Häufige Fragen

Alle Fragen nach Themen: ${o}faq/

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
