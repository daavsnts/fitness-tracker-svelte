import WaterTracker from "$pages/WaterTracker/WaterTracker.svelte";
import ExerciseTracker from "$pages/ExerciseTracker/ExerciseTracker.svelte";
import UserProfile from "$pages/UserProfile/UserProfile.svelte";
import NotAuthorized from "$pages/NotAuthorized/NotAuthorized.svelte";
import NotFound from "$pages/NotFound/NotFound.svelte";
import {
  type ConditionsFailedEvent,
  type RouteLoadingEvent,
  replace,
} from "svelte-spa-router";
import { wrap } from "svelte-spa-router/wrap";
import UserLogin from "$pages/UserLogin/UserLogin.svelte";
import UserRegister from "$pages/UserRegister/UserRegister.svelte";
import { isUserLoggedIn } from "$policies/auth";

const unLoggedRoutes = new Map();

unLoggedRoutes.set(
  "/",
  wrap({
    component: UserLogin,
  })
);
unLoggedRoutes.set(
  "/user-register",
  wrap({
    component: UserRegister,
  })
);
unLoggedRoutes.set(
  "/not-authorized",
  wrap({
    component: NotAuthorized,
  })
);
unLoggedRoutes.set(
  "*",
  wrap({
    component: NotFound,
  })
);

export { unLoggedRoutes };

const loggedRoutes = new Map();

loggedRoutes.set(
  "/",
  wrap({
    component: WaterTracker,
    conditions: [isUserLoggedIn],
  })
);
loggedRoutes.set(
  "/exercise-tracker",
  wrap({
    component: ExerciseTracker,
    conditions: [isUserLoggedIn],
  })
);
loggedRoutes.set(
  "/user-profile",
  wrap({
    component: UserProfile,
    conditions: [isUserLoggedIn],
  })
);
loggedRoutes.set(
  "/not-authorized",
  wrap({
    component: NotAuthorized,
  })
);
loggedRoutes.set(
  "*",
  wrap({
    component: NotFound,
  })
);

export { loggedRoutes };

export function routeLoadingHandler({ detail }: RouteLoadingEvent): void {
  // If not hash based, redirect to hash based path
  if (!window.location.hash.startsWith("#/")) {
    // Save query string
    const { search } = window.location;

    // Remove any paths and querystrings
    window.history.replaceState(
      null,
      "",
      `${window.location.origin}${window.location.pathname}`
    );

    // Go to location with querystring
    replace(detail.location + search).catch((e) => {
      throw e;
    });
  }
}

/**
 * On some condition fail this function will be triggered, performing routes change
 */
export async function conditionsFailHandler(
  event: ConditionsFailedEvent
): Promise<void> {
  const { route } = event.detail;
  await replace(`/not-authorized?route=${route as string}`);
}
