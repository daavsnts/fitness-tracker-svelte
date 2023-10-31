import LoggedInUser from "$stores/LoggedInUser";
import { get } from "svelte/store";

export const isUserLoggedIn = (): boolean => get(LoggedInUser) !== null;
