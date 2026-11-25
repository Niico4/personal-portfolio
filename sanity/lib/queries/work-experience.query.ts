import { groq } from 'next-sanity';

export const WORK_EXPERIENCE_LIST_QUERY = groq`
  *[
    _type == "workExperience"
  ] | order(startDate desc, endDate desc) {
    "id": _id,
    organizationName,
    "organizationLogoURL": organizationLogo.asset->url,
    role,
    "isFreelance": coalesce(isFreelance, false),
    startDate,
    endDate,
    isCurrentPosition,
    description,

    "features": features[]
  }
`;
