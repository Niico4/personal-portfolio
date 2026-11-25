import Image from 'next/image';

import { getProfile } from '@/sanity/lib/fetchers/profile.fetcher';

const AVATAR_IMAGE = '/avatar-circle-light-512.webp';

export const Header = async () => {
  const { professionalTitle } = await getProfile();

  return (
    <header id="header" className="flex items-center gap-3 sm:gap-4">
      <Image
        src={AVATAR_IMAGE}
        width={84}
        height={84}
        alt=""
        loading="eager"
        className="size-17 shrink-0 sm:size-21"
      />

      <div className="space-y-0.5">
        <h1 className="font-display text-2xl leading-tight font-semibold tracking-tight text-fg-strong sm:text-3xl">
          Nicolás Garzón
        </h1>

        <p className="text-sm text-fg-subtle sm:text-base">
          {professionalTitle}
        </p>
      </div>
    </header>
  );
};
