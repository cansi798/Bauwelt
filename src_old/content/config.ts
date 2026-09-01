import { defineCollection, z } from "astro:content";

const leistungen = defineCollection({
  type: "content",
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
  }),
});

const referenzen = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    place: z.string(),
    cat: z.enum(["bad", "sanierung", "aussen"]),
    order: z.number().default(50),
    file: z.string().optional(),        // Bilddatei in assets/img/
    prompt: z.string(),                 // KI-Bildbeschreibung
    dauer: z.string().optional(),
    leistung: z.string().optional(),
  }),
});

const stellen = defineCollection({
  type: "content",
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
