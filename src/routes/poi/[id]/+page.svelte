<script lang="ts">
  import Chart from "svelte-frappe-charts";
  import type { Comment, DataSet } from "$lib/types/placemark-types";
  import DetailBox from "$lib/ui/DetailBox.svelte";
  import ImageBox from "$lib/ui/ImageBox.svelte";
  import RatingBox from "$lib/ui/RatingBox.svelte";
  import { onMount, onDestroy } from "svelte";
  import type { PageProps } from "./$types";
  import RatingForm from "$lib/ui/RatingForm.svelte";
  import { generatePerRating, refreshPlacemarkState } from "$lib/services/placemark-utils";
  import { currentCategories, currentComments, currentPois, currentUsers } from "$lib/types/runes.svelte";
  import type { ActionResult } from "@sveltejs/kit";

  let { data }: PageProps = $props();
  let message = $state("Write your comment here...");

  let ratingForm: any;

  let localChartData = $state({
    labels: [],
    datasets: [{ values: [] }]
  } as DataSet);
  import { page } from '$app/stores';

  const handleCommentSuccess = () => {
    return async ({ result }: { result: ActionResult }) => {
      ratingForm.reset();
      if (result.type === "success") {
        const comment = result.data as Comment;
        currentComments.comments.push(comment);
        refreshPlacemarkState(currentCategories.categories, currentPois.pois, currentUsers.users, currentComments.comments);
        updateLocalChart(currentComments.comments.filter((comment) => comment.poiid === data.poi?._id));
      } else if (result.type === "failure") {
        message = result.data?.message;
      }
    }
  }

  onMount(() => {
    refreshPlacemarkState(data.categories!, data.pois!, data.users!, data.ratings!);
    updateLocalChart(currentComments.comments.filter((comment) => comment.poiid === data.poi?._id));
  });

  const unsubscribePage = page.subscribe(($page) => {
    const pid = $page.params.id;
    if (pid) {
      updateLocalChart(currentComments.comments.filter((comment) => comment.poiid === pid));
    }
  });

  onDestroy(() => {
    unsubscribePage();
  });

  function updateLocalChart(commentList: Comment[]) {
    localChartData = generatePerRating(commentList);
  }
</script>

<div class="container">
  <div class="columns">
    <div class="column is-two-thirds">
      <ImageBox poi={data.poi!} />
    </div>
    <div class="column is-one-third">
      <div class="box" style="height: 60vh; overflow-y: auto">
        <Chart data={localChartData} type="bar" height={150} />
        <RatingBox comments={currentComments.comments.filter((comment) => comment.poiid === data.poi?._id)} />
        <RatingForm poiId={data.poi?._id!} enhanceFn={handleCommentSuccess} {message} bind:this={ratingForm} />
      </div>
    </div>
  </div>

  <div class="columns">
    <div class="column">
      <DetailBox poi={data.poi!} />
    </div>
  </div>
</div>
