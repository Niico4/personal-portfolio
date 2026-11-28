import type { Metadata } from 'next';

import { HomeView } from '@/components/views/home';
import { SEO_CONFIG } from '@/config/seo.config';
import { createPageMetadata } from '@/utils/seo/create-page-metadata';

export const metadata: Metadata = createPageMetadata({
  title: SEO_CONFIG.defaultTitle,
  description: SEO_CONFIG.defaultDescription,
  socialTitle: SEO_CONFIG.social.title,
  socialDescription: SEO_CONFIG.social.description,
  path: '/',
  absoluteTitle: true,
});

export default function HomePage() {
  return <HomeView />;
}
