<script lang="ts">
  import TextButton from "$components/TextButton/TextButton.svelte";
  import userAuthenticationStore from "$stores/UserAuthenticationStore";
  import { onMount } from "svelte";
  import { push } from "svelte-spa-router";

  let user = userAuthenticationStore.user;
  let userDisplayName = $user.displayName;

  onMount(() => {
    userAuthenticationStore.refreshStoreStates();
  });
</script>

<div class="TopAppBar">
  <TextButton
    onClickFunction={() => {
      userAuthenticationStore.userLogout();
      push("/");
    }}
    text="Logout"
  />
  <h1>Welcome {userDisplayName}!</h1>
</div>

<style lang="scss">
  .TopAppBar {
    width: 100%;
    height: 10%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 5%;
    align-items: center;
    background-color: #fff;
    filter: drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.6));
    position: relative;
    z-index: 1;

    h1 {
      font-size: 2rem;
      text-shadow: 4px 4px 8px rgba(0, 0, 0, 0.3);
    }
  }
</style>
