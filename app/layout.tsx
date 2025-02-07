'use client';

import { useEffect } from 'react';
import { Raleway } from 'next/font/google';
import { HeroUIProvider } from '@heroui/system';

import NavBar from './layout/NavBar';
import GradientBg from './layout/GradientBg';
import useBackgroundStore from './store/useBackgroundStore';

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
  const { initializeState, isActiveBgGradient } = useBackgroundStore();

  useEffect(() => {
    initializeState();
  }, [initializeState]);

  return (
    <html lang="es">
      <body
        className={`${raleway.className} flex flex-col py-8 ${
          isActiveBgGradient
            ? ''
            : 'bg-gradient-to-r from-black via-blue-950 to-black'
        }`}
      >
        {isActiveBgGradient ? <GradientBg /> : null}
        <HeroUIProvider>
          <div className="w-[95%] xl:w-1/2 mx-auto custom-theme">
            <NavBar />
            <main className="my-10">{children}</main>
          </div>
        </HeroUIProvider>
      </body>
    </html>
  );
}
