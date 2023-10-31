import type { Meta, StoryObj } from "@storybook/svelte";

import UserProfile from "./UserProfile.svelte";

const meta = {
  title: "Pages/UserProfile",
  component: UserProfile,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/svelte/configure/story-layout
    layout: "fullscreen",
    docs: {
      autodocs: false,
    },
  },
} satisfies Meta<UserProfile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
