import WaterTracker from "$pages/WaterTracker/WaterTracker.svelte";
import NotAuthorized from "$pages/NotAuthorized/NotAuthorized.svelte";
import NotFound from "$pages/NotFound/NotFound.svelte";
import { type ConditionsFailedEvent, type RouteLoadingEvent, replace } from "svelte-spa-router";
import { wrap } from "svelte-spa-router/wrap";

export const routes = new Map();

routes.set(
  "/",
  wrap({
    component: WaterTracker,
  })
);
routes.set(
  "/not-authorized",
  wrap({
    component: NotAuthorized,
  })
);
routes.set(
  "*",
  wrap({
    component: NotFound,
  })
);

export function routeLoadingHandler({ detail }: RouteLoadingEvent): void {
  // If not hash based, redirect to hash based path
  if (!window.location.hash.startsWith("#/")) {
    // Save query string
    const { search } = window.location;

    // Remove any paths and querystrings
    window.history.replaceState(null, "", `${window.location.origin}${window.location.pathname}`);

    // Go to location with querystring
    replace(detail.location + search).catch((e) => {
      throw e;
    });
  }
}

/**
 * On some condition fail this function will be triggered, performing routes change
 */
export async function conditionsFailHandler(event: ConditionsFailedEvent): Promise<void> {
  const { route } = event.detail;
  await replace(`/not-authorized?route=${route as string}`);
}
