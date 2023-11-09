<script lang="ts">
  export let onClickFunction: Function;
  export let alt: string;
  export let iconPath: string;
</script>

<button on:click={() => onClickFunction()}>
  <img
    src={iconPath}
    {alt}
  />
</button>

<style lang="scss">
  button {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    border: none;
    filter: drop-shadow(1px 1px 4px rgba(0, 0, 0, 0.3));
  }
</style>
