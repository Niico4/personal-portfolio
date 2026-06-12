import { groq } from 'next-sanity';

export const WORK_EXPERIENCE_QUERY = groq`
  *[_type == "workExperience"] | order(displayOrder asc, _createdAt desc) {
    _id,
    organizationName,
    displayOrder,

    "organizationLogo": select(
      defined(organizationLogo.asset) => {
        "url": organizationLogo.asset->url,
        "alt": organizationLogo.alt
      },
      null
    ),

    "positions": positions[] {
      _key,
      positionTitle,
      positionIconKey,
      employmentType,
      startDate,
      endDate,
      isCurrentPosition,
      "highlights": coalesce(highlights, []),
      "toolsAndTechnologies": coalesce(toolsAndTechnologies, [])
    }
  }
`;
