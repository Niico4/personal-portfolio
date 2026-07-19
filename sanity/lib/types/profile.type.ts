import { PortableTextBlock } from '@portabletext/types';

export type ProfileInformationType = {
  contactInformation: ContactInformation;
  content: Content;
  skills: Skill[];
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
  professionalTitle: string;
  currentLocation: string;
};

export type Skill = {
  _key: string;
  iconKey: string;
  name: string;
};
