<script lang="ts">
    import type { Category } from "$lib/types/placemark-types";

    export let categories: Category[] = [];
    export let onAdd: Function;
    export let onEdit: Function;
    export let onDelete: Function;
    let openIndex: number | null = null;

    async function toggle(i: number, categoryId: string) {
        openIndex = openIndex === i ? null : i;
    }
</script>

<div style="height: 80vh; overflow-y: auto">
    {#each categories as category, i}
        <div class="box mb-4">
            <button type="button" class="is-flex is-justify-content-space-between is-align-items-center" on:click={async () => await toggle(i, category._id!)} style="cursor: pointer; background: none; border: none; width: 100%;">
                <span class="has-text-weight-semibold">{category.name}</span>
                <div>
                    <!-- you should only be able to create private POIs -->
                    {#if category.name.toLowerCase() === "private points of interest"}
                        <!-- svelte-ignore a11y_click_events_have_key_events -->
                        <!-- svelte-ignore a11y_no_static_element_interactions -->
                        <i class="fas fa-plus" on:click={() => onAdd(category._id!)}></i>
                    {/if}
                    <span class="icon">
                        <i class="fas fa-angle-down" style="transition: transform 0.2s; transform: rotate({openIndex === i ? '180deg' : '0deg'});"></i>
                    </span>
                </div>
            </button>

            {#if openIndex === i}
                <div class="mt-3 pl-4">
                    <ul>
                        {#each category.pois as poi}
                            <li>
                                <div class="is-flex is-justify-content-space-between">
                                    <a href="/poi/{poi._id}">
                                        {poi.name}
                                    </a>
                                    <div>
                                        <!-- you should only be able to delete and update private POIs -->
                                        {#if category.name.toLowerCase() === "private points of interest"}
                                            <!-- svelte-ignore a11y_click_events_have_key_events -->
                                            <!-- svelte-ignore a11y_no_static_element_interactions -->
                                            <i class="fas fa-edit" on:click={() => onEdit(poi)}></i>
                                            <!-- svelte-ignore a11y_click_events_have_key_events -->
                                            <!-- svelte-ignore a11y_no_static_element_interactions -->
                                            <i class="fas fa-trash" on:click={() => onDelete(poi._id!)}></i>
                                        {/if}
                                    </div>
                                </div>
                            </li>
                        {/each}
                    </ul>
                </div>
            {/if}
        </div>
    {/each}
</div>