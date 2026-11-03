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
    // Lets a story show :hover, :focus-visible, or :active without a pointer
    // or keyboard, so every state has its own story
    "storybook-addon-pseudo-states",
  ],
  "framework": "@storybook/react-vite",
  "core": {
    "disableTelemetry": true
  }
};
export default config;
