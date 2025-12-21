<script lang="ts">
  import { goto } from "$app/navigation";
  import { refreshPlacemarkState } from "$lib/services/placemark-utils";
  import type { Poi } from "$lib/types/placemark-types";
  import { loggedInUser } from "$lib/types/runes.svelte";
  import AddPoiModal from "$lib/ui/AddPoiModal.svelte";
  import Card from "$lib/ui/Card.svelte";
  import CategoryList from "$lib/ui/CategoryList.svelte";
  import EditPoiModal from "$lib/ui/EditPoiModal.svelte";
  import Menu from "$lib/ui/Menu.svelte";
  import Modal from "$lib/ui/Modal.svelte";
  import { get } from "svelte/store";
  import { page } from "$app/stores";

  export let data: any;
  $: if (data && data.session) {
    loggedInUser.email = data.session.email;
    loggedInUser.firstName = data.session.firstName;
    loggedInUser.lastName = data.session.lastName;
    loggedInUser.token = data.session.token;
    loggedInUser._id = data.session._id;
  } else {
    loggedInUser.email = "";
    loggedInUser.firstName = "";
    loggedInUser.lastName = "";
    loggedInUser.token = "";
    loggedInUser._id = "";
  }

  let showAdd = false;
  let showEdit = false;

  let currentCategoryId: string | undefined = undefined;
  let currentPoi: Poi;

  refreshPlacemarkState(data.categories, data.pois, data.users, data.ratings);

  function handleAdd(categoryId: string) {
    currentCategoryId = categoryId;
    showAdd = true;
  }

  function handleEdit(poi: Poi) {
    currentPoi = poi;
    showEdit = true;
  }

  async function handleDelete(poiId: string) {
    const response = await fetch(`/api/poi/${poiId}`, { method: "DELETE" });
    if (!response.ok) {
      alert("Deleting POI failed");
      return;
    }
    const currentPath = get(page).url.pathname;
    if (currentPath === `/poi/${poiId}` || currentPath === `/explore/${poiId}`) {
      await goto("/dashboard");
    }
    location.reload();
  }

  async function submitAdd(name: string, description: string, latitude: number, longitude: number, categoryId: string) {
    const res = await fetch("/api/poi", {
      method: "POST",
      body: JSON.stringify({ name, description, latitude, longitude, categoryId }),
      headers: { "Content-Type": "application/json" }
    });

    if (!res.ok) {
      alert("Adding POI failed");
      return;
    }

    showAdd = false;
    location.reload();
  }

  async function submitEdit(poiid: string, name: string, description: string, latitude: number, longitude: number, categoryId: string) {
    const res = await fetch(`/api/poi/${poiid}`, {
      method: "PUT",
      body: JSON.stringify({ name, description, latitude, longitude, categoryId }),
      headers: { "Content-Type": "application/json" }
    });

    if (!res.ok) {
      alert("Updating POI failed");
      return;
    }

    showEdit = false;
    location.reload();
  }
</script>

<div class="px-5">
  {#if loggedInUser.token}
    <Menu />
    <div class="columns">
      <div class="column is-three-quarters">
        <slot />
      </div>
      <div class="column is-one-quarter">
        <Card title="Categories of Points of Interest">
          <CategoryList categories={data.categories} onAdd={handleAdd} onEdit={handleEdit} onDelete={handleDelete} />
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