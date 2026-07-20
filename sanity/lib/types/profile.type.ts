import type { PortableTextBlock } from '@portabletext/types';

type PortableTextValue = PortableTextBlock[] | null;

export interface ProfileInformation {
  overview: ProfileOverview;
  contact: ProfileContact;
  skills: ProfileSkill[];
  education: EducationItem[];
}

export interface ProfileOverview {
  about: PortableTextValue;
  professionalTitle: string;
  location: string | null;
  currentFocus: PortableTextValue;
  isAvailableForOpportunities: boolean;
}

export interface ProfileContact {
  email: string;
  githubUrl: string | null;
  linkedinUrl: string | null;
  resume: Resume;
}

export interface Resume {
  fileUrl: string | null;
  externalUrl: string | null;
}

export interface ProfileSkill {
  id: string;
  name: string;
  iconKey: string | null;
}

export interface EducationItem {
  id: string;
  programName: string;
  institutionName: string;
  startDate: string;
  endDate: string | null;
  isInProgress: boolean;
}
