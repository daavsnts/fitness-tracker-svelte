import type { Meta, StoryObj } from "@storybook/svelte";
import NotFound from "./NotFound.svelte";

const meta = {
  title: "Pages/NotFound",
  component: NotFound,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/svelte/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<NotFound>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
