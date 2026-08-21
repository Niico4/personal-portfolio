import type { StructureResolver } from 'sanity/structure';
import {
  IconBriefcase,
  IconCode,
  IconList,
  IconMoodUnamused,
  IconProgress,
  IconUser,
} from '@tabler/icons-react';

export const structure: StructureResolver = (S) =>
  S.list()
    .title('nicoo 🐐')
    .items([
      S.listItem()
        .id('profile')
        .title('Profile')
        .icon(IconUser)
        .schemaType('profile')
        .child(
          S.document()
            .id('profile')
            .title('Profile')
            .schemaType('profile')
            .documentId('profile'),
        ),

      S.listItem()
        .id('projects')
        .title('Projects')
        .icon(IconCode)
        .child(
          S.list()
            .title('Projects')
            .items([
              S.documentTypeListItem('project')
                .title('All Projects')
                .icon(IconList),

              S.documentTypeListItem('projectStatus')
                .title('Statuses')
                .icon(IconProgress),

              S.documentTypeListItem('technology')
                .title('My Technologies')
                .icon(IconMoodUnamused),
            ]),
        ),

      S.documentTypeListItem('workExperience')
        .title('Work Experience')
        .icon(IconBriefcase),
    ]);
