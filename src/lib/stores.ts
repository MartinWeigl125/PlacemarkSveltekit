import { writable } from "svelte/store";
import { type Category, type Comment, type Session } from "$lib/types/placemark-types";

export const currentSession = writable<Session>();
export const categories = writable<Category[]>();
export const latestComment = writable<Comment>();