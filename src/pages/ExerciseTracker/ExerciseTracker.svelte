<script lang="ts">
  import exerciseTrackerStore from "$stores/ExerciseTrackerStore";
  import { onMount } from "svelte";

  let todayExerciseHistory = exerciseTrackerStore.todayExerciseHistory;
  let todayTotalExercisePauses = exerciseTrackerStore.todayTotalExercisePauses;
  let todayCurrentExerciseGoal = exerciseTrackerStore.todayCurrentExerciseGoal;
  let exerciseTypeInputValue = "";
  let updateGoalInputValue = 0;

  onMount(() => {
    exerciseTrackerStore.refreshStoreStates();
  });
</script>

<p>Pauses history:</p>
{#each $todayExerciseHistory as exercise}
  <li>{exercise.type}</li>
{/each}

<p>Today total pauses: {$todayTotalExercisePauses}</p>
<p>Today current goal: {$todayCurrentExerciseGoal.quantity}</p>

<input
  bind:value={exerciseTypeInputValue}
  type="text"
/>
<button
  on:click={() => exerciseTrackerStore.addExercise(exerciseTypeInputValue)}
>
  Add Pause
</button>

<input
  bind:value={updateGoalInputValue}
  type="number"
/>
<button
  on:click={() =>
    exerciseTrackerStore.updateTodayExerciseGoal(updateGoalInputValue)}
>
  Update goal
</button>

<style lang="scss">
</style>
