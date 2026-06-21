import { groq } from 'next-sanity';

export const WORK_EXPERIENCE_QUERY = groq`
  *[_type == "workExperience"] |order(displayOrder asc, _updatedAt desc) {
  "id": _id,
  "display_order": displayOrder,

  "organization_information": {
    "organization_name": organizationName,
    "organization_logo": select(
      defined(organizationLogo.asset) => {
        "url": organizationLogo.asset->url,
        "alt": organizationLogo.alt
      },
      null
    ),
  },

  "job_information": positions[] {
    _key,
    "job_title": positionTitle,
    "employment_type": employmentType,
    "start_date": startDate,
    "end_date": endDate,
    "is_current_job": isCurrentPosition,
    "job_icon_key": positionIconKey,
    "highlights": coalesce(highlights, []),
    "skills": coalesce(toolsAndTechnologies, [])
  }
}
`;
