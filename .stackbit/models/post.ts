import { type ModelExtension } from '@stackbit/types';

export const post: ModelExtension = {
    name: 'post',
    type: 'page',
    urlPath: '/blog/{slug}'
};
