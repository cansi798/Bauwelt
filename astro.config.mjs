// @ts-check
import { defineConfig } from 'astro/config';

// GitHub-Project-Pages: Seite liegt unter https://cansi798.github.io/Bauwelt/
// Deshalb base '/Bauwelt'. Bei späterer eigener Domain auf '/' ändern.
export default defineConfig({
  site: 'https://cansi798.github.io',
  base: '/Bauwelt',
  build: { format: 'directory' },
  trailingSlash: 'ignore',
});
