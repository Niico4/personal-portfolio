import {
  IconArrowUpRight,
  IconBrandFigma,
  IconBrandGithub,
} from '@tabler/icons-react';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { ProjectType } from '@/sanity/lib/types/project.type';

interface ProjectActionsProps {
  media: Pick<ProjectType['media'], 'liveUrl' | 'repositoryUrl' | 'figmaUrl'>;
}

export const ProjectActions = ({ media }: ProjectActionsProps) => {
  const { liveUrl, repositoryUrl, figmaUrl } = media;

  const actions = [
    liveUrl
      ? {
          href: liveUrl,
          label: 'Visitar sitio',
          icon: IconArrowUpRight,
          primary: true,
        }
      : null,

    figmaUrl
      ? {
          href: figmaUrl,
          label: 'Ver en Figma',
          icon: IconBrandFigma,
          primary: !liveUrl,
        }
      : null,

    repositoryUrl
      ? {
          href: repositoryUrl,
          label: 'Ver en GitHub',
          icon: IconBrandGithub,
          primary: false,
        }
      : null,
  ].filter((action) => action !== null);

  if (!actions.length) return null;

  return (
    <nav aria-label="Enlaces del proyecto">
      <ul
        className={cn(
          'grid gap-2',
          actions.length === 1 ? 'grid-cols-1' : 'grid-cols-2',
          actions.length === 3 && 'sm:grid-cols-3',
        )}
      >
        {actions.map(({ href, label, icon: Icon, primary }, index) => (
          <li
            key={href}
            className={cn(
              'min-w-0',
              actions.length === 3 &&
                index === 0 &&
                'col-span-full sm:col-span-1',
            )}
          >
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({
                  variant: primary ? 'default' : 'outline',
                }),
                'group h-10 w-full gap-2 rounded-xl font-normal sm:h-11',
                !primary && 'text-fg-secondary',
              )}
            >
              {label}

              <Icon
                aria-hidden="true"
                stroke={1.5}
                className="size-4 shrink-0 motion-safe:transition-transform motion-safe:group-hover:scale-110"
              />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
