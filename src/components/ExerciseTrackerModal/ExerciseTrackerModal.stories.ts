import type { Meta, StoryObj } from "@storybook/svelte";

import ExerciseTrackerModal from "./ExerciseTrackerModal.svelte";

const meta = {
  title: "Components/ExerciseTrackerModal",
  component: ExerciseTrackerModal,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/svelte/configure/story-layout
    layout: "fullscreen",
    docs: {
      autodocs: false,
    },
  },
} satisfies Meta<ExerciseTrackerModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
