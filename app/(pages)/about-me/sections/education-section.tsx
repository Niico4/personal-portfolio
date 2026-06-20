import Image from 'next/image';
import { IconDownload, IconExternalLink } from '@tabler/icons-react';
import { Button } from '@heroui/button';
import { Card } from '@heroui/card';
import { Divider } from '@heroui/divider';

import { SectionHeader } from '@/components/common/section-header';
import { getEducation } from '@/sanity/lib/fetchers/education.fetcher';
import { calculateDuration } from '@/utils/calculate-duration';
import { getJobDateRange } from '@/utils/get-job-date-range';

const CERTIFICATE_LABELS = {
  download: 'Descargar certificado',
  openExternal: 'Abrir certificado',
} as const;

const getCertificateFileName = (institutionName: string) => {
  return `certificado-${institutionName.toLowerCase().replaceAll(' ', '-')}.pdf`;
};

const EducationSection = async () => {
  const educationInfo = await getEducation();

  if (!educationInfo?.length) return null;

  return (
    <section className="flex flex-col gap-10">
      <SectionHeader
        title="Educación"
        description="Base académica + aprendizaje constante por cuenta propia"
      />

      <ul className="flex flex-col gap-4">
        {educationInfo.map(
          ({
            id,
            academic_title,
            end_date,
            institution_logo,
            institution_name,
            is_currently_studying,
            start_date,
            work_certificate,
          }) => {
            const dateRange = getJobDateRange({
              startDate: start_date,
              endDate: end_date,
              isCurrentJob: is_currently_studying,
            });

            const duration = calculateDuration({
              startDate: start_date,
              endDate: end_date,
              isCurrentJob: is_currently_studying,
            });

            const fileUrl = work_certificate?.file_url;
            const externalUrl = work_certificate?.external_url;

            const certificateFileName =
              getCertificateFileName(institution_name);

            const certificateHref = fileUrl
              ? `${fileUrl}?dl=${certificateFileName}`
              : externalUrl;

            const hasCertificate = Boolean(certificateHref);

            return (
              <li key={id}>
                <Card className="flex w-full flex-col gap-5 p-4 sm:flex-row sm:items-center sm:justify-between border border-ink-900/70 bg-ink-900/40">
                  <div className="flex items-center gap-5">
                    <div className="relative flex size-12 shrink-0 items-center justify-center overflow-hidden">
                      <Image
                        src={institution_logo.url}
                        alt={
                          institution_logo.alt || `Logo de ${institution_name}`
                        }
                        width={96}
                        height={96}
                        sizes="48px"
                        className="size-full object-contain"
                      />
                    </div>

                    <div className="flex min-w-0 flex-col gap-1">
                      <h3 className="text-lg text-ink-100">{academic_title}</h3>

                      <div className="flex h-5 items-center gap-2 text-sm text-ink-300">
                        <p>{dateRange}</p>

                        <Divider
                          className="bg-ink-700"
                          orientation="vertical"
                        />

                        <p>{duration}</p>
                      </div>
                    </div>
                  </div>

                  {hasCertificate ? (
                    <Button
                      isIconOnly
                      as="a"
                      href={certificateHref ?? '#'}
                      download={fileUrl ? certificateFileName : undefined}
                      target={externalUrl ? '_blank' : undefined}
                      rel={externalUrl ? 'noopener noreferrer' : undefined}
                      variant="flat"
                      aria-label={
                        fileUrl
                          ? CERTIFICATE_LABELS.download
                          : CERTIFICATE_LABELS.openExternal
                      }
                    >
                      {fileUrl ? (
                        <IconDownload stroke={1.5} size={20} />
                      ) : (
                        <IconExternalLink stroke={1.5} size={20} />
                      )}
                    </Button>
                  ) : null}
                </Card>
              </li>
            );
          },
        )}
      </ul>
    </section>
  );
};

export default EducationSection;
