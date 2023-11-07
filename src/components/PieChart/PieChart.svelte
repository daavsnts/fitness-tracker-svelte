<script lang="ts">
  import exerciseTrackerStore from "$stores/ExerciseTrackerStore";
  import { onMount } from "svelte";

  let todayTotalExercisePauses = exerciseTrackerStore.todayTotalExercisePauses;
  let todayCurrentExerciseGoal = exerciseTrackerStore.todayCurrentExerciseGoal;

  onMount(() => {
    exerciseTrackerStore.refreshStoreStates();
  });

  let size: number = 230;
  let bgColor: string = "#008de9";
  let fgColor: string = "#00e925";
  let percentage: number = 0;
  let fixedPercentage: string = "";
  let convertedPercentage: number = 0;

  $: if (
    $todayTotalExercisePauses > 0 &&
    $todayCurrentExerciseGoal.quantity > 0
  ) {
    percentage =
      ($todayTotalExercisePauses / $todayCurrentExerciseGoal.quantity) * 100;
    fixedPercentage = percentage.toFixed();
    convertedPercentage = Number(fixedPercentage);
  }

  $: viewBox = `0 0 ${size} ${size}`;
  $: radius = size / 2;
  $: halfCircumference = Math.PI * radius;
  $: pieSize = halfCircumference * (convertedPercentage / 100);
  $: dashArray = `0 ${halfCircumference - pieSize} ${pieSize}`;
</script>

<div class="PieChart">
  <div class="outside-border">
    <svg
      width={size}
      height={size}
      {viewBox}
    >
      <circle
        r={radius}
        cx={radius}
        cy={radius}
        fill={bgColor}
      />
      <circle
        r={radius / 2}
        cx={radius}
        cy={radius}
        fill={bgColor}
        stroke={fgColor}
        stroke-width={radius}
        stroke-dasharray={dashArray}
      />
    </svg>
    <div class="percentage-text"><h1>{fixedPercentage}%</h1></div>
  </div>
</div>

<style lang="scss">
  .PieChart {
    width: 245px;
    height: 245px;
    display: flex;
    justify-content: center;
    align-items: center;

    .outside-border {
      width: 100%;
      height: 100%;
      position: relative;
      border: 8px solid #fff;
      border-radius: 50%;

      circle {
        -webkit-transition: all 900ms ease;
        -moz-transition: all 900ms ease;
        -ms-transition: all 900ms ease;
        -o-transition: all 900ms ease;
        transition: all 900ms ease;
      }

      .percentage-text {
        position: absolute;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        bottom: 0;
        z-index: 1;

        h1 {
          color: #fff;
          font-size: 4rem;
          text-shadow: 4px 4px 8px rgba(0, 0, 0, 0.3);
        }
      }
    }
  }
</style>
