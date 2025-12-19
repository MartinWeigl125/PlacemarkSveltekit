import { generateMarkerLayer, generateMarkerSpec } from "$lib/services/placemark-utils";
import { currentCategories } from "$lib/types/runes.svelte";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ parent }) => {
    const { session } = await parent();
    if (session) {
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