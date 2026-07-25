import type {
  Blockquote,
  Heading,
  Html,
  List,
  ListItem,
  Paragraph,
  Parent,
  PhrasingContent,
  Root,
  RootContent,
} from 'mdast';
import { parseFragment, type DefaultTreeAdapterTypes } from 'parse5';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import { unified } from 'unified';
import type { Root as HastRoot } from 'hast';
import type { Plugin } from 'unified';

import type { WikiHeading } from './wiki.types';

type MarkdownFile = {
  value: unknown;
};

interface HastNode {
  type?: string;
  tagName?: string;
  properties?: Record<string, unknown>;
  children?: HastNode[];
  value?: string;
}

interface PositionedNode {
  position?: {
    start: {
      line: number;
      column: number;
      offset?: number;
    };
    end: {
      line: number;
      column: number;
      offset?: number;
    };
  };
}

interface NotionContainerSource {
  source: string;
  token: string;
  endOffset: number;
  startOffset: number;
}

const NOTION_CONTAINER_TAGS = new Set([
  'callout',
  'column',
  'columns',
  'details',
  'synced_block',
  'synced_block_reference',
]);

const NOTION_ATTRIBUTE_LIST = /\s+\{(?:(?:color|toggle)="[^"]+"\s*)+\}\s*$/;

const createMarkdownParser = () => unified().use(remarkParse).use(remarkGfm);

const getSource = (file: MarkdownFile): string =>
  typeof file.value === 'string' ? file.value : String(file.value ?? '');

const getLineStarts = (source: string): number[] => {
  const starts = [0];

  for (let index = 0; index < source.length; index += 1) {
    if (source.charCodeAt(index) === 10) {
      starts.push(index + 1);
    }
  }

  return starts;
};

const getLineEnd = (
  source: string,
  starts: number[],
  lineIndex: number,
): number => {
  const nextStart = starts[lineIndex + 1];

  return nextStart === undefined ? source.length : nextStart - 1;
};

const stripNotionAttributes = (value: string): string =>
  value.replace(NOTION_ATTRIBUTE_LIST, '');

type Fence = {
  indent: string;
  marker: '`' | '~';
  size: number;
};

const getFence = (line: string): Fence | null => {
  let cursor = 0;

  while (line[cursor] === ' ' || line[cursor] === '\t') {
    cursor += 1;
  }

  const marker = line[cursor];

  if (marker !== '`' && marker !== '~') {
    return null;
  }

  let end = cursor;

  while (line[end] === marker) {
    end += 1;
  }

  if (end - cursor < 3) {
    return null;
  }

  return {
    indent: line.slice(0, cursor),
    marker,
    size: end - cursor,
  };
};

const isClosingFence = (line: string, fence: Fence): boolean => {
  const candidate = getFence(line);

  if (
    !candidate ||
    candidate.marker !== fence.marker ||
    candidate.size < fence.size
  ) {
    return false;
  }

  let cursor = candidate.indent.length + candidate.size;

  while (line[cursor] === ' ' || line[cursor] === '\t') {
    cursor += 1;
  }

  return cursor === line.length;
};

const normalizeNotionFencedCode = (source: string): string => {
  let result = '';
  let cursor = 0;
  let activeFence: Fence | null = null;

  while (cursor < source.length) {
    const lineEnd = source.indexOf('\n', cursor);
    const hasNewline = lineEnd !== -1;
    const end = hasNewline ? lineEnd : source.length;
    const line = source.slice(cursor, end);

    if (!activeFence) {
      const openingFence = getFence(line);

      if (openingFence) {
        activeFence = openingFence;
      }

      result += line;
    } else if (isClosingFence(line, activeFence)) {
      result += line;
      activeFence = null;
    } else {
      result +=
        activeFence.indent && !line.startsWith(activeFence.indent)
          ? activeFence.indent + line
          : line;
    }

    if (hasNewline) {
      result += '\n';
      cursor = lineEnd + 1;
    } else {
      cursor = source.length;
    }
  }

  return result;
};

const cleanTextNodes = (node: Root | RootContent): void => {
  if (node.type === 'text') {
    node.value = stripNotionAttributes(node.value);
    return;
  }

  if ('children' in node) {
    node.children.forEach((child) =>
      cleanTextNodes(child as Root | RootContent),
    );
  }
};

const dedentNotionChildren = (source: string): string => {
  let result = '';
  let atLineStart = true;

  for (let index = 0; index < source.length; index += 1) {
    const character = source[index];

    if (atLineStart && character === '\t') {
      atLineStart = false;
      continue;
    }

    result += character;
    atLineStart = character === '\n';
  }

  return result.trim();
};

const isHtmlElement = (
  node: DefaultTreeAdapterTypes.ChildNode,
): node is DefaultTreeAdapterTypes.Element => 'tagName' in node;

const getFirstHtmlElement = (
  value: string,
): DefaultTreeAdapterTypes.Element | null => {
  const fragment = parseFragment(value, { sourceCodeLocationInfo: true });

  return fragment.childNodes.find(isHtmlElement) ?? null;
};

const createHtmlNode = (value: string): Html => ({
  type: 'html',
  value,
});

const getHtmlElementEnd = (
  element: DefaultTreeAdapterTypes.Element,
): number | null => element.sourceCodeLocation?.endOffset ?? null;

const getElementProperties = (
  element: DefaultTreeAdapterTypes.Element,
): Record<string, string> =>
  Object.fromEntries(element.attrs.map(({ name, value }) => [name, value]));

const createNotionElement = (
  hName: string,
  children: Array<PhrasingContent | RootContent>,
  hProperties?: Record<string, unknown>,
): RootContent =>
  ({
    type: 'notionElement',
    data: {
      hName,
      ...(hProperties ? { hProperties } : {}),
    },
    children,
  }) as unknown as RootContent;

const parseInlineFragment = (
  source: string,
): Array<PhrasingContent | RootContent> => {
  const tree = parseWikiFragment(source.trim());
  const paragraph = tree.children[0];

  return paragraph?.type === 'paragraph' ? paragraph.children : tree.children;
};

function expandNotionContainer(
  value: string,
  element: DefaultTreeAdapterTypes.Element,
): RootContent[] | null {
  const location = element.sourceCodeLocation;

  if (
    !location ||
    !location.startTag ||
    !location.endTag ||
    !NOTION_CONTAINER_TAGS.has(element.tagName)
  ) {
    return null;
  }

  let innerStart = location.startTag.endOffset;
  const children: Array<PhrasingContent | RootContent> = [];

  if (element.tagName === 'details') {
    const summary = element.childNodes.find(
      (child): child is DefaultTreeAdapterTypes.Element =>
        isHtmlElement(child) && child.tagName === 'summary',
    );
    const summaryLocation = summary?.sourceCodeLocation;

    if (
      summaryLocation?.startTag &&
      summaryLocation.endTag &&
      summaryLocation.endOffset !== undefined
    ) {
      const summarySource = value.slice(
        summaryLocation.startTag.endOffset,
        summaryLocation.endTag.startOffset,
      );

      children.push(
        createNotionElement('summary', parseInlineFragment(summarySource)),
      );
      innerStart = summaryLocation.endOffset;
    }
  }

  const innerSource = dedentNotionChildren(
    value.slice(innerStart, location.endTag.startOffset),
  );

  if (innerSource) {
    children.push(...parseWikiFragment(innerSource).children);
  }

  if (
    element.tagName === 'synced_block' ||
    element.tagName === 'synced_block_reference'
  ) {
    return [
      createNotionElement('div', children, {
        className: ['wiki-synced-block'],
      }),
    ];
  }

  return [
    createNotionElement(
      element.tagName,
      children,
      getElementProperties(element),
    ),
  ];
}

const getNotionContainerSources = (source: string): NotionContainerSource[] => {
  const fragment = parseFragment(source, { sourceCodeLocationInfo: true });
  const containers: NotionContainerSource[] = [];

  const visit = (node: DefaultTreeAdapterTypes.ChildNode): void => {
    if (isHtmlElement(node) && NOTION_CONTAINER_TAGS.has(node.tagName)) {
      const location = node.sourceCodeLocation;

      if (
        location?.startOffset !== undefined &&
        location.endOffset !== undefined
      ) {
        containers.push({
          source: source.slice(location.startOffset, location.endOffset),
          token: `WNC${containers.length}`,
          startOffset: location.startOffset,
          endOffset: location.endOffset,
        });
      }

      return;
    }

    if ('childNodes' in node) {
      node.childNodes.forEach(visit);
    }
  };

  fragment.childNodes.forEach(visit);

  return containers;
};

const maskNotionContainers = (
  source: string,
  containers: NotionContainerSource[],
): string => {
  let masked = source;

  [...containers].reverse().forEach((container) => {
    const placeholder = container.source.replace(/[^\n]/g, ' ').split('');

    container.token
      .slice(0, placeholder.length)
      .split('')
      .forEach((character, index) => {
        placeholder[index] = character;
      });

    masked =
      masked.slice(0, container.startOffset) +
      placeholder.join('') +
      masked.slice(container.endOffset);
  });

  return masked;
};

const replaceNotionPlaceholders = (
  parent: Parent,
  containers: Map<string, NotionContainerSource>,
): void => {
  const nextChildren: typeof parent.children = [];

  parent.children.forEach((child) => {
    const token =
      child.type === 'paragraph' &&
      child.children.length === 1 &&
      child.children[0]?.type === 'text'
        ? child.children[0].value.trim()
        : null;
    const container = token ? containers.get(token) : undefined;

    if (container) {
      const element = getFirstHtmlElement(container.source);
      const expanded = element
        ? expandNotionContainer(container.source, element)
        : null;

      nextChildren.push(...(expanded ?? [createHtmlNode(container.source)]));
      return;
    }

    if ('children' in child) {
      replaceNotionPlaceholders(child, containers);
    }

    nextChildren.push(child);
  });

  parent.children = nextChildren;
};

function parseWikiFragment(source: string): Root {
  const normalizedSource = normalizeNotionFencedCode(source);
  const containers = getNotionContainerSources(normalizedSource);
  const maskedSource = maskNotionContainers(normalizedSource, containers);
  const parser = createMarkdownParser();
  const tree = parser.parse(maskedSource);

  replaceNotionPlaceholders(
    tree,
    new Map(containers.map((container) => [container.token, container])),
  );
  normalizeMarkdownTree(tree, maskedSource);
  replaceNotionPlaceholders(
    tree,
    new Map(containers.map((container) => [container.token, container])),
  );
  cleanTextNodes(tree);

  return tree;
}

const normalizeHtmlBlock = (
  node: Html,
): { nodes: RootContent[]; trailingOffset: number | null } => {
  const element = getFirstHtmlElement(node.value);

  if (!element) {
    return { nodes: [node], trailingOffset: null };
  }

  const elementEnd = getHtmlElementEnd(element);

  if (elementEnd === null) {
    return { nodes: [node], trailingOffset: null };
  }

  const elementSource = node.value.slice(0, elementEnd);
  const trailingSource = node.value.slice(elementEnd).trim();

  if (element.tagName === 'empty-block') {
    return {
      nodes: [],
      trailingOffset: trailingSource ? elementEnd : null,
    };
  }

  const expanded = expandNotionContainer(elementSource, element);

  return {
    nodes: expanded ?? [createHtmlNode(elementSource)],
    trailingOffset: trailingSource ? elementEnd : null,
  };
};

const getNodeOffsets = (
  node: PositionedNode,
): { start: number; end: number } | null => {
  const start = node.position?.start.offset;
  const end = node.position?.end.offset;

  if (start === undefined || end === undefined) {
    return null;
  }

  return { start, end };
};

const splitParagraphBlocks = (
  node: Paragraph,
  source: string,
): RootContent[] => {
  const position = node.position;

  if (!position || position.start.line === position.end.line) {
    return [node];
  }

  const starts = getLineStarts(source);
  const blocks: RootContent[] = [];

  for (
    let lineIndex = position.start.line - 1;
    lineIndex < position.end.line;
    lineIndex += 1
  ) {
    const start = starts[lineIndex];
    const end = getLineEnd(source, starts, lineIndex);

    if (start === undefined) {
      continue;
    }

    const lineSource = source.slice(start, end).trim();

    if (lineSource) {
      blocks.push(...parseWikiFragment(lineSource).children);
    }
  }

  return blocks.length > 0 ? blocks : [node];
};

const splitBlockquoteBlocks = (
  node: Blockquote,
  source: string,
): RootContent[] => {
  const position = node.position;
  const firstChild = node.children[0];

  if (
    !position ||
    position.start.line === position.end.line ||
    firstChild?.type !== 'paragraph'
  ) {
    return [node];
  }

  const starts = getLineStarts(source);
  const blocks: RootContent[] = [];

  for (
    let lineIndex = position.start.line - 1;
    lineIndex < position.end.line;
    lineIndex += 1
  ) {
    const start = starts[lineIndex];
    const end = getLineEnd(source, starts, lineIndex);

    if (start === undefined) {
      continue;
    }

    const lineSource = source.slice(start, end).trim();

    if (lineSource) {
      blocks.push(...parseWikiFragment(lineSource).children);
    }
  }

  return blocks.length > 0 ? blocks : [node];
};

const normalizeListItem = (item: ListItem, source: string): ListItem => {
  const nextItem: ListItem = {
    ...item,
    children: [...item.children],
  };

  normalizeParent(nextItem, source);

  return nextItem;
};

const splitListBlocks = (node: List, source: string): RootContent[] => {
  const output: RootContent[] = [];
  let currentItems: ListItem[] = [];

  const flushList = () => {
    if (currentItems.length === 0) {
      return;
    }

    output.push({
      ...node,
      children: currentItems,
      position: undefined,
    });
    currentItems = [];
  };

  node.children.forEach((item) => {
    const firstParagraph = item.children.find(
      (child): child is Paragraph => child.type === 'paragraph',
    );
    const paragraphPosition = firstParagraph?.position;
    const itemOffsets = getNodeOffsets(item);

    if (
      !firstParagraph ||
      !paragraphPosition ||
      !itemOffsets ||
      paragraphPosition.start.line === paragraphPosition.end.line
    ) {
      currentItems.push(normalizeListItem(item, source));
      return;
    }

    const starts = getLineStarts(source);
    const continuationStart = starts[paragraphPosition.start.line];

    if (
      continuationStart === undefined ||
      source[continuationStart] === '\t' ||
      source[continuationStart] === ' '
    ) {
      currentItems.push(normalizeListItem(item, source));
      return;
    }

    const firstItemSource = source
      .slice(itemOffsets.start, continuationStart)
      .trimEnd();
    const firstItemTree = parseWikiFragment(firstItemSource);
    const firstList = firstItemTree.children.find(
      (child): child is List => child.type === 'list',
    );
    const firstItem = firstList?.children[0];

    currentItems.push(firstItem ?? normalizeListItem(item, source));
    flushList();

    const promotedSource = source
      .slice(continuationStart, itemOffsets.end)
      .trim();

    if (promotedSource) {
      output.push(...parseWikiFragment(promotedSource).children);
    }
  });

  flushList();

  return output;
};

const normalizeParent = (parent: Parent, source: string): void => {
  const nextChildren: typeof parent.children = [];

  for (const child of parent.children) {
    if (child.type === 'paragraph') {
      nextChildren.push(...splitParagraphBlocks(child, source));
      continue;
    }

    if (child.type === 'list') {
      nextChildren.push(...splitListBlocks(child, source));
      continue;
    }

    if (child.type === 'blockquote') {
      nextChildren.push(...splitBlockquoteBlocks(child, source));
      continue;
    }

    if (child.type === 'html') {
      const normalized = normalizeHtmlBlock(child);
      nextChildren.push(...normalized.nodes);

      if (normalized.trailingOffset !== null) {
        const nodeStart = child.position?.start.offset;
        const trailingSource =
          nodeStart === undefined
            ? child.value.slice(normalized.trailingOffset)
            : source.slice(nodeStart + normalized.trailingOffset);
        const remainder = trailingSource.trim();

        if (remainder) {
          nextChildren.push(...parseWikiFragment(remainder).children);
        }

        break;
      }

      continue;
    }

    if ('children' in child) {
      normalizeParent(child, source);
    }

    nextChildren.push(child);
  }

  parent.children = nextChildren;
};

const normalizeMarkdownTree = (tree: Root, source: string): void => {
  normalizeParent(tree, source);
};

export const remarkNotionBlockBoundaries = () => {
  return (tree: Root, file: MarkdownFile) => {
    const parsed = parseWikiFragment(getSource(file));

    tree.children = parsed.children;
    tree.position = parsed.position;
  };
};

const getWikiHeadingId = (value: string): string => {
  const normalized = value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

  return normalized || 'seccion';
};

const getMarkdownText = (node: Heading): string => {
  let value = '';

  const appendText = (current: Heading | Heading['children'][number]) => {
    if (current.type === 'text' || current.type === 'inlineCode') {
      value += current.value;
      return;
    }

    if ('children' in current) {
      current.children.forEach(appendText);
    }
  };

  appendText(node);

  return value.trim();
};

const walkMarkdownHeadings = (
  node: Root | RootContent,
  callback: (heading: Heading) => void,
): void => {
  if (node.type === 'heading') {
    callback(node);
  }

  if ('children' in node) {
    node.children.forEach((child) =>
      walkMarkdownHeadings(child as Root | RootContent, callback),
    );
  }
};

export const remarkWikiHeadingIds = () => {
  return (tree: Root) => {
    const occurrences = new Map<string, number>();

    walkMarkdownHeadings(tree, (heading) => {
      const baseId = getWikiHeadingId(getMarkdownText(heading));
      const count = (occurrences.get(baseId) ?? 0) + 1;
      const id = count === 1 ? baseId : `${baseId}-${count}`;

      occurrences.set(baseId, count);
      heading.data = {
        ...heading.data,
        hProperties: {
          ...heading.data?.hProperties,
          id,
        },
      };
    });
  };
};

export const getWikiHeadings = (markdown: string): WikiHeading[] => {
  const processor = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkNotionBlockBoundaries)
    .use(remarkWikiHeadingIds);
  const tree = processor.runSync(processor.parse(markdown), markdown) as Root;
  const headings: WikiHeading[] = [];

  walkMarkdownHeadings(tree, (heading) => {
    const title = getMarkdownText(heading);
    const id = heading.data?.hProperties?.id;

    if (!title || typeof id !== 'string') {
      return;
    }

    headings.push({
      id,
      level: Math.min(4, Math.max(2, heading.depth)) as 2 | 3 | 4,
      title,
    });
  });

  return headings;
};

