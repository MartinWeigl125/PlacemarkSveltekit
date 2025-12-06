<script lang="ts">
  import { onMount } from "svelte";
  import { currentSession } from "$lib/stores";
  import { goto } from "$app/navigation";
  import axios from "axios";
  import type { PageData } from "./$types";

  export let data: PageData;

  onMount(() => {
    const token = data.token!;
    const firstName = data.firstName!;
    const lastName = data.lastName!;
    const _id = data.id!;
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    currentSession.set({ token, firstName, lastName, _id });
    localStorage.placemark = JSON.stringify({ token, firstName, lastName, _id });
    goto("/dashboard");
  });
</script>
