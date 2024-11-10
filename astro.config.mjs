// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import svelte from '@astrojs/svelte';
import tailwind from '@astrojs/tailwind';
import Icons from 'astro-icon';
import react from '@astrojs/react';


import node from '@astrojs/node';


// https://astro.build/config
export default defineConfig({
  site: 'https://pyro.engineering',
  integrations: [mdx(), sitemap(), svelte(), tailwind(), react(), Icons({
    include: {
      // logos: ['*'],
      // lucide: ['globe', 'rss']
    }
  })],
  output: 'server',

  adapter: node({
    mode: 'standalone'
  })
});