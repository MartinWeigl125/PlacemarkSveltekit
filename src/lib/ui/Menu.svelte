<script lang="ts">
  import { loggedInUser } from "$lib/types/runes.svelte";
</script>

<nav class="navbar is-full-width">
  <div class="navbar-brand">
    <a class="navbar-item" href="/dashboard">
      <span class="icon"> 
          <i class="fas fa-map-marked-alt"></i>
      </span>
      <span class="icon mr-1"></span>
      <span>
          <strong>Placemark</strong>
      </span>
    </a>
  </div>
  <div id="navbarMenu" class="navbar-menu">
    <div class="navbar-end">
      <a class="navbar-item" href="/charts"> Statistics</a>
      <a data-sveltekit-preload-data="tap" class="navbar-item" href="/logout"> Logout [{loggedInUser.firstName} {loggedInUser.lastName}]</a>
    </div>
    <div></div>
  </div>
</nav>
