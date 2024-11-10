import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import { getAuthor } from '../lib/constants/authors';

export async function GET(context: APIContext) {
  const posts = await getCollection('posts');
  return rss({
    title: 'Pyro Engineering',
    description: 'Pyro develops gaming’s most advanced software. We’re makers at heart, and this is our story.',
    site: context.site || 'https://pyro.engineering',
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      // Compute RSS link from post `slug`
      // This example assumes all posts are rendered as `/blog/[slug]` routes
      link: `/posts/${post.slug}/`,
      author: post.data.authors.map((author) => getAuthor(author).name).join(', '),
      content: post.data.description,
    })),
  });
}
