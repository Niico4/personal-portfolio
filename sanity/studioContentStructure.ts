import type { StructureResolver } from 'sanity/structure';
import {
  IconBriefcase,
  IconRocket,
  IconSchool,
  IconUserCircle,
} from '@tabler/icons-react';

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Portfolio CMS')
    .items([
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
