<script lang="ts">
  import { onMount } from "svelte";

  let mapContainer: HTMLDivElement;
  let map: any;
  let marker: any;

  export let latitude: number = 49.013432;
  export let longitude: number = 12.101624;
  export let onSelect: Function;

  onMount(async () => {
    // Leaflet nur im Browser importieren
    const L = await import("leaflet");

    map = L.map(mapContainer).setView([latitude, longitude], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors"
    }).addTo(map);

    marker = L.marker([latitude, longitude]).addTo(map);

    map.on("click", (e: any) => {
      latitude = e.latlng.lat;
      longitude = e.latlng.lng;

      marker.setLatLng([latitude, longitude]);

      if (onSelect) onSelect(latitude, longitude);
    });
  });
</script>

<div bind:this={mapContainer} class="leaflet-container" style="height: 300px;"></div>

<style>
  .leaflet-container {
    width: 100%;
    height: 100%;
  }
</style>
