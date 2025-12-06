<script lang="ts">
  import { goto } from "$app/navigation";
  import { placemarkService } from "$lib/services/placemark-service";
  import { currentSession } from "$lib/stores";
  import Message from "$lib/ui/Message.svelte";
  import UserCredentials from "$lib/ui/UserCredentials.svelte";

  let email = "";
  let password = "";
  let message = "";

  async function login() {
    let session = await placemarkService.login(email, password);
    if (session) {
      currentSession.set(session);
      localStorage.placemark = JSON.stringify(session);

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
<div class="buttons">
  <a class="button is-danger is-fullwidth" href="http://localhost:3000/api/users/auth/google">
    <span class="icon">
      <i class="fa-brands fa-google"></i>
    </span>
    <span>Login with Google</span>
  </a>

  <a class="button is-dark is-fullwidth" href="http://localhost:3000/api/users/auth/github">
    <span class="icon">
      <i class="fa-brands fa-github"></i>
    </span>
    <span>Login with GitHub</span>
  </a>
</div>
<form on:submit|preventDefault={login}>
  <UserCredentials bind:email bind:password />
  <button class="button is-success is-fullwidth">Log in</button>
</form>
