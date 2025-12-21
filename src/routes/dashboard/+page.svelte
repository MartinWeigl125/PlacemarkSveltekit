<script lang="ts">
    import Card from "$lib/ui/Card.svelte";
    import PlacemarkMap from "$lib/ui/maps/PlacemarkMap.svelte";
    import type { PageProps } from "./$types";

    let { data }: PageProps = $props();
</script>

<Card title="Football stadiums in Germany">
    <PlacemarkMap height={80} markerLayers={data.markerLayers} />
</Card>