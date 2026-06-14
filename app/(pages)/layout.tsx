import Providers from '@/providers';

type SiteLayoutProps = {
  children: React.ReactNode;
};

export default function SiteLayout({ children }: Readonly<SiteLayoutProps>) {
  return (
    <Providers>
      <main className="min-h-dvh w-1/2 py-24 mx-auto">{children}</main>
    </Providers>
  );
}
