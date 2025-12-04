<script lang="ts">
    import { placemarkService } from "$lib/services/placemark-service";
    import { currentSession } from "$lib/stores";
    import Card from "$lib/ui/Card.svelte";
    import { onMount } from "svelte";
    import { get } from "svelte/store";

    onMount(async () => {
        const pois = await placemarkService.getPois(get(currentSession));
        // get users with private pois only fetches email + name + count of private pois => no sensitive data
        const users = await placemarkService.getUsersWithPrivatePoiCount(get(currentSession));
        const ratings = await placemarkService.getComments(get(currentSession));
    });
</script>

<div class="container">
  <div class="columns">
    <div class="column is-half">
      <Card title="Most Points per Category">
        <!-- Balkendiagramm -->
      </Card>
      <Card title="Best Points of Interest">
        <!-- Scatterplot: x: häufig bewertet, y: gut bewertet -->
      </Card>
    </div>
    <div class="column is-half">
      <Card title="Users with most private Points of Interest">
        <!-- Kreisdiagramm -->
      </Card>
      <Card title="Best rated Categories">
        <!-- Balkendiagramm -->
      </Card>
    </div>
  </div>
</div>