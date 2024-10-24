import { browser } from "$app/environment";
import { getAllPosts, toSlug } from "$lib/util/index.js";
import type { SvelteComponent } from "svelte";

export async function load({ params }: { params: { slug: string } }) {
	// Grab the slug from the URL
	const slug = params.slug;

	// Grab all blog posts
	const posts = await getAllPosts();
	const post = posts.find((p) => toSlug(p.metadata.title) === slug);
	return {
		post,
	};
}
