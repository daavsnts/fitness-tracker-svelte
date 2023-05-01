import { user } from "$stores/global";
import { get } from "svelte/store";

export const isUserLoggedIn = (): boolean => get(user) !== null;
