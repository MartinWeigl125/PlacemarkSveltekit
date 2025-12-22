<script lang="ts">
    import type { PageData } from "./$types";
    import PlacemarkMap from "$lib/ui/maps/PlacemarkMap.svelte";
    import PoiMap from "$lib/ui/maps/PoiMap.svelte";

    export let data: PageData;
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