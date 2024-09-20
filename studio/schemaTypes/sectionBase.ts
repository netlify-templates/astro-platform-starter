import {defineField} from 'sanity'

export const SECTION_BASE_GROUPS = [
  {
    name: 'content',
    title: 'Content',
    default: true,
  },
  {
    name: 'styles',
    title: 'Styles',
  },
]

export const SECTION_BASE_FIELDS = [
  defineField({
    name: 'background',
    title: 'Background',
    description: 'The background of the section.',
    type: 'string',
    options: {
      list: [
        {title: 'Transparent', value: 'transparent'},
        {title: 'Light', value: 'light'},
        {title: 'Primary', value: 'primary'},
      ],
    },
    initialValue: 'transparent',
    group: 'styles',
  }),
]
