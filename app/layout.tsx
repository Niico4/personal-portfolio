import { Raleway } from 'next/font/google';

import { Provider } from '@/providers/Provider';

import NavBar from './layout/NavBar';
import GradientBg from './layout/GradientBg';

import '@/styles/globals.css';

const raleway = Raleway({
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
      </head>
      <body
        className={`${raleway.className} antialiased min-h-screen flex flex-col`}
      >
        <GradientBg />
        <Provider>
          <div className="w-[95%] xl:w-1/2 mx-auto">
            <NavBar />
            <main className="my-10">{children}</main>
          </div>
        </Provider>
      </body>
    </html>
  );
}
