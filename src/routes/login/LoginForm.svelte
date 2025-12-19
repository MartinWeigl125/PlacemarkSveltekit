<script lang="ts">
  import { enhance } from "$app/forms";
  import Message from "$lib/ui/Message.svelte";
  import UserCredentials from "$lib/ui/UserCredentials.svelte";
  let message = "";
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
<form method="POST" action="?/login" use:enhance>
  <UserCredentials />
  <button class="button is-success is-fullwidth">Log in</button>
</form>
