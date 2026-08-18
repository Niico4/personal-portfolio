import Image from 'next/image';
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconFileCv,
  IconMailShare,
} from '@tabler/icons-react';

import { Heading } from '@/components/atoms/common/heading';
import { ProfileType } from '@/sanity/lib/types/profile.type';

const HERO_IMAGE = '/hero-img.webp';
const AVATAR_IMAGE = '/avatar-profile.webp';
const RESUME_FILE_NAME = 'nicolas-garzon-cv.pdf';

const ARIA_LABEL = {
  github: 'Ver mi perfil en GitHub',
  linkedin: 'Ver mi perfil en LinkedIn',
  cv: 'Descargar mi currículum',
};

export const Header = ({
  contact,
  professionalTitle,
}: {
  contact: ProfileType['contact'];
  professionalTitle: string;
}) => {
  const {
    email,
    githubURL: githubUrl,
    linkedinURL: linkedinUrl,
    resume: { fileUrl, externalUrl },
  } = contact;

  const contactEmailEncoded = `mailto:${email}?subject=${encodeURIComponent(
    'Oportunidad laboral',
  )}`;

  const resumeHref = fileUrl
    ? `${fileUrl}?dl=${RESUME_FILE_NAME}`
    : externalUrl;
  const isResumeFile = Boolean(fileUrl);

  return (
    <header className="flex w-full h-60">
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
          <article className="flex flex-col gap-0 sm:gap-1">
            <Heading>Nicolás Garzón</Heading>
            <p className="text-sm text-zinc-200 sm:text-base">
              {professionalTitle}
            </p>
          </article>

          <article className="flex items-center gap-3">
            <a
              href={contactEmailEncoded}
              rel="noopener noreferrer"
              target="_blank"
              className="flex items-center gap-1 bg-brand-400 text-sm text-brand-950 font-medium px-2 py-1 rounded-full"
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
                <IconBrandLinkedin stroke={1.2} size={18} aria-hidden="true" />
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
        </div>
      </section>
    </header>
  );
};
