<script lang="ts">
  import { browser } from "$app/environment";
    import { placemarkService } from "$lib/services/placemark-service";
    import { loadCategories } from "$lib/services/placemark-utils";
  import { categories, currentSession } from "$lib/stores";
  import type { Poi, PoiDTO } from "$lib/types/placemark-types";
  import AddPoiModal from "$lib/ui/AddPoiModal.svelte";
  import Card from "$lib/ui/Card.svelte";
  import CategoryList from "$lib/ui/CategoryList.svelte";
  import EditPoiModal from "$lib/ui/EditPoiModal.svelte";
  import Menu from "$lib/ui/Menu.svelte";
  import Modal from "$lib/ui/Modal.svelte";
    import { get } from "svelte/store";

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
    const success = await placemarkService.deletePoi(get(currentSession), poiId);
    if (!success) {
      alert("Deleting POI failed");
      return;
    }
    await loadCategories();
  }

  async function submitAdd(name: string, description: string, latitude: number, longitude: number, categoryId: string) {
    const poi: PoiDTO = {
      name: name,
      description: description,
      latitude: latitude,
      longitude: longitude,
      categoryid: categoryId,
      userid: get(currentSession)._id
    };
    const success = await placemarkService.createPoi(get(currentSession), poi);
    if (!success) {
      alert("Adding POI failed");
      showAdd = false;
      return;
    }
    await loadCategories();
    showAdd = false;
  }

  async function submitEdit(poiid: string, name: string, description: string, latitude: number, longitude: number, categoryId: string) {
    const poi: PoiDTO = {
      name: name,
      description: description,
      latitude: latitude,
      longitude: longitude,
      categoryid: categoryId,
      userid: get(currentSession)._id,
      _id: poiid
    };
    const success = await placemarkService.updatePoi(get(currentSession), poi);
    if (!success) {
      alert("Updating POI failed");
      showEdit = false;
      return;
    }
    await loadCategories();
    showEdit = false;
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