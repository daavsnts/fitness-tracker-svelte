<script lang="ts">
  import userAuthenticationStore from "$stores/UserAuthenticationStore";
  import HomePage from "$pages/HomePage/HomePage.svelte";
  import LoginPage from "$pages/LoginPage/LoginPage.svelte";

  let userLoggedIn = userAuthenticationStore.isUserLoggedIn;
</script>

<div class="App">
  {#if $userLoggedIn}
    <HomePage />
  {:else}
    <LoginPage />
  {/if}
</div>

<style lang="scss">
  .App {
    width: 100%;
    height: 100vh;
  }
</style>
