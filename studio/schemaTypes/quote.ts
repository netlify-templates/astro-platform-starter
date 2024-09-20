import {defineField, defineType} from 'sanity'
import {BlockquoteIcon} from '@sanity/icons'
import {SECTION_BASE_FIELDS, SECTION_BASE_GROUPS} from './sectionBase'

export default defineType({
  name: 'quote',
  title: 'Quote',
  type: 'object',
  icon: BlockquoteIcon,
  groups: SECTION_BASE_GROUPS,
  fields: [
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'markdown',
      group: 'content',
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{type: 'person'}],
      group: 'content',
    }),
    ...SECTION_BASE_FIELDS,
  ],
  preview: {
    select: {
      quote: 'quote',
    },
    prepare(selection) {
      return {
        title: selection.quote,
        subtitle: 'Quote',
      }
    },
  },
})
