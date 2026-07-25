import { createElement, Fragment, type ReactNode } from 'react';
import type { Element, RootContent } from 'hast';
import { refractor } from 'refractor';
import jsx from 'refractor/jsx';
import tsx from 'refractor/tsx';

import { CodeCopyButton } from './code-copy-button';

if (!refractor.registered('jsx')) {
  refractor.register(jsx);
}

if (!refractor.registered('tsx')) {
  refractor.register(tsx);
}

const LANGUAGE_ALIASES: Record<string, string> = {
  html: 'markup',
  js: 'javascript',
  jsx: 'jsx',
  md: 'markdown',
  shell: 'bash',
  sh: 'bash',
  ts: 'typescript',
  tsx: 'tsx',
  yml: 'yaml',
};

const LANGUAGE_LABELS: Record<string, string> = {
  bash: 'Bash',
  css: 'CSS',
  html: 'HTML',
  javascript: 'JavaScript',
  js: 'JavaScript',
  json: 'JSON',
  jsx: 'JSX',
  markdown: 'Markdown',
  md: 'Markdown',
  plain: 'Texto',
  plaintext: 'Texto',
  python: 'Python',
  shell: 'Shell',
  sh: 'Shell',
  sql: 'SQL',
  text: 'Texto',
  ts: 'TypeScript',
  tsx: 'TSX',
  typescript: 'TypeScript',
  yaml: 'YAML',
  yml: 'YAML',
};

const getClassName = (node: Element): string | undefined => {
  const className = node.properties.className;

  if (Array.isArray(className)) {
    return className.join(' ');
  }

  return typeof className === 'string' ? className : undefined;
};

const renderHighlightedNode = (node: RootContent, key: string): ReactNode => {
  if (node.type === 'text') {
    return node.value;
  }

  if (node.type !== 'element') {
    return null;
  }

  return createElement(
    node.tagName,
    {
      key,
      className: getClassName(node),
    },
    node.children.map((child, index) =>
      renderHighlightedNode(child, `${key}-${index}`),
    ),
  );
};

const highlightCode = (code: string, language: string | null): ReactNode => {
  if (!language) {
    return code;
  }

  const normalizedLanguage = (
    LANGUAGE_ALIASES[language.toLowerCase()] ?? language
  ).toLowerCase();

  if (!refractor.registered(normalizedLanguage)) {
    return code;
  }

  try {
    const tree = refractor.highlight(code, normalizedLanguage);

    return tree.children.map((node, index) => (
      <Fragment key={index}>
        {renderHighlightedNode(node, String(index))}
      </Fragment>
    ));
  } catch {
    return code;
  }
};

export const WikiCodeBlock = ({
  code,
  language,
  filename,
}: {
  code: string;
  language: string | null;
  filename?: string;
}) => {
  const languageLabel = language
    ? (LANGUAGE_LABELS[language.toLowerCase()] ?? language)
    : 'Código';

  return (
    <figure className="my-8 min-w-0 overflow-hidden rounded-2xl border border-ink-700/80 bg-ink-900/80">
      <figcaption className="flex min-h-12 items-center justify-between gap-3 border-b border-ink-800 bg-main/40 px-2 pl-4">
        <div className="flex min-w-0 items-center gap-2.5">
          <span
            aria-hidden="true"
            className="size-1.5 shrink-0 rounded-full bg-brand-400"
          />
          <span className="truncate font-mono text-[0.7rem] font-medium uppercase tracking-[0.12em] text-ink-300">
            {filename ?? languageLabel}
          </span>
          {filename && language && (
            <span className="shrink-0 font-mono text-[0.68rem] text-ink-500">
              {languageLabel}
            </span>
          )}
        </div>

        <CodeCopyButton code={code} />
      </figcaption>

      <pre className="max-w-full overflow-x-auto overscroll-x-contain p-4 font-mono text-[0.8125rem] leading-6 text-ink-100 [tab-size:2] selection:bg-brand-400/25 selection:text-ink-50 sm:p-5 sm:text-sm">
        <code
          className="
            [&_.token.boolean]:text-yellow-300
            [&_.token.class-name]:text-brand-100
            [&_.token.comment]:italic
            [&_.token.comment]:text-ink-300
            [&_.token.function]:text-brand-200
            [&_.token.keyword]:text-purple-300
            [&_.token.number]:text-yellow-300
            [&_.token.operator]:text-ink-200
            [&_.token.property]:text-brand-200
            [&_.token.punctuation]:text-ink-400
            [&_.token.string]:text-green-300
          "
        >
          {highlightCode(code, language)}
        </code>
      </pre>
    </figure>
  );
};
