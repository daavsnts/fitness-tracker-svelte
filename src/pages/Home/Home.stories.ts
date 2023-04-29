import type { Meta, StoryObj } from "@storybook/svelte";

import { within, userEvent } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

import Home from "./Home.svelte";

const meta = {
  title: "Pages/Home",
  component: Home,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/svelte/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<Home>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoggedOut: Story = {};

// More on interaction testing: https://storybook.js.org/docs/svelte/writing-tests/interaction-testing
export const LoggedIn: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const loginButton = await canvas.getByRole("button", {
      name: /Log in/i,
    });
    await userEvent.click(loginButton);
    const welcomeText = await canvas.findByText(/Welcome/i);
    expect(welcomeText).toBeInTheDocument();
  },
};
