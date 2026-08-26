import Link from 'next/link';
import Image from 'next/image';
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconFileCv,
  IconMailShare,
  IconUser,
} from '@tabler/icons-react';

import { ProfileType } from '@/sanity/lib/types/profile.type';
import { poetsenOne } from '@/fonts';

const HERO_IMAGE = '/hero.webp';
const AVATAR_IMAGE = '/avatar-profile.webp';
const RESUME_FILE_NAME = 'nicolas-garzon-cv.pdf';

const ARIA_LABEL = {
  github: 'Ver mi perfil en GitHub',
  linkedin: 'Ver mi perfil en LinkedIn',
  cv: 'Descargar mi currículum',
  email: 'Enviarme un correo electrónico',
};

const SOCIAL_ACTION_CLASS_NAME =
  'group -my-[7px] -ml-3 grid size-11 items-center justify-items-end focus-visible:outline-none';

const SOCIAL_ACTION_VISUAL_CLASS_NAME =
  'grid size-[30px] place-items-center rounded-full border border-line/[0.12] bg-line/[0.06] text-content-muted backdrop-blur-sm transition-all duration-150 ease-out group-hover:border-line/20 group-hover:bg-line/10 group-hover:text-content-primary group-focus-visible:ring-1 group-focus-visible:ring-brand-400 group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-main group-active:translate-y-px group-active:border-line/25 group-active:bg-line/[0.12] motion-reduce:transform-none motion-reduce:transition-none';

