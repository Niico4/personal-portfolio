import { FloatingNavbar } from '@/components/layout/navbar/navbar';
import Providers from '@/providers';

type SiteLayoutProps = {
  children: React.ReactNode;
};

export default function SiteLayout({ children }: Readonly<SiteLayoutProps>) {
  return (
    <Providers>
      <FloatingNavbar />
      <div className="relative mx-auto min-h-dvh w-full px-5 pb-28 sm:w-11/12 sm:pb-32 xl:w-2/5">
        {children}
      </div>
    </Providers>
  );
}
