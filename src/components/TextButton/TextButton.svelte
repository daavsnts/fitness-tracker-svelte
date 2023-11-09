<script lang="ts">
  export let onClickFunction: Function;
  export let text: string;
</script>

<button
  on:click={() => onClickFunction()}
>
  {text}
</button>

<style>
  button {
    border: none;
    padding: 10px;
    border-radius: 10px;
    background-color: #11b5fc;
    font-size: 1.7rem;
    color: #fff;
    font-weight: bold;
    filter: drop-shadow(1px 1px 4px rgba(0, 0, 0, 0.3));
  }
</style>
