import { groq } from 'next-sanity';

export const PROJECTS_QUERY = groq`
  *[_type == "project"] | order(displayOrder asc, _createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    isInDevelopment,
    displayOrder,

    "shortDescription": preview.shortDescription,

    "previewImage": select(
      defined(preview.image.asset) => {
        "url": preview.image.asset->url,
        "alt": preview.image.alt
      },
      null
    ),

    "technologies": coalesce(technologies, []),

    "links": {
      "liveDemoUrl": links.liveDemoUrl,
      "repositoryUrl": links.repositoryUrl
    }
  }
`;

export const PROJECT_BY_SLUG_QUERY = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    isInDevelopment,
    displayOrder,

    "shortDescription": preview.shortDescription,

    "previewImage": select(
      defined(preview.image.asset) => {
        "url": preview.image.asset->url,
        "alt": preview.image.alt
      },
      null
    ),

    "detail": {
      "originDescription": detail.originDescription,
      "description": detail.description,

      "demoVideo": select(
        defined(detail.demoVideo.asset) => {
          "url": detail.demoVideo.asset->url
        },
        null
      )
    },

    "technologies": coalesce(technologies, []),

    "links": {
      "liveDemoUrl": links.liveDemoUrl,
      "repositoryUrl": links.repositoryUrl
    }
  }
`;

export const PROJECT_SLUGS_QUERY = groq`
  *[_type == "project" && defined(slug.current)] {
    "slug": slug.current
  }
`;
