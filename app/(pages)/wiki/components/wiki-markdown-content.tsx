import {
  isValidElement,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from 'react';
import Link from 'next/link';
import type { Route } from 'next';
import ReactMarkdown, { type Components } from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import remarkGfm from 'remark-gfm';
import {
  IconAlertTriangle,
  IconChevronRight,
  IconFile,
} from '@tabler/icons-react';

import {
  getNotionPageIdFromUrl,
  rehypeNotionBlocks,
  remarkNotionBlockBoundaries,
  remarkWikiHeadingIds,
} from '../lib/wiki-markdown';
import type { WikiMarkdown } from '../lib/wiki.types';

import { WikiCodeBlock } from './wiki-code-block';
import { WikiImage } from './wiki-image';

const SANITIZE_SCHEMA = {
  ...defaultSchema,
  clobberPrefix: '',
  tagNames: [
    ...(defaultSchema.tagNames ?? []),
    'aside',
    'caption',
    'col',
    'colgroup',
    'details',
    'summary',
  ],
  attributes: {
    ...defaultSchema.attributes,
    '*': [
      ...(defaultSchema.attributes?.['*'] ?? []),
      'ariaHidden',
      'className',
      'id',
    ],
    a: [...(defaultSchema.attributes?.a ?? []), 'target', 'rel'],
    details: [...(defaultSchema.attributes?.details ?? []), 'open'],
    col: [...(defaultSchema.attributes?.col ?? []), 'span'],
    span: [...(defaultSchema.attributes?.span ?? []), 'color', 'underline'],
    th: [...(defaultSchema.attributes?.th ?? []), 'scope'],
  },
};

const isSafeHttpUrl = (value: string): boolean => {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' || url.protocol === 'http:';
  } catch {
    return value.startsWith('/') || value.startsWith('#');
  }
};

const getNodeId = (node: unknown): string | undefined => {
  if (
    node &&
    typeof node === 'object' &&
    'properties' in node &&
    node.properties &&
    typeof node.properties === 'object' &&
    'id' in node.properties &&
    typeof node.properties.id === 'string'
  ) {
    return node.properties.id;
  }

  return undefined;
};

const HeadingAnchor = ({
  as: Tag,
  children,
  className,
  id,
}: {
  as: 'h2' | 'h3' | 'h4';
  children: ReactNode;
  className: string;
  id?: string;
}) => (
  <Tag id={id} className={`${className} scroll-mt-28`}>
    {id ? (
      <a
        href={`#${id}`}
        className="rounded-sm text-inherit no-underline outline-none hover:text-brand-200 focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-4 focus-visible:ring-offset-main"
      >
        {children}
      </a>
    ) : (
      children
    )}
  </Tag>
);

const getCodeLanguage = (className: unknown): string | null => {
  if (typeof className !== 'string') {
    return null;
  }

  const languageClass = className
    .split(' ')
    .find((candidate) => candidate.startsWith('language-'));

  return languageClass?.slice('language-'.length) || null;
};

const getCodeText = (children: ReactNode): string => {
  const code = String(children ?? '');
  return code.endsWith('\n') ? code.slice(0, -1) : code;
};

const isImageParagraph = (node: unknown): { alt: string; isImage: boolean } => {
  if (
    !node ||
    typeof node !== 'object' ||
    !('children' in node) ||
    !Array.isArray(node.children)
  ) {
    return { alt: '', isImage: false };
  }

  const meaningfulChildren = node.children.filter(
    (child) =>
      !(
        child &&
        typeof child === 'object' &&
        'type' in child &&
        child.type === 'text' &&
        'value' in child &&
        typeof child.value === 'string' &&
        !child.value.trim()
      ),
  );

  if (meaningfulChildren.length !== 1) {
    return { alt: '', isImage: false };
  }

  const image = meaningfulChildren[0];

  if (
    !image ||
    typeof image !== 'object' ||
    !('tagName' in image) ||
    image.tagName !== 'img'
  ) {
    return { alt: '', isImage: false };
  }

  const alt =
    'properties' in image &&
    image.properties &&
    typeof image.properties === 'object' &&
    'alt' in image.properties &&
    typeof image.properties.alt === 'string'
      ? image.properties.alt
      : '';

  return { alt, isImage: true };
};

