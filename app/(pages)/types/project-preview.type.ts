import type { ProjectType } from '@/sanity/lib/types/project.type';

export interface ProjectPreviewType {
  project: Pick<ProjectType, 'title' | 'slug' | 'shortDescription'> & {
    media: Pick<ProjectType['media'], 'coverURL'>;
  };
}
