import Image from 'next/image';

import { InspectorOverlay } from '@/(pages)/(home)/components/inspector/inspector-overlay';
import { cn } from '@/lib/utils';

import inspector from './inspector/inspector.module.css';

const AVATAR_IMAGE = '/avatar-circle-light-512.webp';

interface HeaderProps {
  professionalTitle: string;
}

export const Header = ({ professionalTitle }: HeaderProps) => {
  return (
    <header
      id="header"
      className={cn(
        'flex min-w-0 items-center gap-[clamp(0.7rem,2vw,1.2rem)]',
        inspector.identity,
      )}
    >
      <Image
        src={AVATAR_IMAGE}
        width={72}
        height={72}
        alt=""
        loading="eager"
        className="h-auto w-(--avatar-size) shrink-0"
      />

      <div className="min-w-0">
        <h1
          id="nombre"
          className="font-display text-[clamp(1.65rem,5.8vw,2.7rem)] leading-[1.04] font-semibold tracking-[-0.04em]"
        >
          Nicolás Garzón
        </h1>

        <p className="mt-1 text-[0.93rem] text-fg-secondary">
          {professionalTitle}
        </p>
      </div>

      <InspectorOverlay />
    </header>
  );
};
