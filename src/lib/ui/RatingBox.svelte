<script lang="ts">
    import type { Comment } from "$lib/types/placemark-types";

    export let comments: Comment[] = [];
</script>

{#each comments as comment}
    <p class="mb-1">
        {#each Array(5) as _, i}
            {#if i < comment.rating}
                <span style="color: gold;"><i class="fas fa-star"></i></span>
            {:else}
                <span style="color: #ccc;"><i class="fas fa-star"></i></span>
            {/if}
        {/each}

        <strong class="ml-2">
            {comment.userid.firstName} {comment.userid.lastName}
        </strong>
    </p>
    <p class="mb-2">
        {comment.comment}
    </p>
    <hr class="my-2">
{/each}