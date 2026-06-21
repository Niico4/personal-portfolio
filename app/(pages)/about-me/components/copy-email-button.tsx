'use client';

import { IconCheck, IconCopy } from '@tabler/icons-react';

import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard';

interface CopyEmailButtonProps {
  email: string;
}

export const CopyEmailButton = ({ email }: CopyEmailButtonProps) => {
  const { copyToClipboard, copiedText } = useCopyToClipboard();

  const wasCopied = copiedText === email;

  return (
    <button
      type="button"
      onClick={() => copyToClipboard(email)}
      aria-label="Copiar correo electrónico"
      className="group inline-flex items-center gap-2 text-ink-200 transition-all hover:text-ink-100"
    >
      <span className="flex size-7 items-center justify-center rounded-lg bg-ink-900 transition-all">
        {wasCopied ? (
          <IconCheck stroke={1.5} className="size-4 text-green-500" />
        ) : (
          <IconCopy stroke={1.5} className="size-4 text-ink-300" />
        )}
      </span>

      <span aria-live="polite">{wasCopied ? 'Copiado' : 'Correo'}</span>
    </button>
  );
};
