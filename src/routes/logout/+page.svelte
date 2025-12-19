<script lang="ts">
  import { goto } from "$app/navigation";
  import { currentSession } from "$lib/stores";

  currentSession.set({ firstName: "", lastName: "", _id: "", token: "" });
  localStorage.removeItem("placemark");
  goto("/");
</script>
