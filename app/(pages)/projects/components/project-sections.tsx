import type {
  DetailSection,
  ProjectDetailType,
} from '@/sanity/lib/types/project.type';

import { ProjectDetailSection } from './project-detail';

const fallbackSections = (project: ProjectDetailType): DetailSection[] => {
  const sections: DetailSection[] = [];

  if (project.description?.length) {
    sections.push({
      _key: 'fallback-overview',
      _type: 'detailOverview',
      title: null,
    });
  }

  if (project.media.demoVideoURL) {
    sections.push({
      _key: 'fallback-video',
      _type: 'detailVideo',
      title: null,
    });
  } else if (project.media.gallery.length > 0) {
    sections.push({
      _key: 'fallback-gallery',
      _type: 'detailGallery',
      title: null,
    });
  }

  if (
    project.technologyGroups.some(({ technologies }) => technologies.length > 0)
  ) {
    sections.push({
      _key: 'fallback-technologies',
      _type: 'detailTechnologies',
      title: null,
    });
  }

  return sections;
};

const resolveSections = (project: ProjectDetailType): DetailSection[] => {
  const sections = project.detailSections ?? [];
  const present = new Set(sections.map(({ _type }) => _type));

  return [
    ...sections,
    ...fallbackSections(project).filter(({ _type }) => !present.has(_type)),
  ];
};

export const ProjectSections = ({
  project,
}: {
  project: ProjectDetailType;
}) => (
  <>
    {resolveSections(project).map((section) => (
      <ProjectDetailSection
        key={section._key}
        section={section}
        project={project}
      />
    ))}
  </>
);
