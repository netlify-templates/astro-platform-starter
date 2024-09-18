import { type PageModel } from '@stackbit/types';

export const post: PageModel = {
    name: 'post',
    type: 'page',
    urlPath: '/blog/{slug}',
    filePath: 'src/content/blog/{slug}.md',
    fields: [
        { name: 'title', type: 'string', required: true, default: 'Post Title' },
        { name: 'date', type: 'date', required: true },
        { name: 'excerpt', type: 'string' },
        {
            name: 'image',
            type: 'object',
            fields: [
                { name: 'src', type: 'image', default: '/src/content/_images/corgi.jpg' },
                { name: 'alt', type: 'string' }
            ]
        },
    ]
};
