import { type ObjectModel } from '@stackbit/types';

export const hero: ObjectModel = {
    type: 'object',
    name: 'hero',
    label: 'Hero',
    labelField: 'heading',
    fieldGroups: [{ name: 'styles', label: 'Styles' }],
    fields: [
        { name: 'heading', type: 'string', default: 'This Is A Big Hero Headline' },
        { name: 'body', type: 'markdown' },
        {
            name: 'image',
            type: 'object',
            fields: [
                { name: 'src', type: 'image', default: '/src/content/_images/corgi-hero.jpg' },
                { name: 'alt', type: 'string' }
            ]
        },
        { name: 'button', type: 'model', models: ['button'] },
        {
            name: 'layout',
            type: 'enum',
            controlType: 'button-group',
            options: [
                { label: 'Image Left', value: 'imgLeft' },
                { label: 'Image Right', value: 'imgRight' }
            ],
            default: 'imgRight',
            group: 'styles'
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
            default: 'primary',
            group: 'styles'
        }
    ]
};
