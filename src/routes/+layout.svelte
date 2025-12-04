<script lang="ts">
  import { browser } from "$app/environment";
  import { categories, currentSession } from "$lib/stores";
  import type { Poi } from "$lib/types/placemark-types";
  import AddPoiModal from "$lib/ui/AddPoiModal.svelte";
  import Card from "$lib/ui/Card.svelte";
  import CategoryList from "$lib/ui/CategoryList.svelte";
  import EditPoiModal from "$lib/ui/EditPoiModal.svelte";
  import Menu from "$lib/ui/Menu.svelte";
  import Modal from "$lib/ui/Modal.svelte";

  if (browser) {
    const savedSession = localStorage.donation;
    if (savedSession) {
      const session = JSON.parse(savedSession);
      currentSession.set(session);
    }
  }

  let showAdd = false;
  let showEdit = false;

  let currentCategoryId: string | undefined = undefined;
  let currentPoi: Poi;

  function handleAdd(categoryId: string) {
    currentCategoryId = categoryId;
    showAdd = true;
  }

  function handleEdit(poi: Poi) {
    currentPoi = poi;
    showEdit = true;
  }

  async function handleDelete(poiId: string) {
    // call delete endpoint
  }

  async function submitAdd() {
    // call add endpoint
  }

  async function submitEdit() {
    // call edit endpoint
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
          <CategoryList categories={$categories} onAdd={handleAdd} onEdit={handleEdit} onDelete={handleDelete} />
        </Card>
      </div>
    </div>
  {:else}
    <slot />
  {/if}
</div>

<Modal open={showAdd} onClose={() => (showAdd = false)}>
  {#if showAdd}
    <AddPoiModal
      categoryId={currentCategoryId}
      onSubmit={submitAdd}
      onCancel={() => (showAdd = false)}
    />
  {/if}
</Modal>

<Modal open={showEdit} onClose={() => (showEdit = false)}>
  {#if showEdit}
    <EditPoiModal
      poi={currentPoi}
      onSubmit={submitEdit}
      onCancel={() => (showEdit = false)}
    />
  {/if}
</Modal>