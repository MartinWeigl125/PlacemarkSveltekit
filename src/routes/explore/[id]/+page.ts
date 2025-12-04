import { placemarkService } from "$lib/services/placemark-service";
import { get } from "svelte/store";
import type { PageLoad } from "./$types";
import { categories, currentSession } from "$lib/stores";
import type { MarkerLayer } from "$lib/types/placemark-types";
import { generateMarkerSpec } from "$lib/services/placemark-utils";

export const ssr = false;

export const load: PageLoad = async ({ params }) => {
  const markerLayers: MarkerLayer[] = [];
  const poi = await placemarkService.getPoiById(get(currentSession), encodeURI(params.id));
  const marker = generateMarkerSpec(poi);
  poi.markerSpec = generateMarkerSpec(poi);
  get(categories).forEach((category) => {
    markerLayers.push(category.markerLayer);
  })
  return {
    poi,
    marker,
    markerLayers
  };
};