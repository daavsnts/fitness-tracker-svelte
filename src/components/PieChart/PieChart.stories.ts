import type { Meta, StoryObj } from "@storybook/svelte";

import PieChart from "./PieChart.svelte";

const meta = {
  title: "Components/PieChart",
  component: PieChart,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/svelte/configure/story-layout
    layout: "fullscreen",
    docs: {
      autodocs: false,
    },
  },
} satisfies Meta<PieChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
