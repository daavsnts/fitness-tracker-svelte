<script lang="ts">
  import TextButton from "$components/TextButton/TextButton.svelte";
  import userAuthenticationStore from "$stores/UserAuthenticationStore";
  import type { User } from "firebase/auth";
  import { push } from "svelte-spa-router";

  let loginInputValue = "";
  let passwordInputValue = "";
  let displayNameInputValue = "";
  let userRegistered: User;
</script>

<div class="UserLogin">
  <h1>Register your account!</h1>

  <div class="inputs-container">
    <input
      bind:value={displayNameInputValue}
      type="text"
      placeholder="Davi Santos"
    />

    <input
      bind:value={loginInputValue}
      type="text"
      placeholder="davi@fitness.com"
    />

    <input
      bind:value={passwordInputValue}
      type="password"
      placeholder="******"
    />
  </div>

  <div class="buttons-container">
    <TextButton
      onClickFunction={() => push("/")}
      text="Back"
    />
    <TextButton
      onClickFunction={async () =>
        (userRegistered = await userAuthenticationStore.userRegister(
          loginInputValue,
          passwordInputValue,
          displayNameInputValue
        ))}
      text="Register"
    />
  </div>

  <div class="message-container">
    {#if userRegistered}
      <h2>Account created!</h2>
    {/if}
  </div>
</div>

<style lang="scss">
  .UserLogin {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 30px;

    h1 {
      color: #fff;
      text-align: center;
      text-shadow: 4px 4px 8px rgba(0, 0, 0, 0.3);
    }

    .inputs-container {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      row-gap: 10px;

      input {
        border: none;
        width: 70%;
        height: 45px;
        border-radius: 15px;
        padding: 15px;
        color: #fff;
        background-color: rgba(0, 0, 0, 0.2);
        font-size: 1.4rem;
        font-weight: bold;
      }

      input::placeholder {
        color: rgba(255, 255, 255, 0.6);
        opacity: 1;
        font-style: italic;
      }

      input::-ms-input-placeholder {
        color: rgba(255, 255, 255, 0.6);
        font-style: italic;
      }
    }

    .buttons-container {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      column-gap: 30px;
    }

    .message-container {
      width: 100%;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;

      h2 {
        color: #00e925;
        text-align: center;
        text-shadow: 4px 4px 8px rgba(0, 0, 0, 0.3);
      }
    }
  }
</style>
