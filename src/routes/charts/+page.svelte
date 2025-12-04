<script lang="ts">
    import Chart from "svelte-frappe-charts";
    import { placemarkService } from "$lib/services/placemark-service";
    import { generatePoisPerCategory } from "$lib/services/placemark-utils";
    import { currentSession } from "$lib/stores";
    import type { DataSet } from "$lib/types/placemark-types";
    import Card from "$lib/ui/Card.svelte";
    import { onMount } from "svelte";
    import { get } from "svelte/store";

    let poisPerCategory: DataSet;
    let bestPois: DataSet;
    let usersWithMostPrivatePois: DataSet;
    let bestCategories: DataSet;

    onMount(async () => {
        const pois = await placemarkService.getPois(get(currentSession));
        // get users with private pois only fetches email + name + count of private pois => no sensitive data
        const users = await placemarkService.getUsersWithPrivatePoiCount(get(currentSession));
        const ratings = await placemarkService.getComments(get(currentSession));

        poisPerCategory = generatePoisPerCategory();
    });
</script>

<div class="container">
  <div class="columns">
    <div class="column is-half">
      <Card title="Most Points per Category">
        <Chart data={poisPerCategory} type="bar" height={200} />
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