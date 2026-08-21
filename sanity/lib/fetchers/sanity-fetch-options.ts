// export const SANITY_TAGS = {
//   home: 'home',
//   profile: 'profile',
//   projects: 'projects',
//   project: 'project',
//   workExperience: 'work-experience',
//   education: 'education',
// } as const;

export const getSanityFetchOptions = () => ({
  next: {
    revalidate: 300,
  },
});
