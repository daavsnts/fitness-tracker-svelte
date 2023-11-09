<script lang="ts">
  export let onClickFunction: Function;
  export let iconPath: string;
  export let alt: string;
</script>

<button on:click={() => onClickFunction()}>
  <img
    src={iconPath}
    {alt}
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
