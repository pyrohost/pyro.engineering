// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

import sitemap from '@astrojs/sitemap';

import svelte from '@astrojs/svelte';

import tailwind from '@astrojs/tailwind';
import Icons from 'astro-icon';


import react from '@astrojs/react';


// https://astro.build/config
export default defineConfig({
    site: 'https://pyro.engineering',
    integrations: [mdx(), sitemap(), svelte(), tailwind(), Icons(), react()],
    output: 'server'
});