import { groq } from 'next-sanity';

const PROJECT_FIELDS = `
  "id": _id,
  title,
  "slug": slug.current,
  shortDescription,
  description,

  "technologyGroups": coalesce(technologyGroups[]{
    "id": _key,
    name,
    "technologies": technologies[]->{
      "id": _id,
      name
    }
  }, []),

  media {
    "coverURL": cover.asset->url,
    "iconURL": icon.asset->url,
    "demoVideoURL": demoVideo.asset->url,

    "gallery": coalesce(gallery[]{
      "id": _key,
      "url": asset->url,
      alt,
      caption,
      "width": asset->metadata.dimensions.width,
      "height": asset->metadata.dimensions.height
    }, []),

    "liveUrl": liveDemoUrl,
    repositoryUrl,
    figmaUrl
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
