<script lang="ts">
    import { placemarkService } from "$lib/services/placemark-service";
    import { categories, currentSession } from "$lib/stores";
    import type { Poi } from "$lib/types/placemark-types";
    import Card from "$lib/ui/Card.svelte";
    import LeafletMap from "$lib/ui/maps/LeafletMap.svelte";
    import { onMount } from "svelte";
    import { get } from "svelte/store";

    let map: LeafletMap;
    let pois: Poi[] = [];

    onMount(async () => {
        pois = await placemarkService.getPois(get(currentSession));

        $categories.forEach(c => {
            map.registerCategory(c.name);
        });

        pois.forEach(p => {
            let catName = $categories.find(c => c._id === p.categoryid)!.name;
            let popupText = `<a href='explore/${p._id}'>${p.name}</a>`;
            
            map.addMarkerToLayer(
                catName,
                p.latitude,
                p.longitude,
                popupText
            );
        });
    });
</script>

<Card title="Points of Interest in Bavaria">
    <LeafletMap height={80} bind:this={map} />
</Card>