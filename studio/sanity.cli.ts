import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: "projectId",
    dataset: 'production',
  },
})
