import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import Icons from "unplugin-icons/vite";

const quality = 75;

export default defineConfig({
	plugins: [
		ViteImageOptimizer({
			png: {
				quality,
			},
			jpeg: {
				quality,
			},
			jpg: {
				quality,
			},
			tiff: {
				quality,
			},
			webp: {
				quality,
				lossless: false,
			},
		}),
		sveltekit(),
		Icons({
			compiler: "svelte",
		}),
	],
});
