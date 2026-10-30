// @ts-check
import { defineConfig } from 'astro/config';

// GitHub-Project-Pages: Seite liegt unter https://cansi798.github.io/Bauwelt/
// Deshalb base '/Bauwelt'. Bei späterer eigener Domain auf '/' ändern.
// Sitemap wird über src/pages/sitemap.xml.ts selbst erzeugt (robust, ohne Extra-Abhängigkeit).
export default defineConfig({
  site: 'https://cansi798.github.io',
  base: '/Bauwelt',
  build: { format: 'directory' },
  trailingSlash: 'ignore',
  // Astro 7: Standard wäre 'jsx' (JSX-Whitespace-Regeln). true = bisheriges
  // v5-Verhalten, damit Leerzeichen zwischen Text und <span>/Icons erhalten bleiben.
  compressHTML: true,
  // Sicherheitsbericht N1 (30.10.2026): Content-Security-Policy. GitHub Pages erlaubt keine eigenen Header,
  // deshalb liefert Astro sie als <meta http-equiv> aus und rechnet die Hashes aller eingebetteten Skripte/Styles
  // selbst aus. (frame-ancestors/X-Frame-Options gehen per Meta nicht – erst nach dem Hosting-Wechsel.)
  security: {
    csp: {
      algorithm: 'SHA-256',
      directives: [
        "default-src 'self'",
        "img-src 'self' data:",
        "font-src 'self'",
        "connect-src 'self'",
        "frame-src https://portal.bauwelt-handwerk.de", // Buchungsportal (Relexable) im Buchungsfenster
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self'",
        "manifest-src 'self'",
        "worker-src 'none'",
      ],
      scriptDirective: {
        // Eingebettete Skripte: nur mit Astro-Hash. Inline-Handler: nur genau onerror="this.remove()" (Img/Hero).
        resources: ["'self'", { resource: "'unsafe-hashes'", kind: 'attribute' }],
        hashes: [{ hash: 'sha256-9f8ZK5epjuMsYtXFjPqrgJI0L4QOAUYmJdHtT+RSH/c=', kind: 'attribute' }],
      },
      styleDirective: {
        // style="--d:…" an Szenen/Animationen braucht Inline-Stil-Attribute; <style>-Elemente bleiben per Hash geschützt.
        resources: ["'self'", { resource: "'unsafe-inline'", kind: 'attribute' }],
      },
    },
  },
});
