import type { TechnologyType } from './technology';

export interface SkillGroupType {
  id: string;
  name: string;
  technologies: TechnologyType[];
}
