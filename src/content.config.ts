// Astro-5-Content-Collections (Glob-Loader). Inhalte liegen weiter in src/content/*.
import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const leistungen = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/leistungen" }),
  schema: z.object({
    title: z.string(),
    order: z.number().default(50),
    icon: z.string(),
    badge: z.string().optional(),
    teaser: z.string(),                 // Kurztext für Karten
    lead: z.string(),                   // Einleitung auf der Unterseite
    heroPrompt: z.string().optional(),  // KI-Bildbeschreibung Hero
    umfang: z.array(z.string()),        // Leistungsumfang (Bulletpoints)
    ablauf: z.array(z.object({ title: z.string(), text: z.string() })).default([]),
    faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
    /** Vorauswahl im Projekt-Rechner (Gewerk-Slug aus data/rechner.ts). */
    rechnerSlug: z.string().optional(),
    /** Passendes Versprechen-Siegel (id aus data/versprechen.ts). */
    siegel: z.string().optional(),
    // Einheitliche Leistungsseite (Kundenwunsch 11.10.2026): H1 → Intro (Markdown-Text,
    // ca. 8 Zeilen aus Kundensicht) → „Warum <Leistung> mit Bauwelt Handwerk?“
    introTitel: z.string().optional(),                // H2 über dem Intro-Text
    // Landingpage-Hero (Kundenwunsch 14.10.2026 (29)): emotionaler Satz unter der H1
    claim: z.string().optional(),
    /** Akzentwort im Ablauf: „So einfach kommen Sie zu Ihrem <ablaufZiel>“ */
    ablaufZiel: z.string().optional(),
    // Landingpage-Schema nach Kundenwunsch 14.10.2026 (35): Rechner-Untertext, Leistungsumfang
    // als Kacheln, Projektbilder-Überschrift, Ablauf-Überschrift (letztes Wort jeweils gold)
    rechnerText: z.string().optional(),
    umfangTitel: z.string().optional(),
    umfangText: z.string().optional(),
    kacheln: z.array(z.object({ icon: z.string(), title: z.string() })).default([]),
    bilderTitel: z.string().optional(),
    bilderText: z.string().optional(),
    ablaufTitel: z.string().optional(),
    warum: z.array(z.object({ icon: z.string(), title: z.string(), text: z.string() })).default([]),
    h1Akzent: z.string().default("Festpreis"),       // (bis 16.10.2026) goldenes Wort in der H1 – H1 ist jetzt die Überschrift aus LEISTUNGEN
    /** Eigene Seitendatei unter src/pages/leistungen/<slug>.astro statt der gemeinsamen Vorlage
     *  (Zuhause-Check 60+, Kundenwunsch 16.10.2026 (73)). Preis/FAQ/Umfang bleiben hier. */
    eigeneSeite: z.boolean().default(false),
    /** Intro-Abschnitt (Text + Foto) ausblenden – Badsanierung, Kundenwunsch 16.10.2026 (77). */
    ohneIntro: z.boolean().default(false),
    checks: z.array(z.string()).optional(),          // Häkchen im Hero (Standard: Festpreis …)
    bild: z.string().optional(),                     // Hero-Bild (Standard: hero-<slug>.webp)
    beschreibung: z.string().optional(),             // Meta-Description (Standard: aus teaser)
    /** Fester Pauschalpreis in € (statt Rechner), z. B. Sanierungscheck. */
    pauschalpreis: z.number().optional(),
    /** Zusatzhinweis zum Pauschalpreis (z. B. Anrechnung), auch im Rechner-Festpreisfenster. */
    pauschalHinweis: z.string().optional(),
    /** Echte Referenzfotos (Dateien in assets/img/) für den Referenzen-Abschnitt der
     *  Leistungsseite; sonst die Referenz-Collection. Kundenwunsch 12.10.2026 (16). */
    refBilder: z.array(z.object({ file: z.string(), alt: z.string() })).optional(),
    /** Anker der Galerie-Gruppe auf /referenzen/ (z. B. "bad"). */
    refAnker: z.string().optional(),
  }),
});

const referenzen = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/referenzen" }),
  schema: z.object({
    title: z.string(),
    place: z.string(),
    cat: z.enum(["bad", "sanierung", "aussen"]),
    order: z.number().default(50),
    file: z.string().optional(),        // Bilddatei in assets/img/
    prompt: z.string(),                 // KI-Bildbeschreibung
    dauer: z.string().optional(),
    leistung: z.string().optional(),
    /** NUR echte Kundenzitate eintragen – niemals erfinden. */
    quote: z.string().optional(),
  }),
});

const stellen = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/stellen" }),
  schema: z.object({
    title: z.string(),
    art: z.string().default("Vollzeit"),
    ort: z.string().default("Norderstedt & Umgebung"),
    order: z.number().default(50),
    /** Kundenwunsch 14.10.2026 (38): Stelle nur auf der Karriereseite zeigen, wenn offen.
     *  Sind alle geschlossen, erscheint „Derzeit suchen wir keine Verstärkung.“ */
    offen: z.boolean().default(false),
    aufgaben: z.array(z.string()).default([]),
    profil: z.array(z.string()).default([]),
  }),
});

export const collections = { leistungen, referenzen, stellen };
