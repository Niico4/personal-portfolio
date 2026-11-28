'use client';

import { type ReactNode, useState } from 'react';

import { cn } from '@/lib/utils';

import s from './inspector.module.css';

interface InspectorTriggerProps {
  children: ReactNode;
}

export const InspectorTrigger = ({ children }: InspectorTriggerProps) => {
  const [state, setState] = useState<'idle' | 'running' | 'aligned'>('idle');

  return (
    <>
      <button
        type="button"
        className={cn(
          'relative inline-flex cursor-pointer items-center border-b border-dotted border-primary align-baseline leading-tight text-foreground',
          'hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-ring active:text-primary',
          'after:absolute after:inset-x-0 after:inset-y-[-0.2rem] after:content-[""]',
          s.trigger,
        )}
        data-inspection={state}
        title="Inspeccionar la alineación"
        onClick={() => setState('running')}
        onAnimationEnd={(event) => {
          if (event.target === event.currentTarget) {
            setState('aligned');
          }
        }}
      >
        {children}{' '}
        <svg
          viewBox="0 0 18 18"
          width="24"
          height="24"
          aria-hidden="true"
          shapeRendering="crispEdges"
        >
          <path
            fill="currentColor"
            d="M4 4h1v1h1v1h1v1h1v1h1v1h1v1H8v1h1v2h1v1H8v-1H7v-2H6v-1H5v1H4Z"
          />

          <rect
            x="4"
            y="3"
            width="1"
            height="1"
            className="transform-[translateX(2px)] fill-primary motion-safe:transition-[transform] motion-safe:duration-180 motion-safe:ease-out"
          />
        </svg>
      </button>

      <span role="status" className="sr-only" lang="en">
        {state === 'aligned' ? 'Now it looks fine.' : ''}
      </span>
    </>
  );
};
