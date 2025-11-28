<script lang="ts">
  import { browser } from "$app/environment";
  import { currentSession } from "$lib/stores";
  import Menu from "$lib/ui/Menu.svelte";

  if (browser) {
    const savedSession = localStorage.donation;
    if (savedSession) {
      const session = JSON.parse(savedSession);
      currentSession.set(session);
    }
  }
</script>

<div class="px-5">
  {#if $currentSession?.token}
    <Menu />
  {/if}
  <slot />
</div>