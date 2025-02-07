import { EmblaOptionsType } from 'embla-carousel';

import AstroIcon from '@/components/common/icons/Astro';
import FigmaIcon from '@/components/common/icons/Figma';
import GitIcon from '@/components/common/icons/Git';
import GithubIcon from '@/components/common/icons/GitHub';
import NextjsIcon from '@/components/common/icons/Nextjs';
import NPMIcon from '@/components/common/icons/NPM';
import ReactIcon from '@/components/common/icons/React';
import TailwindCSSIcon from '@/components/common/icons/TailwindCSS';
import TypeScriptIcon from '@/components/common/icons/TypeScript';
import VisualStudioCodeIcon from '@/components/common/icons/VSCode';
import WarpIcon from '@/components/common/icons/Warp';
import ZODIcon from '@/components/common/icons/ZOD';

export const OPTIONS_SOFT_SKILLS: EmblaOptionsType = {
  slidesToScroll: 'auto',
  loop: true,
};

export const TECH_ICONS = [
  {
    name: 'Next.js',
    icon: NextjsIcon,
  },
  {
    name: 'React',
    icon: ReactIcon,
  },
  {
    name: 'TypeScript',
    icon: TypeScriptIcon,
  },
  {
    name: 'Tailwind CSS',
    icon: TailwindCSSIcon,
  },
  {
    name: 'ZOD',
    icon: ZODIcon,
  },
  {
    name: 'Astro',
    icon: AstroIcon,
  },
  {
    name: 'Figma',
    icon: FigmaIcon,
  },
];

export const TOOLS_ICONS = [
  {
    name: 'Visual Studio Code',
    icon: VisualStudioCodeIcon,
  },
  {
    name: 'Warp Terminal',
    icon: WarpIcon,
  },
  {
    name: 'GitHub',
    icon: GithubIcon,
  },
  {
    name: 'Git',
    icon: GitIcon,
  },
  {
    name: 'NPM',
    icon: NPMIcon,
  },
];
