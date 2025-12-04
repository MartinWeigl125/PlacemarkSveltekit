import type { PageLoad } from "./$types";
import type { MarkerLayer } from "$lib/types/placemark-types";
import { placemarkService } from "$lib/services/placemark-service";
import { currentSession } from "$lib/stores";
import { get } from "svelte/store";
import { generateMarkerLayer, generateMarkerSpec } from "$lib/services/placemark-utils";
import { categories } from "$lib/stores";

export const ssr = false;

export const load: PageLoad<{ markerLayers: MarkerLayer[] }> = async () => {

    const markerLayers: MarkerLayer[] = [];

    // load categories 
    const allCategories = await placemarkService.getCategories(get(currentSession));
    allCategories.forEach((category) => {
    category.pois.forEach((poi) => {
        poi.markerSpec = generateMarkerSpec(poi);
    });
    category.markerLayer = generateMarkerLayer(category);
    });
    categories.set(allCategories);

    allCategories.forEach((category) => {
        markerLayers.push(category.markerLayer);
    })
        
    return {
        markerLayers
    };
};
