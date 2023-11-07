<script lang="ts">
  import userAuthenticationStore from "$stores/UserAuthenticationStore";
  import { onMount } from "svelte";

  let user = userAuthenticationStore.user;
  let userDisplayName = $user.displayName;

  onMount(() => {
    userAuthenticationStore.refreshStoreStates();
  });
</script>

<div class="TopAppBar">
  <div>
    <h1>Welcome {userDisplayName}!</h1>
  </div>
</div>

<style lang="scss">
  .TopAppBar {
    width: 100%;
    height: 10%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: end;

    h1 {
      color: #fff;
      text-shadow: 4px 4px 8px rgba(0, 0, 0, 0.3);
    }
  }
</style>
