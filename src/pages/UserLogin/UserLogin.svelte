<script lang="ts">
  import userAuthenticationStore from "$stores/UserAuthenticationStore";

  let loginInputValue = "";
  let passwordInputValue = "";
</script>

<h1>User Login</h1>

<input
  bind:value={loginInputValue}
  type="text"
/>

<input
  bind:value={passwordInputValue}
  type="text"
/>

<button
  on:click={() => userAuthenticationStore.userLogin(loginInputValue, passwordInputValue)}
>
  Login
</button>

<style lang="scss">
</style>
