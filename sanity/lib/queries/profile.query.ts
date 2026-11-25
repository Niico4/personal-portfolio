import { groq } from 'next-sanity';

export const PROFILE_QUERY = groq`
    *[_type == "profile" && _id == "profile"][0] {
    ...,
    "resume": {
      "fileUrl": resume.file.asset->url,
      "externalUrl": resume.externalUrl
    }
  }
`;
