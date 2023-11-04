<script lang="ts">
  import waterTrackerStore from "$stores/WaterTrackerStore";

  let todayTotalWaterIntake = waterTrackerStore.todayTotalWaterIntake;
  let currentWaterGoal = waterTrackerStore.todayCurrentWaterGoal;

  let addWaterIntakeInputValue = 0;
  let updateTodayWaterGoalInputValue = 0;
</script>

<h1>{$todayTotalWaterIntake}/{$currentWaterGoal.quantity}</h1>

<input bind:value={addWaterIntakeInputValue} />
<button
  on:click={() => waterTrackerStore.addWaterIntake(addWaterIntakeInputValue)}
>
  Add
</button>
<input bind:value={updateTodayWaterGoalInputValue} />
<button
  on:click={() =>
    waterTrackerStore.updateTodayWaterGoal(updateTodayWaterGoalInputValue)}
>
  Set
</button>

<style lang="scss">
</style>
