import type { ReactNode } from 'react';

import { Footer } from '@/components/layout/footer';
import { Navbar } from '@/components/layout/navbar/navbar';

export default function PortfolioLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto flex min-h-dvh w-[calc(100%-3rem)] max-w-170 flex-col pt-7 pb-8 text-foreground max-[360px]:w-[calc(100%-2rem)]">
      <Navbar />

      <main className="flex-1">{children}</main>

      <Footer />
    </div>
  );
}
