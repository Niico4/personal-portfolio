export const SANITY_TAGS = {
  home: 'home',
  profile: 'profile',
  projects: 'projects',
  project: 'project',
  workExperience: 'work-experience',
  education: 'education',
} as const;

export const getSanityFetchOptions = (tags: string[] = []) =>
  ({
    cache: 'force-cache',
    next: {
      revalidate: false,
      tags,
    },
  }) as const;
