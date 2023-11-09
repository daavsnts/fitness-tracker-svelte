<script lang="ts">
  import Router, { push } from "svelte-spa-router";
  import { conditionsFailHandler, routeLoadingHandler, routes } from "./routes";
  import TopAppBar from "./components/TopAppBar/TopAppBar.svelte";
  import BottomAppBar from "$components/BottomAppBar/BottomAppBar.svelte";
</script>

<div class="App">
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
  .App {
    width: 100%;
    height: 100vh;
    background: linear-gradient(#0258af, #379ddd);
  }

  .Screens {
    width: 100%;
    height: 80%;
  }
</style>
