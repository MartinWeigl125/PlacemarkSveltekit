<script lang="ts">
  import { currentSession } from "$lib/stores";
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
      <a class="navbar-item" href="/logout"> Logout [{$currentSession.firstName} {$currentSession.lastName}]</a>
    </div>
    <div></div>
  </div>
</nav>
