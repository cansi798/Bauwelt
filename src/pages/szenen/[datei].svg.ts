// Jede handgezeichnete Szene als eigene Datei: /szenen/<name>-<mobil|desktop>.svg
// (sieht sie auf Handy und Desktop gleich aus: nur /szenen/<name>.svg)
// (Gesamt-Audit 20.10.2026 P1): RoughSzene.astro lädt sie erst kurz vor dem Sichtbarwerden nach;
// ohne JavaScript zeigt <noscript> sie als fertiges Bild.
import type { APIRoute, GetStaticPaths } from "astro";
import { SZENEN, type SzenenName } from "../../data/szenen";
import { fassungen, szeneSvg, type Fassung } from "../../lib/szene-svg";

export const getStaticPaths: GetStaticPaths = () =>
  (Object.keys(SZENEN) as SzenenName[]).flatMap((name) =>
    fassungen(name).map((a) => ({ params: { datei: a === "beide" ? name : `${name}-${a}` }, props: { name, a } }))
  );

export const GET: APIRoute = ({ props }) =>
  new Response(szeneSvg(props.name as SzenenName, props.a as Fassung, true), {
    headers: { "Content-Type": "image/svg+xml; charset=utf-8" },
  });
