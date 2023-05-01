<script lang="ts">
  import { Meta, Story, Template } from "@storybook/addon-svelte-csf";
  import NotAuthorized from "./NotAuthorized.svelte";
</script>

<Meta
  title="Pages/NotAuthorized"
  component={NotAuthorized}
  parameters={{
    // More on how to position stories at: https://storybook.js.org/docs/svelte/configure/story-layout
    layout: "fullscreen",
  }}
/>

<Template>
  <NotAuthorized />
</Template>

<Story name="NotAuthorized" />