const getBooleanProperty = (
  properties: Record<string, unknown>,
  ...names: string[]
): boolean =>
  names.some(
    (name) =>
      properties[name] === true ||
      properties[name] === '' ||
      properties[name] === 'true',
  );

const findFirstTableRow = (node: HastNode): HastNode | undefined => {
  if (node.tagName === 'tr') {
    return node;
  }

  return node.children
    ?.map(findFirstTableRow)
    .find((candidate): candidate is HastNode => Boolean(candidate));
};

const getElementChildren = (node: HastNode, tagName: string): HastNode[] =>
  (node.children ?? []).filter((child) => child.tagName === tagName);

const transformHeaderCells = (row: HastNode, firstColumnOnly = false): void => {
  const cells = (row.children ?? []).filter(
    (child) => child.tagName === 'td' || child.tagName === 'th',
  );
  const targets = firstColumnOnly ? cells.slice(0, 1) : cells;

  targets.forEach((cell) => {
    cell.tagName = 'th';
    cell.properties = {
      ...cell.properties,
      scope: firstColumnOnly ? 'row' : 'col',
    };
  });
};

const createTableSection = (
  tagName: 'thead' | 'tbody',
  children: HastNode[],
): HastNode => ({
  type: 'element',
  tagName,
  properties: {},
  children,
});

