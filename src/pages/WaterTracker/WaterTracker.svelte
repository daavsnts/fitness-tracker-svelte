<script lang="ts">
  import waterTrackerStore from "$stores/WaterTrackerStore";

  let todayTotalWaterIntake = waterTrackerStore.todayTotalWaterIntake;
  let currentWaterGoal = waterTrackerStore.currentWaterGoal;

  let addWaterIntakeValue = 0;
  let updateTodayWaterGoalValue = 0;
</script>

<h1>{$todayTotalWaterIntake}/{$currentWaterGoal.quantity}</h1>

<input bind:value={addWaterIntakeValue} />
<button on:click={() => waterTrackerStore.addWaterIntake(addWaterIntakeValue)}
  >Add</button
>
<input bind:value={updateTodayWaterGoalValue} />
<button
  on:click={() =>
    waterTrackerStore.updateTodayWaterGoal(updateTodayWaterGoalValue)}
  >Set</button
>

<style lang="scss">
</style>
