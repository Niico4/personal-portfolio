import { Card, CardBody, CardFooter, CardHeader } from '@heroui/card';
import { IconArrowNarrowUp, IconBriefcase } from '@tabler/icons-react';
import { Divider } from '@heroui/divider';
import { Button } from '@heroui/button';

import { poetsenOne } from '@/fonts';
import { PortableTextContent } from '@/components/common/portable-text-content';
import { getProfile } from '@/sanity/lib/fetchers/profile.fetcher';

const socialLinkBaseClassName = `
    flex items-center rounded-full px-2 py-1 gap-1
    text-xs border-1
    transition-[color,background-color,border-color,transform,box-shadow]
    duration-300 ease-out
  `;

export const FooterCard = async () => {
  const { content } = await getProfile();
  return (
    <Card className="bg-ink-900/40 border-1 border-ink-800 p-5 gap-3">
      <CardHeader className="justify-between p-0 max-sm:flex-col max-sm:items-start gap-2">
        <h3
          className={`text-xl text-ink-100 sm:text-2xl ${poetsenOne.className}`}
        >
          Ahora mismo
        </h3>

        {content.isAvailable && (
          <div
            className={`${socialLinkBaseClassName} border-green-800 bg-green-900/15 text-green-300 hover:border-green-700 hover:bg-green-900/25 focus-visible:ring-green-400`}
          >
            <IconBriefcase aria-hidden="true" stroke={1.8} size={16} />
            Abierto a oportunidades
          </div>
        )}
      </CardHeader>
      <CardBody className="p-0">
        <PortableTextContent
          className="text-sm text-ink-200 w-full sm:w-1/2 [&_a]:underline [&_a]:decoration-dotted [&_a]:decoration-1 [&_a]:transition-colors [&_a:hover]:text-ink-50"
          value={content.rightNowIAm}
        />
      </CardBody>
      <Divider aria-hidden="true" className="bg-ink-200/10" />
      <CardFooter className="justify-between p-0">
        <div className="flex flex-col text-ink-300 items-start text-xs">
          <p>Nicolás Garzón • {content.currentLocation}.</p>
          <p>© 2026</p>
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