const ensureTableSections = (table: HastNode): void => {
  const children = table.children ?? [];
  const directRows = getElementChildren(table, 'tr');

  if (directRows.length === 0) {
    return;
  }

  table.children = children.filter((child) => child.tagName !== 'tr');
  table.children.push(createTableSection('tbody', directRows));
};

const moveHeaderRowToHead = (table: HastNode, headerRow: HastNode): void => {
  const children = table.children ?? [];
  const existingHead = children.find(({ tagName }) => tagName === 'thead');

  if (existingHead) {
    existingHead.children = [headerRow];
    return;
  }

  const body = children.find(
    ({ tagName, children: bodyChildren }) =>
      tagName === 'tbody' && bodyChildren?.includes(headerRow),
  );

  if (body) {
    body.children = (body.children ?? []).filter(
      (child) => child !== headerRow,
    );
  }

  const bodyIndex = children.findIndex(({ tagName }) => tagName === 'tbody');
  const insertAt = bodyIndex >= 0 ? bodyIndex : children.length;

  children.splice(insertAt, 0, createTableSection('thead', [headerRow]));
  table.children = children;
};

const transformTableHeaders = (node: HastNode): void => {
  ensureTableSections(node);

  const properties = node.properties ?? {};
  const hasHeaderRow = getBooleanProperty(
    properties,
    'headerRow',
    'header-row',
  );
  const hasHeaderColumn = getBooleanProperty(
    properties,
    'headerColumn',
    'header-column',
  );

  if (hasHeaderRow) {
    const firstRow = findFirstTableRow(node);

    if (firstRow) {
      transformHeaderCells(firstRow);
      moveHeaderRowToHead(node, firstRow);
    }
  }

  if (hasHeaderColumn) {
    const transformRows = (current: HastNode) => {
      if (current.tagName === 'tr') {
        transformHeaderCells(current, true);
        return;
      }

      current.children?.forEach(transformRows);
    };

    getElementChildren(node, 'tbody').forEach(transformRows);
  }
};

