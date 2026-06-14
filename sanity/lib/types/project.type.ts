import { ImageType } from './common.type';

export type ProjectInformationType = {
  id: string;
  display_order: number;
  is_in_development: boolean;
  title: string;
  slug: string;
  project_detail: ProjectDetail;
  project_information_preview: ProjectInformationPreview;
  technologies: string[];
  links: Links;
};

export type Links = {
  live_demo_url: string | null;
  repository_url: string | null;
};

export type ProjectDetail = {
  demo_video: DemoVideo | null;
  full_description: string;
  origin_description: string;
};

export type DemoVideo = {
  url: string;
};

export type ProjectInformationPreview = {
  image: ImageType | null;
  short_description: string;
};
