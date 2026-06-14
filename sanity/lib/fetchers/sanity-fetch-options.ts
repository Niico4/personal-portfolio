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
    cache: 'no-store',
    next: {
      // revalidate: 60 * 60 * 24, -> for production
      tags,
    },
  }) as const;
