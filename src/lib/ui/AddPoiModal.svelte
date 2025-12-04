<script lang="ts">
  export let categoryId: string = "";
  export let onSubmit: Function;
  export let onCancel: Function;

  let name = "";
  let description = "";
  let latitude = 0;
  let longitude = 0;
</script>

<h3 class="title is-4">Add Point of Interest</h3>

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
  <label class="label">Latitude</label>
  <div class="control">
    <input class="input" type="number" bind:value={latitude} />
  </div>
</div>

<div class="field">
  <!-- svelte-ignore a11y_label_has_associated_control -->
  <label class="label">Longitude</label>
  <div class="control">
    <input class="input" type="number" bind:value={longitude} />
  </div>
</div>

<div class="field is-grouped mt-3">
  <div class="control">
    <button class="button is-primary" on:click={() => onSubmit(name, description, latitude, longitude, categoryId)}>
      Add
    </button>
  </div>
  <div class="control">
    <button class="button" on:click={() => onCancel()}>
      Cancel
    </button>
  </div>
</div>
