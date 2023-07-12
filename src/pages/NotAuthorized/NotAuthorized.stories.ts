import type { Meta, StoryObj } from "@storybook/svelte";
import NotAuthorized from "./NotAuthorized.svelte";

const meta = {
  title: "Pages/NotAuthorized",
  component: NotAuthorized,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/svelte/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<NotAuthorized>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
