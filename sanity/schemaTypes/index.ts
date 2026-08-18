import { type SchemaTypeDefinition } from 'sanity';

import { projectType } from './project';
import { workExperienceType } from './work-experience';
import { profileType } from './profile';
import { portableTextType } from './objects/portable-text';
import { technologyType } from './technology';
import { projectStatusType } from './project-status';

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
