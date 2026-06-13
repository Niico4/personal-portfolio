import { groq } from 'next-sanity';

export const PROFILE_QUERY = groq`
  *[_type == "profile"] | order(_updatedAt desc)[0] {
    "id": _id,

    "content": {
      "introduction": content.homeIntroduction,
      "description": content.aboutDescription,
      "professional_title": professionalTitle,
      "current_location": location,
    },

    "contact_information": {
      "email": contact.email,
      "github_url": contact.githubUrl,
      "linkedin_url": contact.linkedinUrl,
      "resume": {
        "file_url": resume.file.asset->url,
        "external_url": resume.externalUrl
      }
    },

    "skills": skillsAndTechnologies[] {
      _key,
      name,
      "icon_key": iconKey
    },

    "stats": stats[] {
      _key,
      label,
      value,
      prefix,
      suffix
    }
  }
`;
