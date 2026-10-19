// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://yasmnam.github.io',
  output: 'static',
  // Same URLs as the hand-coded site: /drawerredesign/ -> /drawerredesign/index.html
  build: { format: 'directory' },
  trailingSlash: 'ignore',
  // Files in ./static are copied as-is. Images live in ./static/public/images so
  // their URLs stay /public/images/... (used in og:image and existing links).
  publicDir: './static',
  integrations: [react()],
});
