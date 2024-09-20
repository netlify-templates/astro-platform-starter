import { loadEnv } from 'vite';
import { createClient, type ClientConfig } from '@sanity/client';

const { SANITY_PROJECT_ID, SANITY_DATASET, SANITY_TOKEN, STACKBIT_PREVIEW, SANITY_PREVIEW_DRAFTS } = loadEnv(
    process.env.NODE_ENV || '',
    process.cwd(),
    ''
);
const isDev = import.meta.env.DEV;
const isDeployPreview = process.env.CONTEXT === 'deploy-preview';
const previewDrafts = STACKBIT_PREVIEW?.toLowerCase() === 'true' || SANITY_PREVIEW_DRAFTS?.toLowerCase() === 'true';

export const sanityConfig: ClientConfig = {
    projectId: SANITY_PROJECT_ID,
    dataset: SANITY_DATASET || 'production',
    useCdn: false,
    apiVersion: '2024-01-31',
    token: SANITY_TOKEN,
    perspective: isDev || isDeployPreview || previewDrafts ? 'previewDrafts' : 'published'
};

export const client = createClient(sanityConfig);