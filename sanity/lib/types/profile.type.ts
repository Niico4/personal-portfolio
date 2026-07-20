import { PortableTextBlock } from '@portabletext/types';

export type ProfileInformationType = {
  contactInformation: ContactInformation;
  content: Content;
  techSkills: Skill[];
  education: EducationInformation[];
};

export type ContactInformation = {
  email: string;
  githubUrl: string;
  linkedinUrl: string;
  resume: Resume;
};

export type Resume = {
  externalUrl: string | null;
  fileUrl: string | null;
};

export type Content = {
  aboutMeDescription: PortableTextBlock[] | null;
  rightNowIAm: PortableTextBlock[] | null;
  isAvailable: boolean;
  professionalTitle: string;
  currentLocation: string;
};

export type Skill = {
  _key: string;
  iconKey: string;
  name: string;
};

export type EducationInformation = {
  id: string;
  displayOrder: number;
  isCurrentlyStudying: boolean;
  academicTitle: string;
  institutionName: string;
  startDate: Date;
  endDate: Date;
};
