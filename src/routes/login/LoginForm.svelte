<script lang="ts">
  import { goto } from "$app/navigation";
  import { placemarkService } from "$lib/services/placemark-service";
  import { categories, currentSession } from "$lib/stores";
  import Message from "$lib/ui/Message.svelte";
  import UserCredentials from "$lib/ui/UserCredentials.svelte";
  import { get } from "svelte/store";

  let email = "";
  let password = "";
  let message = "";

  async function login() {
    let session = await placemarkService.login(email, password);
    if (session) {
      currentSession.set(session);
      localStorage.placemark = JSON.stringify(session);

      // load categories 
      const allCategories = await placemarkService.getCategories(get(currentSession));
      categories.set(allCategories);

      goto("/dashboard");
    } else {
      email = "";
      password = "";
      message = "Invalid Credentials";
    }
  }
</script>

{#if message}
  <Message {message} />
{/if}
<form on:submit|preventDefault={login}>
  <UserCredentials bind:email bind:password />
  <button class="button is-success is-fullwidth">Log in</button>
</form>
