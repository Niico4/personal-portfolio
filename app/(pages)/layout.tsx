import type { ReactNode } from 'react';

import { FloatingNavbar } from '@/components/layout/navbar/navbar';
import { Footer } from '@/components/layout/footer';

export default function PortfolioLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto min-h-dvh w-full max-w-3xl px-5 py-20 sm:px-8">
      <FloatingNavbar />

      <main className="flex-1">{children}</main>

      <Footer />
    </div>
  );
}
