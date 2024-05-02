import { type PageModel } from '@stackbit/types';

export const page: PageModel = {
    name: 'page',
    type: 'page',
    hideContent: true,
    urlPath: '/{slug}',
    filePath: 'src/content/pages/{slug}.md',
    fields: [
        { name: 'title', type: 'string', required: true },
        { name: 'sections', type: 'list', items: { type: 'model', models: ['hero', 'featuredItems', 'quote'] } }
    ]
};
