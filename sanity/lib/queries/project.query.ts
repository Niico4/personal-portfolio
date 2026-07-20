import { groq } from 'next-sanity';

const PROJECT_FIELDS = groq`
  "id": _id,
  title,
  "slug": slug.current,
  status,
  displayOrder,
  "technologies": coalesce(technologies, []),

  "preview": {
    "shortDescription": preview.shortDescription,

    "image": select(
      defined(preview.image.asset) => {
        "url": preview.image.asset->url,
        "alt": preview.image.alt
      },
      null
    )
    },

    "detail": {
      "demoVideoUrl": detail.demoVideo.asset->url,

      "contentSections": coalesce(
        detail.contentSections[] {
          "id": _key,
          title,
          content
        },
        []
      )
    },

    "technologies": coalesce(technologies, []),

    "links": {
      "liveDemoUrl": links.liveDemoUrl,
      "repositoryUrl": links.repositoryUrl
    }
`;

export const PROJECTS_QUERY = groq`
  *[
    _type == "project" &&
    defined(slug.current)
  ]
  | order(displayOrder asc, _updatedAt desc) {
    ${PROJECT_FIELDS}
  }
`;

export const PROJECT_QUERY = groq`
  *[
    _type == "project" &&
    slug.current == $slug
  ][0] {
    ${PROJECT_FIELDS}
  }
`;

export const PROJECT_SLUGS_QUERY = groq`
  *[
    _type == "project" &&
    defined(slug.current)
  ]
  | order(displayOrder asc) {
    "slug": slug.current
  }
`;
