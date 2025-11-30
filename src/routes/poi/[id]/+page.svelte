<script lang="ts">
  import { currentSession, latestComment } from "$lib/stores";
    import type { Comment } from "$lib/types/placemark-types";
  import DetailBox from "$lib/ui/DetailBox.svelte";
  import ImageBox from "$lib/ui/ImageBox.svelte";
  import RatingBox from "$lib/ui/RatingBox.svelte";
    import { onMount } from "svelte";
  import type { PageData } from "./$types";
    import { placemarkService } from "$lib/services/placemark-service";
    import { get } from "svelte/store";
    import RatingForm from "$lib/ui/RatingForm.svelte";

  export let data: PageData;

  let comments: Comment[] = [];

  onMount(async () => {
    comments = await placemarkService.getCommentsByPoiId(get(currentSession), encodeURI(data.poi._id!));
  })

  latestComment.subscribe(async (comment) => {
    if (comment) {
      comments.push(comment);
      comments = [...comments];
    }
  });
</script>

<div class="container">
  <div class="columns is-gapless">
    <div class="column is-two-thirds">
      <ImageBox />
    </div>
    <div class="column is-one-third">
      <div class="box" style="height: 60vh; overflow-y: auto">
        <RatingBox comments={comments} />
        <RatingForm poi={data.poi} />
      </div>
    </div>
  </div>

  <div class="columns is-gapless">
    <div class="column">
      <DetailBox poi={data.poi} />
    </div>
  </div>
</div>
