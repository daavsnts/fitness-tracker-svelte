<script lang="ts">
  import closeIcon from "$assets/x-icon.svg";
  import TextButton from "$components/TextButton/TextButton.svelte";
  export let toggleModal: Function;
  export let getModalValue: Function;
  export let modalType: string;

  let modalTitle: string;
  let buttonTitle: string;

  if (modalType == "water-intake") {
    modalTitle = "Add water intake";
    buttonTitle = "Add";
  }

  if (modalType == "water-goal") {
    modalTitle = "Set water goal";
    buttonTitle = "Set";
  }

  let inputValue: number;
</script>

<div class="Modal">
  <div class="modal-container">
    <div class="modal-container-header">
      <h1>{modalTitle}</h1>
      <button on:click={() => toggleModal()}>
        <img
          src={closeIcon}
          alt="close modal"
        />
      </button>
    </div>
    <input
      type="number"
      bind:value={inputValue}
    />
    <TextButton
      onClickFunction={() => getModalValue(inputValue, modalType)}
      text={buttonTitle}
    />
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
    height: 180px;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 10px;

    .modal-container-header {
      position: relative;
      width: 100%;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;

      h1 {
        font-size: 2.3rem;
        line-height: 10px;
        font-size: 2.3rem;
      }

      button {
        position: absolute;
        right: 5px;
        bottom: 10px;
        width: 40px;
        height: 40px;
        border: none;
        background-color: transparent;
      }
    }

    input {
      margin-top: 5px;
      border: none;
      width: 90%;
      height: 45px;
      border-radius: 15px;
      padding: 15px;
      background-color: rgba(0, 0, 0, 0.2);
      font-size: 1.4rem;
      font-weight: bold;
    }
  }
</style>
