import { PortableText } from '@portabletext/react';
import {
  IconArrowRight,
  IconArrowUpRight,
  IconDownload,
  IconMail,
} from '@tabler/icons-react';
import Link from 'next/link';

import { Header } from '@/(pages)/(home)/components/header';
import inspector from '@/(pages)/(home)/components/inspector/inspector.module.css';
import { WorkExperienceItem } from '@/(pages)/(home)/components/work-experience-accordion';
import { Accordion } from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import { getProfile } from '@/sanity/lib/fetchers/profile.fetcher';
import { getProjectList } from '@/sanity/lib/fetchers/project.fetcher';
import { getSkills } from '@/sanity/lib/fetchers/skills.fetcher';
import { getWorkExperience } from '@/sanity/lib/fetchers/work-experience.fetcher';

import { InspectorTrigger } from '../../(pages)/(home)/components/inspector/inspector-trigger';
import { ProjectCard } from '../../(pages)/(home)/components/project-card';
import { Toolbox } from '../../(pages)/(home)/components/toolbox';

export const HomeView = async () => {
  const [profile, projects, jobs, groups] = await Promise.all([
    getProfile(),
    getProjectList(),
    getWorkExperience(),
    getSkills(),
  ]);

  const { email, githubUrl, linkedinUrl } = profile.contact;
  const { externalUrl, fileUrl } = profile.resume;

  const isResumeFile = Boolean(fileUrl);

  const resumeHref = fileUrl
    ? `${fileUrl}?dl=nicolas-garzon-cv.pdf`
    : externalUrl;

  const contactLinkClassName =
    'flex min-h-11 items-center gap-[0.3rem] text-[0.85rem] hover:text-primary active:text-primary focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-ring';

  const sectionClassName =
    'mt-[clamp(2.75rem,6vw,4rem)] border-t border-border pt-[1.45rem]';

  const sectionTitleClassName =
    'mb-4 font-display text-[clamp(1.22rem,3vw,1.55rem)] leading-tight font-semibold tracking-[-0.04em]';

  return (
    <>
      <section
        aria-labelledby="nombre"
        className={cn(
          'pt-[clamp(2.4rem,6vw,4.5rem)] pb-[clamp(2.75rem,6vw,4rem)]',
          inspector.inspector,
        )}
      >
        <Header professionalTitle={profile.professionalTitle} />

        <div className="mt-[clamp(1.65rem,4vw,2.4rem)] mb-5 max-w-[56ch] text-base leading-[1.65] text-pretty text-neutral-200">
          <PortableText
            value={profile.aboutMeDescription ?? []}
            components={{
              block: {
                normal: ({ children }) => (
                  <p className="first:text-[clamp(1.12rem,2.4vw,1.38rem)] first:leading-[1.45] first:tracking-[-0.02em] [&+p]:mt-[0.9rem] [&+p]:text-neutral-300">
                    {children}
                  </p>
                ),
              },
              marks: {
                underline: ({ children }) => (
                  <InspectorTrigger>{children}</InspectorTrigger>
                ),
              },
            }}
          />
        </div>

        <ul
          aria-label="Enlaces de contacto"
          className="flex flex-wrap items-center gap-x-[clamp(0.8rem,3vw,1.6rem)] text-muted-foreground"
        >
          {email && (
            <li>
              <a
                href={`mailto:${email}`}
                className={cn(contactLinkClassName, 'text-foreground')}
              >
                <IconMail size={17} aria-hidden="true" />
                Correo
              </a>
            </li>
          )}

          {githubUrl && (
            <li>
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={contactLinkClassName}
              >
                GitHub
              </a>
            </li>
          )}

          {linkedinUrl && (
            <li>
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={contactLinkClassName}
              >
                LinkedIn
              </a>
            </li>
          )}

          {resumeHref && (
            <li>
              <a
                href={resumeHref}
                aria-label={
                  isResumeFile ? 'Descargar mi currículum' : 'Ver mi currículum'
                }
                target={isResumeFile ? undefined : '_blank'}
                rel={isResumeFile ? undefined : 'noopener noreferrer'}
                className={cn(
                  contactLinkClassName,
                  'before:mr-[0.55rem] before:h-[1em] before:w-px before:bg-border',
                )}
              >
                CV
                {isResumeFile ? (
                  <IconDownload size={13} aria-hidden="true" />
                ) : (
                  <IconArrowUpRight size={13} aria-hidden="true" />
                )}
              </a>
            </li>
          )}
        </ul>
      </section>

      <section className="border-t border-border" aria-labelledby="work">
        <div className="flex flex-wrap items-center justify-between gap-3 py-[0.85rem] max-[360px]:grid max-[360px]:grid-cols-[minmax(0,1fr)_auto]">
          <h2 className="font-display text-[1.55rem] font-semibold tracking-[-0.04em] max-[481px]:text-[1.22rem] max-[360px]:text-[1.15rem] max-[360px]:leading-[1.2] max-[360px]:text-balance">
            Selección de proyectos
          </h2>

          <Link
            href="/projects"
            className="flex min-h-11 w-fit items-center gap-[0.45rem] text-[0.84rem] hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-ring active:text-primary max-[481px]:text-[0.78rem]"
          >
            Ver archivo
            <IconArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>

        <div className="grid w-full grid-cols-1 gap-x-5 gap-y-[2.15rem] min-[720px]:grid-cols-2">
          {projects.slice(0, 2).map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      {jobs.length > 0 && (
        <section aria-labelledby="experiencia" className={sectionClassName}>
          <h2 className={sectionTitleClassName}>Experiencia</h2>

          <Accordion className="gap-3">
            {jobs.map((job) => (
              <WorkExperienceItem key={job.id} experience={job} />
            ))}
          </Accordion>
        </section>
      )}

      {groups.length > 0 && (
        <section
          aria-labelledby="herramientas"
          className="mt-[clamp(2.75rem,6vw,4rem)] border-t border-border pt-[1.45rem]"
        >
          <h2
            id="herramientas"
            className="mb-4 font-display text-[clamp(1.22rem,3vw,1.55rem)] leading-tight font-semibold tracking-[-0.04em]"
          >
            Mi caja de herramientas
          </h2>

          <Toolbox groups={groups} />
        </section>
      )}

      {email && (
        <section
          aria-labelledby="contacto"
          className="mt-[clamp(2.75rem,6vw,4rem)] border-t border-border pt-[1.45rem]"
        >
          <h2
            id="contacto"
            className="mb-4 font-display text-[clamp(1.22rem,3vw,1.55rem)] leading-tight font-semibold tracking-[-0.04em]"
          >
            ¿Hablamos?
          </h2>

          <p className="text-[0.95rem] text-pretty text-muted-foreground">
            Si tienes un proyecto en mente o encontraste ese píxel, escríbeme.
          </p>

          <a
            href={`mailto:${email}`}
            className="inline-flex min-h-11 items-center gap-[0.35rem] text-[0.95rem] underline decoration-neutral-700 underline-offset-[0.25em] hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-ring active:text-primary"
          >
            {email}
            <IconArrowUpRight size={16} aria-hidden="true" />
          </a>
        </section>
      )}
    </>
  );
};
