<script lang="ts">
    import { placemarkService } from "$lib/services/placemark-service";
    import { currentSession, subTitle } from "$lib/stores";
    import type { Category, Poi } from "$lib/types/placemark-types";
    import Card from "$lib/ui/Card.svelte";
    import CategoryList from "$lib/ui/CategoryList.svelte";
    import LeafletMap from "$lib/ui/LeafletMap.svelte";
    import { onMount } from "svelte";
    import { get } from "svelte/store";
    export const ssr = false; 

    subTitle.set("Placemarks Geo Data");
    let categories: Category[] = [];
    let map: LeafletMap;

    onMount(async () => {
        const pois = await placemarkService.getPois(get(currentSession));
        pois.forEach((poi: Poi) => {
            const popup = `${poi.name}`;
            map.addMarker(poi.latitude, poi.longitude, popup);
        });

        categories = await placemarkService.getCategories(get(currentSession));
    });
</script>

<div class="columns">
    <div class="column is-two-thirds">
        <Card title="Points of Interest in Bavaria">
            <LeafletMap height={80} bind:this={map} />
        </Card>
    </div>
    <div class="column is-one-third">
        <Card title="Categories of Points of Interest">
            <CategoryList {categories} />
        </Card>
    </div>
</div>