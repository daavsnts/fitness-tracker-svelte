<script lang="ts">
  import { Meta, Story, Template } from "@storybook/addon-svelte-csf";
  import type { PlayFunctionParameter } from "$types/utils";

  import { expect } from "@storybook/jest";
  import { userEvent, within } from "@storybook/testing-library";

  import Button from "./Button.svelte";

  const dynamicTest = async ({
    args,
    canvasElement,
  }: PlayFunctionParameter<Button>) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button"));
    console.log(args.event_click.constructor.name);
    await expect(args.event_click).toBeCalled();
  };
</script>

<!-- More on how to set up stories at: https://storybook.js.org/docs/svelte/writing-stories/introduction -->
<Meta
  title="Components/Button"
  component={Button}
  argTypes={{
    backgroundColor: { control: "color" },
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
    },
  }}
/>

<!--
  Since the slot prop type is not well defined, this rule must be disabled only for this section,
  but it is guaranteed to work: args will have a prop named `event_<name of event>` for each event
  you have in your component
-->
<!-- eslint-disable @typescript-eslint/no-unsafe-member-access -->
<Template let:args>
  <Button
    {...args}
    on:click={args.event_click}
  />
</Template>
<!-- eslint-enable @typescript-eslint/no-unsafe-member-access -->

<!-- More on writing stories with args: https://storybook.js.org/docs/svelte/writing-stories/args -->
<Story
  name="Clicking"
  args={{
    label: "Automatically clicked",
  }}
  play={dynamicTest}
/>

<Story
  name="Primary"
  args={{
    primary: true,
    label: "Button",
  }}
/>

<Story
  name="Secondary"
  args={{
    label: "Button",
  }}
/>

<Story
  name="Large"
  args={{
    size: "large",
    label: "Button",
  }}
/>

<Story
  name="Small"
  args={{
    size: "small",
    label: "Button",
  }}
/>
