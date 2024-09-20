import {defineField, defineType} from 'sanity'
import {SquareIcon} from '@sanity/icons'
import {SECTION_BASE_FIELDS, SECTION_BASE_GROUPS} from './sectionBase'

export default defineType({
  name: 'hero',
  title: 'Hero',
  type: 'object',
  icon: SquareIcon,
  groups: SECTION_BASE_GROUPS,
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
    ...SECTION_BASE_FIELDS,
    defineField({
      name: 'layout',
      title: 'Layout',
      description: 'The layout of the section.',
      type: 'string',
      options: {
        list: [
          {title: 'Image Left', value: 'imgLeft'},
          {title: 'Image Right', value: 'imgRight'},
        ],
      },
      initialValue: 'imgRight',
      group: 'styles',
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
        subtitle: 'Hero',
      }
    },
  },
})
