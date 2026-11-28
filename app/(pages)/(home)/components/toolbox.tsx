import {
  IconBrandFigma,
  IconBrandGit,
  IconBrandNodejs,
  IconBrandReact,
  IconBrandTypescript,
  IconChevronDown,
  type IconProps,
} from '@tabler/icons-react';
import type { CSSProperties } from 'react';

import { cn } from '@/lib/utils';
import type { SkillGroupType } from '@/sanity/lib/types/skills';

function PostgreSQLMark({ className, size }: IconProps) {
  return (
    <span
      aria-hidden="true"
      className={cn('inline-block shrink-0 bg-current', className)}
      style={{
        width: size,
        height: size,
        mask: 'url(/postgresql-elephant.svg) center / 30px 30px no-repeat',
      }}
    />
  );
}

const FEATURED_TOOLS = [
  {
    name: 'Figma',
    icon: IconBrandFigma,
    url: 'https://help.figma.com/',
    color: '#efaba2',
  },
  {
    name: 'React',
    icon: IconBrandReact,
    url: 'https://react.dev/learn',
    color: '#78d6ec',
  },
  {
    name: 'TypeScript',
    icon: IconBrandTypescript,
    url: 'https://www.typescriptlang.org/docs/',
    color: '#87b5ea',
  },
  {
    name: 'Node.js',
    icon: IconBrandNodejs,
    url: 'https://nodejs.org/docs/latest/api/',
    color: '#a6ce90',
  },
  {
    name: 'PostgreSQL',
    icon: PostgreSQLMark,
    url: 'https://www.postgresql.org/docs/',
    color: '#8cb6dc',
  },
  {
    name: 'Git',
    icon: IconBrandGit,
    url: 'https://git-scm.com/doc',
    color: '#efab97',
  },
] as const;

interface ToolboxProps {
  groups: SkillGroupType[];
}

export const Toolbox = ({ groups }: ToolboxProps) => {
  const available = new Set(
    groups.flatMap(({ technologies }) => technologies.map(({ name }) => name)),
  );

  const featured = FEATURED_TOOLS.filter(({ name }) => available.has(name));

  const seen = new Set<string>(featured.map(({ name }) => name));

  const remaining = groups
    .map(({ id, name, technologies }) => {
      const names: string[] = [];

      for (const tool of technologies) {
        if (seen.has(tool.name)) continue;

        seen.add(tool.name);
        names.push(tool.name);
      }

      return { id, name, names };
    })
    .filter(({ names }) => names.length > 0);

  const remainingCount = available.size - featured.length;

  return (
    <>
      {featured.length > 0 && (
        <ul className="mt-5 mb-[0.7rem] grid grid-cols-3 gap-x-2 gap-y-[0.4rem] min-[541px]:grid-cols-6 min-[541px]:gap-y-2">
          {featured.map(({ name, icon: Mark, url, color }) => (
            <li key={name}>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${name}: documentación oficial`}
                style={{ '--tool-color': color } as CSSProperties}
                className="group/tool flex min-h-20 flex-col items-center justify-center gap-[0.6rem] rounded-[0.4rem] text-[0.82rem] text-neutral-200 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-ring"
              >
                <Mark
                  aria-hidden="true"
                  size={34}
                  stroke={1.6}
                  className={cn(
                    'text-[color-mix(in_oklch,var(--tool-color)_70%,var(--neutral-300))]',
                    'group-hover/tool:text-(--tool-color) group-focus-visible/tool:text-(--tool-color) group-active/tool:text-(--tool-color)',
                    'motion-safe:transition-transform motion-safe:duration-180 motion-safe:ease-out',
                    'motion-safe:group-hover/tool:-translate-y-0.5 motion-safe:group-hover/tool:-rotate-5',
                    'motion-safe:group-focus-visible/tool:-translate-y-0.5 motion-safe:group-focus-visible/tool:-rotate-5',
                    'motion-safe:group-active/tool:translate-y-0 motion-safe:group-active/tool:scale-94 motion-safe:group-active/tool:rotate-0',
                  )}
                />

                <span className="decoration-(--tool-color) underline-offset-[0.3em] group-hover/tool:underline group-focus-visible/tool:underline">
                  {name}
                </span>
              </a>
            </li>
          ))}
        </ul>
      )}

      {remainingCount > 0 && (
        <details className="group/drawer">
          <summary className="flex min-h-11 w-fit cursor-pointer list-none items-center gap-[0.45rem] text-[0.83rem] text-muted-foreground group-open/drawer:text-foreground hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-ring active:text-foreground [&::-webkit-details-marker]:hidden">
            <IconChevronDown
              size={14}
              aria-hidden="true"
              className="group-open/drawer:rotate-180 motion-safe:transition-transform motion-safe:duration-180 motion-safe:ease-out"
            />
            Más herramientas
            <span className="text-[0.72rem] text-neutral-500 tabular-nums">
              {remainingCount}
            </span>
          </summary>

          <dl className="grid gap-[0.7rem] pt-[0.6rem] pb-[0.2rem]">
            {remaining.map(({ id, name, names }) => (
              <div
                key={id}
                className="grid items-baseline gap-[0.1rem] min-[541px]:grid-cols-[9rem_minmax(0,1fr)] min-[541px]:gap-2"
              >
                <dt className="text-[0.8rem] text-muted-foreground">{name}</dt>

                <dd className="text-[0.9rem] leading-[1.55] text-pretty text-neutral-200">
                  {names.join(' · ')}
                </dd>
              </div>
            ))}
          </dl>
        </details>
      )}
    </>
  );
};
