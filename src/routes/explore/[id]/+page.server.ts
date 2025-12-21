import { placemarkService } from "$lib/services/placemark-service";
import { generateMarkerLayer, generateMarkerSpec, refreshPlacemarkState } from "$lib/services/placemark-utils";
import type { PageServerLoad } from "./$types";
import { currentCategories, currentComments, currentUsers } from "$lib/types/runes.svelte";

// have to do this, otherwise you get window is not defined after refreshing the page
export const ssr = false;

export const load: PageServerLoad = async ({ parent, params }) => {
  const { session } = await parent();
  if (session) {
    const categories = await placemarkService.getCategories(session.token);
    const pois = await placemarkService.getPois(session.token);
    refreshPlacemarkState(categories, pois, currentUsers.users, currentComments.comments);

    currentCategories.categories.forEach((category) => {
      category.pois.forEach((poi) => {
        poi.markerSpec = generateMarkerSpec(poi);
      });
      category.markerLayer = generateMarkerLayer(category);
    });
    const markerLayers = currentCategories.categories.map(cat => cat.markerLayer);
    
    const poi = await placemarkService.getPoiById(session.token, encodeURI(params.id));
    const marker = generateMarkerSpec(poi);
    poi.markerSpec = generateMarkerSpec(poi);
    return {
      poi,
      marker,
      markerLayers
    };
  }
};