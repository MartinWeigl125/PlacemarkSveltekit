<script lang="ts">
    import { placemarkService } from "$lib/services/placemark-service";
    import { categories, currentSession } from "$lib/stores";
    import type { Poi } from "$lib/types/placemark-types";
    import Card from "$lib/ui/Card.svelte";
    import LeafletMap from "$lib/ui/maps/LeafletMap.svelte";
    import { onMount } from "svelte";
    import { get } from "svelte/store";
    import type { PageData } from "./$types";

    export let data: PageData;

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

<div class="container">
  <div class="columns">
    <div class="column is-half">
        <Card title="{data.poi.name}">
            <!-- <PoiMap height={32} /> -->
        </Card>
        <Card title="{data.poi.name}">
            <!-- <PoiMap defaultLayer={"Satellite"} height={32} /> -->
        </Card>
    </div>
    <div class="column is-half">
      <Card title="{data.poi.name}">
        <LeafletMap height={80} bind:this={map} />
      </Card>
    </div>

  </div>
</div>