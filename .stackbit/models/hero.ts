import { type ModelExtension } from '@stackbit/types';
import { commonFields } from './sectionCommon';

export const hero: ModelExtension = {
    name: 'hero',
    label: 'Hero',
    fields: [
        ...commonFields,
        {
            name: 'layout',
            controlType: 'button-group',
            options: [
                { label: 'Image Left', value: 'imgLeft' },
                { label: 'Image Right', value: 'imgRight' }
            ]
        }
    ]
};
