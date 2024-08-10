import { read } from "$app/server";
import { titleToSlug } from "$lib/util/index.js";
import { compile } from "mdsvex";
import { convert } from "html-to-text";

export async function GET({ request }) {
	const posts = import.meta.glob("/src/lib/posts/*.svx");
	const postStrings = await Promise.all(
		Object.keys(posts).map(async (p) => await read(p).text()),
	);
	let postsRendered = await Promise.all(
		postStrings.map(async (p) =>
			compile(p).then(
				(p) =>
					({
						code: convert(p?.code || "", {
							wordwrap: Infinity,
							selectors: [
								{
									selector: "h1",
									format: "skip",
								},
								{
									selector: "h2",
									format: "skip",
								},
								{
									selector: "h3",
									format: "skip",
								},
								{
									selector: "h4",
									format: "skip",
								},
								{
									selector: "h5",
									format: "skip",
								},
								{
									selector: "h6",
									format: "skip",
								},
							],
						})
							.replaceAll("<", "&lt;")
							.replaceAll(">", "&gt;"),
						metadata: p?.data?.fm,
					}) as {
						code: string;
						metadata: {
							title: string;
							image: string;
							date: Date;
						};
					},
			),
		),
	);

	// map all post's dates to new Date(date)

	postsRendered = postsRendered.map((p) => ({
		...p,
		metadata: {
			...p.metadata,
			date: new Date(p.metadata.date),
		},
	}));

	postsRendered = postsRendered.sort(
		(a, b) => b.metadata.date.getTime() - a.metadata.date.getTime(),
	);

	return new Response(
		`<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">

<channel>
    <title>pyro // engineering</title>
    <link>https://pyro.engineering</link>
    <description>Pyro develops gaming's most advanced software. We're makers at heart, and this is our story.</description>
    <language>en-us</language>
    <lastBuildDate>${postsRendered[0].metadata.date.toUTCString()}</lastBuildDate>
    <image>
        <url>https://pyro.engineering/favicon.ico</url>
        <title>pyro // engineering</title>
        <link>https://pyro.engineering</link>
    </image>
    ${postsRendered.map(
		(p) => `<item>
        <title>${p.metadata.title}</title>
        <link>https://pyro.engineering/posts/${titleToSlug(p.metadata.title)}</link>
        <description>${p.code.trim().split("\n")[0]}</description>
        <pubDate>${p.metadata.date.toUTCString()}</pubDate>
	</item>`,
	)}
    </channel>
</rss>`,
		{
			headers: {
				"Content-Type": "application/rss+xml",
			},
		},
	);
}
