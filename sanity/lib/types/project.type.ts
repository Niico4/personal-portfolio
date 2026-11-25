import type { TechnologyType } from './technology';

export interface ProjectType {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  features: string[];
  technologies: TechnologyType[];
  media: ProjectMedia;
}

interface ProjectMedia {
  coverURL: string;
  iconURL: string | null;
  demoVideoURL: string | null;
  liveURL: string | null;
  repositoryURL: string | null;
  figmaURL: string | null;
}
