<script lang="ts">
    import type { Category } from "$lib/types/placemark-types";

    export let categories: Category[] = [];
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
                <span class="icon">
                    <i class="fas fa-angle-down" style="transition: transform 0.2s; transform: rotate({openIndex === i ? '180deg' : '0deg'});"></i>
                </span>
            </button>

            {#if openIndex === i}
                <div class="mt-3 pl-4">
                    <ul>
                        {#each category.pois as poi}
                            <li>
                                <a href="/poi/{poi._id}">
                                    {poi.name}
                                </a>
                            </li>
                        {/each}
                    </ul>
                </div>
            {/if}
        </div>
    {/each}
</div>