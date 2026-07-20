import { groq } from 'next-sanity';

export const WORK_EXPERIENCE_QUERY = groq`
  *[_type == "workExperience"] | order(displayOrder asc, _updatedAt desc) {
    "id": _id,

    "organization": {
      "name": organizationName,

      "logo": select(
        defined(organizationLogo.asset) => {
          "url": organizationLogo.asset->url,
          "alt": organizationLogo.alt
        },
        null
      )
    },

    "positions": positions[] {
      "id": _key,
      "title": positionTitle,
      startDate,

      "endDate": select(
        isCurrentPosition == true => null,
        endDate
      ),

      "isCurrent": isCurrentPosition,
      "highlights": highlights,
      "toolsAndTechnologies": toolsAndTechnologies
    },
  }
`;
