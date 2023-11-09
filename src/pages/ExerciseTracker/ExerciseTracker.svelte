<script lang="ts">
  import ExerciseTrackerModal from "$components/ExerciseTrackerModal/ExerciseTrackerModal.svelte";
  import exerciseTrackerStore from "$stores/ExerciseTrackerStore";
  import { onDestroy, onMount } from "svelte";
  import plusIcon from "$assets/plus-icon.svg";
  import setUpIcon from "$assets/set-up-icon.svg";
  import RoundedIconButton from "$components/RoundedIconButton/RoundedIconButton.svelte";
  import PieChart from "$components/PieChart/PieChart.svelte";

  let todayTotalExercisePauses = exerciseTrackerStore.todayTotalExercisePauses;
  let todayCurrentExerciseGoal = exerciseTrackerStore.todayCurrentExerciseGoal;

  onMount(() => {
    exerciseTrackerStore.refreshStoreStates();
  });

  onDestroy(() => {
    exerciseTrackerStore.updateTodayExerciseGoal(0);
    exerciseTrackerStore.setTodayTotalExercisePauses(0);
  });

  let showModal = false;
  let modalType: string;

  function toggleModal(type: string) {
    modalType = type;
    showModal = !showModal;
  }

  function getModalChoice(choice: string) {
    exerciseTrackerStore.addExercise(choice);
    showModal = !showModal;
  }

  function getModalValue(value: number) {
    exerciseTrackerStore.updateTodayExerciseGoal(value);
    showModal = !showModal;
  }
</script>

<div class="ExerciseTracker">
  {#if showModal}
    <ExerciseTrackerModal
      {modalType}
      {toggleModal}
      {getModalValue}
      {getModalChoice}
    />
  {/if}

  <div class="exercise-container">
    <PieChart />
    <div class="exercise-text">
      <h1>{$todayTotalExercisePauses}</h1>
      <h1>/</h1>
      <h1>{$todayCurrentExerciseGoal.quantity}</h1>
    </div>
  </div>

  <div class="tips">
    <h2>After running or stretching click "+" button to record it</h2>
    <h2>If you want to change your goal, click on "config" button</h2>
  </div>

  <div class="buttons-container">
    <RoundedIconButton
      onClickFunction={() => toggleModal("exercise-pause")}
      iconPath={plusIcon}
      alt="add exercise pause"
    />
    <RoundedIconButton
      onClickFunction={() => toggleModal("exercise-goal")}
      iconPath={setUpIcon}
      alt="set exercise goal"
    />
  </div>
</div>

<style lang="scss">
  .ExerciseTracker {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;

    .exercise-container {
      margin-top: 5%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      row-gap: 30px;

      .exercise-text {
        display: flex;
        color: #fff;
        text-shadow: 4px 4px 8px rgba(0, 0, 0, 0.3);
        column-gap: 10px;
      }
    }

    .tips {
      width: 90%;
      display: flex;
      flex-direction: column;
      row-gap: 10px;

      h2 {
        color: #fff;
        font-weight: normal;
        text-align: center;
        font-size: 2rem;
        text-shadow: 1px 1px 8px rgba(0, 0, 0, 0.3);
      }
    }
    .buttons-container {
      display: flex;
      flex-direction: row;
      column-gap: 30px;
      margin-bottom: 5%;
    }
  }
</style>
