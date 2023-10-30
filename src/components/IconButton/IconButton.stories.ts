import type { Meta, StoryObj } from "@storybook/svelte";

import IconButton from "./IconButton.svelte";

const meta = {
  title: "Components/IconButton",
  component: IconButton,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/svelte/configure/story-layout
    layout: "fullscreen",
    docs: {
      autodocs: false,
    },
  },
} satisfies Meta<IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
