import { groq } from 'next-sanity';

export const EDUCATION_QUERY = groq`
  *[_type == "education"] | order(displayOrder asc, startDate desc) {
    _id,
    academicTitle,
    institutionName,
    startDate,
    endDate,
    isCurrentlyStudying,
    displayOrder,

    "institutionLogo": select(
      defined(institutionLogo.asset) => {
        "url": institutionLogo.asset->url,
        "alt": institutionLogo.alt
      },
      null
    ),

    "credential": {
      "fileUrl": credential.credentialFile.asset->url,
      "externalUrl": credential.credentialUrl
    }
  }
`;
