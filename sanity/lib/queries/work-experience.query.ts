import { groq } from 'next-sanity';

export const WORK_EXPERIENCE_QUERY = groq`
  *[_type == "workExperience"] |order(displayOrder asc, _updatedAt desc) {
  "id": _id,
  displayOrder,

  "organizationInformation": {
    organizationName,
    "organizationLogo": select(
      defined(organizationLogo.asset) => {
        "url": organizationLogo.asset->url,
        "alt": organizationLogo.alt
      },
      null
    ),
  },

  "jobInformation": positions[] {
    _key,
    "jobTitle": positionTitle,
    employmentType,
    startDate,
    endDate,
    "isCurrentJob": isCurrentPosition,
    "highlights": coalesce(highlights, []),
    "skills": coalesce(toolsAndTechnologies, [])
  }
}
`;
