import type { Meta, StoryObj } from "@storybook/svelte";

import WaterTrackerModal from "./WaterTrackerModal.svelte";

const meta = {
  title: "Components/WaterTrackerModal",
  component: WaterTrackerModal,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/svelte/configure/story-layout
    layout: "fullscreen",
    docs: {
      autodocs: false,
    },
  },
} satisfies Meta<WaterTrackerModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
