<script lang="ts">
  import Router, { push } from "svelte-spa-router";
  import {
    conditionsFailHandler,
    routeLoadingHandler,
    loginPageRoutes as routes,
  } from "../../routes";
</script>

<div class="LoginPage">
  <div class="Screens">
    <Router
      {routes}
      on:routeLoading={routeLoadingHandler}
      on:conditionsFailed={conditionsFailHandler}
    />
  </div>
</div>

<style lang="scss">
  .LoginPage {
    width: 100%;
    height: 100vh;
  }

  .Screens {
    width: 100%;
    height: 100%;
  }
</style>
