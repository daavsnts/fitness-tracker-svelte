<script lang="ts">
  import waterTrackerStore from "$stores/WaterTrackerStore";
  import { onMount } from "svelte";

  const { getTotalWaterIntake, getLatestWaterGoal, refreshStoreStates } =
    waterTrackerStore;

  let totalWaterIntake = getTotalWaterIntake();
  let latestWaterGoal = getLatestWaterGoal();

  onMount(() => {
    refreshStoreStates();
  });

  let waterInputQuantity: number = 0;
</script>

<h1>{$totalWaterIntake}/{$latestWaterGoal || 0}</h1>
<input
  type="number"
  bind:value={waterInputQuantity}
/>
<button on:click={() => waterTrackerStore.addWaterIntake(waterInputQuantity)}
  >Add</button
>

<style lang="scss">
</style>
