import 'server-only';

import { Client, LogLevel } from '@notionhq/client';

import { ServerEnvConfig } from '@/config/server-env.config';

import { NOTION_API_VERSION } from './wiki-contract';
import { WikiError } from './wiki-errors';

interface WikiNotionConfig {
  apiKey: string;
  notebooksDataSourceId: string;
  notesDataSourceId: string;
  topicsDataSourceId: string;
}

let notionClient: Client | undefined;

export const getWikiNotionConfig = (): WikiNotionConfig => {
  const {
    api_key: apiKey,
    notebooks_data_source_id: notebooksDataSourceId,
    notes_data_source_id: notesDataSourceId,
    topics_data_source_id: topicsDataSourceId,
  } = ServerEnvConfig.notion;

  if (
    !apiKey ||
    !notebooksDataSourceId ||
    !notesDataSourceId ||
    !topicsDataSourceId
  ) {
    throw new WikiError(
      'configuration',
      'The server is missing the private Notion Wiki configuration.',
    );
  }

  return {
    apiKey,
    notebooksDataSourceId,
    notesDataSourceId,
    topicsDataSourceId,
  };
};

export const getNotionClient = (): Client => {
  if (!notionClient) {
    const { apiKey } = getWikiNotionConfig();

    notionClient = new Client({
      auth: apiKey,
      notionVersion: NOTION_API_VERSION,
      logLevel: LogLevel.ERROR,
      logger: () => undefined,
      retry: {
        maxRetries: 2,
        initialRetryDelayMs: 1_000,
        maxRetryDelayMs: 10_000,
      },
    });
  }

  return notionClient;
};
