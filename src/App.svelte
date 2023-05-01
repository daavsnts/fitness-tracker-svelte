<script lang="ts">
  import Router, { push } from "svelte-spa-router";
  import { conditionsFailHandler, routeLoadingHandler, routes } from "./routes";
  import { user } from "$stores/global";
  import lunaImg from "$assets/Luna.jpg";
  import Header from "$components/Header/Header.svelte";
  import { tick } from "svelte";

  const userMock = {
    name: "Victor Gris",
    image: lunaImg,
  };
</script>

<header>
  <Header
    user={$user}
    on:login={() => ($user = userMock)}
    on:logout={() => {
      push("/")
        .then(async () => {
          await tick();
          $user = null;
        })
        .catch((e) => {
          throw e;
        });
    }}
    on:createAccount={() => ($user = userMock)}
  />
</header>
<main>
  <Router
    {routes}
    on:routeLoading={routeLoadingHandler}
    on:conditionsFailed={conditionsFailHandler}
  />
</main>
