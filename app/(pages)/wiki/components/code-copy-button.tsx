'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@heroui/button';
import { IconCheck, IconCopy } from '@tabler/icons-react';

export const CodeCopyButton = ({ code }: { code: string }) => {
  const [isCopied, setIsCopied] = useState(false);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (resetTimer.current) {
        clearTimeout(resetTimer.current);
      }
    },
    [],
  );

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      return;
    }

    setIsCopied(true);

    if (resetTimer.current) {
      clearTimeout(resetTimer.current);
    }

    resetTimer.current = setTimeout(() => setIsCopied(false), 1800);
  };

  return (
    <Button
      type="button"
      disableRipple
      size="sm"
      radius="md"
      variant="light"
      onPress={copyCode}
      aria-label={isCopied ? 'Código copiado' : 'Copiar código'}
      className="min-h-9 min-w-[6.25rem] gap-2 px-2.5 text-xs font-medium text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-zinc-50 focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900 motion-reduce:transition-none"
    >
      {isCopied ? (
        <IconCheck aria-hidden="true" size={15} stroke={1.8} />
      ) : (
        <IconCopy aria-hidden="true" size={15} stroke={1.8} />
      )}
      <span aria-live="polite">{isCopied ? 'Copiado' : 'Copiar'}</span>
    </Button>
  );
};
