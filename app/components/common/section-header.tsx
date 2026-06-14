import Heading from './heading';

type SectionHeaderProps = {
  title: string;
  description: string;
};

export const SectionHeader = ({ title, description }: SectionHeaderProps) => {
  return (
    <div className="flex flex-col items-start gap-4">
      <Heading as="h2">{title}</Heading>

      <p className="text-ink-100">{description}</p>
    </div>
  );
};
