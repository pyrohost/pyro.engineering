import { getAllPosts } from "$lib/util/index.js";
import FuzzySearch from "fuzzy-search";

export const load = async ({ params }) => {
	const posts = await getAllPosts();
	const searcher = new FuzzySearch(posts, ["metadata.title"], {
		caseSensitive: false,
		sort: true,
	});
	const results = searcher.search(params.query);
	return {
		query: params.query,
		posts: results,
	};
};
