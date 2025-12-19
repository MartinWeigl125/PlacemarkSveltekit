<script lang="ts">
    import { markerLayers } from "$lib/stores";
    import Card from "$lib/ui/Card.svelte";
    import PlacemarkMap from "$lib/ui/maps/PlacemarkMap.svelte";
    import { onMount } from "svelte";
    import { loadCategories } from "$lib/services/placemark-utils";

    onMount(async () => {
        await loadCategories();
    });
</script>

<Card title="Football stadiums in Germany">
    <PlacemarkMap height={80} markerLayers={$markerLayers} />
</Card>