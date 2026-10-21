// Goldenes Akzentwort in Überschriften (Jamil 21.10.2026, Msg 2891): Gold bekommt das Wort, das den
// Sinn der Überschrift trägt – nicht automatisch das letzte. Markierung im Text mit Sternchen:
// „Was Sie *nach dem Termin* erhalten“. Ohne Sternchen bleibt das letzte Wort gold (alter Standard).
export type Teile = { pre: string; accent: string; post: string };

export const akzent = (t: string): Teile => {
  const m = t.match(/^([\s\S]*?)\*([^*]+)\*([\s\S]*)$/);
  if (m) return { pre: m[1], accent: m[2], post: m[3] };
  const i = t.lastIndexOf(" ");
  return i < 0 ? { pre: "", accent: t, post: "" } : { pre: t.slice(0, i + 1), accent: t.slice(i + 1), post: "" };
};

/** Überschrift ohne Sternchen (für Titel, aria-label, JSON-LD). */
export const ohneAkzent = (t: string): string => t.replace(/\*/g, "");
