import type { Metadata } from 'next';
import { IconArrowUpRight } from '@tabler/icons-react';

import { getProfile } from '@/sanity/lib/fetchers/profile.fetcher';
import { createPageMetadata } from '@/utils/seo/create-page-metadata';
import { SectionLabel } from '@/components/atoms/common/section-label';
import { SectionIntro } from '@/components/molecules/common/section-intro';
import { happyMonkey } from '@/fonts';
import Signature from '@/components/atoms/common/signature';

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
    <main className="mx-auto flex flex-col gap-6">
      <Header
        contact={contact}
        professionalTitle={professionalTitle}
        isServicesPage
      />

      <section className="flex flex-col gap-1">
        <SectionLabel label="Servicios de desarrollo web" />

        <article className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <h1
              className={`text-2xl sm:text-3xl text-zinc-200 ${happyMonkey.className}`}
            >
              Desarrollo aplicaciones web a medida, de principio a fin
            </h1>

            <p className="text-zinc-400">
              Desarrollo aplicaciones web y sistemas de gestión, además de
              sitios web y landing pages cuando el proyecto lo necesita. Puedo
              encargarme desde definir el alcance hasta desarrollar la interfaz,
              la lógica y los datos.
            </p>
          </div>

          <a
            href={contactEmailEncoded}
            rel="noopener noreferrer"
            target="_blank"
            className="flex items-center gap-1 bg-brand-400 text-base text-brand-950 font-medium px-3 py-1 w-max rounded-full mb-2"
          >
            <span>Hablemos de tu proyecto</span>
            <IconArrowUpRight stroke={1.5} size={16} aria-hidden="true" />
          </a>
        </article>
      </section>

      <section className="flex flex-col gap-6">
        <SectionIntro
          title="Mis servicios web"
          description="Lo que puedo construir o ayudarte a seguir desarrollando, según el punto en el que esté tu proyecto."
        />

        <MyServicesContenSection />
      </section>

      <footer className="flex flex-col gap-3">
        <hr className="shrink-0 bg-zinc-900 border-none w-full h-[1px] my-2" />

        <div className="flex items-center justify-between">
          <Signature className="text-zinc-500" />

          <p className="text-xs text-zinc-500 sm:text-sm">
            © {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </main>
  );
};

export default ServicesPage;
