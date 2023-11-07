<script lang="ts">
  import exerciseTrackerStore from "$stores/ExerciseTrackerStore";
  import waterTrackerStore from "$stores/WaterTrackerStore";
  import { onMount } from "svelte";

  let totalWaterIntake = waterTrackerStore.totalWaterIntake;
  let totalExercisePauses = exerciseTrackerStore.totalExercisePauses;

  onMount(() => {
    waterTrackerStore.refreshStoreStates();
    exerciseTrackerStore.refreshStoreStates();
  });
</script>

<div class="UserProfile">
  <div class="statistics">
    <div class="water-intake-container">
      <h1>Total water intake:</h1>
      <h2>{$totalWaterIntake}ml</h2>
    </div>

    <div class="exercise-container">
      <h1>Total exercises:</h1>
      <h2>{$totalExercisePauses}</h2>
    </div>
  </div>

  <h1>User history soon!</h1>
</div>

<style lang="scss">
  .UserProfile {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 30px;

    h1 {
      font-size: 2.5rem;
      color: #fff;
      text-shadow: 4px 4px 8px rgba(0, 0, 0, 0.3);
    }

    .statistics {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      padding: 3%;

      .water-intake-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        row-gap: 10px;
        width: 100%;

        h1 {
          font-size: 2rem;
          text-align: center;
        }

        h2 {
          color: #fff;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        }
      }

      .exercise-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        row-gap: 10px;
        width: 100%;

        h1 {
          font-size: 2rem;
          text-align: center;
        }

        h2 {
          color: #fff;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        }
      }
    }
  }
</style>
