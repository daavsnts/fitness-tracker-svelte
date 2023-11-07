<script lang="ts">
  import WaterCircle from "$components/WaterCircle/WaterCircle.svelte";
  import waterTrackerStore from "$stores/WaterTrackerStore";
  import { onMount } from "svelte";
  import plusIcon from "$assets/plus-icon.svg";
  import setUpIcon from "$assets/set-up-icon.svg";
  import WaterTrackerModal from "$components/WaterTrackerModal/WaterTrackerModal.svelte";
  import RoundedIconButton from "$components/RoundedIconButton/RoundedIconButton.svelte";

  onMount(() => {
    waterTrackerStore.refreshStoreStates();
  });

  let todayTotalWaterIntake = waterTrackerStore.todayTotalWaterIntake;
  let todayCurrentWaterGoal = waterTrackerStore.todayCurrentWaterGoal;

  let showModal = false;
  let modalType: string;

  function toggleModal(type: string) {
    modalType = type;
    showModal = !showModal;
  }

  function getModalValue(value: number, type: string) {
    if (type != "") {
      if (type == "water-intake") waterTrackerStore.addWaterIntake(value);
      if (type == "water-goal") waterTrackerStore.updateTodayWaterGoal(value);
    }
    showModal = !showModal;
  }
</script>

<div class="WaterTracker">
  {#if showModal}
    <WaterTrackerModal
      {modalType}
      {toggleModal}
      {getModalValue}
    />
  {/if}

  <div class="water-intake-container">
    <WaterCircle />
    <div class="water-intake-text">
      <h1>{$todayTotalWaterIntake}ml</h1>
      <h1>/</h1>
      <h1>{$todayCurrentWaterGoal.quantity}ml</h1>
    </div>
  </div>

  <div class="tips">
    <h2>After drinking a glass of water click "+" button to record it</h2>
    <h2>If you want to change your goal, click on "config" button</h2>
  </div>

  <div class="buttons-container">
    <RoundedIconButton
      onClickFunction={() => toggleModal("water-intake")}
      iconPath={plusIcon}
      alt="add water intake"
    />
    <RoundedIconButton
      onClickFunction={() => toggleModal("water-goal")}
      iconPath={setUpIcon}
      alt="add water goal"
    />
  </div>
</div>

<style lang="scss">
  .WaterTracker {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;

    .water-intake-container {
      margin-top: 5%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      row-gap: 30px;

      .water-intake-text {
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
