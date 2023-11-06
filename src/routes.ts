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
const loginPageRoutes = new Map();

loginPageRoutes.set(
  "/",
  wrap({
    component: UserLogin,
  })
);
loginPageRoutes.set(
  "/user-register",
  wrap({
    component: UserRegister,
  })
);
loginPageRoutes.set(
  "/not-authorized",
  wrap({
    component: NotAuthorized,
  })
);
loginPageRoutes.set(
  "*",
  wrap({
    component: NotFound,
  })
);

export { loginPageRoutes };

const homePageRoutes = new Map();

homePageRoutes.set(
  "/",
  wrap({
    component: WaterTracker,
    conditions: [isUserLoggedIn],
  })
);
homePageRoutes.set(
  "/exercise-tracker",
  wrap({
    component: ExerciseTracker,
    conditions: [isUserLoggedIn],
  })
);
homePageRoutes.set(
  "/user-profile",
  wrap({
    component: UserProfile,
    conditions: [isUserLoggedIn],
  })
);
homePageRoutes.set(
  "/not-authorized",
  wrap({
    component: NotAuthorized,
  })
);
homePageRoutes.set(
  "*",
  wrap({
    component: NotFound,
  })
);

export { homePageRoutes };

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
