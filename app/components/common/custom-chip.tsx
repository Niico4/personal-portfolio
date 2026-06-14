import { Chip } from '@heroui/chip';

export const CustomChip = ({ label }: { label: string }) => {
  return (
    <Chip
      className="bg-ink-900 border-2 border-ink-800 text-ink-400"
      radius="sm"
    >
      {label}
    </Chip>
  );
};
