import { Link } from '@heroui/link';
import type { Icon } from '@tabler/icons-react';

const SOCIAL_CHIP_VARIANTS = {
  resume: `
    border-purple-800
    bg-purple-900/15
    text-purple-300
    hover:border-purple-700
    hover:bg-purple-900/25
    focus-visible:ring-purple-400
  `,

  github: `
    border-ink-700
    bg-ink-900/15
    text-ink-100
    hover:border-ink-600
    hover:bg-ink-900/30
    focus-visible:ring-ink-400
  `,

  linkedin: `
    border-brand-800
    bg-brand-900/15
    text-brand-300
    hover:border-brand-700
    hover:bg-brand-900/25
    focus-visible:ring-brand-400
  `,

  email: `
    border-yellow-700
    bg-yellow-900/25
    text-yellow-300
    hover:border-yellow-600
    hover:bg-yellow-900/35
    focus-visible:ring-yellow-400
  `,
} as const;

type SocialChipVariant = keyof typeof SOCIAL_CHIP_VARIANTS;

interface SocialChipProps {
  href: string;
  icon: Icon;
  label: string;
  variant: SocialChipVariant;
  isExternal?: boolean;
}

const socialChipBaseClassName = `
  flex items-center rounded-full px-2 py-1 gap-1
  text-xs border-1
  transition-[color,background-color,border-color,transform,box-shadow]
  duration-300 ease-out
  active:scale-[0.98]
  focus-visible:outline-none
  focus-visible:ring-2
  focus-visible:ring-offset-2
  focus-visible:ring-offset-main
  motion-reduce:transform-none
  motion-reduce:transition-none
`;

export const SocialChip = ({
  href,
  icon: Icon,
  label,
  variant,
  isExternal = false,
}: SocialChipProps) => {
  return (
    <Link
      href={href}
      isExternal={isExternal}
      className={`
        ${socialChipBaseClassName}
        ${SOCIAL_CHIP_VARIANTS[variant]}
      `}
    >
      <Icon aria-hidden stroke={1.5} size={16} />

      <span>{label}</span>
    </Link>
  );
};
