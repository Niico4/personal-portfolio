import type { PortableTextBlock } from '@portabletext/types';

import type { ImageType } from './common.type';

export type ProjectStatus =
  | 'published'
  | 'completed'
  | 'inDevelopment'
  | 'concept';

export interface Project {
  id: string;
  title: string;
  slug: string;
  status: ProjectStatus;
  preview: ProjectPreview;
  detail: ProjectDetail;
  technologies: string[];
  links: ProjectLinks;
}

export interface ProjectPreview {
  shortDescription: string;
  image: ImageType | null;
}

export interface ProjectDetail {
  demoVideoUrl: string | null;
  contentSections: ProjectContentSection[];
}

export interface ProjectContentSection {
  id: string;
  title: string;
  content: PortableTextBlock[];
}

export interface ProjectLinks {
  liveDemoUrl: string | null;
  repositoryUrl: string | null;
}
