'use client';

import React from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';

const SyntaxCodeCard = dynamic(() => import('../components/SyntaxCodeCard'), {
  ssr: false,
});

const HeroSection = () => {
  return (
    <section>
      <div className="grid md:grid-cols-2 md:justify-center md:h-1/2 max-md:gap-4">
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
        <SyntaxCodeCard />
      </div>
    </section>
  );
};

export default HeroSection;
