'use client';

import { useState } from 'react';
import { Button } from '@heroui/button';
import { Tooltip } from '@heroui/tooltip';
import { IconCheck, IconCopy } from '@tabler/icons-react';

type CopyEmailButtonProps = {
  email: string;
  content: string;
};

const CopyEmailButton = ({ email, content }: CopyEmailButtonProps) => {
  const [wasCopied, setWasCopied] = useState(false);

  const copyEmailToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(email);

      setWasCopied(true);

      window.setTimeout(() => {
        setWasCopied(false);
      }, 2000);
    } catch (error) {
      console.error('Could not copy email:', error);
    }
  };

  return (
    <Tooltip content={content} color="primary" placement="top" showArrow>
      <Button
        isIconOnly
        variant="light"
        color={wasCopied ? 'success' : 'default'}
        className="h-8 min-w-8 text-ink-400"
        aria-label="Copiar correo"
        onPress={copyEmailToClipboard}
      >
        {wasCopied ? (
          <IconCheck stroke={1.5} size={20} className="text-green-500" />
        ) : (
          <IconCopy stroke={1.5} size={20} />
        )}
      </Button>
    </Tooltip>
  );
};

export default CopyEmailButton;
