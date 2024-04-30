import { defineCollection, z } from 'astro:content';

const coreContentFields = {
    type: z.string(),
    heading:z.string().optional(),
    body:z.string().optional(),
    background: z.enum(['none', 'light', 'primary']),
  };

const pages = defineCollection({
    schema: z.object({
        title: z.string(),
        sections: z.array(z.object({
            ...coreContentFields,
            quote: z.string().optional(),
            authorName: z.string().optional(),
            authorTitle: z.string().optional(),
            image: z.object({
                src: z.string().optional(),
                alt: z.string().optional(),
            }).optional(),
            button: z.object({
                type: z.string(),
                label: z.string().optional(),
                url: z.string().optional(),
            }).optional(),
        }))
    })
});

export const collections = { pages };
