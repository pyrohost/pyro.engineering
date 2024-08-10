import type { SvelteComponent } from "svelte";

export const titleToSlug = (title: string) => {
	return title
		.toLowerCase()
		.replace(/ /g, "-")
		.replace(/[^a-z0-9-]/g, "");
};

// this fn contains some really hacky code to mangle the
// images to be processed by vite. sorry evan :3
export const getAllPosts = async () => {
	const postsImports = import.meta.glob<{
		default: SvelteComponent;
		metadata: Record<string, any>;
	}>("/src/lib/posts/*.svx");
	const posts = (await Promise.all(Object.values(postsImports).map((v) => v()))).filter(
		(p) => !!p.metadata,
	) as {
		default: SvelteComponent;
		metadata: {
			title: string;
			date: Date;
			authors: {
				name: string;
				image: string;
			}[];
			image: string;
		};
	}[];

	posts.forEach((post) => {
		post.metadata.date = new Date(post.metadata.date);
	});

	// meta glob all posts in /src/lib/assets/posts/*
	const postsAssets = import.meta.glob("/src/lib/assets/posts/*");

	const postImages: Record<string, string> = {};

	await Promise.all(
		Object.entries(postsAssets).map(async ([path, asset]) => {
			const image = await asset();
			postImages[path] = (image as any).default;
		}),
	);

	const authorAssets = import.meta.glob("/src/lib/assets/authors/*");

	const authorImages: Record<string, string> = {};

	await Promise.all(
		Object.entries(authorAssets).map(async ([path, asset]) => {
			const image = await asset();
			authorImages[path] = (image as any).default;
		}),
	);

	// for each post, find the first one in the postImages object where the key.split('/').pop() is equal to the post.metadata.image
	posts.forEach((post) => {
		const image = Object.entries(postImages).find(
			([path]) => path.split("/").pop() === post.metadata.image,
		);
		if (image) {
			post.metadata.image = image[1];
		}

		let authors: { name: string; image: string }[] = [];

		post.metadata.authors.forEach((author, i) => {
			const authorImage = Object.entries(authorImages).find(
				([path]) =>
					path.split("/").pop()!.split(".").slice(0, -1).join(".") ===
					(author as unknown as string),
			);

			if (authorImage) {
				authors.push({
					name: author as unknown as string,
					image: authorImage[1],
				});
			}
		});
		// this check fixes a nasty bug where the
		// above code somehow (??) mutates the
		// original, thus causing the authors to
		// be empty
		if (authors.length > 0) post.metadata.authors = authors;
	});

	return posts;
};
