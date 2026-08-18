import { groq } from 'next-sanity';

export const WORK_EXPERIENCE_LIST_QUERY = groq`
  *[
    _type == "workExperience"
  ] | order(startDate desc) {
    "id": _id,
    "name": organizationName,
    role,
    startDate,
    endDate,
    isCurrentPosition,
    description,

    "features": features[]
  }
`;
