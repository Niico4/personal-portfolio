'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import { CODE_STRING } from '../data/user-info';

const HeroSection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 500);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section>
      <div className="grid md:grid-cols-2 md:place-content-center h-1/2 max-md:gap-4">
        <Image
          width={450}
          height={450}
          src="/avatar.webp"
          className="aspect-square w-full h-full object-cover"
          alt="Avatar"
          style={{
            filter: 'drop-shadow(0px 0px 12px rgba(124, 193, 253, 0.7))',
          }}
        />
        <article className="relative w-full rounded-lg bg-[#32323266] overflow-hidden z-10">
          <div className="absolute top-0 left-0 w-full">
            <div className="relative flex-center py-2 px-2 bg-black/50">
              <span className="text-sm text-paragraph/80">developer.ts</span>
              <div className="absolute flex-center gap-2 left-2">
                <div className="rounded-full bg-red-500/85 size-3" />
                <div className="rounded-full bg-yellow-500/85 size-3" />
                <div className="rounded-full bg-green-500/85 size-3" />
              </div>
            </div>
          </div>

          <SyntaxHighlighter
            language="javascript"
            style={atomOneDark}
            wrapLines
            customStyle={{
              backgroundColor: 'transparent',
              marginTop: '20px',
              fontSize:
                isMobile || window.innerWidth === 1440 ? '12px' : '16px',
            }}
          >
            {CODE_STRING}
          </SyntaxHighlighter>
        </article>
      </div>
    </section>
  );
};

export default HeroSection;
