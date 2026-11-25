import { defineQuery } from 'next-sanity';

export const SKILLS_QUERY = defineQuery(`
  coalesce(
    *[_type == "skills" && _id == "skills"][0].groups[]{
      "id": _key,
      name,
      "technologies": technologies[]->{
        "id": _id,
        name
      }
    },
    []
  )
`);
