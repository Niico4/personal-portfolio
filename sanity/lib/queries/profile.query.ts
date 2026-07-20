import { groq } from 'next-sanity';

export const PROFILE_QUERY = groq`
  *[_type == "profile"] | order(_updatedAt desc)[0] {
    "overview": {
      "about": aboutMeDescription,
      professionalTitle,
      "location": location,
      "currentFocus": rightNowIAm,
      "isAvailableForOpportunities": isAvailable
    },

    "contact": {
      "email": contact.email,
      "githubUrl": contact.githubUrl,
      "linkedinUrl": contact.linkedinUrl,

      "resume": {
        "fileUrl": resume.file.asset->url,
        "externalUrl": resume.externalUrl
      }
    },

    "skills": techSkills[] {
      "id": _key,
      name,
      iconKey
    },

    "education": education[] {
      "id": _key,
      "programName": academicTitle,
      institutionName,
      startDate,
      endDate,
      "isInProgress": isCurrentlyStudying
    }
  }
`;
