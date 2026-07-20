import type { PortableTextBlock } from '@portabletext/types';

import type { ImageType } from './common.type';

type PortableTextValue = PortableTextBlock[] | null;
export interface WorkExperience {
  id: string;
  displayOrder: number;
  organization: WorkExperienceOrganization;
  positions: WorkExperiencePosition[];
}

export interface WorkExperienceOrganization {
  name: string;
  logo: ImageType | null;
}

export interface WorkExperiencePosition {
  id: string;
  title: string;
  startDate: string;
  endDate: string | null;
  isCurrent: boolean;
  highlights: PortableTextValue;
  toolsAndTechnologies: string[];
}
