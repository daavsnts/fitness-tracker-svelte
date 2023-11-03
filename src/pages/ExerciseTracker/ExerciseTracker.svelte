<script lang="ts">
  import exerciseTrackerStore from "$stores/ExerciseTrackerStore";

  let todayExerciseHistory = exerciseTrackerStore.todayExerciseHistory;
  let exerciseTypeInputValue = "";
</script>

{#each $todayExerciseHistory as exercise}
  <li>{exercise.type}</li>
{/each}
<input bind:value={exerciseTypeInputValue} />

<button
  on:click={() => exerciseTrackerStore.addExercise(exerciseTypeInputValue)}
>
  Add
</button>

<style lang="scss">
</style>
