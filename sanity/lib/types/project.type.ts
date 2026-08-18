interface NamedReference {
  id: string;
  name: string;
}

export interface ProjectType {
  id: string;
  title: string;
  slug: string;
  status: Status;
  shortDescription: string;
  description: string;
  features: string[];
  technologies: NamedReference[];
  links: ProjectLinks;
}

interface Status extends NamedReference {
  value: string;
}

interface ProjectLinks {
  demoVideo: string | null;
  liveURL: string | null;
  repositoryURL: string | null;
}
