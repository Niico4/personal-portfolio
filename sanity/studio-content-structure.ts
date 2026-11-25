import {
  IconBriefcase,
  IconCode,
  IconLayersIntersect,
  IconLayoutList,
  IconUser,
} from '@tabler/icons-react';
import type { StructureResolver } from 'sanity/structure';

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

      S.documentTypeListItem('project').title('Projects').icon(IconCode),

      S.documentTypeListItem('workExperience')
        .title('Work Experience')
        .icon(IconBriefcase),

      S.listItem()
        .id('technologies')
        .title('Technologies')
        .icon(IconLayersIntersect)
        .child(
          S.list()
            .title('Technologies')
            .items([
              S.documentTypeListItem('technology')
                .title('Technology Catalog')
                .icon(IconCode),

              S.listItem()
                .id('skills')
                .title('Skill Groups')
                .icon(IconLayoutList)
                .schemaType('skills')
                .child(
                  S.document()
                    .id('skills')
                    .title('Skill Groups')
                    .schemaType('skills')
                    .documentId('skills'),
                ),
            ]),
        ),
    ]);
