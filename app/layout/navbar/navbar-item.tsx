import Link from 'next/link';
import { Tooltip } from '@heroui/tooltip';
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
    <Tooltip content={item.label} placement="right" showArrow delay={300}>
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
              absolute inset-0 rounded-full bg-ink-100
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
                ? 'text-ink-900'
                : 'bg-ink-900 text-ink-100 group-hover:bg-ink-800 group-hover:text-ink-100'
            }
          `}
        >
          <Icon size={24} stroke={2} />
        </span>
      </Link>
    </Tooltip>
  );
};
