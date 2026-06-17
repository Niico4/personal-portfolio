import Image from 'next/image';
import { IconMapPin, IconSchool } from '@tabler/icons-react';
import { Divider } from '@heroui/divider';

import { Heading } from '@/components/common/heading';
import { getProfile } from '@/sanity/lib/fetchers/profile.fetcher';

import { HeroContactCards } from './hero-contact-cards';

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
    <section className="flex flex-col gap-5">
      <header className="mx-auto grid grid-cols-[0.95fr_1.05fr] items-center gap-20">
        <div className="relative mx-auto flex w-full h-full justify-center overflow-hidden">
          <Image
            src={AVATAR.tumbsUp}
            alt="Avatar ilustrado de Nicolás"
            priority
            draggable={false}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="select-none object-contain h-auto w-full aspect-square"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-main via-main/90 to-transparent"
          />
        </div>

        <div className="flex max-w-[530px] flex-col gap-5">
          <div className="space-y-4">
            <Heading>¡Hola!, soy Nicolás</Heading>

            <p className="max-w-[500px]">{profile.content.introduction}</p>
          </div>

          <article className="flex flex-col gap-3 pt-1">
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
