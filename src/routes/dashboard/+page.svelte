<script lang="ts">
    import Card from "$lib/ui/Card.svelte";
    import PlacemarkMap from "$lib/ui/maps/PlacemarkMap.svelte";
    import type { PageData } from "../$types";

    export let data: PageData;
</script>

<Card title="Points of Interest in Bavaria">
    <PlacemarkMap height={80} markerLayers={data.markerLayers} /> <!-- code shows error, but there is no error -->
</Card>