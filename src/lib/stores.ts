import { writable } from "svelte/store";
import { type Category, type Session } from "$lib/types/placemark-types";

export const currentSession = writable<Session>();
export const subTitle = writable<string>();
export const categories = writable<Category[]>();