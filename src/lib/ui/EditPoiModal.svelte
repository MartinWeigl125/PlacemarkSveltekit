<script lang="ts">
  import type { Poi } from "$lib/types/placemark-types";
    import PoiSelectMap from "./maps/PoiSelectMap.svelte";

  export let poi: Poi;
  export let onSubmit: Function;
  export let onCancel: Function;

  let name = poi.name;
  let description = poi.description;
  let latitude = poi.latitude;
  let longitude = poi.longitude;

  function handleMapSelect(lat: number, lng: number) {
    latitude = lat;
    longitude = lng;
  }
</script>

<h3 class="title is-4">Edit Point of Interest</h3>

<div class="field">
  <!-- svelte-ignore a11y_label_has_associated_control -->
  <label class="label">Name</label>
  <div class="control">
    <input class="input" type="text" bind:value={name} />
  </div>
</div>

<div class="field">
  <!-- svelte-ignore a11y_label_has_associated_control -->
  <label class="label">Description</label>
  <div class="control">
    <textarea class="textarea" bind:value={description}></textarea>
  </div>
</div>

<div class="field">
  <!-- svelte-ignore a11y_label_has_associated_control -->
  <label class="label">Latitude / Longitude</label>
  <div class="control is-flex">
    <input class="input mr-2" type="number" bind:value={latitude} step="0.000001" placeholder="Latitude" />
    <input class="input" type="number" bind:value={longitude} step="0.000001" placeholder="Longitude" />
  </div>
</div>

<div class="field mt-3">
  <!-- svelte-ignore a11y_label_has_associated_control -->
  <label class="label">Select on Map</label>
  <PoiSelectMap {latitude} {longitude} onSelect={handleMapSelect} />
</div>

<div class="field is-grouped mt-3">
  <div class="control">
    <button class="button is-primary" on:click={() => onSubmit(poi._id, name, description, latitude, longitude, poi.categoryid)}>
      Save
    </button>
  </div>
  <div class="control">
    <button class="button" on:click={() => onCancel()}>
      Cancel
    </button>
  </div>
</div>
