import { Chip } from '@heroui/chip';

export const SkillChip = ({
  label,
  size = 'sm',
  radius = 'full',
}: {
  label: string;
  size?: 'sm' | 'md' | 'lg';
  radius?: 'sm' | 'md' | 'lg' | 'full' | 'none';
}) => {
  return (
    <Chip
      className="bg-ink-900 border-1 border-ink-700 text-ink-200"
      radius={radius}
      size={size}
    >
      {label}
    </Chip>
  );
};
