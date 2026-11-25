import { groq } from 'next-sanity';

const PROJECT_FIELDS = `
  "id": _id,
  title,
  "slug": slug.current,
  shortDescription,
  description,

  "features": features[],

  media {
    "coverURL": cover.asset->url,
    "iconURL": icon.asset->url,
    "demoVideoURL": demoVideo.asset->url,
    "liveURL": liveDemoUrl,
    "repositoryURL": repositoryUrl,
    "figmaURL": figmaUrl
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

export const PROJECT_DETAIL_QUERY = groq`
  *[
    _type == "project" &&
    slug.current == $slug &&
    isVisible == true
  ][0] {
    ${PROJECT_FIELDS}
  }
`;
