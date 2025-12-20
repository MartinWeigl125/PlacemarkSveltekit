<script lang="ts">
    import { enhance } from "$app/forms";

    let { poiId, enhanceFn, message = $bindable("") } = $props();

    let newRating = $state(0);
    let newComment = $state("");

    function setRating(r: number) {
        newRating = r;
    }

    export function reset() {
        newRating = 0;
        newComment = "";
    }
</script>

<form method="POST" action="?/comment" use:enhance={enhanceFn}>
    <input type="hidden" name="poiId" value={poiId} />
    <input type="hidden" name="rating" value={newRating} />

    <div class="is-flex is-justify-content-space-between mb-2">
        <div class="mb-3">
            {#each Array.from({ length: 5 }) as _, i}
                <!-- svelte-ignore a11y_click_events_have_key_events -->
                <!-- svelte-ignore a11y_no_static_element_interactions -->
                <span
                    onclick={() => setRating(i + 1)}
                    style="cursor: pointer; font-size: 1.3rem; color: {i < newRating ? 'gold' : '#ccc'};"
                >
                    <i class="fas fa-star"></i>
                </span>
            {/each}
        </div>
        <!-- svelte-ignore a11y_consider_explicit_label -->
        <button class="button is-small" style="background :#ccc;" type="submit">
            <span class="icon">
                <i class="fas fa-paper-plane"></i>
            </span>
        </button>
    </div>

    <div class="field">
        <input bind:value={newComment} class="input" id="comment" name="comment" type="text" placeholder={message} />
    </div>
</form>