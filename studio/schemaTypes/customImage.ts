import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'customImage',
  title: 'Image',
  type: 'object',
  fields: [
    defineField({
      title: 'Image',
      name: 'image',
      type: 'image',
    }),
    defineField({
      name: 'alt',
      title: 'Alt text',
      description: 'The alt text is used in the "alt" attribute of the img tag',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      name: 'image.asset.originalFilename',
      media: 'image.asset',
    },
    prepare(selection) {
      return {
        title: selection.name,
        media: selection.media,
      }
    },
  },
})
