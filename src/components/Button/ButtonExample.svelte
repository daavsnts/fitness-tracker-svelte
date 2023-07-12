<script lang="ts">
  import type { ComponentProps } from "svelte";
  import Button from "./Button.svelte";

  // Force this example extend the base component interface, so we can use the
  // spreed of restProps, instead of declare again all button interface manually.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface $$Props extends ComponentProps<Button> {
    label: string;
  }

  // Used to force $$restProps be of type ComponentProps<Button>;
  $: restProps = $$restProps as ComponentProps<Button>;

  export let label = "Hello";
</script>

<Button
  {...restProps}
  on:click
>
  {label}
</Button>
