<script lang="ts">
  import { Meta, Story, Template } from "@storybook/addon-svelte-csf";
  import NotFound from "./NotFound.svelte";
</script>

<Meta
  title="Pages/NotFound"
  component={NotFound}
  parameters={{
    // More on how to position stories at: https://storybook.js.org/docs/svelte/configure/story-layout
    layout: "fullscreen",
  }}
/>

<Template>
  <NotFound />
</Template>

<Story name="NotFound" />
