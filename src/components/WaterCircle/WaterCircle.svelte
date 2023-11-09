<script lang="ts">
  import waterTrackerStore from "$stores/WaterTrackerStore";
  import type { WaterIntakeGoal } from "$types/fitnessTypes";
  import { onMount } from "svelte";
  import type { Writable } from "svelte/store";

  const {
    getTodayTotalWaterIntake,
    getTodayWaterIntakeGoal,
    refreshStoreStates,
  } = waterTrackerStore;

  let todayTotalWaterIntake: Writable<number> = getTodayTotalWaterIntake();
  let todayWaterIntakeGoal: Writable<WaterIntakeGoal> =
    getTodayWaterIntakeGoal();

  onMount(() => {
    refreshStoreStates();
  });

  let percentage: number = 0;
  let fixedPercentage: string = "0";
  let convertedPercentage: number = 100;

  $: if ($todayTotalWaterIntake > 0 && $todayWaterIntakeGoal.quantity > 0) {
    percentage =
      ($todayTotalWaterIntake / $todayWaterIntakeGoal.quantity) * 100;
    fixedPercentage = percentage.toFixed();
    convertedPercentage = 100 - Number(fixedPercentage);
  }
</script>

<div class="circle-container">
  <div class="outside-circle-border">
    <div class="inner-circle">
      <div
        class="wave"
        style="--top: {convertedPercentage}%"
      />
    </div>
    <div class="percentage-text"><h1>{fixedPercentage}%</h1></div>
  </div>
</div>

<style lang="scss">
  .circle-container {
    width: 230px;
    height: 230px;
  }

  .outside-circle-border {
    position: relative;
    width: 100%;
    height: 100%;
    border: 2px solid #fff;
    border-radius: 50%;
  }

  .inner-circle {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: transparent;
    border: 8px solid #0a6ab6;
    border-radius: 50%;
    overflow: hidden;
    -webkit-backface-visibility: hidden;
    -moz-backface-visibility: hidden;
    -webkit-transform: translate3d(0, 0, 0);
    -moz-transform: translate3d(0, 0, 0);
    cursor: pointer;
  }

  .wave {
    background: linear-gradient(#008de9, #11b5fc);
    position: absolute;
    top: var(--top);
    height: 200%;
    width: 200%;
    border-radius: 38%;
    left: -50%;
    transform: rotate(360deg);
    transition: all 5s ease;
    animation: wave 40s linear infinite;
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

  @keyframes wave {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(3600deg);
    }
  }
</style>
