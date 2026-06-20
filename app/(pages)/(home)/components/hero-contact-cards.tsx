'use client';

import { IconDownload, IconExternalLink, IconMail } from '@tabler/icons-react';
import { Button } from '@heroui/button';
import { Tooltip } from '@heroui/tooltip';

import NicolasLogo from '@/components/common/icons/nicolas-logo';

import GitHubIcon from '../../../../public/icons/tech/github.svg';
import LinkedInIcon from '../../../../public/icons/linkedin.svg';
import CopyEmailButton from '../components/copy-email-button';
import { ContactCard } from '../components/contact-card';

interface ContactCardsProps {
  resumeHref: string | null;
  resumeDisabled: boolean;
  isSanityFile: boolean;
  linkedinUrl: string;
  githubUrl: string;
  email: string;
}

const ACTION_LABELS = {
  downloadResume: 'Descarga mi currículum',
  copyEmail: 'Copia mi correo',
  openGithub: 'Mira mi GitHub',
  openLinkedin: 'Visita mi LinkedIn',
} as const;

export const HeroContactCards = ({
  resumeHref,
  resumeDisabled,
  isSanityFile,
  linkedinUrl,
  githubUrl,
  email,
}: ContactCardsProps) => {
  return (
    <article className="grid grid-cols-2 gap-5">
      <ContactCard
        label="Currículum"
        icon={<NicolasLogo className="size-7 shrink-0 text-ink-50" />}
        action={
          <Tooltip
            content={ACTION_LABELS.downloadResume}
            color="primary"
            placement="top"
            showArrow
          >
            <Button
              isIconOnly
              as="a"
              href={resumeHref ?? '#'}
              download={isSanityFile ? 'nicolas-garzon-cv.pdf' : undefined}
              target={isSanityFile ? undefined : '_blank'}
              rel={isSanityFile ? undefined : 'noopener noreferrer'}
              isDisabled={resumeDisabled}
              variant="light"
              className="text-ink-300"
              aria-label={ACTION_LABELS.downloadResume}
            >
              <IconDownload stroke={1.5} size={20} />
            </Button>
          </Tooltip>
        }
      />

      <ContactCard
        label="LinkedIn"
        icon={<LinkedInIcon className="size-7 shrink-0" />}
        action={
          <Tooltip
            content={ACTION_LABELS.openLinkedin}
            color="primary"
            placement="top"
            showArrow
          >
            <Button
              isIconOnly
              as="a"
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="light"
              className="text-ink-300"
              aria-label={ACTION_LABELS.openLinkedin}
            >
              <IconExternalLink stroke={1.5} size={20} />
            </Button>
          </Tooltip>
        }
      />

      <ContactCard
        label="GitHub"
        icon={<GitHubIcon className="size-7 shrink-0 text-ink-50" />}
        action={
          <Tooltip
            content={ACTION_LABELS.openGithub}
            color="primary"
            placement="top"
            showArrow
          >
            <Button
              isIconOnly
              as="a"
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="light"
              className="text-ink-300"
              aria-label={ACTION_LABELS.openGithub}
            >
              <IconExternalLink stroke={1.5} size={20} />
            </Button>
          </Tooltip>
        }
      />

      <ContactCard
        label="Correo"
        icon={<IconMail stroke={1.5} size={28} className="text-ink-100" />}
        action={
          <CopyEmailButton email={email} content={ACTION_LABELS.copyEmail} />
        }
      />
    </article>
  );
};
