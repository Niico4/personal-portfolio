import { Chip } from '@heroui/chip';

export const SkillChip = ({ label }: { label: string }) => {
  return (
    <Chip
      className="bg-ink-900 border-2 border-ink-800 text-ink-300/90"
      radius="sm"
    >
      {label}
    </Chip>
  );
};
