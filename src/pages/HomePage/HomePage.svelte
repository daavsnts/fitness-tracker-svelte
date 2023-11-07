<script lang="ts">
  import Router, { push } from "svelte-spa-router";
  import {
    conditionsFailHandler,
    routeLoadingHandler,
    homePageRoutes as routes,
  } from "../../routes";
  import TopAppBar from "$components/TopAppBar/TopAppBar.svelte";
  import BottomAppBar from "$components/BottomAppBar/BottomAppBar.svelte";
</script>

<div class="HomePage">
  <TopAppBar />
  <div class="Screens">
    <Router
      {routes}
      on:routeLoading={routeLoadingHandler}
      on:conditionsFailed={conditionsFailHandler}
    />
  </div>
  <BottomAppBar />
</div>

<style lang="scss">
  .HomePage {
    width: 100%;
    height: 100vh;
  }

  .Screens {
    width: 100%;
    height: 80%;
  }
</style>
