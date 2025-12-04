<script lang="ts">
  import { Marker, Popup, LayerGroup } from "sveaflet";
  import type { MarkerLayer } from "$lib/types/placemark-types";

  type Props = {
    markerLayers: MarkerLayer[];
  };

  let { markerLayers = [] }: Props = $props();
</script>

{#each markerLayers as layer}
  <LayerGroup checked={true} name={layer.title} layerType="overlay">
    {#each layer.markerSpecs as markerSpec, i}
      <Marker latLng={[markerSpec.location.lat, markerSpec.location.lng]} options={{ alt: JSON.stringify(markerSpec) }}>
        <Popup options={{ content: `<a href='/explore/${markerSpec.id}'>${markerSpec.title}` }} />
      </Marker>
    {/each}
  </LayerGroup>
{/each}
