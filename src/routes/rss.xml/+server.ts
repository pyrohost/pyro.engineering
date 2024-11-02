import { convertToText, toSlug } from "$lib/util";
import { getAllPostsText } from "$lib/server/util";

interface PostMetadata {
	title: string;
	date: string;
	[key: string]: any;
}
export async function GET() {
	try {
		const postsRendered = await getAllPostsText();
		const rssItems = postsRendered
			.map(
				(post) => `
				<item>
					<title>${post.metadata.title}</title>
					<link>https://pyro.engineering/posts/${toSlug(post.metadata.title)}</link>
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
