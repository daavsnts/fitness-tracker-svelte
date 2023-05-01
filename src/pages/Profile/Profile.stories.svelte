<script lang="ts">
  import { user } from "$stores/global";
  import lunaImg from "$assets/Luna.jpg";
  import { Story, Meta } from "@storybook/addon-svelte-csf";
  import Profile from "./Profile.svelte";

  $user = {
    name: "Victor Gris",
    image: lunaImg,
  };
</script>

<Meta
  title="Pages/Profile"
  component={Profile}
/>

<Story name="Default">
  <Profile />
</Story>
