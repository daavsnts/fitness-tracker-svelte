import { writable } from "svelte/store";

export type TLoggedInUser = {
  name: string;
  image: string;
};

export default writable<TLoggedInUser | null>(null);
