import type { Meta, StoryObj } from "@storybook/svelte";

import ExerciseTracker from "./ExerciseTracker.svelte";

const meta = {
  title: "Pages/ExerciseTracker",
  component: ExerciseTracker,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/svelte/configure/story-layout
    layout: "fullscreen",
    docs: {
      autodocs: false,
    },
  },
} satisfies Meta<ExerciseTracker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
