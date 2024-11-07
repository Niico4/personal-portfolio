import type { Metadata } from 'next';
import { Raleway } from 'next/font/google';

import { Provider } from '@/providers/Provider';

import NavBar from './components/layout/NavBar';

import '@/styles/globals.css';

const raleway = Raleway({
  subsets: ['latin'],
  display: 'swap',
  weight: ['200', '300', '400', '500', '600', '700', '900'],
});

export async function generateMetadata({
  title,
  description,
}: {
  title: string;
  description: string;
}): Promise<Metadata> {
  return {
    title: `${title} | Nicolas Garzón`,
    description,
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="shortcut icon" href="/Subtract.svg" type="image/x-icon" />
      </head>
      <body
        className={`${raleway.className} antialiased bg-gradient-layout min-h-screen flex flex-col`}
      >
        <Provider>
          <div className="w-1/2 mx-auto">
            <NavBar />
            <main className="my-10">{children}</main>
          </div>
        </Provider>
      </body>
    </html>
  );
}
