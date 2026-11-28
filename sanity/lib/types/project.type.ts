import type { PortableTextBlock } from '@portabletext/types';

import type { SkillGroupType } from './skills';

export interface ProjectImageSource {
  url: string;
  width: number;
  height: number;
}

export interface ProjectImage extends ProjectImageSource {
  id: string;
  alt: string;
  caption: string | null;
}

export interface DetailCover extends ProjectImageSource {
  crop: ImageCrop | null;
  alt: string | null;
  caption: string | null;
}

interface ProjectCoverMedia {
  coverURL: string | null;
  coverWidth: number | null;
  coverHeight: number | null;
  iconURL: string | null;
}

export interface ProjectListItem {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  media: ProjectCoverMedia;
}

interface ProjectMedia extends ProjectCoverMedia {
  demoVideoURL: string | null;
  gallery: ProjectImage[];
  liveUrl: string | null;
  repositoryUrl: string | null;
  figmaUrl: string | null;
}

export interface ProjectType extends ProjectListItem {
  description: PortableTextBlock[];
  technologyGroups: SkillGroupType[];
  media: ProjectMedia;
}

interface ImageCrop {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

interface DetailSectionBase {
  _key: string;
  title: string | null;
}

export interface DetailOverviewSection extends DetailSectionBase {
  _type: 'detailOverview';
}

export interface DetailTextSection extends DetailSectionBase {
  _type: 'detailText';
  body: PortableTextBlock[];
}

export interface DetailImageGroupSection extends DetailSectionBase {
  _type: 'detailImageGroup';
  images: ProjectImage[];
}

export interface DetailVideoSection extends DetailSectionBase {
  _type: 'detailVideo';
}

export interface DetailGallerySection extends DetailSectionBase {
  _type: 'detailGallery';
}

export interface DetailTechnologiesSection extends DetailSectionBase {
  _type: 'detailTechnologies';
}

export type DetailSection =
  | DetailOverviewSection
  | DetailTextSection
  | DetailImageGroupSection
  | DetailVideoSection
  | DetailGallerySection
  | DetailTechnologiesSection;

export interface ProjectDetailType extends ProjectType {
  detailCover: DetailCover | null;
  detailSections: DetailSection[];
}
