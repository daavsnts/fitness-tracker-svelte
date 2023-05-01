import type { UserStore } from "$types/global-stores";
import { writable } from "svelte/store";

export const user = writable<UserStore | null>(null);
