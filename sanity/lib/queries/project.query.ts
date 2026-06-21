import { groq } from 'next-sanity';

export const PROJECTS_QUERY = groq`
  *[_type == "project"] | order(displayOrder asc) {

  "id": _id,
  title,
  "slug": slug.current,
  status,
  "display_order": displayOrder,
  "technologies": coalesce(technologies, []),
  
  "project_information_preview": {
    "short_description": preview.shortDescription,
    "image": select(
      defined(preview.image.asset) => {
        "url": preview.image.asset->url,
        "alt": preview.image.alt
      },
      null
    )
  },

  "project_detail": {
    "origin_description": detail.originDescription,
    "full_description": detail.description,
    "demo_video": select(
        defined(detail.demoVideo.asset) => {
          "url": detail.demoVideo.asset->url
        },
        null
      )
  },

  "links": {
    "live_demo_url": links.liveDemoUrl,
    "repository_url": links.repositoryUrl
  }
}
`;

export const PROJECT_QUERY = groq`
*[_type == "project" && slug.current == $slug][0] {
  "id": _id,
  title,
  "slug": slug.current,
  status,
  "display_order": displayOrder,
  "technologies": coalesce(technologies, []),

  "project_information_preview": {
    "short_description": preview.shortDescription,
    "image": select(
      defined(preview.image.asset) => {
        "url": preview.image.asset->url,
        "alt": preview.image.alt
      },
      null
    )
  },

  "project_detail": {
    "origin_description": detail.originDescription,
    "full_description": detail.description,
    "demo_video": select(
      defined(detail.demoVideo.asset) => {
        "url": detail.demoVideo.asset->url
      },
      null
    )
  },

  "links": {
    "live_demo_url": links.liveDemoUrl,
    "repository_url": links.repositoryUrl
  }
}
`;

export const PROJECT_SLUGS_QUERY = groq`
  *[_type == "project" && defined(slug.current)] {
    "slug": slug.current
  }
`;
