import { placemarkService } from "$lib/services/placemark-service";
import type { MarkerLayer } from "$lib/types/placemark-types";
import { generateMarkerSpec } from "$lib/services/placemark-utils";
import type { PageServerLoad } from "./$types";
import { currentCategories } from "$lib/types/runes.svelte";

export const ssr = false;

export const load: PageServerLoad = async ({ parent, params }) => {
  const { session } = await parent();
  if (session) {
    const markerLayers: MarkerLayer[] = [];
    const poi = await placemarkService.getPoiById(session.token, encodeURI(params.id));
    const marker = generateMarkerSpec(poi);
    poi.markerSpec = generateMarkerSpec(poi);
    currentCategories.categories.forEach((category) => {
      markerLayers.push(category.markerLayer);
    })
    return {
      poi,
      marker,
      markerLayers
    };
  }
};