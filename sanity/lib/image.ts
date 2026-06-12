import {
  createImageUrlBuilder,
  type SanityImageSource,
} from '@sanity/image-url';

import { PublicEnvConfig } from '@/config/public-env.config';

// https://www.sanity.io/docs/image-url
const builder = createImageUrlBuilder({
  projectId: PublicEnvConfig.sanity.project_id,
  dataset: PublicEnvConfig.sanity.dataset,
});

export const urlFor = (source: SanityImageSource) => {
  return builder.image(source);
};
