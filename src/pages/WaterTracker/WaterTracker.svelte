<script lang="ts">
  import waterTrackerStore from "$stores/WaterTrackerStore";

  let todayTotalWaterIntake = waterTrackerStore.todayTotalWaterIntake;
  let todayCurrentWaterGoal = waterTrackerStore.todayCurrentWaterGoal;
  let todayWaterIntakeHistory = waterTrackerStore.todayWaterIntakeHistory;

  let addWaterIntakeInputValue = 0;
  let updateTodayWaterGoalInputValue = 0;
</script>

<p>Water intake history:</p>
{#each $todayWaterIntakeHistory as waterIntake}
  <li>{waterIntake.quantity}</li>
{/each}

<p>Today total water intake: {$todayTotalWaterIntake}</p>
<p>Today water goal: {$todayCurrentWaterGoal.quantity}</p>

<input bind:value={addWaterIntakeInputValue} />
<button
  on:click={() => waterTrackerStore.addWaterIntake(addWaterIntakeInputValue)}
>
  Add water intake
</button>

<input bind:value={updateTodayWaterGoalInputValue} />
<button
  on:click={() =>
    waterTrackerStore.updateTodayWaterGoal(updateTodayWaterGoalInputValue)}
>
  Set today goal
</button>

<style lang="scss">
</style>
