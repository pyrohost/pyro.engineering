import { defineCollection, z } from 'astro:content';

const postSchema = z.object({
	title: z.string(),
	date: z.string().transform((str) => new Date(str)),
	authors: z.array(z.string()),
	image: z.string(),
})

const posts = defineCollection({
	type: 'content',
	// Type-check frontmatter using a schema
	schema: postSchema
});

export interface posts extends z.infer<typeof postSchema>{}

export const collections = { posts };
