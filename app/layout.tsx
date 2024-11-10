import { Raleway } from 'next/font/google';

import { Provider } from '@/providers/Provider';

import NavBar from './components/layout/NavBar';
import GradientBg from './components/layout/GradientBg';
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
          <NavBar />
          <div className="w-[95%] xl:w-2/3 min-[1300px]:w-1/2 mx-auto">
            <main className="my-10">{children}</main>
          </div>
        </Provider>
      </body>
    </html>
  );
}
