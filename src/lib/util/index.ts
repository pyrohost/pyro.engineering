import { SvelteComponent } from "svelte";

interface PostMetadata {
	title: string;
	date: Date;
	authors: Author[];
	image: string;
}

interface Author {
	name: string;
	image: string;
}

interface Post {
	default: SvelteComponent;
	metadata: PostMetadata;
}

export const toSlug = (title: string): string => {
	return title
		.toLowerCase()
		.replace(/ /g, "-")
		.normalize("NFD")
		.replace(/[^a-z0-9-]/g, "");
};

const importAssets = async (
	glob: Record<string, () => Promise<unknown>>,
): Promise<Record<string, string>> => {
	const assets: Record<string, string> = {};
	await Promise.all(
		Object.entries(glob).map(async ([path, importFn]) => {
			const module = await importFn();
			assets[path] = (module as { default: string }).default;
		}),
	);
	return assets;
};

const findAssetByFilename = (
	assets: Record<string, string>,
	filename?: string,
): string | undefined => {
	const entry = Object.entries(assets).find(
		([path]) => path.split("/").pop()?.split(".").slice(0, -1).join(".") === filename,
	);
	return entry ? entry[1] : undefined;
};

const processAuthors = (authors: string[], authorImages: Record<string, string>): Author[] => {
	return authors.map((authorName) => {
		if ((authorName as any)["name"]) {
			return authorName as unknown as Author;
		}
		const imagePath = Object.keys(authorImages).find(
			(path) => path.split("/").pop()!.split(".").slice(0, -1).join(".") === authorName,
		);
		return {
			name: authorName,
			image: imagePath ? authorImages[imagePath] : "",
		};
	});
};

export const getAllPosts = async (): Promise<Post[]> => {
	const postsImports = import.meta.glob<Post>("/src/lib/posts/*.svx");
	const postsAssets = import.meta.glob("/src/lib/assets/posts/*");
	const authorAssets = import.meta.glob("/src/lib/assets/authors/*");

	const [posts, postImages, authorImages] = await Promise.all([
		Promise.all(Object.values(postsImports).map((v) => v())),
		importAssets(postsAssets),
		importAssets(authorAssets),
	]);

	const postKeys = Object.keys(postsImports);

	return posts
		.filter((p): p is Post => !!p.metadata)
		.map((post, i) => {
			const metadata = { ...post.metadata, date: new Date(post.metadata.date) };
			const key = postKeys[i];
			metadata.image =
				findAssetByFilename(
					postImages,
					key.split("/").at(-1)?.split(".").slice(0, -1).join("."),
				) || metadata.image;
			metadata.authors = processAuthors(
				metadata.authors as unknown as string[],
				authorImages,
			);
			return { ...post, metadata };
		})
		.sort((a, b) => b.metadata.date.getTime() - a.metadata.date.getTime());
};
