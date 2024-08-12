import { readFile } from "fs/promises";
import { convert } from "html-to-text";
import { compile } from "mdsvex";
import path from "path";

interface PostMetadata {
	title: string;
	date: string;
	[key: string]: any;
}

interface Post {
	code: string;
	metadata: PostMetadata;
}

export async function GET() {
	try {
		const posts = import.meta.glob("/src/lib/posts/*.svx");
		const postPromises = Object.keys(posts).map(async (postPath) => {
			const content = await readFile(path.join(process.cwd(), postPath), "utf-8");
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

		const convertToText = (html: string) =>
			convert(html, {
				wordwrap: false,
				selectors: ["h1", "h2", "h3", "h4", "h5", "h6", "table", "tr", "td", "th"].map(
					(selector) => ({
						selector,
						format: "skip",
					}),
				),
			})
				.replace(/</g, "&lt;")
				.replace(/>/g, "&gt;");

		const rssItems = postsRendered
			.map(
				(post) => `
				<item>
					<title>${post.metadata.title}</title>
					<link>https://pyro.engineering/posts/${titleToSlug(post.metadata.title)}</link>
					<description>${convertToText(post.code).split("\n")[0].trim()}</description>
					<pubDate>${post.metadata.date.toUTCString()}</pubDate>
				</item>`,
			)
			.join("");

		const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
	<channel>
		<title>pyro // engineering</title>
		<link>https://pyro.engineering</link>
		<description>Pyro develops gaming's most advanced software. We're makers at heart, and this is our story.</description>
		<language>en-us</language>
		<lastBuildDate>${postsRendered[0]?.metadata.date.toUTCString() || new Date().toUTCString()}</lastBuildDate>
		<image>
			<url>https://pyro.engineering/favicon.ico</url>
			<title>pyro // engineering</title>
			<link>https://pyro.engineering</link>
		</image>
		${rssItems}
	</channel>
</rss>`;

		return new Response(rssFeed, {
			headers: { "Content-Type": "application/rss+xml" },
		});
	} catch (error) {
		console.error("Error generating RSS feed:", error);
		return new Response("Internal Server Error", { status: 500 });
	}
}
