import type { Meta, StoryObj } from "@storybook/svelte";

import WaterTracker from "./WaterTracker.svelte";

const meta = {
  title: "Pages/WaterTracker",
  component: WaterTracker,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/svelte/configure/story-layout
    layout: "fullscreen",
    docs: {
      autodocs: false,
    },
  },
} satisfies Meta<WaterTracker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
