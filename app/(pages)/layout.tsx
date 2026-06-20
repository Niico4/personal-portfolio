import { FloatingNavbar } from '@/layout/navbar/navbar';
import Providers from '@/providers';

type SiteLayoutProps = {
  children: React.ReactNode;
};

export default function SiteLayout({ children }: Readonly<SiteLayoutProps>) {
  return (
    <Providers>
      <FloatingNavbar />
      <main className="mx-auto min-h-dvh w-full px-4 pb-32 pt-12 sm:px-6 sm:pt-16 lg:max-w-4xl lg:px-8 lg:py-24">
        {children}
      </main>
    </Providers>
  );
}