export const WikiMarkdownContent = ({
  content,
  internalLinks,
}: {
  content: WikiMarkdown;
  internalLinks: Record<string, `/wiki/${string}/${string}`>;
}) => {
  const components: Components = {
    h1: ({ children, node }) => (
      <HeadingAnchor
        as="h2"
        id={getNodeId(node)}
        className="mb-4 mt-14 text-balance text-2xl font-bold leading-tight tracking-[-0.03em] text-ink-50 sm:text-3xl"
      >
        {children}
      </HeadingAnchor>
    ),
    h2: ({ children, node }) => (
      <HeadingAnchor
        as="h2"
        id={getNodeId(node)}
        className="mb-4 mt-14 text-balance text-2xl font-bold leading-tight tracking-[-0.03em] text-ink-50 sm:text-3xl"
      >
        {children}
      </HeadingAnchor>
    ),
    h3: ({ children, node }) => (
      <HeadingAnchor
        as="h3"
        id={getNodeId(node)}
        className="mb-3 mt-11 text-balance text-xl font-semibold leading-snug tracking-[-0.025em] text-ink-50 sm:text-2xl"
      >
        {children}
      </HeadingAnchor>
    ),
    h4: ({ children, node }) => (
      <HeadingAnchor
        as="h4"
        id={getNodeId(node)}
        className="mb-3 mt-9 text-lg font-semibold leading-snug text-ink-100 sm:text-xl"
      >
        {children}
      </HeadingAnchor>
    ),
    p: ({ children, node }) => {
      const image = isImageParagraph(node);

      if (image.isImage) {
        return (
          <figure className="my-8">
            {children}
            {image.alt && (
              <figcaption className="mt-2.5 text-sm leading-6 text-ink-300">
                {image.alt}
              </figcaption>
            )}
          </figure>
        );
      }

      return <p className="my-5 text-pretty">{children}</p>;
    },
    a: ({
      href,
      children,
      className,
    }: ComponentPropsWithoutRef<'a'> & { children?: ReactNode }) => {
      if (!href || !isSafeHttpUrl(href)) {
        return <span>{children}</span>;
      }

      const notionPageId = getNotionPageIdFromUrl(href);
      const internalHref = notionPageId
        ? internalLinks[notionPageId]
        : undefined;
      const linkClassName = `rounded-sm font-medium text-brand-300 underline decoration-brand-400/60 decoration-1 underline-offset-4 outline-none transition-colors hover:text-brand-100 hover:decoration-brand-300 focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-main motion-reduce:transition-none ${className ?? ''}`;

      if (internalHref) {
        return (
          <Link href={internalHref as Route} className={linkClassName}>
            {children}
          </Link>
        );
      }

      const isExternal = href.startsWith('http');

      return (
        <a
          href={href}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          className={linkClassName}
        >
          {children}
          {isExternal && (
            <span className="sr-only"> (se abre en otra pestaña)</span>
          )}
        </a>
      );
    },
    img: ({ src, alt }: ComponentPropsWithoutRef<'img'>) => {
      if (typeof src !== 'string' || !isSafeHttpUrl(src)) {
        return null;
      }

      return (
        <span className="relative block aspect-video overflow-hidden rounded-2xl border border-ink-700/80 bg-ink-900">
          <WikiImage
            src={src}
            alt={alt ?? ''}
            sizes="(min-width: 1280px) 48rem, (min-width: 768px) 75vw, 100vw"
            className="object-cover"
          />
        </span>
      );
    },
    pre: ({ children }) => {
      if (!isValidElement(children)) {
        return <WikiCodeBlock code={getCodeText(children)} language={null} />;
      }

      const props = children.props as {
        children?: ReactNode;
        className?: string;
      };

      return (
        <WikiCodeBlock
          code={getCodeText(props.children)}
          language={getCodeLanguage(props.className)}
        />
      );
    },
    code: ({ children, className }) => (
      <code
        className={
          className
            ? className
            : 'box-decoration-clone break-words rounded-[0.3rem] border border-ink-700/70 bg-ink-900/70 px-1 py-0 font-mono text-[0.88em] leading-[inherit] text-brand-100 [overflow-wrap:anywhere]'
        }
      >
        {children}
      </code>
    ),
    ul: ({ children, className }) => (
      <ul
        className={[
          'my-5 list-outside list-disc space-y-1.5 pl-5 marker:text-[0.72em] marker:text-brand-400 [&_ul]:my-2 [&_ul]:list-[circle] [&_ul]:space-y-1 [&_ul]:pl-5 [&_ul]:marker:text-ink-400',
          className?.includes('contains-task-list') ? 'list-none pl-0' : '',
        ].join(' ')}
      >
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="my-5 list-outside list-decimal space-y-1.5 pl-6 marker:font-mono marker:text-[0.78em] marker:font-medium marker:text-brand-300 [&_ol]:my-2 [&_ol]:space-y-1 [&_ol]:pl-6 [&_ol]:marker:text-ink-300">
        {children}
      </ol>
    ),
    li: ({ children, className }) => (
      <li
        className={[
          'pl-1.5 leading-7 text-ink-200 [&>ol]:mt-2 [&>p]:my-0 [&>ul]:mt-2',
          className?.includes('task-list-item') ? 'pl-0' : '',
        ].join(' ')}
      >
        {children}
      </li>
    ),
    input: ({ type, checked }) =>
      type === 'checkbox' ? (
        <input
          type="checkbox"
          checked={checked}
          disabled
          aria-label={checked ? 'Tarea completada' : 'Tarea pendiente'}
          className="mr-2 size-4 translate-y-0.5 rounded border-ink-600 bg-ink-900 accent-brand-400"
        />
      ) : null,
    blockquote: ({ children }) => (
      <blockquote className="my-7 border-l-2 border-brand-400/70 pl-5 text-[1.02em] leading-8 text-ink-100 [&>p]:my-0">
        {children}
      </blockquote>
    ),
    aside: ({ children, className }) => (
      <aside
        className={[
          'my-7 flex gap-3 rounded-2xl border p-4 text-ink-200 sm:p-5 [&_.wiki-callout-content]:min-w-0 [&_.wiki-callout-content>p:first-child]:mt-0 [&_.wiki-callout-content>p:last-child]:mb-0 [&_.wiki-callout-icon]:mt-0.5 [&_.wiki-callout-icon]:shrink-0 [&_.wiki-callout-icon]:text-lg',
          className?.includes('wiki-unsupported-block')
            ? 'border-ink-700/80 bg-ink-900/30 text-sm'
            : 'border-brand-400/25 bg-brand-500/[0.07]',
          className ?? '',
        ].join(' ')}
      >
        {children}
      </aside>
    ),
    details: ({ children }) => (
      <details className="group my-7 rounded-2xl border border-ink-700/80 bg-ink-900/30 p-1 open:bg-ink-900/50">
        {children}
      </details>
    ),
    summary: ({ children }) => (
      <summary className="flex min-h-11 cursor-pointer list-none items-center gap-2 rounded-xl px-3 font-medium text-ink-100 outline-none transition-colors hover:bg-ink-800/70 focus-visible:ring-2 focus-visible:ring-brand-400 motion-reduce:transition-none [&::-webkit-details-marker]:hidden">
        <IconChevronRight
          aria-hidden="true"
          className="size-4 shrink-0 text-ink-300 transition-transform group-open:rotate-90 motion-reduce:transition-none"
          stroke={1.8}
        />
        <span>{children}</span>
      </summary>
    ),
    table: ({ children }) => (
      <div
        role="region"
        aria-label="Tabla con desplazamiento horizontal"
        tabIndex={0}
        className="my-8 max-w-full overflow-x-auto overscroll-x-contain rounded-xl border border-ink-700/80 bg-main outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-main"
      >
        <table className="w-full min-w-[42rem] table-auto border-separate border-spacing-0 text-left text-sm leading-6">
          {children}
        </table>
      </div>
    ),
    thead: ({ children }) => (
      <thead className="bg-ink-900/90">{children}</thead>
    ),
    tbody: ({ children }) => <tbody>{children}</tbody>,
    th: ({ children, scope }) => (
      <th
        scope={scope}
        className="border-b border-r border-ink-700 px-4 py-3.5 align-bottom font-semibold text-ink-50 last:border-r-0"
      >
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="break-words border-b border-r border-ink-800 px-4 py-3.5 align-top text-ink-200 last:border-r-0">
        {children}
      </td>
    ),
    tr: ({ children }) => (
      <tr className="last:[&>td]:border-b-0 last:[&>th]:border-b-0">
        {children}
      </tr>
    ),
    caption: ({ children }) => (
      <caption className="border-b border-ink-800 bg-main px-4 py-3 text-left text-sm text-ink-300">
        {children}
      </caption>
    ),
    hr: () => <hr className="my-12 border-ink-800" />,
  };

  return (
    <div className="min-w-0 max-w-full">
      <div className="wiki-prose max-w-[74ch] text-base leading-8 text-ink-200 selection:bg-brand-400/25 selection:text-ink-50 sm:text-[1.0625rem] [&_em]:text-ink-100 [&_strong]:font-semibold [&_strong]:text-ink-50">
        <ReactMarkdown
          remarkPlugins={[
            remarkGfm,
            remarkNotionBlockBoundaries,
            remarkWikiHeadingIds,
          ]}
          rehypePlugins={[
            rehypeRaw,
            rehypeNotionBlocks,
            [rehypeSanitize, SANITIZE_SCHEMA],
          ]}
          components={components}
        >
          {content.markdown}
        </ReactMarkdown>
      </div>

      {(content.truncated || content.unknownBlockIds.length > 0) && (
        <aside className="mt-10 flex gap-3 rounded-2xl border border-yellow-700/50 bg-yellow-900/10 p-4 text-sm leading-6 text-yellow-100">
          <IconAlertTriangle
            aria-hidden="true"
            className="mt-0.5 size-5 shrink-0"
          />
          <p>
            Parte de esta nota no está disponible fuera de Notion por permisos o
            por un tipo de bloque todavía no compatible.
          </p>
        </aside>
      )}

      {!content.markdown.trim() && (
        <div className="rounded-2xl border border-dashed border-ink-700 p-8 text-center text-sm text-ink-300">
          <IconFile
            aria-hidden="true"
            className="mx-auto mb-3 size-7 text-ink-500"
          />
          Esta nota todavía no tiene contenido público.
        </div>
      )}
    </div>
  );
};
