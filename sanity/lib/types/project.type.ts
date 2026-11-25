import type { PortableTextBlock } from '@portabletext/types';

import type { SkillGroupType } from './skills';

export interface ProjectType {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  description: PortableTextBlock[];
  technologyGroups: SkillGroupType[];
  media: ProjectMedia;
}

interface ProjectMedia {
  coverURL: string;
  iconURL: string | null;
  demoVideoURL: string | null;
  gallery: GalleryImage[];
  liveUrl: string | null;
  repositoryUrl: string | null;
  figmaUrl: string | null;
}

interface GalleryImage {
  id: string;
  url: string;
  alt: string;
  caption: string | null;
  width: number;
  height: number;
}
