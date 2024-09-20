import {defineField, defineType} from 'sanity'
import {UserIcon} from '@sanity/icons'

export default defineType({
  name: 'person',
  title: 'Person',
  type: 'document',
  icon: UserIcon,
  groups: [
    {
      name: 'content',
      title: 'Content',
      default: true,
    },
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
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
      name: 'name',
      title: 'title',
      media: 'image.image.asset',
    },
    prepare(selection) {
      return {
        title: selection.name,
        subtitle: selection.title,
        media: selection.media,
      }
    },
  },
})
