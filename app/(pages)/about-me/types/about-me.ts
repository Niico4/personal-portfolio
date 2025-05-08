export interface EducationCardProps {
  title: string;
  date: string;
  institution: string;
  hasCertificate?: boolean;
}

export interface TechnologyCardProps {
  label: string;
  icon: (props: React.SVGProps<SVGSVGElement>) => React.JSX.Element;
}

export interface TimeLineProps {
  date: string;
  title: string;
  description: string;
}
