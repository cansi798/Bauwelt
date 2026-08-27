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
});
