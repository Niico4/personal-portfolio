import { groq } from 'next-sanity';

export const PROFILE_QUERY = groq`
  *[_type == "profile"] | order(_updatedAt desc)[0] {
    _id,

    professionalTitle,
    location,

    "resume": {
      "fileUrl": resume.file.asset->url,
      "externalUrl": resume.externalUrl
    },

    "contact": {
      "email": contact.email,
      "githubUrl": contact.githubUrl,
      "linkedinUrl": contact.linkedinUrl
    },

    "content": {
      "homeIntroduction": content.homeIntroduction,
      "aboutDescription": content.aboutDescription
    },

    "stats": stats[] {
      _key,
      label,
      value,
      prefix,
      suffix
    },

    "skillsAndTechnologies": skillsAndTechnologies[] {
      _key,
      name,
      iconKey
    }
  }
`;
