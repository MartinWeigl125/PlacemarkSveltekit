<script lang="ts">
  import { sharedMarker } from "$lib/types/runes.svelte";
  import { ControlLayers, Map, Marker } from "sveaflet";
  import MapLayers from "./MapLayers.svelte";
  import L from "leaflet";

  type Props = {
    zoom?: number;
    height?: number;
    defaultLayer?: string;
    instance?: any;
  };

  let { zoom = 8, height = 80, defaultLayer = "OpenStreetMap", instance }: Props = $props();

  $effect(() => {
    if (instance && sharedMarker.value) {
      instance.flyTo(sharedMarker.value.location, 16);
      const marker = L.marker(sharedMarker.value.location);
      marker.addTo(instance);
    }
  });
</script>

<div class="m-2 box-border border-4 p-4" style="height: {height}vh">
  {#if sharedMarker.value}
    <Map bind:instance options={{ center: [sharedMarker.value.location.lat, sharedMarker.value.location.lng], zoom: zoom }}>
      <ControlLayers>
        <MapLayers {defaultLayer} />
        <Marker latLng={[sharedMarker.value.location.lat, sharedMarker.value.location.lng]}></Marker>
      </ControlLayers>
    </Map>
  {/if}
</div>
