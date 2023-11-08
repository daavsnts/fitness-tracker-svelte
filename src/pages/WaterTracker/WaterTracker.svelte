<script lang="ts">
  import waterTrackerStore from "$stores/WaterTrackerStore";
  import { onMount } from "svelte";
  const {
    getTotalWaterIntake,
    addWaterIntake,
    getLatestWaterGoal,
    refreshStoreStates,
  } = waterTrackerStore;

  let totalWaterIntake = getTotalWaterIntake();
  let latestWaterGoal = getLatestWaterGoal();

  onMount(async () => {
    await refreshStoreStates();
  });

  let waterInputQuantity: number = 0;
</script>

<h1>{$totalWaterIntake}/{$latestWaterGoal}</h1>
<input
  type="number"
  bind:value={waterInputQuantity}
/>
<button on:click={() => addWaterIntake(waterInputQuantity)}>Add</button>

<style lang="scss">
</style>
