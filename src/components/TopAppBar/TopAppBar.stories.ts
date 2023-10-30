import type { Meta, StoryObj } from "@storybook/svelte";

import TopAppBar from "./TopAppBar.svelte";

const meta = {
  title: "Pages/TopAppBar",
  component: TopAppBar,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/svelte/configure/story-layout
    layout: "fullscreen",
    docs: {
      autodocs: false,
    },
  },
} satisfies Meta<TopAppBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
