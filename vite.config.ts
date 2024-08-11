import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import viteImagemin from "@vheemstra/vite-plugin-imagemin";
import Icons from "unplugin-icons/vite";
import imageminWebp from "imagemin-webp";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";

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
		// viteImagemin({
		// 	plugins: {
		// 		png: imageminWebp({ quality }),
		// 		jpeg: imageminWebp({ quality }),
		// 		jpg: imageminWebp({ quality }),
		// 	},
		// 	makeWebp: {
		// 		plugins: {
		// 			png: imageminWebp({ quality }),
		// 			jpeg: imageminWebp({ quality }),
		// 			jpg: imageminWebp({ quality }),
		// 		},
		// 	},
		// }),
		sveltekit(),
		Icons({
			compiler: "svelte",
		}),
	],
});
