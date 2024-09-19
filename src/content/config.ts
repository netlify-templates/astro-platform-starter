import { defineCollection, z } from 'astro:content';

const imageSchema = z.object({
    src: z.string().optional(),
    alt: z.string().optional()
});

const heroSchema = z.object({
    type: z.literal('hero'),
    background: z.enum(['none', 'light', 'primary']),
    layout: z.enum(['imgLeft', 'imgRight']),
    heading: z.string().optional(),
    body: z.string().optional(),
    image: imageSchema.optional(),
    button: z
        .object({
            type: z.string(),
            label: z.string().optional(),
            url: z.string().optional()
        })
        .optional()
});

const featuredItemsSchema = z.object({
    type: z.literal('featuredItems'),
    background: z.enum(['none', 'light', 'primary']),
    heading: z.string().optional(),
    body: z.string().optional(),
    items: z
        .array(
            z.object({
                heading: z.string().optional(),
                body: z.string().optional(),
                image: imageSchema.optional()
            })
        )
        .optional()
});

const quoteSchema = z.object({
    type: z.literal('quote'),
    background: z.enum(['none', 'light', 'primary']),
    quote: z.string().optional(),
    authorName: z.string().optional(),
    authorTitle: z.string().optional(),
    authorImage: imageSchema.optional()
});

const pages = defineCollection({
    schema: z.object({
        type: z.string(),
        title: z.string(),
        sections: z.array(z.union([heroSchema, featuredItemsSchema, quoteSchema])).optional()
    })
});

const blog = defineCollection({
    schema: z.object({
        type: z.string(),
        title: z.string(),
        date: z.coerce.date(),
        excerpt: z.string().optional(),
        image: imageSchema.optional(),
    })
});

export const collections = { pages, blog };
