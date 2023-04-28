import type { Meta, StoryObj } from '@storybook/svelte';
import { action } from '@storybook/addon-actions';

import { expect, jest } from '@storybook/jest';
import { userEvent, within } from '@storybook/testing-library';

import Button from './Button.svelte';

// More on how to set up stories at: https://storybook.js.org/docs/svelte/writing-stories/introduction
const meta = {
  title: 'Example/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
  },
} satisfies Meta<Button>;

export default meta;
type Story = StoryObj<typeof meta>;

const actions = {
  click: jest
    .fn()
    .mockImplementation(() => { action("on:click") }),
}

const Template = ({ ...args }) => ({
  Component: Button,
  props: args,
  on: {
    ...actions,
  },
});

// More on writing stories with args: https://storybook.js.org/docs/svelte/writing-stories/args
export const Clicking: Story = Template.bind({});
Clicking.args = {
  label: 'Automatically clicked',
};
Clicking.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement);
  await userEvent.click(canvas.getByRole('button'));
  await expect(actions.click).toHaveBeenCalled();
};

export const Primary: Story = Template.bind({});
Primary.args = {
  primary: true,
  label: 'Button',
};

export const Secondary: Story = Template.bind({});
Secondary.args = {
  label: 'Button',
};

export const Large: Story = Template.bind({})
Large.args = {
  size: 'large',
  label: 'Button',
};

export const Small: Story = Template.bind({});
Small.args = {
  size: 'small',
  label: 'Button',
};
