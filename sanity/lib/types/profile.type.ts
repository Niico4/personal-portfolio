import type { PortableTextBlock } from '@portabletext/types';

import { EducationStatusType } from '@/sanity/schemaTypes/profile';

export interface ProfileType {
  aboutMe: PortableTextBlock[] | null;
  professionalTitle: string;
  contact: Contact;
  education: EducationItemType[];
}

interface Contact {
  email: string;
  githubURL: string | null;
  linkedinURL: string | null;
  resume: Resume;
}

interface Resume {
  fileUrl: string | null;
  externalUrl: string | null;
}

interface EducationItemType {
  id: string;
  academicTitle: string;
  institutionName: null | string;
  status: EducationStatusType;
  startDate: string;
  endDate: string | null;
  details: string;
}
