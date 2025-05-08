import React, { FC } from 'react';
import Link from 'next/link';
import { Card } from '@heroui/card';
import { IconExternalLink, IconSchool } from '@tabler/icons-react';

import { EducationCardProps } from '../types/about-me';

const EducationCard: FC<EducationCardProps> = ({
  title,
  date,
  institution,
  hasCertificate,
}) => {
  const cardContent = (
    <Card
      className="bg-orange-300/[0.06] border border-purple-400/5 md:hover:scale-105 items-start gap-2 p-4"
      radius="sm"
      isBlurred
    >
      <div className="flex-center gap-3">
        <span className="p-2 bg-white/[0.07] rounded-lg">
          {hasCertificate ? (
            <IconExternalLink
              stroke={1.5}
              className="text-secondary-300"
              size={28}
            />
          ) : (
            <IconSchool stroke={1.5} className="text-secondary-300" size={28} />
          )}
        </span>
        <h3 className="text-subtitle/95 text-lg font-semibold">{title}</h3>
      </div>

      <div className="flex items-center justify-between w-full">
        <p className="text-default text-sm">{institution}</p>
        <time className="text-secondary-200 text-sm">{date}</time>
      </div>
    </Card>
  );

  return hasCertificate ? (
    <Link
      href="/about-me/certifications"
      aria-label="Ver todos los certificados"
    >
      {cardContent}
    </Link>
  ) : (
    cardContent
  );
};

export default EducationCard;
