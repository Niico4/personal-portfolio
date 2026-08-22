'use client';

import { IconPlayerPlay, IconX } from '@tabler/icons-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useId, useRef, useState } from 'react';

interface ProjectDemoViewerProps {
  title: string;
  videoSource: string;
}

export const ProjectDemoViewer = ({
  title,
  videoSource,
}: ProjectDemoViewerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const titleId = useId();

  const closeViewer = () => {
    videoRef.current?.pause();
    setIsOpen(false);
  };

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!isOpen || !dialog) return;

    if (!dialog.open) {
      dialog.showModal();
    }

    const scrollPosition = window.scrollY;
    const { style } = document.body;
    const previousBodyStyles = {
      left: style.left,
      overflow: style.overflow,
      position: style.position,
      right: style.right,
      top: style.top,
      width: style.width,
    };

    style.left = '0';
    style.overflow = 'hidden';
    style.position = 'fixed';
    style.right = '0';
    style.top = `-${scrollPosition}px`;
    style.width = '100%';

    const video = videoRef.current;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;

      event.preventDefault();
      video?.pause();
      setIsOpen(false);
    };

    closeButtonRef.current?.focus();
    video?.play().catch(() => undefined);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);

      if (video) {
        video.pause();
        video.currentTime = 0;
      }

      Object.assign(style, previousBodyStyles);
      window.scrollTo(0, scrollPosition);
    };
  }, [isOpen]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-1 bg-indigo-300/10 border-1 border-indigo-300/10 text-xs text-indigo-400 font- px-2 py-1 rounded-full"
      >
        <span>Ver demo</span>
        <IconPlayerPlay stroke={1.2} size={14} aria-hidden="true" />
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        aria-modal="true"
        onCancel={(event) => {
          event.preventDefault();
          closeViewer();
        }}
        onClose={() => {
          setIsOpen(false);
          triggerRef.current?.focus();
        }}
        className="fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none overflow-hidden bg-transparent p-0 text-zinc-300 outline-none backdrop:bg-transparent"
      >
        <AnimatePresence
          onExitComplete={() => {
            if (dialogRef.current?.open) {
              dialogRef.current.close();
            }
          }}
        >
          {isOpen && (
            <motion.div
              key="project-demo-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              onPointerDown={(event) => {
                if (event.target === event.currentTarget) {
                  closeViewer();
                }
              }}
              className="flex h-dvh w-screen items-center justify-center bg-main/80 [padding-bottom:max(1rem,env(safe-area-inset-bottom))] [padding-left:max(1rem,env(safe-area-inset-left))] [padding-right:max(1rem,env(safe-area-inset-right))] [padding-top:max(1rem,env(safe-area-inset-top))] sm:p-6"
            >
              <motion.section
                initial={{ opacity: 0, scale: 0.99, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.995, y: 4 }}
                transition={{
                  duration: 0.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex h-auto w-[min(100%,calc((100dvh-5rem)*16/9))] min-w-0 flex-col overflow-hidden border border-zinc-300/10 bg-main sm:w-[min(92vw,calc((100dvh-6rem)*16/9))] sm:max-w-7xl"
              >
                <header className="flex min-h-12 shrink-0 items-center justify-between border-b border-zinc-300/10 px-3 sm:px-4">
                  <h2
                    id={titleId}
                    className="min-w-0 truncate text-sm font-normal text-zinc-300 sm:text-base"
                  >
                    <span className="text-zinc-500">Demo / </span>
                    {title}
                  </h2>

                  <button
                    ref={closeButtonRef}
                    type="button"
                    aria-label={`Cerrar demo de ${title}`}
                    onClick={closeViewer}
                    className="grid size-11 shrink-0 place-items-center rounded-full text-zinc-400 transition-colors duration-300 hover:bg-zinc-300/[0.06] hover:text-zinc-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-main active:bg-zinc-300/10"
                  >
                    <IconX size={20} stroke={1.2} aria-hidden="true" />
                  </button>
                </header>

                <div className="flex aspect-video min-h-0 flex-none items-center bg-black">
                  <video
                    ref={videoRef}
                    src={videoSource}
                    aria-label={`Video demo de ${title}`}
                    controls
                    playsInline
                    preload="auto"
                    className="aspect-video max-h-full w-full bg-black object-contain"
                  />
                </div>
              </motion.section>
            </motion.div>
          )}
        </AnimatePresence>
      </dialog>
    </>
  );
};
