import type { Meta, StoryObj } from "@storybook/svelte";

import Home from "./Home.svelte";

const meta = {
  title: "Pages/Home",
  component: Home,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/svelte/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<Home>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
