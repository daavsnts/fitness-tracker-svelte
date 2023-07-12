import type { Meta, StoryObj } from "@storybook/svelte";

import LoggedInUser from "$stores/LoggedInUser";
import lunaImg from "$assets/Luna.jpg";

import Profile from "./Profile.svelte";

const meta = {
  title: "Pages/Profile",
  component: Profile,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/svelte/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<Profile>;

// Mock global store data
LoggedInUser.set({
  name: "João Silva",
  image: lunaImg,
});

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
