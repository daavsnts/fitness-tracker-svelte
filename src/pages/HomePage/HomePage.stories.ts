import type { Meta, StoryObj } from "@storybook/svelte";

import HomePage from "./HomePage.svelte";

const meta = {
  title: "Pages/HomePage",
  component: HomePage,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/svelte/configure/story-layout
    layout: "fullscreen",
    docs: {
      autodocs: false,
    },
  },
} satisfies Meta<HomePage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