const ensureFallbackText = (node: HastNode, value: string): void => {
  const hasContent = node.children?.some(
    (child) => child.type !== 'text' || Boolean(child.value?.trim()),
  );

  if (!hasContent) {
    node.children = [{ type: 'text', value }];
  }
};

const getLinkTarget = (
  properties: Record<string, unknown>,
  ...names: string[]
): unknown => names.map((name) => properties[name]).find(Boolean);

const getNotionColorClass = (color: unknown): string | null => {
  if (typeof color !== 'string') {
    return null;
  }

  const colorClasses: Record<string, string> = {
    blue: 'text-blue-200',
    blue_background: 'bg-blue-500/15',
    brown: 'text-amber-200',
    brown_background: 'bg-amber-700/15',
    gray: 'text-ink-300',
    gray_background: 'bg-ink-800/70',
    green: 'text-green-200',
    green_background: 'bg-green-500/15',
    orange: 'text-orange-200',
    orange_background: 'bg-orange-500/15',
    pink: 'text-pink-200',
    pink_background: 'bg-pink-500/15',
    purple: 'text-purple-200',
    purple_background: 'bg-purple-500/15',
    red: 'text-red-200',
    red_background: 'bg-red-500/15',
    yellow: 'text-yellow-100',
    yellow_background: 'bg-yellow-500/15',
  };

  return colorClasses[color] ?? null;
};

