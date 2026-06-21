import { Button } from '@heroui/button';
import { Tooltip } from '@heroui/tooltip';
import { IconCheck, IconCopy } from '@tabler/icons-react';

import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard';

type CopyEmailButtonProps = {
  email: string;
  content: string;
};

const CopyEmailButton = ({ email, content }: CopyEmailButtonProps) => {
  const { copyToClipboard, copiedText } = useCopyToClipboard();

  const wasCopied = copiedText === email;

  return (
    <Tooltip content={content} color="primary" placement="top" showArrow>
      <Button
        isIconOnly
        variant="light"
        color={wasCopied ? 'success' : 'default'}
        className="h-8 min-w-8 text-ink-400"
        aria-label="Copiar correo"
        onPress={() => copyToClipboard(email)}
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
