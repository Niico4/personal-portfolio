import {
  IconMail,
  IconBrandLinkedin,
  IconBrandGithub,
} from '@tabler/icons-react';

import { SocialLinkProps } from '../SocialLink';

export const SOCIAL_LINKS: SocialLinkProps[] = [
  {
    icon: IconMail,
    label: 'Gmail',
    href: 'mailto:nicogarzon131@gmail.com',
  },
  {
    icon: IconBrandLinkedin,
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/nicolasgarzon131/',
  },
  {
    icon: IconBrandGithub,
    label: 'GitHub',
    href: 'https://github.com/Niico4',
  },
];
