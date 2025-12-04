<script lang="ts">
  import MapLayers from "./MapLayers.svelte";
  import { ControlLayers, Map } from "sveaflet";
  import type { MarkerLayer } from "$lib/types/placemark-types";
  import PoiMarkers from "./PoiMarkers.svelte";
  import { currentSession, sharedMarker, sharedPoi } from "$lib/stores";
  import { placemarkService } from "$lib/services/placemark-service"
  import { get } from "svelte/store";

  type Props = {
    location?: any;
    zoom?: number;
    height?: number;
    markerLayers?: MarkerLayer[];
    defautLayer?: string;
    instance?: any;
  };

  let { location = { lat: 49.013432, lng: 12.101624 }, zoom = 8, height = 80, markerLayers = [], defautLayer = "OpenStreetMap", instance }: Props = $props();

  async function onClick(event: any) {
    let markerSpec = event.popup._source.options.alt.replace(/\\"/g, '"');
    markerSpec = JSON.parse(markerSpec);
    sharedMarker.value = markerSpec;
    let poi = await placemarkService.getPoiById(get(currentSession), markerSpec.id);
    sharedPoi.value = poi;
  }

  $effect(() => {
    if (instance) {
      instance.on("popupopen", onClick);
      instance.flyTo(location, zoom);
    }
  });
</script>

<div class="box-border border-4 p-4" style="height: {height}vh">
  <Map bind:instance options={{ center: [location.lat, location.lng], zoom: zoom }}>
    <ControlLayers>
      <MapLayers {defautLayer} />
      <PoiMarkers {markerLayers} />
    </ControlLayers>
  </Map>
</div>
