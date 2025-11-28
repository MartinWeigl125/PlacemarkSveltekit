<script lang="ts">
    import { placemarkService } from "$lib/services/placemark-service";
    import { currentSession, subTitle } from "$lib/stores";
    import type { Category, Poi } from "$lib/types/placemark-types";
    import Card from "$lib/ui/Card.svelte";
    import CategoryList from "$lib/ui/CategoryList.svelte";
    import LeafletMap from "$lib/ui/LeafletMap.svelte";
    import { onMount } from "svelte";
    import { get } from "svelte/store";

    subTitle.set("Placemarks Geo Data");
    let categories: Category[] = [];
    let map: LeafletMap;
    let pois: Poi[] = [];

    onMount(async () => {
        categories = await placemarkService.getCategories(get(currentSession));
        pois = await placemarkService.getPois(get(currentSession));

        categories.forEach(c => {
            map.registerCategory(c.name);
        });

        pois.forEach(p => {
            let catName = categories.find(c => c._id === p.categoryid)!.name;
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