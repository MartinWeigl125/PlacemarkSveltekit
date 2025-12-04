<script lang="ts">
    import { sharedMarker, sharedPoi } from "$lib/stores";
    import Card from "$lib/ui/Card.svelte";
    import { onMount } from "svelte";
    import type { PageData } from "./$types";
    import { page } from "$app/stores";
    import PlacemarkMap from "$lib/ui/maps/PlacemarkMap.svelte";
    import PoiMap from "$lib/ui/maps/PoiMap.svelte";

    export let data: PageData;

    page.subscribe(() => {
      sharedMarker.value = data.marker;
      sharedPoi.value = data.poi;
    });

    onMount(async () => {
      sharedMarker.value = data.marker;
      sharedPoi.value = data.poi;
    })
</script>

<div class="container">
  <div class="columns">
    <div class="column is-half">
      <div class="box">
        <PoiMap height={37} />
      </div>
      <div class="box">
        <PoiMap defaultLayer={"Satellite"} height={37} />
      </div>
    </div>
    <div class="column is-half">
      <div class="box">
        <PlacemarkMap height={86} markerLayers={data.markerLayers} />
      </div>
    </div>

  </div>
</div>