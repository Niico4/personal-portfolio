import type { Metadata } from 'next';
import { IconArrowUpRight } from '@tabler/icons-react';

import { getProfile } from '@/sanity/lib/fetchers/profile.fetcher';
import { createPageMetadata } from '@/utils/seo/create-page-metadata';
import { SectionLabel } from '@/components/atoms/common/section-label';
import { SectionIntro } from '@/components/molecules/common/section-intro';
import Signature from '@/components/atoms/common/signature';
import { Heading } from '@/components/atoms/common/heading';

import { Header } from '../../components/layout/header';

import { MyServicesContenSection } from './sections/services-content-section';

export const metadata: Metadata = createPageMetadata({
  title: 'Desarrollo de aplicaciones web a medida',
  socialTitle: 'Desarrollo de aplicaciones web y sistemas a medida',
  description:
    'Desarrollo aplicaciones web a medida, sistemas de gestión, MVPs, sitios web y landing pages según lo que necesite cada proyecto.',
  path: '/services',
  image: {
    url: '/seo/og-image-services.png',
    width: 1200,
    height: 630,
    alt: 'Servicios de desarrollo de aplicaciones web de Nicolás Garzón',
  },
});

const ServicesPage = async () => {
  const { contact, professionalTitle } = await getProfile();

  const contactEmailEncoded = `mailto:${contact.email}?subject=${encodeURIComponent(
    'Tengo un proyecto en mente',
  )}`;
  return (
    <main className="mx-auto flex flex-col gap-y-12 sm:gap-y-16">
      <div className="flex flex-col gap-6">
        <Header
          contact={contact}
          professionalTitle={professionalTitle}
          isServicesPage
        />

        <section className="flex flex-col gap-1">
          <SectionLabel label="Servicios de desarrollo web" />

          <article className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <Heading as="h1">
                Desarrollo aplicaciones web a medida, de principio a fin
              </Heading>

              <p className="text-content">
                Desarrollo aplicaciones web y sistemas de gestión, además de
                sitios web y landing pages cuando el proyecto lo necesita. Puedo
                encargarme desde definir el alcance hasta desarrollar la
                interfaz, la lógica y los datos.
              </p>
            </div>

            <a
              href={contactEmailEncoded}
              rel="noopener noreferrer"
              target="_blank"
              className="group -mt-1.5 mb-0.5 flex h-11 w-max items-center focus-visible:outline-none"
            >
              <span className="flex items-center gap-1 rounded-full bg-brand-400 px-3 py-1 text-base font-medium text-brand-950 transition-colors duration-150 ease-out group-hover:bg-brand-300 group-focus-visible:ring-1 group-focus-visible:ring-brand-400 group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-main group-active:bg-brand-500">
                <span>Hablemos de tu proyecto</span>
                <IconArrowUpRight
                  stroke={1.5}
                  size={16}
                  aria-hidden="true"
                  className="transition-transform duration-150 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-active:translate-x-0 group-active:translate-y-0 motion-reduce:transform-none"
                />
              </span>
            </a>
          </article>
        </section>
      </div>

      <section className="flex flex-col gap-6">
        <SectionIntro
          title="Mis servicios web"
          description="Lo que puedo construir o ayudarte a seguir desarrollando, según el punto en el que esté tu proyecto."
        />

        <MyServicesContenSection />
      </section>

      <footer className="flex flex-col gap-3 border-t border-line/10 pt-6">
        <div className="flex items-center justify-between">
          <Signature className="text-content-muted" />

          <p className="text-xs text-content-muted sm:text-sm">
            © {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </main>
  );
};

export default ServicesPage;
