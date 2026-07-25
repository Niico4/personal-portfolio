'use client';

import { useState } from 'react';
import Image from 'next/image';
import { IconPhotoOff } from '@tabler/icons-react';

type WikiImageProps = {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
};

export const WikiImage = ({
  src,
  alt,
  sizes,
  className,
  priority = false,
}: WikiImageProps) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <span
        aria-label={alt ? 'Imagen no disponible' : undefined}
        aria-hidden={alt ? undefined : 'true'}
        className="absolute inset-0 grid place-items-center bg-ink-900"
      >
        <IconPhotoOff
          aria-hidden="true"
          className="size-8 text-ink-600"
          stroke={1.4}
        />
      </span>
    );
  }

  return (
    <Image
      fill
      src={src}
      alt={alt}
      sizes={sizes}
      preload={priority}
      onError={() => setHasError(true)}
      className={className}
    />
  );
};
