import type { Meta, StoryObj } from "@storybook/svelte";

import RoundedIconButton from "./RoundedIconButton.svelte";

const meta = {
  title: "Components/RoundedIconButton",
  component: RoundedIconButton,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/svelte/configure/story-layout
    layout: "fullscreen",
    docs: {
      autodocs: false,
    },
  },
} satisfies Meta<RoundedIconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
