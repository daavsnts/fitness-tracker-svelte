import type { Meta, StoryObj } from "@storybook/svelte";

import LoginPage from "./LoginPage.svelte";

const meta = {
  title: "Pages/HomePage",
  component: LoginPage,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/svelte/configure/story-layout
    layout: "fullscreen",
    docs: {
      autodocs: false,
    },
  },
} satisfies Meta<LoginPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
