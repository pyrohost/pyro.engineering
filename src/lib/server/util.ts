import type { PostMetadata } from "$lib/util";
import { compile } from "mdsvex";

interface TextPost {
	code: string;
	metadata: PostMetadata;
}

export const getAllPostsText = async (): Promise<TextPost[]> => {
	const posts = import.meta.glob("/src/lib/posts/*.svx", {
		query: "?raw",
		import: "default",
	});
	const postPromises = Object.keys(posts).map(async (postPath) => {
		const content = (await posts[postPath]()) as string;
		const compiled = await compile(content);

		if (!compiled || typeof compiled.code !== "string" || !compiled.data?.fm) {
			throw new Error(`Compilation failed for post: ${postPath}`);
		}

		const metadata = compiled.data.fm as PostMetadata;

		return {
			code: compiled.code,
			metadata,
		};
	});

	const postsRendered = (await Promise.all(postPromises))
		.map((post) => ({
			code: post.code.startsWith("---------------")
				? post.code.split("\n").slice(1).join("\n").trim()
				: post.code,
			metadata: {
				...post.metadata,
				date: new Date(post.metadata.date),
			},
		}))
		.sort((a, b) => b.metadata.date.getTime() - a.metadata.date.getTime());

	return postsRendered;
};
