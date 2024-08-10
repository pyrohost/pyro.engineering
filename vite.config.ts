import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import _ from "vite-plugin-webp-generator";

const ViteWebp = (_ as any).default as typeof _;

export default defineConfig({
	plugins: [
		ViteWebp({
			extensions: ["png", "jpg", "jpeg"],
		}),
		sveltekit(),
	],
});
