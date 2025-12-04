<script lang="ts">
    import Card from "$lib/ui/Card.svelte";

</script>

<div class="container">
  <div class="columns">
    <div class="column is-half">
      <Card title="Most Points per Category">
        <!-- Balkendiagramm -->
      </Card>
      <Card title="Best Points of Interest">
        <!-- Scatterplot: x: häufig bewertet, y: gut bewertet -->
      </Card>
    </div>
    <div class="column is-half">
      <Card title="Users with most private Points of Interest">
        <!-- Kreisdiagramm -->
      </Card>
      <Card title="Best rated Categories">
        <!-- Balkendiagramm -->
      </Card>
    </div>
  </div>
</div>