export const Header = ({
  contact,
  professionalTitle,
  isServicesPage = false,
}: {
  contact: ProfileType['contact'];
  professionalTitle: string;
  isServicesPage?: boolean;
}) => {
  const {
    email,
    githubURL: githubUrl,
    linkedinURL: linkedinUrl,
    resume: { fileUrl, externalUrl },
  } = contact;

  const contactEmailEncoded = `mailto:${email}?subject=${encodeURIComponent(
    'Te escribo desde tu portfolio',
  )}`;

  const contactEmailEncodedServices = `mailto:${email}?subject=${encodeURIComponent(
    'Tengo un proyecto en mente',
  )}`;

  const resumeHref = fileUrl
    ? `${fileUrl}?dl=${RESUME_FILE_NAME}`
    : externalUrl;
  const isResumeFile = Boolean(fileUrl);

  return (
    <header id="header" className="flex w-full h-60">
      <div
        aria-hidden="true"
        className="absolute w-full h-60 inset-0 -z-10 [mask-image:linear-gradient(to_right,transparent_0%,rgba(0,0,0,0.1)_8%,rgba(0,0,0,0.55)_15%,black_25%,black_75%,rgba(0,0,0,0.55)_85%,rgba(0,0,0,0.1)_92%,transparent_100%)]"
      >
        <Image
          src={HERO_IMAGE}
          alt=""
          fill
          fetchPriority="high"
          loading="eager"
          sizes="(min-width: 1280px) 40vw, (min-width: 640px) 92vw, 100vw"
          className="object-cover object-top [mask-image:linear-gradient(to_bottom,rgb(8,10,15)_0%,rgb(8,10,15)_35%,rgba(8,10,15,0.55)_55%,rgba(8,10,15,0.1)_75%,transparent_100%)]"
        />
      </div>

      <section className="flex items-end gap-3 sm:gap-4">
        <div
          aria-hidden="true"
          className="relative size-[6.5rem] shrink-0 sm:size-[7.25rem]"
        >
          <Image
            src={AVATAR_IMAGE}
            alt=""
            fill
            fetchPriority="high"
            loading="eager"
            sizes="(min-width: 640px) 116px, 104px"
            className="rounded-full brightness-[0.92]"
          />
        </div>

        <div className="flex flex-col gap-2">
          <article className="flex flex-col gap-0 ssm:gap-1">
            {isServicesPage ? (
              <h2
                className={`text-3xl text-content-primary sm:text-4xl ${poetsenOne.className}`}
              >
                Nicolás Garzón
              </h2>
            ) : (
              <h1
                className={`text-3xl text-content-primary sm:text-4xl ${poetsenOne.className}`}
              >
                Nicolás Garzón
              </h1>
            )}
            <p className="text-sm text-content sm:text-base">
              {professionalTitle}
            </p>
          </article>

          {isServicesPage ? (
            <article className="flex items-center gap-3">
              <Link
                href="/"
                className="group -my-[7px] flex h-11 items-center focus-visible:outline-none"
              >
                <span className="flex items-center gap-1 rounded-full border border-brand-400/[0.12] bg-brand-400/[0.06] py-1 pl-2.5 pr-2 text-sm font-medium text-brand-400 transition-[color,background-color,border-color] duration-150 ease-out group-hover:border-brand-400/20 group-hover:bg-brand-400/10 group-focus-visible:ring-1 group-focus-visible:ring-brand-400 group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-main group-active:border-brand-400/25 group-active:bg-brand-400/15">
                  <span>Portfolio</span>
                  <IconUser stroke={1.5} size={16} aria-hidden="true" />
                </span>
              </Link>

              {email && (
                <a
                  href={contactEmailEncodedServices}
                  rel="noopener noreferrer"
                  target="_blank"
                  aria-label={ARIA_LABEL.email}
                  className={SOCIAL_ACTION_CLASS_NAME}
                >
                  <span className={SOCIAL_ACTION_VISUAL_CLASS_NAME}>
                    <IconMailShare stroke={1.2} size={18} aria-hidden="true" />
                  </span>
                </a>
              )}

              {githubUrl && (
                <a
                  aria-label={ARIA_LABEL.github}
                  href={githubUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                  className={SOCIAL_ACTION_CLASS_NAME}
                >
                  <span className={SOCIAL_ACTION_VISUAL_CLASS_NAME}>
                    <IconBrandGithub
                      stroke={1.2}
                      size={18}
                      aria-hidden="true"
                    />
                  </span>
                </a>
              )}

              {linkedinUrl && (
                <a
                  aria-label={ARIA_LABEL.linkedin}
                  href={linkedinUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                  className={SOCIAL_ACTION_CLASS_NAME}
                >
                  <span className={SOCIAL_ACTION_VISUAL_CLASS_NAME}>
                    <IconBrandLinkedin
                      stroke={1.2}
                      size={18}
                      aria-hidden="true"
                    />
                  </span>
                </a>
              )}
            </article>
          ) : (
            <article className="flex items-center gap-3">
              <a
                href={contactEmailEncoded}
                rel="noopener noreferrer"
                target="_blank"
                className="group -my-2 flex h-11 items-center focus-visible:outline-none"
              >
                <span className="flex items-center gap-1 rounded-full bg-brand-400 py-1 pl-2.5 pr-2 text-sm font-medium text-brand-950 transition-colors duration-150 ease-out group-hover:bg-brand-300 group-focus-visible:ring-1 group-focus-visible:ring-brand-400 group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-main group-active:bg-brand-500">
                  <span>Escríbeme</span>
                  <IconMailShare
                    stroke={1.5}
                    size={16}
                    aria-hidden="true"
                    className="transition-transform duration-150 ease-out group-hover:translate-x-px group-hover:-translate-y-px group-active:translate-x-0 group-active:translate-y-0"
                  />
                </span>
              </a>

              {githubUrl && (
                <a
                  aria-label={ARIA_LABEL.github}
                  href={githubUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                  className={SOCIAL_ACTION_CLASS_NAME}
                >
                  <span className={SOCIAL_ACTION_VISUAL_CLASS_NAME}>
                    <IconBrandGithub
                      stroke={1.2}
                      size={18}
                      aria-hidden="true"
                    />
                  </span>
                </a>
              )}

              {linkedinUrl && (
                <a
                  aria-label={ARIA_LABEL.linkedin}
                  href={linkedinUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                  className={SOCIAL_ACTION_CLASS_NAME}
                >
                  <span className={SOCIAL_ACTION_VISUAL_CLASS_NAME}>
                    <IconBrandLinkedin
                      stroke={1.2}
                      size={18}
                      aria-hidden="true"
                    />
                  </span>
                </a>
              )}

              {resumeHref && (
                <a
                  aria-label={ARIA_LABEL.cv}
                  href={resumeHref}
                  rel={isResumeFile ? 'noopener noreferrer' : undefined}
                  target={isResumeFile ? '_blank' : undefined}
                  className={SOCIAL_ACTION_CLASS_NAME}
                >
                  <span className={SOCIAL_ACTION_VISUAL_CLASS_NAME}>
                    <IconFileCv stroke={1.2} size={18} aria-hidden="true" />
                  </span>
                </a>
              )}
            </article>
          )}
        </div>
      </section>
    </header>
  );
};
