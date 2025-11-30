import { placemarkService } from "$lib/services/placemark-service";
import { get } from "svelte/store";
import type { PageLoad } from "./$types";
import { currentSession } from "$lib/stores";

export const ssr = false;

export const load: PageLoad = async ({ params }) => {
  const poi = await placemarkService.getPoiById(get(currentSession), encodeURI(params.id));
  return {
    poi
  };
};