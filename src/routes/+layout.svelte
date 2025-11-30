<script lang="ts">
  import { browser } from "$app/environment";
  import { categories, currentSession } from "$lib/stores";
    import Card from "$lib/ui/Card.svelte";
    import CategoryList from "$lib/ui/CategoryList.svelte";
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
    <div class="columns">
      <div class="column is-three-quarters">
        <slot />
      </div>
      <div class="column is-one-quarter">
        <Card title="Categories of Points of Interest">
          <CategoryList categories={$categories} />
        </Card>
      </div>
    </div>
  {:else}
    <slot />
  {/if}
</div>