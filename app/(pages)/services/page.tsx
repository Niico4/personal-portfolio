import type { Metadata } from 'next';
import { IconArrowUpRight } from '@tabler/icons-react';
import { Divider } from '@heroui/divider';
import { Button } from '@heroui/button';

import { getProfile } from '@/sanity/lib/fetchers/profile.fetcher';
import { createPageMetadata } from '@/utils/seo/create-page-metadata';

import HeroSection from './sections/hero-section';
import MyServicesSection from './sections/my-services-section';
import { WorkProcess } from './sections/work-process-section';

const SERVICES_DESCRIPTION =
  'Desarrollo aplicaciones web a medida, sistemas de gestión y MVPs con React, Next.js y Node.js para negocios que necesitan digitalizar procesos o lanzar un producto.';

export const metadata: Metadata = createPageMetadata({
  title: 'Desarrollo de aplicaciones web a medida',
  socialTitle: 'Desarrollo de aplicaciones web y sistemas a medida',
  description: SERVICES_DESCRIPTION,
  path: '/servicios',
  image: {
    url: '/seo/og-services-mockup.png',
    width: 1200,
    height: 630,
    alt: 'Servicios de desarrollo de aplicaciones web de Nicolás Garzón',
  },
});

const ServicesPage = async () => {
  const { contact } = await getProfile();
  return (
    <main className="mx-auto flex flex-col gap-6 sm:gap-7">
      <HeroSection email={contact.email} />

      <Divider aria-hidden className="bg-ink-400/10" />

      <MyServicesSection />

      <div className="flex flex-col">
        <WorkProcess />

        <footer>
          <div className="relative overflow-hidden border-b border-foreground/10 py-12 sm:py-16">
            <div
              aria-hidden="true"
              className="absolute left-1/3 top-1/2 size-72 -translate-y-1/2 rounded-full bg-brand-500/[0.08] blur-3xl"
            />

            <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-sm font-medium text-brand-100">
                  ¿Tienes un proyecto en mente?
                </p>

                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                  Hablemos de tu proyecto
                </h2>

                <p className="mt-4 max-w-xl leading-7 text-foreground/50">
                  Podemos comenzar revisando el problema, el alcance y lo que
                  tendría sentido construir como primera etapa.
                </p>
              </div>

              <Button
                as="a"
                href={`mailto:${contact.email}`}
                radius="full"
                endContent={
                  <IconArrowUpRight aria-hidden="true" size={18} stroke={1.8} />
                }
                className="w-fit shrink-0 bg-foreground px-5 font-medium text-background hover:bg-foreground-600"
              >
                Hablemos del proyecto
              </Button>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
};

export default ServicesPage;
