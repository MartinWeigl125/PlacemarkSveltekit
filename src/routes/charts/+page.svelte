<script lang="ts">
    import Chart from "svelte-frappe-charts";
    import { placemarkService } from "$lib/services/placemark-service";
    import { generateAvgRatingPerCategory, generatePoisPerCategory, generatePrivatePoisPerUser, generateRatingCountAndAvgForPois } from "$lib/services/placemark-utils";
    import { currentSession } from "$lib/stores";
    import type { DataSet, ScatterDataSet } from "$lib/types/placemark-types";
    import Card from "$lib/ui/Card.svelte";
    import { onMount } from "svelte";
    import { get } from "svelte/store";
    import Scatterplot from "$lib/ui/Scatterplot.svelte";

    let poisPerCategory: DataSet;
    let bestPois: ScatterDataSet;
    let usersWithMostPrivatePois: DataSet;
    let bestCategories: DataSet;

    onMount(async () => {
        const pois = await placemarkService.getPois(get(currentSession));
        // get users with private pois only fetches email + name + count of private pois => no sensitive data
        const users = await placemarkService.getUsersWithPrivatePoiCount(get(currentSession));
        const ratings = await placemarkService.getComments(get(currentSession));

        poisPerCategory = generatePoisPerCategory();
        usersWithMostPrivatePois = generatePrivatePoisPerUser(users);
        bestCategories = generateAvgRatingPerCategory(ratings);
        bestPois = generateRatingCountAndAvgForPois(pois, ratings);
    });
</script>

<div class="container">
  <div class="columns">
    <div class="column is-half">
      <Card title="Most Points per Category">
        <Chart data={poisPerCategory} type="bar" height={250} />
      </Card>
      <Card title="Best Points of Interest">
        <Scatterplot points={bestPois?.datasets[0]?.values ?? []} height={250} />
      </Card>
    </div>
    <div class="column is-half">
      <Card title="Users with most private Points of Interest">
        <Chart data={usersWithMostPrivatePois} type="pie" height={250} />
      </Card>
      <Card title="Best rated Categories">
        <Chart data={bestCategories} type="bar" height={250} />
      </Card>
    </div>
  </div>
</div>