import { defineCollection, z } from 'astro:content';

const pages = defineCollection({
    schema: z.object({
        title: z.string()
    })
});

export const collections = { pages };
