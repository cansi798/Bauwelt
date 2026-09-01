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
    aufgaben: z.array(z.string()).default([]),
    profil: z.array(z.string()).default([]),
  }),
});

export const collections = { leistungen, referenzen, stellen };
