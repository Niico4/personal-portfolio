import Link from 'next/link';
import type { Route } from 'next';
import { IconChevronRight } from '@tabler/icons-react';

type Breadcrumb = {
  href?: '/' | `/wiki${string}`;
  label: string;
};

export const WikiBreadcrumbs = ({ items }: { items: Breadcrumb[] }) => (
  <nav aria-label="Migas de pan">
    <ol className="flex min-w-0 flex-wrap items-center gap-1 text-xs text-ink-300 sm:gap-1.5 sm:text-sm">
      {items.map((item, index) => {
        const isCurrent = index === items.length - 1;

        return (
          <li
            key={`${item.label}-${index}`}
            className="flex min-w-0 items-center gap-1.5"
          >
            {index > 0 && (
              <IconChevronRight
                aria-hidden="true"
                className="size-3.5 shrink-0 text-ink-500"
              />
            )}

            {item.href && !isCurrent ? (
              <Link
                href={item.href as Route}
                className="inline-flex min-h-8 items-center rounded-md px-1 outline-none transition-colors hover:text-brand-200 focus-visible:ring-2 focus-visible:ring-brand-400 motion-reduce:transition-none"
              >
                {item.label}
              </Link>
            ) : (
              <span
                aria-current={isCurrent ? 'page' : undefined}
                className="max-w-[15rem] truncate px-1 font-medium text-ink-200 sm:max-w-[22rem]"
              >
                {item.label}
              </span>
            )}
          </li>
        );
      })}
    </ol>
  </nav>
);
