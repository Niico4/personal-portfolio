import { Heading } from './heading';

type SectionHeaderProps = {
  title: string;
  description?: string;
};

export const SectionHeader = ({ title, description }: SectionHeaderProps) => {
  return (
    <div className="flex flex-col gap-1 sm:gap-2">
      <Heading as="h2">{title}</Heading>

      <p className="leading-relaxed text-xs sm:text-sm text-ink-100">
        {description}
      </p>
    </div>
  );
};
