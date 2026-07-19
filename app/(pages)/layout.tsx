import { FloatingNavbar } from '@/layout/navbar/navbar';
import Providers from '@/providers';

type SiteLayoutProps = {
  children: React.ReactNode;
};

export default function SiteLayout({ children }: Readonly<SiteLayoutProps>) {
  return (
    <Providers>
      <FloatingNavbar />
      <main className="mx-auto min-h-dvh w-full px-5 py-24 lg:w-3/4 xl:w-2/5">
        {children}
      </main>
    </Providers>
  );
}
