import type { Meta } from "@storybook/svelte";
import { expect } from "@storybook/jest";
import { userEvent, within } from "@storybook/testing-library";
import type { PlayFunctionParameter, TemplatedStoryObj, TemplateObj } from "$types/storybook";

import Button from "./Button.svelte";
import ButtonExample from "./ButtonExample.svelte";

const dynamicTest = async ({ args, canvasElement }: PlayFunctionParameter<ButtonExample>) => {
  const canvas = within(canvasElement);
  await userEvent.click(canvas.getByRole("button"));
  console.log(args.event_click.constructor.name);
  await expect(args.event_click).toBeCalled();
};

const meta = {
  title: "Components/Button",
  component: Button,
  argTypes: {
    backgroundColor: { control: "color" },
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
    },
  },
  args: {
    size: "medium",
  },
} satisfies Meta<Button>;

export default meta;

type Template = TemplateObj<typeof meta, ButtonExample>;
type Story = TemplatedStoryObj<typeof meta, ButtonExample>;

const template = {
  render: (args) => ({
    Component: ButtonExample,
    props: args,
  }),
  args: {
    label: "Common Label",
  },
} satisfies Template;

export const Clicking: Story = {
  ...template,
  args: {
    ...template.args,
    label: "Auto click",
  },
  play: dynamicTest,
};

export const Primary: Story = {
  ...template,
  args: {
    ...template.args,
    primary: true,
  },
};

export const Secondary: Story = {
  ...template,
  args: {
    ...template.args,
  },
};

export const Large: Story = {
  ...template,
  args: {
    ...template.args,
    size: "large",
  },
};

export const Small: Story = {
  ...template,
  args: {
    ...template.args,
    size: "small",
  },
};
