'use client';

import { IconArrowUp } from '@tabler/icons-react';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export const Footer = () => {
  return (
    <footer className="mt-16 space-y-5 pb-6">
      <Separator className="bg-border/50" />

      <div className="space-y-4">
        <p className="text-sm leading-relaxed text-fg-subtle">
          Diseñado y desarrollado por mí.
          <br />
          Probablemente vuelva a refactorizarlo.
        </p>

        <div className="text-xs leading-relaxed">
          <p className="text-fg-muted">otra vez :)</p>
          <p className="font-display text-fg-secondary">— nicoo 🐐</p>
        </div>
      </div>

      <Separator className="bg-border/50" />

      <div className="flex items-center justify-between gap-4">
        <small className="text-xs text-fg-muted">
          © {new Date().getFullYear()}
        </small>

        <Button
          type="button"
          variant="outline"
          size="sm"
          className="rounded-full text-fg-muted"
          aria-label="Volver arriba"
          onClick={() => window.scrollTo({ top: 0 })}
        >
          Volver arriba
          <IconArrowUp stroke={1.4} />
        </Button>
      </div>
    </footer>
  );
};
