import type { SchemaTypeDefinition } from 'sanity';

import { richText } from './objects/rich-text';
import { profileType } from './profile';
import { projectType } from './project';
import { skillsType } from './skills';
import { technologyType } from './technology';
import { workExperienceType } from './work-experience';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    projectType,
    workExperienceType,
    profileType,
    skillsType,
    richText,
    technologyType,
  ],
};
