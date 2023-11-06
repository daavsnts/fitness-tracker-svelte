<script lang="ts">
  import userAuthenticationStore from "$stores/UserAuthenticationStore";
  import { push } from "svelte-spa-router";
</script>

<h1>User Profile</h1>
<button
  on:click={() => {
    userAuthenticationStore.userLogout();
    push("/");
  }}>Logout</button
>

<style lang="scss">
</style>
