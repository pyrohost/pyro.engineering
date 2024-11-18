import { defineCollection, z } from 'astro:content';

const postSchema = z.object({
	title: z.string(),
	authors: z.array(z.string()),
	image: z.string(),
	description: z.string().optional(),
	date: z.string().transform((str) => new Date(str)),
	draft: z.boolean().optional(),
})

const posts = defineCollection({
	type: 'content',
	// Type-check frontmatter using a schema
	schema: postSchema
});

const authorSchema = z.object({
	name: z.string(),
	image: z.string(),
	category: z.enum([
		'c', 'frontend', 'backend'
	]).optional(),
	description: z.string().optional(),
	position: z.string().optional(),
	socials: z.any().optional(),
})

const authors = defineCollection({
	type: 'data',
	schema: authorSchema
});

// export interface Post extends z.infer<typeof postSchema>{}
// export interface Author extends z.infer<typeof authorSchema>{}
export type Author = z.infer<typeof authorSchema>;
export type Post = z.infer<typeof postSchema>;

export const collections = { posts, authors };
