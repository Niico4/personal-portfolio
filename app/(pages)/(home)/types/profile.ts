import { Icon } from '@tabler/icons-react';

export interface StatCardProps {
  label: string;
  value: number;
  duration?: number;
}

export interface SoftSkillProps {
  title: string;
  description: string;
  icon: Icon;
}
