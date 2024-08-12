import { getAllPosts, toSlug } from "$lib/util/index.js";
import type { SvelteComponent } from "svelte";

export async function load({ params }) {
	const name = params.name;
	// grab all blog posts
	const posts = await getAllPosts();
	const postsByAuthor = posts.filter((p) =>
		p.metadata.authors.map((a) => toSlug(a.name)).includes(name),
	);
	const realAuthorName = postsByAuthor[0]?.metadata.authors.find(
		(a) => toSlug(a.name) === name,
	)?.name;
	return {
		posts: postsByAuthor,
		realAuthorName,
		providedName: name,
	};
}
