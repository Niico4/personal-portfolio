import Image from 'next/image';
import {
  IconDownload,
  IconExternalLink,
  IconMail,
  IconMapPin,
  IconSchool,
} from '@tabler/icons-react';
import { Divider } from '@heroui/divider';
import { Card, CardBody } from '@heroui/card';
import { Button } from '@heroui/button';
import { Tooltip } from '@heroui/tooltip';

import avatar from '../../../../public/nico-avatar-1.webp';
import CopyEmailButton from '../components/copy-email-button';

import { poetsenOne } from '@/fonts';
import { getProfile } from '@/sanity/lib/fetchers/profile.fetcher';
import NicolasLogo from '@/components/common/icons/nicolas-logo';
import LinkedInIcon from '@/components/common/icons/linkedin';
import GitHubIcon from '@/components/common/icons/github';

const actionTooltips = {
  downloadResume: 'Descarga mi currículum',
  copyEmail: 'Copia mi correo',
  openGithub: 'Mira mi GitHub',
  openLinkedin: 'Visita mi LinkedIn',
};

const HeroSection = async () => {
  const profile = await getProfile();
  const resumeUrl =
    profile.contact_information.resume.file_url ??
    profile.contact_information.resume.external_url;

  const isSanityFile = Boolean(profile.contact_information.resume.file_url);

  const resumeHref = profile.contact_information.resume.file_url
    ? `${profile.contact_information.resume.file_url}?dl=nicolas-garzon-cv.pdf`
    : profile.contact_information.resume.external_url;

  if (!profile) return null;

  return (
    <section className="flex flex-col gap-5">
      <div className="mx-auto grid grid-cols-[0.95fr_1.05fr] items-center gap-20">
        <div className="relative flex justify-center">
          <Image
            src={avatar}
            alt="Avatar de Nicolás"
            priority
            className="select-none object-contain max-w-[90%]"
          />

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#080A0F] to-transparent" />
        </div>

        <div className="flex max-w-[530px] flex-col gap-5">
          <div className="space-y-4">
            <h1 className={`text-5xl text-ink-50 ${poetsenOne.className}`}>
              ¡Hola!, soy Nicolás
            </h1>

            <p className="max-w-[500px] text-ink-100">
              {profile.content.introduction}
            </p>
          </div>

          <article className="flex flex-col gap-3 pt-1">
            <div className="flex items-center gap-3">
              <div className="flex size-8 items-center justify-center rounded-lg bg-ink-900 text-ink-300">
                <IconSchool stroke={1.5} size={20} />
              </div>

              <p className="text-ink-200">
                {profile.content.professional_title}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex size-8 items-center justify-center rounded-lg bg-ink-900 text-ink-300">
                <IconMapPin stroke={1.5} size={20} />
              </div>

              <p className="text-ink-200">{profile.content.current_location}</p>
            </div>
          </article>

          <Divider className="my-2 bg-ink-900/70" />

          <article className="grid grid-cols-2 gap-5">
            <Card className="h-16 border border-ink-900 bg-ink-900/40 shadow-none hover:bg-ink-800/40 ">
              <CardBody className="flex flex-row items-center justify-between overflow-hidden px-4 py-0">
                <div className="flex items-center gap-3">
                  <NicolasLogo className="size-7 shrink-0 text-ink-50" />
                  <p className="text-lg text-ink-200">Currículum</p>
                </div>

                <Tooltip
                  content={actionTooltips.downloadResume}
                  color="primary"
                  placement="bottom"
                  showArrow
                >
                  <a
                    href={resumeHref ?? '#'}
                    download={
                      isSanityFile ? 'nicolas-garzon-cv.pdf' : undefined
                    }
                    target={isSanityFile ? undefined : '_blank'}
                    rel={isSanityFile ? undefined : 'noopener noreferrer'}
                  >
                    <Button
                      isIconOnly
                      isDisabled={!resumeUrl}
                      variant="light"
                      className="text-ink-300"
                      aria-label={actionTooltips.downloadResume}
                    >
                      <IconDownload stroke={1.5} size={20} />
                    </Button>
                  </a>
                </Tooltip>
              </CardBody>
            </Card>

            <Card className="h-16 border border-ink-900 bg-ink-900/40 shadow-none hover:bg-ink-800/40 ">
              <CardBody className="flex flex-row items-center justify-between overflow-hidden px-4 py-0">
                <div className="flex items-center gap-3">
                  <LinkedInIcon className="size-7 shrink-0" />
                  <p className="text-lg text-ink-200">LinkedIn</p>
                </div>

                <Tooltip
                  content={actionTooltips.openLinkedin}
                  color="primary"
                  placement="bottom"
                  showArrow
                >
                  <a href={profile.contact_information.linkedin_url}>
                    <Button isIconOnly variant="light" className="text-ink-300">
                      <IconExternalLink stroke={1.5} size={20} />
                    </Button>
                  </a>
                </Tooltip>
              </CardBody>
            </Card>

            <Card className="h-16 border border-ink-900 bg-ink-900/40 shadow-none hover:bg-ink-800/40 ">
              <CardBody className="flex flex-row items-center justify-between overflow-hidden px-4 py-0">
                <div className="flex items-center gap-3">
                  <GitHubIcon className="size-7 shrink-0 text-ink-50" />
                  <p className="text-lg text-ink-200">GitHub</p>
                </div>

                <Tooltip
                  content={actionTooltips.openGithub}
                  color="primary"
                  placement="bottom"
                  showArrow
                >
                  <a href={profile.contact_information.github_url}>
                    <Button isIconOnly variant="light" className="text-ink-300">
                      <IconExternalLink stroke={1.5} size={20} />
                    </Button>
                  </a>
                </Tooltip>
              </CardBody>
            </Card>

            <Card className="h-16 border border-ink-900 bg-ink-900/40 shadow-none hover:bg-ink-800/40 ">
              <CardBody className="flex flex-row items-center justify-between overflow-hidden px-4 py-0">
                <div className="flex items-center gap-3">
                  <IconMail stroke={1.5} size={28} className="text-ink-100" />
                  <p className="text-lg text-ink-200">Correo</p>
                </div>

                <CopyEmailButton
                  email={profile.contact_information.email}
                  content={actionTooltips.copyEmail}
                />
              </CardBody>
            </Card>
          </article>
        </div>
      </div>
      <Divider className="bg-ink-900/70 mt-2" />
    </section>
  );
};

export default HeroSection;
