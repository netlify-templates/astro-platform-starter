import { createHighlighter } from 'shiki';

export const highlighterPromise = createHighlighter({
    langs: ['jsx', 'js'],
    themes: ['min-dark']
});
