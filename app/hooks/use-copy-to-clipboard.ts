'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

type CopiedValue = string | null;

interface UseCopyToClipboardOptions {
  resetDelay?: number;
}

export const useCopyToClipboard = ({
  resetDelay = 2000,
}: UseCopyToClipboardOptions = {}) => {
  const [copiedText, setCopiedText] = useState<CopiedValue>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const copyToClipboard = useCallback(
    async (text: string) => {
      if (typeof navigator === 'undefined' || !navigator.clipboard) {
        console.error('Clipboard not supported');
        return false;
      }

      try {
        await navigator.clipboard.writeText(text);

        setCopiedText(text);

        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
          setCopiedText(null);
        }, resetDelay);

        return true;
      } catch (error) {
        console.error('Copy failed', error);
        setCopiedText(null);
        return false;
      }
    },
    [resetDelay],
  );

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    copiedText,
    copyToClipboard,
  };
};
