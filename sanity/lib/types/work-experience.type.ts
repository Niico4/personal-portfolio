export type EmploymentType = 'full-time' | 'part-time';

export interface WorkExperienceInformationType {
  id: string;
  display_order: number;
  organization_information: OrganizationInformation;
  job_information: JobInformation[];
}

export interface JobInformation {
  _key: string;
  employment_type: EmploymentType;
  is_current_job: boolean;
  job_icon_key: null | string;
  job_title: string;
  highlights: string[];
  skills: string[];
  start_date: Date;
  end_date: Date;
}

export interface OrganizationInformation {
  organization_logo: OrganizationLogo | null;
  organization_name: string;
}

export interface OrganizationLogo {
  alt: string;
  url: string;
}
