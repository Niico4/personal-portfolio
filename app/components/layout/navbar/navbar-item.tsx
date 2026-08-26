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
          outline-none focus-visible:ring-1 focus-visible:ring-brand-400
          focus-visible:ring-offset-2 focus-visible:ring-offset-main
        "
    >
      <span className="sr-only">{item.label}</span>
      {isActive && (
        <motion.span
          layoutId="floating-navbar-active"
          layoutDependency={activeHref}
          initial={false}
          className="
              absolute inset-0 rounded-full border border-brand-400/[0.12] bg-brand-400/[0.08]
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
            transition-all duration-150 ease-out
            group-active:scale-[0.97]
            ${
              isActive
                ? 'text-brand-300 group-hover:bg-brand-400/[0.05] group-hover:text-brand-200'
                : 'text-content-muted group-hover:bg-line/[0.06] group-hover:text-content-primary'
            }
          `}
      >
        <Icon size={23} stroke={1} aria-hidden="true" />
      </span>
    </Link>
  );
};
