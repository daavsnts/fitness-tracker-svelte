import Home from "$pages/Home/Home.svelte";
import NotFound from "$pages/NotFound/NotFound.svelte";

export const routes = {
  "/": Home,
  "*": NotFound,
};
