import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getCollection } from "astro:content";

export async function GET(context: APIContext) {
  const posts = await getCollection("posts");
  const authors = await getCollection("authors");
  return rss({
    title: "Pyro Engineering",
    description:
      "Pyro develops gaming's most advanced software. We're makers at heart, and this is our story.",
    site: context.site || "https://pyro.engineering",
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: `/posts/${post.slug}/`,
      author: post.data.authors
        .map((author) => {
          return authors.filter((a) => a.data.name === author)[0].data.name;
        })
        .join(", "),
      content: post.data.description,
    })),
  });
}
