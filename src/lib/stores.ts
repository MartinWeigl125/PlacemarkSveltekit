import { writable } from "svelte/store";
import { type Category, type Comment, type MarkerLayer, type MarkerSpec, type Poi, type Session } from "$lib/types/placemark-types";
import { rune } from "./types/runes.svelte";

export const currentSession = writable<Session>();
export const categories = writable<Category[]>();
export const markerLayers = writable<MarkerLayer[]>([]);
export const latestComment = writable<Comment>();

export const sharedMarker = rune<MarkerSpec | null>(null);
export const sharedPoi = rune<Poi | null>(null);