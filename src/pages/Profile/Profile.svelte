<script lang="ts">
  import LoggedInUser from "$stores/LoggedInUser";
</script>

{#if $LoggedInUser}
  <article>
    <h1>{$LoggedInUser.name}</h1>
    <img
      src={$LoggedInUser.image}
      alt="{$LoggedInUser.name}'s profile picture"
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
