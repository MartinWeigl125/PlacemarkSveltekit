<script lang="ts">
  import SignupForm from "./SignupForm.svelte";
</script>

<section class="hero is-fullheight">
  <div class="hero-body">
    <div class="container">
      <div class="column is-4 is-offset-4">
        <h1 class="title has-text-centered">Signup to Placemark</h1>
        <div class="box">
          <SignupForm></SignupForm>
          <p class="has-text-centered">Already have an account? <a href="/login" data-cy="login-redirect">Login Here</a></p>
        </div>
      </div>
    </div>
  </div>
</section>

