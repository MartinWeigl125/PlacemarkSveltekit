<script lang="ts">
  import { enhance } from "$app/forms";
  import Message from "$lib/ui/Message.svelte";
  import UserCredentials from "$lib/ui/UserCredentials.svelte";
  import { PUBLIC_BACKEND_URL } from "$env/static/public";
  let message = "";
  const googleAuthUrl = `${PUBLIC_BACKEND_URL}/api/users/auth/google`;
  const githubAuthUrl = `${PUBLIC_BACKEND_URL}/api/users/auth/github`;
</script>

{#if message}
  <Message {message} />
{/if}
<div class="buttons">
  <a class="button is-danger is-fullwidth" href={googleAuthUrl} target="_self">
    <span class="icon">
      <i class="fa-brands fa-google"></i>
    </span>
    <span>Login with Google</span>
  </a>

  <a class="button is-dark is-fullwidth" href={githubAuthUrl} target="_self">
    <span class="icon">
      <i class="fa-brands fa-github"></i>
    </span>
    <span>Login with GitHub</span>
  </a>
</div>
<form method="POST" action="?/login" use:enhance>
  <UserCredentials />
  <button class="button is-success is-fullwidth">Log in</button>
</form>
