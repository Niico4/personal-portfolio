import { Icon } from '@tabler/icons-react';

export interface StatCardProps {
  label: string;
  value: number;
  duration?: number;
}

export interface SocialLinkProps {
  icon: Icon;
  label: string;
  href: string;
}

export interface SoftSkillProps {
  title: string;
  description: string;
  icon: Icon;
}

export interface ProfileDetailProps {
  icon: Icon;
  label: string;
}
