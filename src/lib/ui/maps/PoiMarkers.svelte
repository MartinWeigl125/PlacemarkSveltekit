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
        <Popup options={{ 
          content: `
            <div style="font-size:14px;">
              <div><strong>${markerSpec.title}</strong></div>
              <div style="margin-top:6px; display:flex; gap:6px;">
                <a href="/explore/${markerSpec.id}" 
                  style="padding:4px 6px; background:#eee; border-radius:4px; text-decoration:none;">
                  Maps
                </a>
                <a href="/poi/${markerSpec.id}" 
                  style="padding:4px 6px; background:#eee; border-radius:4px; text-decoration:none;">
                  Details
                </a>
              </div>
            </div>
          `
        }} />
      </Marker>
    {/each}
  </LayerGroup>
{/each}
