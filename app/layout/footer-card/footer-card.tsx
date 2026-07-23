import { FC } from 'react';
import { Card, CardBody, CardFooter, CardHeader } from '@heroui/card';
import {
  IconArrowNarrowUp,
  IconBrandGithub,
  IconBrandLinkedin,
  IconMailShare,
  IconPaperclip,
} from '@tabler/icons-react';
import { Divider } from '@heroui/divider';
import { Button } from '@heroui/button';
import Link from 'next/link';

import { poetsenOne } from '@/fonts';
import { PortableTextContent } from '@/components/common/portable-text-content';
import { SocialChip } from '@/components/common/social-chip';
import {
  ProfileContact,
  ProfileOverview,
} from '@/sanity/lib/types/profile.type';
import { BadgeShine } from '@/components/common/badge-shine';

const date = new Date();
const currentYear = date.getFullYear();
const RESUME_FILE_NAME = 'nicolas-garzon-cv.pdf';

interface Props {
  contact: ProfileContact;
  overview: ProfileOverview;
}

export const FooterCard: FC<Props> = async ({ contact, overview }) => {
  const {
    email,
    githubUrl,
    linkedinUrl,
    resume: { fileUrl, externalUrl },
  } = contact;

  const hasSanityResume = Boolean(fileUrl);

  const resumeHref = fileUrl
    ? `${fileUrl}?dl=${RESUME_FILE_NAME}`
    : externalUrl;

  return (
    <Card className="bg-ink-900/40 border-1 border-ink-800 p-5 gap-3">
      <CardHeader className="justify-between p-0 max-sm:flex-col max-sm:items-start gap-2">
        <h3
          className={`text-xl text-ink-100 sm:text-2xl ${poetsenOne.className}`}
        >
          Ahora mismo
        </h3>

        {overview.isAvailableForOpportunities && (
          <Link href="/services">
            <BadgeShine
              label="Abierto a oportunidades"
              className="w-max select-none border-green-800 text-green-300"
            />
          </Link>
        )}
      </CardHeader>
      <CardBody className="p-0">
        <PortableTextContent
          className="text-sm text-ink-200 w-full sm:w-1/2 [&_a]:underline [&_a]:decoration-dotted [&_a]:decoration-1 [&_a]:transition-colors [&_a:hover]:text-ink-50"
          value={overview.currentFocus}
        />
        <ul
          aria-label="Enlaces personales y de contacto"
          className="mt-5 flex flex-wrap items-center gap-2.5"
        >
          {resumeHref && (
            <li>
              <SocialChip
                href={resumeHref}
                icon={IconPaperclip}
                label="Currículum"
                variant="resume"
                isExternal={!hasSanityResume}
              />
            </li>
          )}

          {githubUrl && (
            <li>
              <SocialChip
                href={githubUrl}
                icon={IconBrandGithub}
                label="GitHub"
                variant="github"
                isExternal
              />
            </li>
          )}

          {linkedinUrl && (
            <li>
              <SocialChip
                href={linkedinUrl}
                icon={IconBrandLinkedin}
                label="LinkedIn"
                variant="linkedin"
                isExternal
              />
            </li>
          )}

          {email && (
            <>
              <li
                aria-hidden
                className="
                    mx-1 hidden h-5
                    w-px bg-ink-800
                    sm:block
                  "
              />

              <li>
                <SocialChip
                  href={`mailto:${email}`}
                  icon={IconMailShare}
                  label="Escríbeme"
                  variant="email"
                />
              </li>
            </>
          )}
        </ul>
      </CardBody>
      <Divider aria-hidden="true" className="bg-ink-200/10" />
      <CardFooter className="justify-between p-0">
        <div className="flex flex-col text-ink-300 items-start text-xs">
          <p>Creado por Nicolás 🐐</p>
          <p>© {currentYear}</p>
        </div>

        <Button
          as="a"
          href="/#hero-section"
          variant="light"
          size="sm"
          endContent={<IconArrowNarrowUp stroke={1.5} size={20} />}
          className="text-ink-100"
        >
          Volver arriba
        </Button>
      </CardFooter>
    </Card>
  );
};
