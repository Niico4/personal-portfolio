import type { ReactNode } from 'react';

import { FloatingNavbar } from '@/components/layout/navbar/navbar';

export default function PortfolioLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <FloatingNavbar />

      <main className="mx-auto min-h-dvh w-full max-w-3xl px-5 py-20 sm:px-8">
        {children}
      </main>
    </>
  );
}
