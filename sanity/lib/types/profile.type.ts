export type ProfileInformationType = {
  id: string;
  contact_information: ContactInformation;
  content: Content;
  skills: Skill[];
  stats: Stat[];
};

export type ContactInformation = {
  email: string;
  github_url: string;
  linkedin_url: string;
  resume: Resume;
};

export type Resume = {
  external_url: string | null;
  file_url: string | null;
};

export type Content = {
  introduction: string;
  description: string;
  professional_title: string;
  current_location: string;
};

export type Skill = {
  _key: string;
  icon_key: string;
  name: string;
};

export type Stat = {
  _key: string;
  label: string;
  prefix: string;
  suffix: null;
  value: number;
};
