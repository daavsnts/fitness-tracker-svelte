<script lang="ts">
  import waterTrackerStore from "$stores/WaterTrackerStore";

  let todayTotalWaterIntake = waterTrackerStore.todayTotalWaterIntake;
  let currentWaterGoal = waterTrackerStore.currentWaterGoal;
</script>

<h1>{$todayTotalWaterIntake}/{$currentWaterGoal.quantity}</h1>

<style lang="scss">
</style>
