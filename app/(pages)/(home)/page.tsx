import {
  IconArrowRight,
  IconArrowUpRight,
  IconBrandGithub,
  IconBrandLinkedin,
  IconFileCv,
  IconMail,
} from '@tabler/icons-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Fragment } from 'react';

import { Header } from '@/(pages)/(home)/components/header';
import { PortableTextContent } from '@/components/common/portable-text-content';
import { ProjectCard } from '@/components/common/project-card';
import { Accordion } from '@/components/ui/accordion';
import { buttonVariants } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { SEO_CONFIG } from '@/config/seo.config';
import { cn } from '@/lib/utils';
import { getProfile } from '@/sanity/lib/fetchers/profile.fetcher';
import { getProjectList } from '@/sanity/lib/fetchers/project.fetcher';
import { getSkills } from '@/sanity/lib/fetchers/skills.fetcher';
import { getWorkExperience } from '@/sanity/lib/fetchers/work-experience.fetcher';
import { createPageMetadata } from '@/utils/seo/create-page-metadata';

import { LocalTime } from './components/local-time';
import { SkillGroup } from './components/skills-group';
import { WorkExperienceItem } from './components/work-experience-accordion';

export const metadata: Metadata = createPageMetadata({
  title: SEO_CONFIG.defaultTitle,
  description: SEO_CONFIG.defaultDescription,
  socialTitle: SEO_CONFIG.social.title,
  socialDescription: SEO_CONFIG.social.description,
  path: '/',
  absoluteTitle: true,
});

const ARIA_LABEL = {
  github: 'Ver mi perfil en GitHub',
  linkedin: 'Ver mi perfil en LinkedIn',
  cv: 'Ver mi currículum',
  email: 'Enviarme un correo electrónico',
} as const;

const socialLinkClassName = cn(
  buttonVariants({
    variant: 'outline',
    size: 'icon',
  }),
  'size-10 rounded-lg text-fg-secondary sm:size-11',
  'hover:text-fg-strong',
  'motion-safe:active:scale-95',
);

const socialIconClassName = 'size-5 sm:size-6';

const HomePage = async () => {
  const [
    { aboutMeDescription, contact, resume },
    projects,
    experiences,
    skills,
  ] = await Promise.all([
    getProfile(),
    getProjectList(),
    getWorkExperience(),
    getSkills(),
  ]);

  const { githubUrl, linkedinUrl, email } = contact;

  const contactEmailHref = email
    ? `mailto:${email}?subject=${encodeURIComponent('Hola, vi tu portafolio')}`
    : undefined;

  const resumeHref = resume.fileUrl
    ? `${resume.fileUrl}?dl=nicolas-garzon-cv.pdf`
    : resume.externalUrl;

  const isResumeFile = Boolean(resume.fileUrl);

  return (
    <div className="flex flex-col gap-16">
      <section className="flex flex-col gap-6">
        <Header />

        <PortableTextContent
          value={aboutMeDescription}
          className="text-sm leading-relaxed sm:text-base"
        />

        <div className="flex flex-col gap-3">
          <LocalTime />

          <nav aria-label="Enlaces de contacto">
            <ul className="flex flex-wrap items-center gap-2">
              {email && (
                <li>
                  <a
                    href={contactEmailHref}
                    aria-label="Enviar correo"
                    className={socialLinkClassName}
                  >
                    <IconMail
                      aria-hidden="true"
                      stroke={1.5}
                      className={socialIconClassName}
                    />
                  </a>
                </li>
              )}

              {githubUrl && (
                <li>
                  <a
                    href={githubUrl}
                    aria-label={ARIA_LABEL.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={socialLinkClassName}
                  >
                    <IconBrandGithub
                      aria-hidden="true"
                      stroke={1.5}
                      className={socialIconClassName}
                    />
                  </a>
                </li>
              )}

              {linkedinUrl && (
                <li>
                  <a
                    href={linkedinUrl}
                    aria-label={ARIA_LABEL.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={socialLinkClassName}
                  >
                    <IconBrandLinkedin
                      aria-hidden="true"
                      stroke={1.5}
                      className={socialIconClassName}
                    />
                  </a>
                </li>
              )}

              {resumeHref && (
                <li>
                  <a
                    href={resumeHref}
                    aria-label={
                      isResumeFile
                        ? 'Descargar mi currículum'
                        : 'Ver mi currículum'
                    }
                    target={!isResumeFile ? '_blank' : undefined}
                    rel={!isResumeFile ? 'noopener noreferrer' : undefined}
                    className={socialLinkClassName}
                  >
                    <IconFileCv
                      aria-hidden="true"
                      stroke={1.5}
                      className={socialIconClassName}
                    />
                  </a>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="flex items-start gap-1 font-display text-2xl tracking-wide text-fg-emphasis">
          Proyectos
          <span className="font-sans text-xs tracking-normal text-fg-muted tabular-nums">
            [{String(projects.length).padStart(2, '0')}]
          </span>
        </h2>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-5">
          {projects.slice(0, 2).map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        <Link
          href="/projects"
          className={cn(
            buttonVariants({
              variant: 'outline',
              size: 'sm',
            }),
            'group w-fit gap-2.5 self-center rounded-full px-3.5 text-fg-secondary',
          )}
        >
          Ver todos los proyectos
          <IconArrowRight
            aria-hidden="true"
            stroke={1.5}
            className="size-3.5 shrink-0 motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:translate-x-0.5"
          />
        </Link>
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="flex items-start gap-1 font-display text-2xl tracking-wide text-fg-emphasis">
          Experiencia
        </h2>

        <Accordion className="gap-5 [&:has([aria-expanded=true])_[aria-expanded=false]:not(:hover):not(:focus-visible)_[data-experience-summary]]:opacity-70">
          {experiences.map((experience) => (
            <WorkExperienceItem key={experience.id} experience={experience} />
          ))}
        </Accordion>
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="flex items-start gap-1 font-display text-2xl tracking-wide text-fg-emphasis">
          Tecnologías
        </h2>

        <div className="flex flex-col gap-3">
          {skills.map((group, index) => (
            <Fragment key={group.id}>
              {index > 0 && <Separator />}
              <SkillGroup group={group} />
            </Fragment>
          ))}
        </div>
      </section>

      {contactEmailHref && (
        <section
          aria-labelledby="contact-cta-title"
          className="flex flex-col items-center gap-5 py-8 text-center sm:py-10"
        >
          <div className="space-y-3">
            <h2
              id="contact-cta-title"
              className="text-xl font-medium tracking-tight text-balance text-fg-emphasis sm:text-2xl"
            >
              ¿Construimos algo juntos?
            </h2>

            <p className="mx-auto max-w-[42ch] text-sm leading-relaxed text-pretty text-fg-muted sm:text-base">
              Si tienes una idea, un proyecto o simplemente algo interesante de
              lo que hablar, escríbeme.
            </p>
          </div>

          <a
            href={contactEmailHref}
            className={cn(
              buttonVariants({
                variant: 'default',
                size: 'default',
              }),
              'group h-9 gap-3 rounded-full px-5 font-medium',
            )}
          >
            Hablemos
            <IconArrowUpRight
              aria-hidden="true"
              stroke={1.5}
              className="size-4 motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
            />
          </a>
        </section>
      )}

      {/* <Footer /> */}
    </div>
  );
};

export default HomePage;
