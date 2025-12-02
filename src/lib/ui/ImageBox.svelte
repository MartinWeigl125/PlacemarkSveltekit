<script lang="ts">
    import { placemarkService } from "$lib/services/placemark-service";
    import { currentSession } from "$lib/stores";
    import type { Poi } from "$lib/types/placemark-types";
    import { get } from "svelte/store";

    export let poi: Poi;

    let currentIndex = 0;

    async function deleteImage() {
        const success = await placemarkService.deleteImage(get(currentSession), poi._id!,poi.img[currentIndex]);
        if (!success) {
            alert("Error deleting image");
            return;
        }
        poi.img.splice(currentIndex, 1);
        if (currentIndex >= poi.img.length) {
            currentIndex = poi.img.length - 1;
        }
        poi = { ...poi };
    }

    async function uploadImage(event: Event) {
        const input = event.currentTarget as HTMLInputElement;
        const file = input.files?.[0];
        if (!file) {
            return;
        }

        const updatedPoi = await placemarkService.uploadImage(get(currentSession), poi._id!, file);
        if (!updatedPoi) {
            alert("Error uploading image");
            return;
        }
        poi = updatedPoi;
        currentIndex = poi.img.length - 1; 
    }

    function nextImage() {
        if (poi.img.length > 0) {
            currentIndex = (currentIndex + 1) % poi.img.length;
        }
    }

    function previousImage() {
        if (poi.img.length > 0) {
            currentIndex = (currentIndex - 1 + poi.img.length) % poi.img.length;
        }
    }
</script>

<div class="box is-flex is-justify-content-center is-align-items-center" style="height: 60vh; position: relative; overflow: hidden;">
    {#if poi.img.length > 0}
        <figure class="image" style="width: 100%; height: 100%;">
            <img src="{poi.img[currentIndex]}" alt="Bild" style="width: 100%; height: 100%; object-fit: cover;">
        </figure>
        <!-- svelte-ignore a11y_consider_explicit_label -->
        <button class="button is-small is-rounded" on:click={deleteImage} style="position: absolute; top: 6px; right: 6px;">
            <span class="icon">
                <i class="fas fa-trash-alt"></i>
            </span>
        </button>
        <!-- svelte-ignore a11y_consider_explicit_label -->
        <button class="button is-light is-rounded" on:click={previousImage} style="position: absolute; left: 10px; top: 50%; transform: translateY(-50%); opacity: 0.8;">
            <span class="icon">
                <i class="fas fa-chevron-left"></i>
            </span>
        </button>
        <!-- svelte-ignore a11y_consider_explicit_label -->
        <button class="button is-light is-rounded" on:click={nextImage} style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); opacity: 0.8;">
            <span class="icon">
                <i class="fas fa-chevron-right"></i>
            </span>
        </button>
        <div style="position: absolute; bottom: 10px; left: 50%; transform: translateX(-50%); display: flex; gap: 8px; padding: 6px 10px; background: rgba(0,0,0,0.25); border-radius: 12px;">
            {#each poi.img as img, i}
                <!-- svelte-ignore a11y_click_events_have_key_events -->
                <!-- svelte-ignore a11y_no_static_element_interactions -->
                <div on:click={() => currentIndex = i} style="width: 10px; height: 10px; border-radius: 50%; background: {i === currentIndex ? 'white' : 'rgba(255,255,255,0.5)'}; cursor: pointer;">
                </div>
            {/each}

            <label for="fileInput" style="width: 14px; height: 14px; border-radius: 50%; background: rgba(255,255,255,0.4); cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 12px; color: black;">
                <i class="fas fa-plus"></i>
            </label>
        </div>

        <input id="fileInput" type="file" accept="image/png, image/jpeg" on:change={uploadImage} style="display: none;">
    {:else}
        <label for="fileInput" class="button is-rounded is-large is-light">
            <span class="icon is-large">
                <i class="fas fa-plus"></i>
            </span>
        </label>
        <input id="fileInput" type="file" accept="image/png, image/jpeg" on:change={uploadImage} style="display: none;">
    {/if}
</div>