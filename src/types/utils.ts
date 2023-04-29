import type { StoryObj } from "@storybook/svelte";
import type { ComponentEvents, SvelteComponent } from "svelte";

// TODO: find a way to remove the generic event definition given by ComponentEvents so only real
// events are given by the type
export type PlayFunctionParameter<Component extends SvelteComponent> =
  // eslint-disable-next-line @typescript-eslint/ban-types
  Parameters<Extract<StoryObj<Component>["play"], Function>>[0] & {
    args: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      [P in keyof ComponentEvents<Component> as `event_${Extract<P, string>}`]: jest.Mock<(event: ComponentEvents<Component>[P]) => any | Promise<any>>
    }
  };
