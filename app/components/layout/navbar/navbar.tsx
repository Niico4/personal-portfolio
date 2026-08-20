'use client';

import { usePathname } from 'next/navigation';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import { ScrollToTopButton } from '@/(pages)/(home)/components/atoms/scroll-to-top-button';

import { NavbarItem } from './navbar-item';
import { NAV_ITEMS } from './navbar.config';

const getActiveHref = (pathname: string) => {
  return NAV_ITEMS.find((item) => {
    if (item.href === '/') {
      return pathname === '/';
    }

    return pathname === item.href || pathname.startsWith(`${item.href}/`);
  })?.href;
};

export const FloatingNavbar = () => {
  const pathname = usePathname();
  const activeHref = getActiveHref(pathname);

  const [showScrollToTop, setShowScrollToTop] = useState(false);

  useEffect(() => {
    const header = document.getElementById('header');

    if (!header) return;

    const observer = new IntersectionObserver(([entry]) => {
      setShowScrollToTop(!entry.isIntersecting);
    });

    observer.observe(header);

    return () => observer.disconnect();
  }, [pathname]);

  return (
    <motion.nav
      layoutRoot
      aria-label="Navegación principal"
      className="
        fixed
        bottom-[calc(1rem+env(safe-area-inset-bottom))]
        left-1/2
        z-50
        max-w-[calc(100vw-2rem)]
        -translate-x-1/2

        sm:bottom-[calc(2.5rem+env(safe-area-inset-bottom))]
      "
    >
      <LayoutGroup id="floating-navbar">
        <motion.div
          layout
          className="flex items-center gap-3"
          transition={{
            layout: {
              type: 'spring',
              stiffness: 400,
              damping: 30,
            },
          }}
        >
          <div
            className="
      flex
      items-center
      rounded-full
      border
      border-zinc-300/[0.05]
      bg-zinc-300/[0.06]
      px-2
      py-1.5
      backdrop-blur-md
    "
          >
            <ul className="flex items-center gap-2">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <NavbarItem
                    item={item}
                    isActive={item.href === activeHref}
                    activeHref={activeHref}
                  />
                </li>
              ))}
            </ul>
          </div>

          <AnimatePresence mode="popLayout">
            {showScrollToTop && (
              <motion.div
                layout
                initial={{
                  opacity: 0,
                  scale: 0.8,
                  x: -8,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  x: 0,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.8,
                  x: -8,
                }}
                transition={{
                  duration: 0.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <ScrollToTopButton />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>
    </motion.nav>
  );
};
