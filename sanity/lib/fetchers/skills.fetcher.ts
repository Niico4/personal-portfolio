import 'server-only';

import { SANITY_TAGS, sanityFetch } from '../client';
import { SKILLS_QUERY } from '../queries/skills.query';
import type { SkillGroupType } from '../types/skills';

export const getSkills = (): Promise<SkillGroupType[]> => {
  return sanityFetch({
    query: SKILLS_QUERY,
    tags: [SANITY_TAGS.skills, SANITY_TAGS.technology],
  });
};
