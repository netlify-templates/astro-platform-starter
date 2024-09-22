import {defineField, defineType} from 'sanity'
import {ComposeIcon} from '@sanity/icons'

export default defineType({
  name: 'post',
  title: 'Post',
  description: 'A blog post',
  type: 'document',
  icon: ComposeIcon,
  groups: [
    {
      name: 'content',
      title: 'Content',
      default: true,
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      description: 'Should not contain a leading slash and must contain a trailing slash.',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      title: 'Publish date',
      name: 'publishDate',
      type: 'datetime',
      options: {
        dateFormat: 'MMMM D, YYYY',
        timeFormat: 'k:mma',
      },
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{type: 'person'}],
      group: 'content',
    }),
    defineField({
      name: 'excerpt',
      title: 'excerpt',
      type: 'markdown',
      group: 'content',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'markdown',
      group: 'content',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      description: '(Optional) Used as the thumbnail and hero image for the blog post.',
      type: 'customImage',
      group: 'content',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'image.image.asset',
    },
    prepare(selection) {
      const {author} = selection
      return {...selection, subtitle: author && `by ${author}`}
    },
  },
})
