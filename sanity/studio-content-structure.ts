import type { StructureResolver } from 'sanity/structure';
import {
  IconBriefcase,
  IconHome2,
  IconRocket,
  IconSchool,
  IconUserCircle,
} from '@tabler/icons-react';

import StudioWelcome from './components/studio-welcome';

export const structure: StructureResolver = (S) =>
  S.list()
    .title('The Goat 🐐')
    .items([
      S.listItem()
        .id('welcome')
        .title('Welcome')
        .icon(IconHome2)
        .child(S.component(StudioWelcome).title('Welcome')),

      S.divider(),

      S.listItem()
        .id('profile')
        .title('Profile')
        .icon(IconUserCircle)
        .schemaType('profile')
        .child(
          S.document()
            .id('profile')
            .title('Profile')
            .schemaType('profile')
            .documentId('profile'),
        ),

      S.divider(),

      S.documentTypeListItem('project').title('Projects').icon(IconRocket),

      S.documentTypeListItem('workExperience')
        .title('Work Experience')
        .icon(IconBriefcase),

      S.documentTypeListItem('education').title('Education').icon(IconSchool),
    ]);
