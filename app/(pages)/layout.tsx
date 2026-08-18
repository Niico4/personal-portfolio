// import { FloatingNavbar } from '@/layout/navbar/navbar';
import Providers from '@/providers';

type SiteLayoutProps = {
  children: React.ReactNode;
};

export default function SiteLayout({ children }: Readonly<SiteLayoutProps>) {
  return (
    <Providers>
      {/* <FloatingNavbar /> */}
      <div className="mx-auto min-h-dvh w-full sm:w-11/12 xl:w-2/5 relative px-5 pb-20">
        {children}
      </div>
    </Providers>
  );
}
