import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'featuredItem',
  title: 'Featured Item',
  type: 'object',
  groups: [
    {
      name: 'content',
      title: 'Content',
      default: true,
    }
  ],
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'markdown',
      group: 'content',
    }),
    defineField({
      name: 'cta',
      title: 'Call-to-action',
      type: 'button',
      group: 'content',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'customImage',
      group: 'content',
    }),
  ],
  preview: {
    select: {
      heading: 'heading',
      body: 'body',
    },
    prepare(selection) {
      return {
        title: `${selection.heading || selection.body || ''}`,
      }
    },
  },
})
