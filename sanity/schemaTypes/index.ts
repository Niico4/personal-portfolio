import { type SchemaTypeDefinition } from 'sanity';

import { projectType } from './project';
import { workExperienceType } from './work-experience';
import { profileType } from './profile';
import { portableTextType } from './objects/portable-text';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [projectType, workExperienceType, profileType, portableTextType],
};
