export interface ProfileInformationType {
  id: string;
  contact_information: ContactInformation;
  content: Content;
  skills: Skill[];
  stats: Stat[];
}

export interface ContactInformation {
  email: string;
  github_url: string;
  linkedin_url: string;
  resume: Resume;
}

export interface Resume {
  external_url: string;
  file_url: null;
}

export interface Content {
  introduction: string;
  description: string;
  professional_title: string;
  current_location: string;
}

export interface Skill {
  _key: string;
  icon_key: string;
  name: string;
}

export interface Stat {
  _key: string;
  label: string;
  prefix: string;
  suffix: null;
  value: number;
}
