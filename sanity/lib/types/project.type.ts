export interface ProjectInformationType {
  id: string;
  display_order: number;
  is_in_development: boolean;
  title: string;
  slug: string;
  project_detail: ProjectDetail;
  project_information_preview: ProjectInformationPreview;
  technologies: string[];
  links: Links;
}

export interface Links {
  live_demo_url: null | string;
  repository_url: string;
}

export interface ProjectDetail {
  demo_video: DemoVideo | null;
  full_description: string;
  origin_description: string;
}

export interface DemoVideo {
  url: string;
}

export interface ProjectInformationPreview {
  image: Image | null;
  short_description: string;
}

export interface Image {
  alt: string;
  url: string;
}
