import { type ObjectModel } from '@stackbit/types';

export const featuredItems: ObjectModel = {
    type: 'object',
    name: 'featuredItems',
    label: 'Featured Items',
    labelField: 'heading',
    fieldGroups: [{ name: 'styles', label: 'Styles' }],
    fields: [
        { name: 'heading', type: 'string', default: 'This Is A Big Headline' },
        { name: 'body', type: 'markdown' },
        {
            name: 'items',
            type: 'list',
            items: {
                type: 'object',
                fields: [
                    { name: 'heading', type: 'string', default: 'Item Title' },
                    { name: 'body', type: 'markdown', default: 'Item text.' },
                    {
                        name: 'image',
                        type: 'object',
                        fields: [
                            { name: 'src', type: 'image', default: '/src/content/pages/_images/corgi-hero.jpg' },
                            { name: 'alt', type: 'string' }
                        ]
                    }
                ]
            }
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
