import { type ObjectModel } from '@stackbit/types';

export const quote: ObjectModel = {
    type: 'object',
    name: 'quote',
    label: 'Quote',
    labelField: 'quote',
    fieldGroups: [{ name: 'styles', label: 'Styles' }],
    fields: [
        { name: 'quote', type: 'text', required: true },
        { name: 'authorName', type: 'string' },
        { name: 'authorTitle', type: 'string' },
        {
            name: 'authorImage',
            type: 'object',
            fields: [
                { name: 'src', type: 'image', default: '/src/content/pages/_images/corgi-author.jpg' },
                { name: 'alt', type: 'string' }
            ]
        },
        {
            name: 'background',
            type: 'enum',
            controlType: 'button-group',
            options: [
                {
                    label: 'None',
                    value: 'none'
                },
                {
                    label: 'Light',
                    value: 'light'
                },
                {
                    label: 'Primary',
                    value: 'primary'
                }
            ],
            default: 'light',
            group: 'styles'
        }
    ]
};
