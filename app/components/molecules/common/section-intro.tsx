import { Heading } from '../../atoms/common/heading';

interface SectionIntro {
  title: string;
  description?: string;
}

export const SectionIntro = ({ title, description }: SectionIntro) => {
  return (
    <div className="flex flex-col gap-1 sm:gap-2">
      <Heading as="h2">{title}</Heading>

      <p className="leading-relaxed text-sm text-zinc-400">{description}</p>
    </div>
  );
};
