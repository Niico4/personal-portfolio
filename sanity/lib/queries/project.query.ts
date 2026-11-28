import { groq } from 'next-sanity';

const PROJECT_SUMMARY_FIELDS = `
  "id": _id,
  title,
  "slug": slug.current,
  "shortDescription": coalesce(shortDescription, "")
`;

const PROJECT_COVER_FIELDS = `
  "coverURL": media.cover.asset->url,
  "coverWidth": media.cover.asset->metadata.dimensions.width,
  "coverHeight": media.cover.asset->metadata.dimensions.height,
  "iconURL": media.icon.asset->url
`;

const PROJECT_IMAGE_FIELDS = `
  "id": _key,
  "url": asset->url,
  "alt": coalesce(alt, ""),
  caption,
  "width": asset->metadata.dimensions.width,
  "height": asset->metadata.dimensions.height
`;

const VALID_IMAGE_FILTER = `
  defined(id) &&
  defined(url) &&
  width > 0 &&
  height > 0
`;

export const PROJECT_LIST_QUERY = groq`
  *[
    _type == "project" &&
    defined(slug.current) &&
    defined(title) &&
    isVisible == true
  ] | order(displayOrder asc, title asc, _id asc) {
    ${PROJECT_SUMMARY_FIELDS},

    "media": {
      ${PROJECT_COVER_FIELDS}
    }
  }
`;

export const PROJECT_DETAIL_QUERY = groq`
  *[
    _type == "project" &&
    slug.current == $slug &&
    defined(title) &&
    isVisible == true
  ][0] {
    ${PROJECT_SUMMARY_FIELDS},

    "description": coalesce(description, []),

    "technologyGroups": coalesce(technologyGroups[]{
      "id": _key,
      name,
      "technologies": coalesce(technologies[]->{
        "id": _id,
        name
      }, [])
    }, []),

    "media": {
      ${PROJECT_COVER_FIELDS},

      "demoVideoURL": media.demoVideo.asset->url,

      "gallery": coalesce(media.gallery[]{
        ${PROJECT_IMAGE_FIELDS}
      }[${VALID_IMAGE_FILTER}], []),

      "liveUrl": media.liveDemoUrl,
      "repositoryUrl": media.repositoryUrl,
      "figmaUrl": media.figmaUrl
    },

    "detailCover": select(
      defined(media.detailCover.asset->url) &&
      media.detailCover.asset->metadata.dimensions.width > 0 &&
      media.detailCover.asset->metadata.dimensions.height > 0 =>
        media.detailCover {
          "url": asset->url,
          "width": asset->metadata.dimensions.width,
          "height": asset->metadata.dimensions.height,
          crop,
          alt,
          caption
        },
      null
    ),

    "detailSections": coalesce(detailSections[]{
      _key,
      _type,
      title,

      _type == "detailText" => {
        "body": coalesce(body, [])
      },

      _type == "detailImageGroup" => {
        "images": coalesce(images[]{
          ${PROJECT_IMAGE_FIELDS}
        }[${VALID_IMAGE_FILTER}], [])
      }
    }, [])
  }
`;
