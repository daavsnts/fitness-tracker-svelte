<script lang="ts">
  import userAuthenticationStore from "$stores/UserAuthenticationStore";

  let displayNameInputValue = "";
  let loginInputValue = "";
  let passwordInputValue = "";
</script>

<h1>User Register</h1>

<input
  bind:value={displayNameInputValue}
  type="text"
/>

<input
  bind:value={loginInputValue}
  type="text"
/>

<input
  bind:value={passwordInputValue}
  type="text"
/>

<button
  on:click={() =>
    userAuthenticationStore.userRegister(
      loginInputValue,
      passwordInputValue,
      displayNameInputValue
    )}
>
  Register
</button>

<style lang="scss">
</style>
