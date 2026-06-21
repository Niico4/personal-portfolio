/**
 * This configuration file lets you run `$ sanity [command]` in this folder
 * Go to https://www.sanity.io/docs/cli to learn more.
 **/
import { defineCliConfig } from 'sanity/cli';

import { PublicEnvConfig } from '@/config/public-env.config';

const projectId = PublicEnvConfig.sanity.project_id;
const dataset = PublicEnvConfig.sanity.dataset;

export default defineCliConfig({ api: { projectId, dataset } });
