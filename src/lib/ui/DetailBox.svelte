<script lang="ts">
    import type { Poi } from "$lib/types/placemark-types";

    export let poi: Poi;
</script>

<div class="box" style="height: 30vh">
    <h2 class="title is-4 mb-3">{poi.name}</h2>

    <p class="content mb-4">{poi.description}</p>

    <div class="columns is-mobile">
        <div class="column is-half">
            <article class="notification is-light py-2">
                <strong>Latitude:</strong><br>
                {poi.latitude}
            </article>
        </div>

        <div class="column is-half">
            <article class="notification is-light py-2">
                <strong>Longitude:</strong><br>
                {poi.longitude}
            </article>
        </div>
    </div>
</div>