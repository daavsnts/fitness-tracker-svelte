import type { Meta, StoryObj } from "@storybook/svelte";

import BottomAppBar from "./BottomAppBar.svelte";

const meta = {
  title: "Components/BottomAppBar",
  component: BottomAppBar,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/svelte/configure/story-layout
    layout: "fullscreen",
    docs: {
      autodocs: false,
    },
  },
} satisfies Meta<BottomAppBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
