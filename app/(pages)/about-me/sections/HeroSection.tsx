'use client';

import React from 'react';
import Image from 'next/image';
import { useMediaQuery } from '@uidotdev/usehooks';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { nightOwl } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { Card, CardBody, CardHeader } from '@heroui/card';

import { CODE_STRING } from '../data/user-info';

const HeroSection = () => {
  const isSmallDevice = useMediaQuery('only screen and (max-width : 768px)');
  const is1440px = useMediaQuery('only screen and (width: 1440px)');

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
        <Card className="bg-white/[0.08]" radius="sm" isBlurred>
          <CardHeader>
            <div className="absolute top-0 left-0 w-full">
              <div className="relative flex-center py-2 px-2 bg-white/[0.09]">
                <span className="text-sm text-muted">developer.ts</span>
                <div className="absolute flex-center gap-2 left-2">
                  <div className="rounded-full bg-red-500/85 size-3" />
                  <div className="rounded-full bg-yellow-500/85 size-3" />
                  <div className="rounded-full bg-green-500/85 size-3" />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardBody className="p-4">
            <SyntaxHighlighter
              language="typescript"
              style={nightOwl}
              customStyle={{
                backgroundColor: 'transparent',
                fontSize: isSmallDevice || is1440px ? '12px' : '16px',
              }}
            >
              {CODE_STRING}
            </SyntaxHighlighter>
          </CardBody>
        </Card>
      </div>
    </section>
  );
};

export default HeroSection;
