import type { SchemaTypeDefinition } from 'sanity';

import { portableTextType } from './objects/portable-text';
import { profileType } from './profile';
import { projectType } from './project';
import { projectStatusType } from './project-status';
import { technologyType } from './technology';
import { workExperienceType } from './work-experience';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    projectType,
    projectStatusType,
    workExperienceType,
    profileType,
    portableTextType,
    technologyType,
  ],
};
