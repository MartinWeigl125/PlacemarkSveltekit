<script lang="ts">
    import { placemarkService } from "$lib/services/placemark-service";
    import { currentSession } from "$lib/stores";
    import type { Poi } from "$lib/types/placemark-types";
    import { get } from "svelte/store";

    export let poi: Poi;

    let message = "";

    async function deleteImage() {
        const success = await placemarkService.deleteImage(get(currentSession), poi._id!);
        if (!success) {
            message = "Error deleting image";
            return;
        }
        poi.img = "";
    }

    async function uploadImage(event: Event) {
        const input = event.currentTarget as HTMLInputElement;
        const file = input.files?.[0];
        if (!file) {
            return;
        }

        const updatedPoi = await placemarkService.uploadImage(get(currentSession), poi._id!, file);
        if (!updatedPoi) {
            message = "Error uploading image";
            return;
        }
        poi = updatedPoi;
    }
</script>

<div class="box is-flex is-justify-content-center is-align-items-center" style="height: 60vh; position: relative; overflow: hidden;">
    {#if poi.img}
        <figure class="image"
                style="width: 100%; height: 100%;">
            <img src="{poi.img}"
                 alt="Bild"
                 style="width: 100%; height: 100%; object-fit: cover;">
        </figure>
        <!-- svelte-ignore a11y_consider_explicit_label -->
        <button class="button is-small is-rounded" on:click={deleteImage} style="position: absolute; top: 6px; right: 6px;">
            <span class="icon">
                <i class="fas fa-trash-alt"></i>
            </span>
        </button>
    {:else}
        <label for="fileInput" class="button is-rounded is-large is-light">
            <span class="icon is-large">
                <i class="fas fa-plus"></i>
            </span>
        </label>
        <input id="fileInput" type="file" accept="image/png, image/jpeg" on:change={uploadImage} style="display: none;">
    {/if}
</div>