import { type SchemaTypeDefinition } from 'sanity';

import { projectType } from './project';
import { workExperienceType } from './work-experience';
import { educationType } from './education';
import { profileType } from './profile';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [projectType, workExperienceType, educationType, profileType],
};
