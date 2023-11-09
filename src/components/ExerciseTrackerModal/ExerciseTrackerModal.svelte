<script lang="ts">
  import closeIcon from "$assets/x-icon.svg";
  import strechIcon from "$assets/person-stretching-icon.svg";
  import runningIcon from "$assets/person-running-icon.svg";
  import IconButton from "$components/IconButton/IconButton.svelte";
  import TextButton from "$components/TextButton/TextButton.svelte";
  export let toggleModal: Function;
  export let getModalValue: Function;
  export let getModalChoice: Function;
  export let modalType: string;

  let modalTitle: string;
  let buttonTitle: string;
  let modalContainerHeight: string;
  let closeIconBottom: string;

  if (modalType == "exercise-pause") {
    modalTitle = "Add exercise pause";
    buttonTitle = "Add";
    modalContainerHeight = "120px";
    closeIconBottom = "-35%";
  }

  if (modalType == "exercise-goal") {
    modalTitle = "Set pauses goal";
    buttonTitle = "Set";
    modalContainerHeight = "200px";
    closeIconBottom = "25%";
  }

  let inputValue: number;
</script>

<div class="Modal">
  <div
    class="modal-container"
    style="--height: {modalContainerHeight}"
  >
    <div class="modal-container-header">
      <h1>{modalTitle}</h1>
      <button
        on:click={() => toggleModal()}
        style="--bottom: {closeIconBottom}"
      >
        <img
          src={closeIcon}
          alt="close modal"
        />
      </button>
    </div>
    {#if modalType == "exercise-goal"}
      <div class="input-container">
        <input
          type="number"
          bind:value={inputValue}
        />
        <TextButton
          onClickFunction={() => getModalValue(inputValue, modalType)}
          text={buttonTitle}
        />
      </div>
    {:else if modalType == "exercise-pause"}
      <div class="buttons-container">
        <IconButton
          iconPath={strechIcon}
          onClickFunction={() => getModalChoice("stretch")}
          alt="stretch"
        />
        <IconButton
          iconPath={runningIcon}
          onClickFunction={() => getModalChoice("run")}
          alt="run"
        />
      </div>
    {/if}
  </div>
</div>

<style lang="scss">
  .Modal {
    position: absolute;
    background-color: rgba(0, 0, 0, 0.6);
    width: 100%;
    height: 80%;
    z-index: 2;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal-container {
    background-color: #fff;
    width: 300px;
    height: var(--height);
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .modal-container-header {
      position: relative;
      width: 100%;
      height: 100px;
      display: flex;
      justify-content: center;
      align-items: center;

      h1 {
        margin-top: 20px;
        font-size: 2.3rem;
        line-height: 10px;
      }

      button {
        position: absolute;
        right: 5px;
        bottom: var(--bottom);
        width: 40px;
        height: 40px;
        border: none;
        background-color: transparent;
      }
    }

    .input-container {
      width: 100%;
      height: 100%;
      padding: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      row-gap: 20px;

      input {
        border: none;
        width: 90%;
        height: 45px;
        border-radius: 15px;
        padding: 15px;
        background-color: rgba(0, 0, 0, 0.2);
        font-size: 1.4rem;
        font-weight: bold;
      }

      button {
        border: none;
        padding: 10px;
        border-radius: 10px;
        background-color: #11b5fc;
        font-size: 1.7rem;
        color: #fff;
        font-weight: bold;
      }
    }

    .buttons-container {
      width: 100%;
      height: 100%;
      padding: 20px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      column-gap: 20px;
    }
  }
</style>
