import { raleway } from '@/fonts';
import NavBar from '@/layout/components/navbar';
import GradientBg from '@/layout/GradientBg';
import Providers from '@/providers';

type SiteLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Readonly<SiteLayoutProps>) {
  return (
    <Providers>
      <div
        className={`${raleway.className} flex flex-col min-h-dvh bg-zinc-950/[0.93] sm:bg-zinc-950/95 py-8`}
      >
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f1f_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f16_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        <GradientBg />

        <div className="w-11/12 lg:w-3/4 xl:w-1/2 1.5xl:w-2/5 mx-auto custom-theme">
          <NavBar />
          <main className="my-8">{children}</main>
        </div>
      </div>
    </Providers>
  );
}
