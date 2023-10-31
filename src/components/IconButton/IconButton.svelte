<script lang="ts">
  import { push } from "svelte-spa-router";

  export let iconPath: string;
  export let route: string;
</script>

<button on:click={() => push(route)}>
  <img
    src={iconPath}
    alt="Water Tracker Icon"
  />
</button>

<style lang="scss">
  button {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    border: none;
  }
</style>
