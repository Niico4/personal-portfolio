import { groq } from 'next-sanity';

export const PROFILE_QUERY = groq`
  *[_type == "profile"] | order(_updatedAt desc)[0] {
    "content": {
      aboutMeDescription,
      professionalTitle,
      "currentLocation": location,
    },

    "contactInformation": {
      "email": contact.email,
      "githubUrl": contact.githubUrl,
      "linkedinUrl": contact.linkedinUrl,
      "resume": {
        "fileUrl": resume.file.asset->url,
        "externalUrl": resume.externalUrl
      }
    },

    "techSkills": techSkills[] {
      _key,
      name,
      iconKey
    },
  }
`;
