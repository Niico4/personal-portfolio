import { groq } from 'next-sanity';

const PROJECT_FIELDS = `
  "id": _id,
  title,
  "slug": slug.current,
  shortDescription,
  description,

  "features": features[],
  
  "status": status->{
    "id": _id,
    name,
    "value": value.current
  },

  "links": {
    "demoVideo": links.demoVideo.asset->url,
    "liveURL": links.liveDemoUrl,
    "repositoryURL": links.repositoryUrl
  },

  "technologies": technologies[]->{
    "id": _id,
    name
  }
`;

export const PROJECT_LIST_QUERY = groq`
  *[
    _type == "project" && 
    defined(slug.current) &&
    isVisible == true
  ] | order(displayOrder asc) {
    ${PROJECT_FIELDS}
  }
`;
