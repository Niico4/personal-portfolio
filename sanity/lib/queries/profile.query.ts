import { groq } from 'next-sanity';

const EDUCATION_FIELDS = `
  "id": _key,
  academicTitle,
  institutionName,
  startDate,
  endDate,
  status,
  details
`;

export const PROFILE_QUERY = groq`
  *[
    _type == "profile"
  ] | order(_updatedAt desc)[0] {
      "aboutMe": aboutMeDescription,
      professionalTitle,

      "contact": {
        "email": contact.email,
        "githubURL": contact.githubUrl,
        "linkedinURL": contact.linkedinUrl,

        "resume": {
          "fileUrl": resume.file.asset->url,
          "externalUrl": resume.externalUrl
        }
      },

      "education": education[] | 
        order(startDate desc) {
          ${EDUCATION_FIELDS}
      }
  }
`;
