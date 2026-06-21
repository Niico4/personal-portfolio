import Image from 'next/image';
import { IconMapPin, IconSchool } from '@tabler/icons-react';
import { Divider } from '@heroui/divider';

import { Heading } from '@/components/common/heading';
import { getProfile } from '@/sanity/lib/fetchers/profile.fetcher';
import { PortableTextContent } from '@/components/common/portable-text-content';

import { HeroContactCards } from '../components/hero-contact-cards';

const AVATAR = {
  tumbsUp: '/nico-avatar-tumbs-up.webp',
} as const;

const HeroSection = async () => {
  const profile = await getProfile();
  const resumeUrl =
    profile.contact_information.resume.file_url ??
    profile.contact_information.resume.external_url;

  const isSanityFile = Boolean(profile.contact_information.resume.file_url);

  const resumeHref = profile.contact_information.resume.file_url
    ? `${profile.contact_information.resume.file_url}?dl=nicolas-garzon-cv.pdf`
    : profile.contact_information.resume.external_url;

  if (!profile) return null;

  return (
    <section className="flex flex-col gap-8">
      <header className="mx-auto flex w-full max-w-2xl flex-col items-center gap-8 sm:gap-10 lg:max-w-6xl lg:flex-row lg:items-start lg:justify-between lg:gap-8">
        <div className="flex w-full justify-center lg:basis-[46%] lg:justify-end">
          <div className="relative aspect-square w-full max-w-[360px] overflow-hidden">
            <Image
              src={AVATAR.tumbsUp}
              alt="Avatar ilustrado de Nicolás"
              priority
              draggable={false}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="select-none object-contain"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-main via-main/90 to-transparent"
            />
          </div>
        </div>

        <div className="flex w-full max-w-[600px] flex-col gap-5 lg:basis-[54%]">
          <div className="space-y-4">
            <Heading>¡Hola!, soy Nicolás</Heading>

            <PortableTextContent
              value={profile.content.introduction}
              className="[&_p]:inline"
            />
          </div>

          <article className="flex flex-col gap-3 pt-1 md:items-start">
            <div className="flex items-center gap-3">
              <div className="flex size-8 items-center justify-center rounded-lg bg-ink-900 text-ink-300">
                <IconSchool stroke={1.5} size={20} />
              </div>

              <p className="text-ink-200">
                {profile.content.professional_title}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex size-8 items-center justify-center rounded-lg bg-ink-900 text-ink-300">
                <IconMapPin stroke={1.5} size={20} />
              </div>

              <p className="text-ink-200">{profile.content.current_location}</p>
            </div>
          </article>

          <Divider className="my-2 bg-ink-900/70" />

          <HeroContactCards
            resumeHref={resumeHref ?? null}
            resumeDisabled={!resumeUrl}
            isSanityFile={isSanityFile}
            linkedinUrl={profile.contact_information.linkedin_url}
            githubUrl={profile.contact_information.github_url}
            email={profile.contact_information.email}
          />
        </div>
      </header>
      <Divider className="bg-ink-900/70 mt-2" />
    </section>
  );
};

export default HeroSection;
