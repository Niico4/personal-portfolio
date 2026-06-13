export interface EducationInformationType {
  id: string;
  display_order: number;
  is_currently_studying: boolean;
  academic_title: string;
  institution_logo: InstitutionLogo;
  institution_name: string;
  start_date: Date;
  end_date: Date;
  work_certificate: WorkCertificate;
}

export interface InstitutionLogo {
  alt: string;
  url: string;
}

export interface WorkCertificate {
  external_url: null;
  file_url: null;
}
