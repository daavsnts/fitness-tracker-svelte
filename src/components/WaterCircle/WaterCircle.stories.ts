import type { Meta, StoryObj } from "@storybook/svelte";

import WaterCircle from "./WaterCircle.svelte";

const meta = {
  title: "Pages/WaterCircle",
  component: WaterCircle,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/svelte/configure/story-layout
    layout: "fullscreen",
    docs: {
      autodocs: false,
    },
  },
} satisfies Meta<WaterCircle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
