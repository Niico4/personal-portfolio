import { cn } from '@/lib/utils';
import { PortableText, type PortableTextComponents } from '@portabletext/react';
import type { PortableTextBlock } from '@portabletext/types';
import { IconArrowRight, IconArrowUpRight } from '@tabler/icons-react';
import Link from 'next/link';

interface PortableTextContentProps {
  value?: PortableTextBlock[] | null;
  className?: string;
}

const linkClassName = cn(
  'group font-medium text-fg-strong',
  'underline decoration-brand/50 decoration-1 underline-offset-[0.2em]',
  'transition-[color,text-decoration-color] duration-200 ease-out',
  'hover:text-brand hover:decoration-brand',
  'focus-visible:rounded-sm focus-visible:outline-2',
  'focus-visible:outline-offset-2 focus-visible:outline-ring',
);

const iconClassName = cn(
  'ml-0.5 inline-block size-[0.85em] align-middle',
  'transition-transform duration-200 ease-out',
  'motion-safe:group-hover:translate-x-0.5',
  'motion-reduce:transition-none',
  'motion-safe:group-hover:-translate-y-0.5',
);

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="my-4 leading-relaxed first:mt-0 last:mb-0">{children}</p>
    ),

    h2: ({ children }) => (
      <h2 className="mt-10 mb-4 text-2xl font-semibold tracking-tight first:mt-0">
        {children}
      </h2>
    ),

    h3: ({ children }) => (
      <h3 className="mt-8 mb-3 text-xl font-semibold tracking-tight first:mt-0">
        {children}
      </h3>
    ),

    h4: ({ children }) => (
      <h4 className="mt-6 mb-2 text-lg font-semibold tracking-tight first:mt-0">
        {children}
      </h4>
    ),

    h5: ({ children }) => (
      <h5 className="mt-5 mb-2 font-semibold first:mt-0">{children}</h5>
    ),

    h6: ({ children }) => (
      <h6 className="mt-4 mb-2 text-sm font-semibold first:mt-0">{children}</h6>
    ),

    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-2 border-primary/50 pl-4 text-muted-foreground italic">
        {children}
      </blockquote>
    ),
  },

  list: {
    bullet: ({ children }) => (
      <ul className="my-4 list-outside list-disc space-y-1 pl-6 marker:text-muted-foreground">
        {children}
      </ul>
    ),

    number: ({ children }) => (
      <ol className="my-4 list-outside list-decimal space-y-1 pl-6 marker:text-muted-foreground">
        {children}
      </ol>
    ),
  },

  listItem: {
    bullet: ({ children }) => (
      <li className="pl-1 leading-relaxed">{children}</li>
    ),

    number: ({ children }) => (
      <li className="pl-1 leading-relaxed">{children}</li>
    ),
  },

  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold">{children}</strong>
    ),

    em: ({ children }) => <em className="italic">{children}</em>,

    underline: ({ children }) => (
      <span className="underline underline-brand">{children}</span>
    ),

    'strike-through': ({ children }) => (
      <del className="decoration-current">{children}</del>
    ),

    code: ({ children }) => (
      <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.9em]">
        {children}
      </code>
    ),

    highlight: ({ children }) => (
      <mark className="rounded-sm bg-primary/15 px-0.5 text-inherit">
        {children}
      </mark>
    ),

    sup: ({ children }) => <sup>{children}</sup>,

    sub: ({ children }) => <sub>{children}</sub>,

    link: ({ children, value }) => {
      const href = typeof value?.href === 'string' ? value.href.trim() : '';

      if (!href) return <>{children}</>;

      const isExternal = /^https?:\/\//i.test(href);
      const isInternal = href.startsWith('/') && !href.startsWith('//');
      const isSpecial = /^(mailto:|tel:|#)/i.test(href);

      if (!isExternal && !isInternal && !isSpecial) {
        return <>{children}</>;
      }

      const content = (
        <>
          {children}
          {isExternal ? (
            <IconArrowUpRight aria-hidden="true" className={iconClassName} />
          ) : isInternal ? (
            <IconArrowRight aria-hidden="true" className={iconClassName} />
          ) : null}
        </>
      );

      if (isInternal) {
        return (
          <Link href={href} className={linkClassName}>
            {content}
          </Link>
        );
      }

      const openInNewTab = isExternal && value?.openInNewTab !== false;

      return (
        <a
          href={href}
          className={linkClassName}
          target={openInNewTab ? '_blank' : undefined}
          rel={openInNewTab ? 'noopener noreferrer' : undefined}
        >
          {content}
        </a>
      );
    },
  },
};

export const PortableTextContent = ({
  value,
  className,
}: PortableTextContentProps) => {
  if (!value?.length) return null;

  return (
    <div className={className}>
      <PortableText value={value} components={components} />
    </div>
  );
};
