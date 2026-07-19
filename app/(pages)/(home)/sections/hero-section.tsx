import Image from 'next/image';
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconMailShare,
  IconPaperclip,
} from '@tabler/icons-react';
import { Divider } from '@heroui/divider';

import { Heading } from '@/components/common/heading';
import { getProfile } from '@/sanity/lib/fetchers/profile.fetcher';
import { PortableTextContent } from '@/components/common/portable-text-content';

const RESUME_FILE_NAME = 'nicolas-garzon-cv.pdf';

const HeroSection = async () => {
  const profile = await getProfile();
  if (!profile) return null;

  const {
    email,
    githubUrl,
    linkedinUrl,
    resume: { fileUrl, externalUrl },
  } = profile.contactInformation;

  const { aboutMeDescription, professionalTitle } = profile.content;

  const hasSanityResume = Boolean(fileUrl);

  const resumeHref = fileUrl
    ? `${fileUrl}?dl=${RESUME_FILE_NAME}`
    : externalUrl;

  const socialLinkBaseClassName = `
    flex items-center rounded-full px-2 py-1 gap-1
    font-medium text-xs border-1
    transition-[color,background-color,border-color,transform,box-shadow]
    duration-300 ease-out
    active:scale-[0.98]
    focus-visible:outline-none
    focus-visible:ring-2
    focus-visible:ring-offset-2
    focus-visible:ring-offset-main
    motion-reduce:transform-none
    motion-reduce:transition-none
  `;

  return (
    <section className="flex flex-col gap-5 items-center justify-center">
      <header className="flex w-full flex-col gap-5 pb-2 sm:flex-row sm:items-end">
        <div
          aria-hidden="true"
          className="relative size-32 shrink-0 overflow-hidden rounded-full backdrop-blur-sm border border-ink-800/70 bg-[#4c4c4c33] sm:size-48"
        >
          <Image
            src="/nico-avatar-tumbs-up.webp"
            alt=""
            fill
            preload
            draggable={false}
            className="translate-y-6 scale-[1.35] select-none object-cover object-top sm:translate-y-8"
          />
        </div>

        <div className="min-w-0 flex-1 pb-1">
          <div>
            <Heading className="text-[clamp(2.65rem,5vw,4.25rem)] leading-[0.95] tracking-[-0.045em]">
              Nicolás Garzón
            </Heading>

            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm sm:text-base">
              <p className="text-ink-100">{professionalTitle}</p>

              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-green-500 sm:text-sm">
                <span
                  aria-hidden="true"
                  className="size-1.5 rounded-full bg-current"
                />
                Disponible
              </span>
            </div>
          </div>

          <ul
            aria-label="Enlaces personales y de contacto"
            className="mt-5 flex flex-wrap items-center gap-2.5"
          >
            {resumeHref && (
              <li>
                <a
                  className={`${socialLinkBaseClassName} border-purple-800 bg-purple-900/15 text-purple-300 hover:border-purple-700 hover:bg-purple-900/25 focus-visible:ring-purple-400`}
                  href={resumeHref}
                  target={hasSanityResume ? undefined : '_blank'}
                  rel={hasSanityResume ? undefined : 'noopener noreferrer'}
                >
                  <IconPaperclip aria-hidden="true" stroke={1.5} size={16} />
                  Currículum
                </a>
              </li>
            )}

            {githubUrl && (
              <li>
                <a
                  className={`${socialLinkBaseClassName} border-ink-700 bg-ink-900/15 text-ink-100 hover:border-ink-600 hover:bg-ink-900/30 focus-visible:ring-ink-400`}
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IconBrandGithub aria-hidden="true" stroke={1.5} size={16} />
                  GitHub
                </a>
              </li>
            )}

            {linkedinUrl && (
              <li>
                <a
                  className={`${socialLinkBaseClassName} border-brand-800 bg-brand-900/15 text-brand-300 hover:border-brand-700 hover:bg-brand-900/25 focus-visible:ring-brand-400`}
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IconBrandLinkedin
                    aria-hidden="true"
                    stroke={1.5}
                    size={16}
                  />
                  LinkedIn
                </a>
              </li>
            )}

            {email && (
              <>
                <li
                  aria-hidden="true"
                  className="mx-1 hidden h-5 w-px bg-ink-800 sm:block"
                />

                <li>
                  <a
                    className={`${socialLinkBaseClassName} border-yellow-700 bg-yellow-900/25 text-yellow-300 hover:border-yellow-600 hover:bg-yellow-900/35 focus-visible:ring-yellow-400`}
                    href={`mailto:${email}`}
                  >
                    <IconMailShare aria-hidden="true" stroke={1.5} size={16} />
                    Escríbeme
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </header>

      <Divider aria-hidden="true" className="bg-ink-400/10" />

      <PortableTextContent
        className=" [&_a]:underline [&_a]:decoration-dotted [&_a]:decoration-1 [&_a]:underline-offset-4 [&_a]:transition-colors [&_a:hover]:text-ink-50"
        value={aboutMeDescription}
      />
    </section>
  );
};

export default HeroSection;
