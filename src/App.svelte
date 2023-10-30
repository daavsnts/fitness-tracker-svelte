<script lang="ts">
  import Router, { push } from "svelte-spa-router";
  import { conditionsFailHandler, routeLoadingHandler, routes } from "./routes";
</script>

<Router
  {routes}
  on:routeLoading={routeLoadingHandler}
  on:conditionsFailed={conditionsFailHandler}
/>
