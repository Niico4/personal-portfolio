'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from 'framer-motion';

import NavigationLink from './NavigationLink';
import ToggleButton from './ToggleButton';
import MobileMenu from './MobileMenu';
import { routesInNavbar, scrollAnimations } from './navbar.config';
import SocialLink from './SocialLink';
import { SOCIAL_LINKS } from './data/social-links';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const currentPathname = usePathname();
  const { scrollY } = useScroll();

  const navScale = useTransform(
    scrollY,
    scrollAnimations.scale.inputRange,
    scrollAnimations.scale.outputRange,
  );
  const navWidth = useTransform(
    scrollY,
    scrollAnimations.width.inputRange,
    scrollAnimations.width.outputRange,
  );

  const bgColor = useTransform(
    scrollY,
    scrollAnimations.bgColor.inputRange,
    scrollAnimations.bgColor.outputRange,
  );

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [currentPathname]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  return (
    <>
      <motion.nav
        style={{
          backgroundColor: bgColor,
          scale: navScale,
          width: navWidth,
        }}
        className="sticky top-0 flex items-center justify-between mx-auto px-5 py-2 rounded-full border border-white/[0.06] backdrop-blur-md z-50 transition-all"
      >
        <Link href="/" aria-label="Logo" className="hidden sm:block">
          <Image
            alt="Avatar"
            className="size-full object-cover p-1 rounded-full border border-white/20 bg-white/5"
            src="/avatar.webp"
            height={22}
            width={22}
            priority
          />
        </Link>

        <article className="hidden sm:flex items-center gap-4">
          {routesInNavbar.map(({ href, label }, index) => (
            <NavigationLink
              key={index}
              currentPathname={currentPathname}
              label={label}
              href={href}
            />
          ))}
        </article>

        <article>
          <ul className="flex items-center gap-2 bg-white/5 rounded-full px-2 py-1">
            {SOCIAL_LINKS.map(({ label, href, icon }, index) => (
              <li key={index}>
                <SocialLink href={href} icon={icon} label={label} />
              </li>
            ))}
          </ul>
        </article>

        <ToggleButton isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      </motion.nav>

      <AnimatePresence>
        {isMenuOpen && <MobileMenu currentPathname={currentPathname} />}
      </AnimatePresence>
    </>
  );
};

export default NavBar;
