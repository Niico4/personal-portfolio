import { dmSans } from '@/fonts';
import NavBar from '@/layout/components/navbar';
import Providers from '@/providers';

type SiteLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Readonly<SiteLayoutProps>) {
  return (
    <Providers>
      <div
        className={`${dmSans.className} flex flex-col bg-[#080A0F] py-8 font-light`}
      >
        {/* <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f1f_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f16_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" /> */}

        <div className="w-3/5 mx-auto custom-theme">
          <NavBar />
          <main className="my-8">{children}</main>
        </div>
      </div>
    </Providers>
  );
}
