import { ImageType } from './common.type';

export type EducationInformationType = {
  id: string;
  display_order: number;
  is_currently_studying: boolean;
  academic_title: string;
  institution_logo: ImageType;
  institution_name: string;
  start_date: Date;
  end_date: Date;
  work_certificate: WorkCertificate;
};

export type WorkCertificate = {
  external_url: string | null;
  file_url: string | null;
};
