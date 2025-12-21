<script lang="ts">
    import Chart from "svelte-frappe-charts";
    import Card from "$lib/ui/Card.svelte";
    import Scatterplot from "$lib/ui/Scatterplot.svelte";
    import type { PageProps } from "../$types";
    import { refreshPlacemarkState } from "$lib/services/placemark-utils";
    import { currentDataSets } from "$lib/types/runes.svelte";

    let { data }: PageProps = $props();
    refreshPlacemarkState(data.categories!, data.pois!, data.users!, data.ratings!);
</script>

<div class="container">
  <div class="columns">
    <div class="column is-half">
      <Card title="Most Points per Category">
        <Chart data={currentDataSets.poisPerCategory} type="bar" height={250} />
      </Card>
      <Card title="Best Points of Interest">
        <Scatterplot points={currentDataSets.bestPois.datasets[0]?.values ?? []} height={250} />
      </Card>
    </div>
    <div class="column is-half">
      <Card title="Users with most private Points of Interest">
        <Chart data={currentDataSets.usersWithMostPrivatePois} type="pie" height={250} />
      </Card>
      <Card title="Best rated Categories">
        <Chart data={currentDataSets.bestCategories} type="bar" height={250} />
      </Card>
    </div>
  </div>
</div>