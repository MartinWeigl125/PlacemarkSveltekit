<script lang="ts">
  import DetailBox from "$lib/ui/DetailBox.svelte";
  import ImageBox from "$lib/ui/ImageBox.svelte";
  import RatingBox from "$lib/ui/RatingBox.svelte";
    import type { PageData } from "./$types";

  export let data: PageData;
</script>

<div class="container">
  <div class="columns is-gapless">
    <div class="column is-two-thirds">
      <ImageBox />
    </div>
    <div class="column is-one-third">
      <RatingBox />
    </div>
  </div>

  <div class="columns is-gapless">
    <div class="column">
      <DetailBox poi={data.poi} />
    </div>
  </div>
</div>
