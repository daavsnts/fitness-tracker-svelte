import type { Meta, StoryObj } from "@storybook/svelte";
import { action } from "@storybook/addon-actions";

import { expect, jest } from "@storybook/jest";
import { userEvent, within } from "@storybook/testing-library";

import Button from "./Button.svelte";

// More on how to set up stories at: https://storybook.js.org/docs/svelte/writing-stories/introduction
const meta = {
  title: "Example/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    backgroundColor: { control: "color" },
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
    },
  },
} satisfies Meta<Button>;

export default meta;
type Story = StoryObj<typeof meta>;

const actions = {
  click: jest
    .fn()
    .mockImplementation(() => {
      action("on:click");
    }),
};

const Template: Story = {
  render: (args) => ({
    Component: Button,
    props: args,
    on: {
      ...actions,
    },
  }),
};

// More on writing stories with args: https://storybook.js.org/docs/svelte/writing-stories/args
export const Clicking: Story = {
  ...Template,
  args: {
    label: "Automatically clicked",
  },
  play: async ({ _, canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button"));
    await expect(actions.click).toHaveBeenCalled();
  },
};

export const Primary: Story = {
  ...Template,
  args: {
    primary: true,
    label: "Button",
  },
};

export const Secondary: Story = {
  ...Template,
  args: {
    label: "Button",
  },
};

export const Large: Story = {
  ...Template,
  args: {
    size: "large",
    label: "Button",
  },
};

export const Small: Story = {
  ...Template,
  args: {
    size: "small",
    label: "Button",
  },
};
