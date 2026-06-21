// components/common/portable-text-content.tsx
import { PortableText, type PortableTextComponents } from '@portabletext/react';
import type { PortableTextBlock } from '@portabletext/types';

interface PortableTextContentProps {
  value?: PortableTextBlock[] | null;
  className?: string;
}

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p>{children}</p>,
  },

  list: {
    bullet: ({ children }) => (
      <ul className="flex list-disc flex-col gap-1 pl-5">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="flex list-decimal flex-col gap-1 pl-5">{children}</ol>
    ),
  },

  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },

  marks: {
    strong: ({ children }) => (
      <strong className="font-bold text-inherit">{children}</strong>
    ),

    em: ({ children }) => <em className="italic">{children}</em>,

    link: ({ children, value }) => {
      const href = value?.href;

      if (!href) return <>{children}</>;

      const isExternal = href.startsWith('http');

      return (
        <a
          href={href}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noreferrer noopener' : undefined}
        >
          {children}
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
