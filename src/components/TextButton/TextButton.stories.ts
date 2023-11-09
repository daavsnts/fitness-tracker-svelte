import type { Meta, StoryObj } from "@storybook/svelte";

import TextButton from "./TextButton.svelte";

const meta = {
  title: "Pages/TextButton",
  component: TextButton,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/svelte/configure/story-layout
    layout: "fullscreen",
    docs: {
      autodocs: false,
    },
  },
} satisfies Meta<TextButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
