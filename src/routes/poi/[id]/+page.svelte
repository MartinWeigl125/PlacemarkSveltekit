<script lang="ts">
  import Chart from "svelte-frappe-charts";
  import { currentSession, latestComment } from "$lib/stores";
  import type { Comment, DataSet } from "$lib/types/placemark-types";
  import DetailBox from "$lib/ui/DetailBox.svelte";
  import ImageBox from "$lib/ui/ImageBox.svelte";
  import RatingBox from "$lib/ui/RatingBox.svelte";
  import { onMount } from "svelte";
  import type { PageData } from "./$types";
  import { placemarkService } from "$lib/services/placemark-service";
  import RatingForm from "$lib/ui/RatingForm.svelte";
  import { generatePerRating } from "$lib/services/placemark-utils";
  import { afterNavigate } from "$app/navigation";
  import { loggedInUser } from "$lib/types/runes.svelte";

  export let data: PageData;

  let comments: Comment[] = [];
  let ratingsPerComment: DataSet;

  async function loadComments() {
    comments = await placemarkService.getCommentsByPoiId(
      loggedInUser.token,
      encodeURI(data.poi?._id!)
    );
    ratingsPerComment = generatePerRating(comments);
  }

  onMount(loadComments);

  afterNavigate((nav) => {
    if (nav.to?.route?.id?.startsWith("/poi/")) {
      loadComments();
    }
  });

  latestComment.subscribe(comment => {
    if (comment && comment.poiid === data.poi?._id) {
      comments = [...comments, comment];
      ratingsPerComment = generatePerRating(comments);
    }
  });
</script>

<div class="container">
  <div class="columns">
    <div class="column is-two-thirds">
      <ImageBox poi={data.poi!} />
    </div>
    <div class="column is-one-third">
      <div class="box" style="height: 60vh; overflow-y: auto">
        <Chart data={ratingsPerComment} type="bar" height={150} />
        <RatingBox comments={comments} />
        <RatingForm poi={data.poi!} />
      </div>
    </div>
  </div>

  <div class="columns">
    <div class="column">
      <DetailBox poi={data.poi!} />
    </div>
  </div>
</div>
