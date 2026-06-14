'use client';

import { IconDownload, IconExternalLink, IconMail } from '@tabler/icons-react';
import { Button } from '@heroui/button';
import { Tooltip } from '@heroui/tooltip';

import CopyEmailButton from '../components/copy-email-button';
import ContactCard from '../components/contact-card';

import NicolasLogo from '@/components/common/icons/nicolas-logo';
import LinkedInIcon from '@/components/common/icons/linkedin';
import GitHubIcon from '@/components/common/icons/github';

interface ContactCardsProps {
  resumeHref: string | null;
  resumeDisabled: boolean;
  isSanityFile: boolean;
  linkedinUrl: string;
  githubUrl: string;
  email: string;
}

const tooltips = {
  downloadResume: 'Descarga mi currículum',
  copyEmail: 'Copia mi correo',
  openGithub: 'Mira mi GitHub',
  openLinkedin: 'Visita mi LinkedIn',
};

const HeroContactCards = ({
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
            content={tooltips.downloadResume}
            color="primary"
            placement="bottom"
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
              aria-label={tooltips.downloadResume}
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
            content={tooltips.openLinkedin}
            color="primary"
            placement="bottom"
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
              aria-label={tooltips.openLinkedin}
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
            content={tooltips.openGithub}
            color="primary"
            placement="bottom"
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
              aria-label={tooltips.openGithub}
            >
              <IconExternalLink stroke={1.5} size={20} />
            </Button>
          </Tooltip>
        }
      />

      <ContactCard
        label="Correo"
        icon={<IconMail stroke={1.5} size={28} className="text-ink-100" />}
        action={<CopyEmailButton email={email} content={tooltips.copyEmail} />}
      />
    </article>
  );
};

export default HeroContactCards;
