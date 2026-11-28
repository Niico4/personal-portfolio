import type { Metadata } from 'next';

import { ProjectsView } from '@/components/views/projects';
import { createPageMetadata } from '@/utils/seo/create-page-metadata';

export const metadata: Metadata = createPageMetadata({
  title: 'Proyectos',
  description:
    'Algunas de las cosas que he diseñado, desarrollado y construido por mi cuenta.',
  path: '/projects',
});

export default function ProjectsPage() {
  return <ProjectsView />;
}
