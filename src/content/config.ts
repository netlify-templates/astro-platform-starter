import { defineCollection, z } from 'astro:content';

const pageCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    subheading: z.string().optional(),
  }),
});

export const collections = {
  page: pageCollection,
};
