import { PortableTextBlock } from '@portabletext/types';

import { ImageType } from './common.type';

export type WorkExperienceInformationType = {
  id: string;
  displayOrder: number;
  organizationInformation: OrganizationInformation;
  jobInformation: JobInformation[];
};

export type JobInformation = {
  _key: string;
  isCurrentJob: boolean;
  jobTitle: string;
  highlights: PortableTextBlock[] | null;
  skills: string[];
  startDate: string | Date;
  endDate: string | Date | null;
};

export type OrganizationInformation = {
  organizationLogo: ImageType | null;
  organizationName: string;
};
