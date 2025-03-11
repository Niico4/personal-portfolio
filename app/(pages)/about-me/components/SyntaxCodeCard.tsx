import { Card, CardHeader, CardBody } from '@heroui/card';
import { useMediaQuery } from '@uidotdev/usehooks';
import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { nightOwl } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import { CODE_STRING } from '../data/user-info';

const SyntaxCodeCard = () => {
  const isSmallDevice = useMediaQuery('only screen and (max-width : 768px)');
  const is1440px = useMediaQuery('only screen and (width: 1440px)');
  return (
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
  );
};

export default SyntaxCodeCard;
