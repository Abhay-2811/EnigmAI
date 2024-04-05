import { FleekConfig } from '@fleekxyz/cli';

export default {
  "sites": [
    {
      "slug": "puny-dawn-short",
      "distDir": "build",
      "buildCommand": "yarn run build"
    }
  ]
} satisfies FleekConfig;