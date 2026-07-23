import Image from 'next/image';
import { FC } from 'react';
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconMailShare,
  IconPaperclip,
} from '@tabler/icons-react';
import { Divider } from '@heroui/divider';

import { Heading } from '@/components/common/heading';
import { PortableTextContent } from '@/components/common/portable-text-content';
import { SocialChip } from '@/components/common/social-chip';
import {
  ProfileContact,
  ProfileOverview,
} from '@/sanity/lib/types/profile.type';

const RESUME_FILE_NAME = 'nicolas-garzon-cv.pdf';

interface Props {
  contact: ProfileContact;
  overview: ProfileOverview;
}

const HeroSection: FC<Props> = async ({ contact, overview }) => {
  const {
    email,
    githubUrl,
    linkedinUrl,
    resume: { fileUrl, externalUrl },
  } = contact;

  const { about, professionalTitle, isAvailableForOpportunities } = overview;

  const hasSanityResume = Boolean(fileUrl);

  const resumeHref = fileUrl
    ? `${fileUrl}?dl=${RESUME_FILE_NAME}`
    : externalUrl;

  return (
    <section
      id="hero-section"
      className="
        flex scroll-mt-24
        flex-col items-center
        justify-center gap-5
      "
    >
      <header className="flex w-full flex-col gap-5 pb-2 sm:flex-row sm:items-end">
        <div
          aria-hidden
          className="
            relative size-32 shrink-0
            overflow-hidden rounded-full
            border border-ink-800/70
            bg-[#4c4c4c33]
            backdrop-blur-sm
            sm:size-48
          "
        >
          <Image
            src="/nico-avatar-tumbs-up.webp"
            alt=""
            fill
            preload
            draggable={false}
            className="
              translate-y-6 scale-[1.35]
              select-none object-cover object-top
              sm:translate-y-8
            "
          />
        </div>

        <div className="min-w-0 flex-1 pb-1">
          <div>
            <Heading>Nicolás Garzón</Heading>

            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm sm:text-base">
              <p className="text-ink-100">{professionalTitle}</p>

              {isAvailableForOpportunities && (
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-green-500 sm:text-sm">
                  <span
                    aria-hidden
                    className="size-1.5 rounded-full bg-current"
                  />
                  Disponible
                </span>
              )}
            </div>
          </div>

          <ul
            aria-label="Enlaces personales y de contacto"
            className="mt-5 flex flex-wrap items-center gap-2.5"
          >
            {resumeHref && (
              <li>
                <SocialChip
                  href={resumeHref}
                  icon={IconPaperclip}
                  label="Currículum"
                  variant="resume"
                  isExternal={!hasSanityResume}
                />
              </li>
            )}

            {githubUrl && (
              <li>
                <SocialChip
                  href={githubUrl}
                  icon={IconBrandGithub}
                  label="GitHub"
                  variant="github"
                  isExternal
                />
              </li>
            )}

            {linkedinUrl && (
              <li>
                <SocialChip
                  href={linkedinUrl}
                  icon={IconBrandLinkedin}
                  label="LinkedIn"
                  variant="linkedin"
                  isExternal
                />
              </li>
            )}

            {email && (
              <>
                <li
                  aria-hidden
                  className="
                    mx-1 hidden h-5
                    w-px bg-ink-800
                    sm:block
                  "
                />

                <li>
                  <SocialChip
                    href={`mailto:${contact.email}?subject=${encodeURIComponent(
                      'Oportunidad laboral',
                    )}`}
                    icon={IconMailShare}
                    label="Escríbeme"
                    variant="email"
                  />
                </li>
              </>
            )}
          </ul>
        </div>
      </header>

      <Divider aria-hidden className="bg-ink-400/10" />

      <PortableTextContent
        value={about}
        className="
          [&_a]:underline
          [&_a]:decoration-dotted
          [&_a]:decoration-1
          [&_a]:transition-colors
          [&_a:hover]:text-ink-50
        "
      />
    </section>
  );
};

export default HeroSection;
