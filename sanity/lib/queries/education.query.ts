import { groq } from 'next-sanity';

export const EDUCATION_QUERY = groq`
   *[_type == "education"] | order(displayOrder asc, startDate desc) {
    "id": _id,
    "academic_title": academicTitle,
    "institution_name": institutionName,
    "start_date": startDate,
    "end_date": endDate,
    "is_currently_studying": isCurrentlyStudying,
    "display_order": displayOrder,

    "institution_logo": select(
      defined(institutionLogo.asset) => {
        "url": institutionLogo.asset->url,
        "alt": institutionLogo.alt
      },
      null
    ),

    "work_certificate": {
      "file_url": credential.credentialFile.asset->url,
      "external_url": credential.credentialUrl
    }
  }
`;
