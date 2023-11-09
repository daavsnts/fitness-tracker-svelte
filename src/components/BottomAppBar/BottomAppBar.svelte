<script lang="ts">
  import waterIcon from "$assets/water-drop-icon.svg";
  import exerciseIcon from "$assets/person-exercising-icon.svg";
  import userIcon from "$assets/person-icon.svg";
  import IconButton from "$components/IconButton/IconButton.svelte";
  import { push } from "svelte-spa-router";
</script>

<div>
  <IconButton
    iconPath={waterIcon}
    onClickFunction={() => push("/")}
    alt="water"
  />
  <IconButton
    iconPath={exerciseIcon}
    onClickFunction={() => push("/exercise-tracker")}
    alt="exercise"
  />
  <IconButton
    iconPath={userIcon}
    onClickFunction={() => push("/user-profile")}
    alt="user"
  />
</div>

<style lang="scss">
  div {
    width: 100%;
    height: 10%;
    display: flex;
    flex-direction: row;
    column-gap: 10px;
    background-color: #ffffff;
    filter: drop-shadow(0px 0px 1px rgba(0, 0, 0, 0.6));
  }
</style>
