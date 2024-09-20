import { type FieldExtension } from '@stackbit/types';

export const commonFields: FieldExtension[] = [
    {
        name: 'background',
        controlType: 'button-group',
        options: [
            {
                label: 'Transparent',
                value: 'transparent'
            },
            {
                label: 'Light',
                value: 'light'
            },
            {
                label: 'Primary',
                value: 'primary'
            }
        ]
    }
];