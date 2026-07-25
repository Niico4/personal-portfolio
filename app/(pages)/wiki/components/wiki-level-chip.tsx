import { Chip } from '@heroui/chip';

import type { WikiNoteLevel } from '../lib/wiki-contract';

type WikiLevelStyle = {
  chip: string;
  selectedControl: string;
  indicator: string;
};

export const WIKI_LEVEL_STYLES: Record<WikiNoteLevel, WikiLevelStyle> = {
  Fundamentos: {
    chip: 'border-brand-400/45 bg-brand-500/10 text-brand-100',
    selectedControl: 'border-brand-400/50 bg-brand-500/10 text-brand-100',
    indicator: 'bg-brand-300',
  },
  Aplicación: {
    chip: 'border-green-400/40 bg-green-500/10 text-green-100',
    selectedControl: 'border-green-400/45 bg-green-500/10 text-green-100',
    indicator: 'bg-green-300',
  },
  Profundización: {
    chip: 'border-purple-400/45 bg-purple-500/10 text-purple-100',
    selectedControl: 'border-purple-400/50 bg-purple-500/10 text-purple-100',
    indicator: 'bg-purple-300',
  },
};

export const WikiLevelChip = ({ level }: { level: WikiNoteLevel }) => (
  <Chip
    size="sm"
    radius="full"
    variant="bordered"
    className={[
      'h-7 select-none border px-1 font-mono text-[0.65rem] font-medium uppercase tracking-[0.1em]',
      WIKI_LEVEL_STYLES[level].chip,
    ].join(' ')}
  >
    {level}
  </Chip>
);
