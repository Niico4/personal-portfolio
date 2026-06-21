import { PortableTextBlock } from '@portabletext/types';

import { ImageType } from './common.type';

export type EmploymentType = 'full-time' | 'part-time';

export type WorkExperienceInformationType = {
  id: string;
  display_order: number;
  organization_information: OrganizationInformation;
  job_information: JobInformation[];
};

export type JobInformation = {
  _key: string;
  employment_type: EmploymentType;
  is_current_job: boolean;
  job_icon_key: null | string;
  job_title: string;
  highlights: PortableTextBlock[] | null;
  skills: string[];
  start_date: string | Date;
  end_date: string | Date | null;
};

export type OrganizationInformation = {
  organization_logo: ImageType | null;
  organization_name: string;
};
