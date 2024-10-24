import { getAllPostsText } from "$lib/server/util.js";
import { convertToText } from "$lib/util";
import type { RequestEvent } from "@sveltejs/kit";

export async function load({ request }: RequestEvent) {
	const textPosts = await getAllPostsText();
	const htmlTextPosts = textPosts.map((post) => ({
		...post,
		code: convertToText(post.code),
	}));
	const ua = request.headers.get("user-agent");
	return {
		ua,
		htmlTextPosts,
	};
}
