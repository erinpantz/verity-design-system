import type { StorybookConfig } from '@storybook/react-vite';
import remarkGfm from 'remark-gfm';

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    {
      name: "@storybook/addon-docs",
      // remark-gfm adds GitHub-style Markdown to MDX pages: tables, strikethrough, and task lists
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm],
          },
        },
      },
    },
    "@storybook/addon-a11y",
  ],
  "framework": "@storybook/react-vite",
  "core": {
    "disableTelemetry": true
  }
};
export default config;