const walkHast = (node: HastNode): void => {
  if (node.type === 'element') {
    const properties = node.properties ?? {};

    switch (node.tagName) {
      case 'callout': {
        const icon =
          typeof properties.icon === 'string' ? properties.icon : null;
        const children = node.children ?? [];

        node.tagName = 'aside';
        node.properties = { className: ['wiki-callout'] };
        node.children = [
          ...(icon
            ? [
                {
                  type: 'element',
                  tagName: 'span',
                  properties: {
                    ariaHidden: 'true',
                    className: ['wiki-callout-icon'],
                  },
                  children: [{ type: 'text', value: icon }],
                } satisfies HastNode,
              ]
            : []),
          {
            type: 'element',
            tagName: 'div',
            properties: { className: ['wiki-callout-content'] },
            children,
          },
        ];
        break;
      }
      case 'columns':
        node.tagName = 'div';
        node.properties = { className: ['wiki-columns'] };
        break;
      case 'column':
        node.tagName = 'section';
        node.properties = { className: ['wiki-column'] };
        break;
      case 'mention-page':
      case 'mention-database':
      case 'mention-data-source':
      case 'page':
      case 'database':
        node.tagName = 'a';
        node.properties = {
          className: ['wiki-notion-reference'],
          href: getLinkTarget(properties, 'url', 'dataSourceUrl'),
        };
        ensureFallbackText(node, 'Abrir referencia');
        break;
      case 'mention-user':
      case 'mention-agent':
        node.tagName = 'span';
        node.properties = { className: ['wiki-notion-mention'] };
        ensureFallbackText(node, 'Mención');
        break;
      case 'mention-date':
        node.tagName = 'time';
        node.properties = {
          dateTime: getLinkTarget(properties, 'start', 'date'),
          className: ['wiki-notion-date'],
        };
        ensureFallbackText(
          node,
          typeof properties.start === 'string' ? properties.start : 'Fecha',
        );
        break;
      case 'bookmark':
      case 'link-preview':
      case 'file':
      case 'pdf':
      case 'audio':
      case 'video':
      case 'embed':
        node.tagName = 'a';
        node.properties = {
          className: ['wiki-file-link'],
          href: getLinkTarget(properties, 'src', 'url', 'href'),
        };
        ensureFallbackText(node, 'Abrir recurso');
        break;
      case 'equation':
      case 'block-equation':
        node.tagName = 'code';
        node.properties = { className: ['wiki-equation'] };
        ensureFallbackText(
          node,
          typeof properties.expression === 'string'
            ? properties.expression
            : 'Expresión matemática',
        );
        break;
      case 'span': {
        const colorClass = getNotionColorClass(properties.color);
        const hasUnderline = getBooleanProperty(properties, 'underline');

        node.properties = {
          ...properties,
          className: [
            ...(Array.isArray(properties.className)
              ? properties.className
              : []),
            ...(colorClass ? [colorClass] : []),
            ...(hasUnderline
              ? ['underline', 'decoration-1', 'underline-offset-2']
              : []),
          ],
        };
        break;
      }
      case 'unknown':
        node.tagName = 'aside';
        node.properties = { className: ['wiki-unsupported-block'] };
        node.children = [
          {
            type: 'text',
            value: 'Este bloque todavía no puede mostrarse fuera de Notion.',
          },
        ];
        break;
      case 'table':
        transformTableHeaders(node);
        break;
      case 'table_of_contents':
        node.tagName = 'div';
        node.properties = {};
        node.children = [];
        break;
    }
  }

  node.children?.forEach(walkHast);
};

export const rehypeNotionBlocks: Plugin<[], HastRoot> = () => (tree) => {
  walkHast(tree as unknown as HastNode);
};

export const getNotionPageIdFromUrl = (value: string): string | null => {
  try {
    const url = new URL(value);
    const match = url.pathname.match(/([0-9a-f]{32})(?:$|[?#])/i);
    return match?.[1]?.toLowerCase() ?? null;
  } catch {
    return null;
  }
};
