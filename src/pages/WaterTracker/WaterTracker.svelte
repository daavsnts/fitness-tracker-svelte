<script lang="ts">
  import { type WaterGoal } from "$types/fitnessTypes";
  import waterTrackerStore from "$stores/WaterTrackerStore";
  import { onMount } from "svelte";
  import type { Writable } from "svelte/store";

  const { getTotalWaterIntake, getLatestWaterGoal, refreshStoreStates } =
    waterTrackerStore;

  let totalWaterIntake: Writable<number> = getTotalWaterIntake();
  let latestWaterGoal: Writable<WaterGoal> = getLatestWaterGoal();

  onMount(() => {
    refreshStoreStates();
  });

  let waterInputQuantity: number = 0;
  let waterGoalInput: number = 0;
</script>

<h1>{$totalWaterIntake || 0}/{$latestWaterGoal.quantity}</h1>
<input
  type="number"
  bind:value={waterInputQuantity}
/>
<button on:click={() => waterTrackerStore.addWaterIntake(waterInputQuantity)}
  >Add</button
>

<input
  type="number"
  bind:value={waterGoalInput}
/>
<button on:click={() => waterTrackerStore.updateWaterGoal(waterGoalInput)}
  >Add</button
>

<style lang="scss">
</style>
