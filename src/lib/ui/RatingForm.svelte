<script lang="ts">
    import { placemarkService } from "$lib/services/placemark-service";
    import { currentSession, latestComment } from "$lib/stores";
    import type { Comment, Poi, WriteComment } from "$lib/types/placemark-types";
    import { get } from "svelte/store";

    export let poi: Poi;

    let newRating = 0;
    let newComment = "";
    let message = "Write your comment here..."

    function setRating(r: number) {
        newRating = r;
    }

    async function comment() {
        if (newRating > 0 && newRating <= 5 && newComment) {
            const comment: WriteComment = {
                rating: newRating,
                comment: newComment,
                poiid: poi._id!,
                userid: $currentSession._id,
            };
            const success = await placemarkService.writeComment(get(currentSession), comment);
            if (!success) {
                message = "Comment not written - some error occurred";
                return;
            }
            const commentNew: Comment = {
                rating: newRating,
                comment: newComment,
                poiid: poi._id!,
                userid: {
                    firstName: $currentSession.firstName,
                    lastName: $currentSession.lastName
                }
            }
            latestComment.set(commentNew);
            newRating = 0;
            newComment = "";
            message = "Write your comment here...";
        } else {
            message = "Rating and comment are required"
        }
    }
</script>

<form on:submit|preventDefault={comment}>
    <div class="is-flex is-justify-content-space-between mb-2">
        <div class="mb-3">
            {#each Array(5) as _, i}
                <!-- svelte-ignore a11y_click_events_have_key_events -->
                <!-- svelte-ignore a11y_no_static_element_interactions -->
                <span
                    on:click={() => setRating(i + 1)}
                    style="cursor: pointer; font-size: 1.3rem; color: {i < newRating ? 'gold' : '#ccc'};"
                >
                    <i class="fas fa-star"></i>
                </span>
            {/each}
        </div>
        <!-- svelte-ignore a11y_consider_explicit_label -->
        <button class="button is-small" style="background :#ccc;">
            <span class="icon">
                <i class="fas fa-paper-plane"></i>
            </span>
        </button>
    </div>

    <div class="field">
        <input bind:value={newComment} class="input" id="newComment" name="newComment" type="text" placeholder={message} />
    </div>
</form>