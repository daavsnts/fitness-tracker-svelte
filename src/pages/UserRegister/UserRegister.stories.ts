import type { Meta, StoryObj } from "@storybook/svelte";

import UserRegister from "./UserRegister.svelte";

const meta = {
  title: "Pages/UserRegister",
  component: UserRegister,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/svelte/configure/story-layout
    layout: "fullscreen",
    docs: {
      autodocs: false,
    },
  },
} satisfies Meta<UserRegister>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
