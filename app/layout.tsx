import { raleway } from './fonts';

import '@/styles/globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${raleway.className} flex flex-col min-h-dvh bg-zinc-950/[0.93] sm:bg-zinc-950/95 py-8`}
      >
        {children}
      </body>
    </html>
  );
}
