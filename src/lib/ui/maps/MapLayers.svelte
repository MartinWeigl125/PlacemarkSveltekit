<script lang="ts">
  import { TileLayer } from "sveaflet";

  type Props = {
    defaultLayer: string;
  };

  let { defaultLayer = "OpenStreetMap" }: Props = $props();

  const tileLayers = [
    {
      name: "OpenStreetMap",
      url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
      options: { maxZoom: 19, attribution: "© OpenStreetMap" },
      checked: false,
      layerType: "base" as const
    },
    {
      name: "Topography",
      url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
      options: { maxZoom: 19, attribution: "© OpenStreetMap" },
      checked: false,
      layerType: "base" as const
    },
    {
      name: "Satellite",
      url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      options: { maxZoom: 19, attribution: "© OpenStreetMap" },
      checked: false,
      layerType: "base" as const
    },
    {
      name: "Public Transport",
      url: "https://tileserver.memomaps.de/tilegen/{z}/{x}/{y}.png",
      options: { maxZoom: 19, attribution: "© OpenStreetMap" },
      checked: false,
      layerType: "base" as const
    }
  ];
  tileLayers.forEach((tile) => {
    if (tile.name === defaultLayer) {
      tile.checked = true;
    }
  });
</script>

{#each tileLayers as tile}
  <TileLayer name={tile.name} url={tile.url} options={tile.options} checked={tile.checked} layerType={tile.layerType} />
{/each}