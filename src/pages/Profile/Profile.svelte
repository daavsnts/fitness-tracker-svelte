<script lang="ts">
  import { user } from "$stores/global";
</script>

{#if $user}
  <article>
    <h1>{$user.name}</h1>
    <img
      src={$user.image}
      alt="{$user.name}'s profile picture"
    />
  </article>
{/if}

<style lang="scss">
  img {
    width: 50ch;
    height: 50ch;
    border-radius: 100%;
  }
</style>
