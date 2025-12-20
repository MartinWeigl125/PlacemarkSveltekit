import { placemarkService } from "$lib/services/placemark-service";
import { generateMarkerLayer, generateMarkerSpec, refreshPlacemarkState } from "$lib/services/placemark-utils";
import { currentCategories } from "$lib/types/runes.svelte";
import type { PageServerLoad } from "./$types";

// have to do this, otherwise you get window is not defined after refreshing the page
export const ssr = false;

export const load: PageServerLoad = async ({ parent }) => {
    const { session } = await parent();
    if (session) {
        const categories = await placemarkService.getCategories(session.token);
        const pois = await placemarkService.getPois(session.token);
        // get users with private pois only fetches email + name + count of private pois => no sensitive data
        const users = await placemarkService.getUsersWithPrivatePoiCount(session.token);
        const ratings = await placemarkService.getComments(session.token);
        refreshPlacemarkState(categories, pois, users, ratings);
        
        currentCategories.categories.forEach((category) => {
            category.pois.forEach((poi) => {
                poi.markerSpec = generateMarkerSpec(poi);
            });
            category.markerLayer = generateMarkerLayer(category);
        });
    
        const layers = currentCategories.categories.map(cat => cat.markerLayer);
        return {
            markerLayers: layers
        }
    }
}