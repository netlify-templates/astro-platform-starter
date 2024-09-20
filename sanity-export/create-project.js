const path = require('path');
const fse = require('fs-extra');
const { createClient } = require('@sanity/client');
const Configstore = require('configstore');

const config = new Configstore('sanity', {}, { globalConfigPath: true });
const token = process.env.SANITY_TOKEN || config.get('authToken');
const dataset = process.env.SANITY_DATASET || 'production';

async function createProject({ projectName, dataset, token }) {
    if (!token) {
        throw new Error(
            'no sanity token provided, either provide an API token via "SANITY_TOKEN" environment variable or login into sanity using sanity cli "sanity login"'
        );
    }
    if (!dataset) {
        throw new Error('no dataset provided');
    }

    const client = createClient({
        useProjectHostname: false,
        apiVersion: '2024-01-31',
        token: token,
        useCdn: false
    });

    console.log('creating a project...');
    const project = await client.request({
        url: '/projects',
        method: 'POST',
        body: {
            displayName: projectName
        }
    });

    console.log('created a project, projectId:', project.id);

    console.log('creating a dataset...');
    await client.request({
        url: `/projects/${project.id}/datasets/${dataset}`,
        method: 'PUT',
        body: {
            aclMode: 'public'
        }
    });
    console.log('created a dataset');

    console.log('replacing sanity project ID in sanity.cli.ts and sanity.config.ts files...');
    const studioDir = path.join(__dirname, '../studio');
    const cliFilePath = path.join(studioDir, 'sanity.cli.ts');
    const configFilePath = path.join(studioDir, 'sanity.config.ts');

    // Replace __SANITY_PROJECT_ID__ in sanity.cli.ts
    let cliFileContent = await fse.readFile(cliFilePath, 'utf8');
    cliFileContent = cliFileContent.replace(/__SANITY_PROJECT_ID__/g, project.id);
    await fse.writeFile(cliFilePath, cliFileContent, 'utf8');

    // Replace __SANITY_PROJECT_ID__ in sanity.config.ts
    let configFileContent = await fse.readFile(configFilePath, 'utf8');
    configFileContent = configFileContent.replace(/__SANITY_PROJECT_ID__/g, project.id);
    await fse.writeFile(configFilePath, configFileContent, 'utf8');

    console.log('replaced sanity project ID in sanity.cli.ts and sanity.config.ts files');
}

createProject({
    projectName: 'My Sanity Project',
    dataset,
    token
}).catch((error) => {
    console.error('failed to create new project', error);
});
