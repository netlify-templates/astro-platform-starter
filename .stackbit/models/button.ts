import { ObjectModel } from '@stackbit/types';

export const button: ObjectModel = {
    type: 'object',
    name: 'button',
    label: 'Button',
    labelField: 'label',
    fields: [
        { name: 'label', type: 'string', default: 'Get Started' },
        { name: 'url', type: 'string', default: '/' },
    ]
};
