<script lang="ts">
  import { type WaterGoal } from "$types/fitnessTypes";
  import waterTrackerStore from "$stores/WaterTrackerStore";
  import { onMount } from "svelte";
  import type { Writable } from "svelte/store";

  const { getTodayTotalWaterIntake, getTodayLatestWaterGoal, refreshStoreStates } =
    waterTrackerStore;

  let todayTotalWaterIntake: Writable<number> = getTodayTotalWaterIntake();
  let todayLatestWaterGoal: Writable<WaterGoal> = getTodayLatestWaterGoal();

  onMount(() => {
    refreshStoreStates();
  });

  let waterIntakeInput: number = 0;
  let waterGoalInput: number = 0;
</script>

<h1>{$todayTotalWaterIntake || 0}/{$todayLatestWaterGoal.quantity}</h1>
<input
  type="number"
  bind:value={waterIntakeInput}
/>
<button on:click={() => waterTrackerStore.addWaterIntake(waterIntakeInput)}
  >Add</button
>

<input
  type="number"
  bind:value={waterGoalInput}
/>
<button on:click={() => waterTrackerStore.updateTodayWaterGoal(waterGoalInput)}
  >Add</button
>

<style lang="scss">
</style>
