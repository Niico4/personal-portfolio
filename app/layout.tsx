import { dmSans } from './fonts';

import '@/styles/globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="bg-main">
      <body
        className={`${dmSans.className} custom-theme min-h-dvh overscroll-none bg-main text-ink-100 font-light antialiased`}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-0 bg-[linear-gradient(to_right,#4f4f4f1f_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f16_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"
        />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
