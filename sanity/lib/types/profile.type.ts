import type { PortableTextBlock } from '@portabletext/types';

export interface ProfileType {
  aboutMeDescription: PortableTextBlock[] | null;
  professionalTitle: string;
  contact: Contact;
  resume: Resume;
}

interface Contact {
  email: string;
  githubUrl: string | null;
  linkedinUrl: string | null;
}

interface Resume {
  fileUrl: string | null;
  externalUrl: string | null;
}
