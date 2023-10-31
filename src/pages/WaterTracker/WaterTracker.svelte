<script lang="ts">
  import waterTrackerStore from "$stores/WaterTrackerStore";
  const { getWaterQuantity, addWaterQuantity, getWaterGoal } =
    waterTrackerStore;

  let waterQuantity = getWaterQuantity();
  let waterGoal = getWaterGoal();
  let waterInputQuantity = 0;
</script>

<h1>{$waterQuantity}/{$waterGoal}</h1>
<input
  type="number"
  bind:value={waterInputQuantity}
/>
<button on:click={() => addWaterQuantity(waterInputQuantity)}>increment</button>

<style lang="scss">
</style>
