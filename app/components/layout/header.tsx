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
          preload
          className="object-cover object-top [mask-image:linear-gradient(to_bottom,rgb(8,10,15)_0%,rgb(8,10,15)_35%,rgba(8,10,15,0.55)_55%,rgba(8,10,15,0.1)_75%,transparent_100%)]"
        />
      </div>

      <section className="flex items-end gap-2 sm:gap-4">
        <div aria-hidden="true" className="relative size-28 sm:size-32">
          <Image
            src={AVATAR_IMAGE}
            alt=""
            fill
            preload
            className="rounded-full"
          />
        </div>

        <div className="flex flex-col gap-2">
          <article className="flex flex-col gap-0 ssm:gap-1">
            {isServicesPage ? (
              <h2
                className={`text-3xl sm:text-4xl text-zinc-200 ${poetsenOne.className}`}
              >
                Nicolás Garzón
              </h2>
            ) : (
              <h1
                className={`text-3xl sm:text-4xl text-zinc-200 ${poetsenOne.className}`}
              >
                Nicolás Garzón
              </h1>
            )}
            <p className="text-sm text-zinc-200 sm:text-base">
              {professionalTitle}
            </p>
          </article>

          {isServicesPage ? (
            <article className="flex items-center gap-3">
              <Link
                href="/"
                className="flex items-center gap-1 bg-brand-400/[0.06] border border-brand-400/[0.12] text-sm text-brand-400 font-medium pl-2.5 pr-2 py-1 rounded-full"
              >
                <span>Portfolio</span>
                <IconUser stroke={1.5} size={16} aria-hidden="true" />
              </Link>

              {email && (
                <a
                  href={contactEmailEncodedServices}
                  rel="noopener noreferrer"
                  target="_blank"
                  aria-label={ARIA_LABEL.email}
                  className="flex items-center gap-1 bg-gray-300/[0.06] border border-gray-300/[0.12] text-gray-400 p-[5px] rounded-full backdrop-blur-sm"
                >
                  <IconMailShare stroke={1.2} size={18} aria-hidden="true" />
                </a>
              )}

              {githubUrl && (
                <a
                  aria-label={ARIA_LABEL.github}
                  href={githubUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                  className="flex items-center gap-1 bg-gray-300/[0.06] border border-gray-300/[0.12] text-gray-400 p-[5px] rounded-full backdrop-blur-sm"
                >
                  <IconBrandGithub stroke={1.2} size={18} aria-hidden="true" />
                </a>
              )}

              {linkedinUrl && (
                <a
                  aria-label={ARIA_LABEL.linkedin}
                  href={linkedinUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                  className="flex items-center gap-1 bg-gray-300/[0.06] border border-gray-300/[0.12] text-gray-400 p-[5px] rounded-full backdrop-blur-sm"
                >
                  <IconBrandLinkedin
                    stroke={1.2}
                    size={18}
                    aria-hidden="true"
                  />
                </a>
              )}
            </article>
          ) : (
            <article className="flex items-center gap-3">
              <a
                href={contactEmailEncoded}
                rel="noopener noreferrer"
                target="_blank"
                className="flex items-center gap-1 bg-brand-400 text-sm text-brand-950 font-medium pl-2.5 pr-2 py-1 rounded-full"
              >
                <span>Escríbeme</span>
                <IconMailShare stroke={1.5} size={16} aria-hidden="true" />
              </a>

              {githubUrl && (
                <a
                  aria-label={ARIA_LABEL.github}
                  href={githubUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                  className="flex items-center gap-1 bg-gray-300/[0.06] border border-gray-300/[0.12] text-gray-400 p-[5px] rounded-full backdrop-blur-sm"
                >
                  <IconBrandGithub stroke={1.2} size={18} aria-hidden="true" />
                </a>
              )}

              {linkedinUrl && (
                <a
                  aria-label={ARIA_LABEL.linkedin}
                  href={linkedinUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                  className="flex items-center gap-1 bg-gray-300/[0.06] border border-gray-300/[0.12] text-gray-400 p-[5px] rounded-full backdrop-blur-sm"
                >
                  <IconBrandLinkedin
                    stroke={1.2}
                    size={18}
                    aria-hidden="true"
                  />
                </a>
              )}

              {resumeHref && (
                <a
                  aria-label={ARIA_LABEL.cv}
                  href={resumeHref}
                  rel={`${isResumeFile ? 'noopener noreferrer' : undefined}`}
                  target={`${isResumeFile ? '_blank' : undefined}`}
                  className="flex items-center gap-1 bg-gray-300/[0.06] border border-gray-300/[0.12] text-gray-400 p-[5px] rounded-full backdrop-blur-sm"
                >
                  <IconFileCv stroke={1.2} size={18} aria-hidden="true" />
                </a>
              )}
            </article>
          )}
        </div>
      </section>
    </header>
  );
};
