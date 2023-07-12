<script lang="ts">
  import Router, { push } from "svelte-spa-router";
  import { conditionsFailHandler, routeLoadingHandler, routes } from "./routes";
  import LoggedInUser from "$stores/LoggedInUser";
  import lunaImg from "$assets/Luna.jpg";
  import Header from "$components/Header/Header.svelte";
  import { tick } from "svelte";

  const userMock = {
    name: "João Silva",
    image: lunaImg,
  };
</script>

<header>
  <Header
    user={$LoggedInUser}
    on:login={() => ($LoggedInUser = userMock)}
    on:logout={() => {
      push("/")
        .then(async () => {
          await tick();
          $LoggedInUser = null;
        })
        .catch((e) => {
          throw e;
        });
    }}
    on:createAccount={() => ($LoggedInUser = userMock)}
  />
</header>
<main>
  <Router
    {routes}
    on:routeLoading={routeLoadingHandler}
    on:conditionsFailed={conditionsFailHandler}
  />
</main>
