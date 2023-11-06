import userAuthenticationStore from "$stores/UserAuthenticationStore";
import { get } from "svelte/store";

export const isUserLoggedIn = (): boolean =>
  get(userAuthenticationStore.isUserLoggedIn);
