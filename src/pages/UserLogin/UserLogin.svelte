<script lang="ts">
  import TextButton from "$components/TextButton/TextButton.svelte";
  import userAuthenticationStore from "$stores/UserAuthenticationStore";
  import { push } from "svelte-spa-router";

  let loginInputValue = "";
  let passwordInputValue = "";
</script>

<div class="UserLogin">
  <h1>Welcome to FitnessTracker!</h1>

  <div class="inputs-container">
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
      onClickFunction={() =>
        userAuthenticationStore.userLogin(loginInputValue, passwordInputValue)}
      text="Login"
    />

    <TextButton
      onClickFunction={() => push("/user-register")}
      text="Register"
    />
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
  }
</style>
