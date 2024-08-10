import { getAllPosts, titleToSlug } from "$lib/util/index.js";
import type { SvelteComponent } from "svelte";

export async function load({ params }) {
	const slug = params.slug;
	// grab all blog posts
	const posts = await getAllPosts();
	const post = posts.find((p) => titleToSlug(p.metadata.title) === slug);
	return {
		post,
	};
}
