<script lang="ts">
  export let open: boolean = false;
  export let onClose: Function;
</script>

{#if open}
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="modal is-active" id="modal">
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <div class="modal-background" on:click={() => onClose()}></div>

  <div class="modal-content">
    <div class="box">
      <slot />
    </div>
  </div>

  <button
    class="modal-close is-large"
    aria-label="close"
    on:click={() => onClose()}
  ></button>
</div>
{/if}
