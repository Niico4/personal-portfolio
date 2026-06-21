import { Heading } from './heading';

type SectionHeaderProps = {
  title: string;
  description: string;
};

export const SectionHeader = ({ title, description }: SectionHeaderProps) => {
  return (
    <div className="flex max-w-2xl flex-col items-start gap-3 sm:gap-4">
      <Heading as="h2">{title}</Heading>

      <p className="leading-relaxed text-ink-100">{description}</p>
    </div>
  );
};
