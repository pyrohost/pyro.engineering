import { getAllPosts } from "$lib/util";
import type { SvelteComponent } from "svelte";

export async function load() {
	const posts = await getAllPosts();
	return {
		posts,
	};
}
