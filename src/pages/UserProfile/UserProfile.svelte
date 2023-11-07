<script lang="ts">
  import TextButton from "$components/TextButton/TextButton.svelte";
  import userAuthenticationStore from "$stores/UserAuthenticationStore";
  import { push } from "svelte-spa-router";
</script>

<div class="UserProfile">
  <h1>User history soon!</h1>

  <TextButton
    onClickFunction={() => {
      userAuthenticationStore.userLogout();
      push("/");
    }}
    text="Logout"
    size={40}
  />
</div>

<style lang="scss">
  .UserProfile {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 30px;

    h1 {
      font-size: 2.5rem;
      color: #fff;
      text-shadow: 4px 4px 8px rgba(0, 0, 0, 0.3);
    }
  }
</style>
