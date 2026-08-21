import Link from 'next/link';
import { motion } from 'framer-motion';

import { NavItem } from './navbar.config';

interface NavbarItemProps {
  item: NavItem;
  isActive: boolean;
  activeHref?: string;
}

export const NavbarItem = ({ item, isActive, activeHref }: NavbarItemProps) => {
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      aria-current={isActive ? 'page' : undefined}
      aria-label={item.label}
      className="
          group relative grid size-11 shrink-0 place-items-center rounded-full
          outline-none transition-transform duration-300 hover:scale-105
        "
    >
      <span className="sr-only">{item.label}</span>
      {isActive && (
        <motion.span
          layoutId="floating-navbar-active"
          layoutDependency={activeHref}
          initial={false}
          className="
              absolute inset-0 rounded-full border border-zinc-300/[0.08] bg-zinc-300/[0.05]
            "
          transition={{
            type: 'spring',
            stiffness: 420,
            damping: 34,
          }}
        />
      )}

      <span
        className={`
            relative z-10 grid size-full place-items-center rounded-full
            transition-colors duration-300
            ${
              isActive
                ? 'text-zinc-300'
                : 'text-zinc-400 group-hover:bg-zinc-800 group-hover:text-zinc-100'
            }
          `}
      >
        <Icon size={24} stroke={1} />
      </span>
    </Link>
  );
};
