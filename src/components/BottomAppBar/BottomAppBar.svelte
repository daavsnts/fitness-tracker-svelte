<script lang="ts">
  import waterIcon from "$assets/water-drop-icon.svg";
  import exerciseIcon from "$assets/person-exercising-icon.svg";
  import userIcon from "$assets/person-icon.svg";
  import IconButton from "$components/IconButton/IconButton.svelte";
</script>

<div>
  <IconButton
    iconPath={waterIcon}
    route="/"
  />
  <IconButton
    iconPath={exerciseIcon}
    route="/exercise-tracker"
  />
  <IconButton
    iconPath={userIcon}
    route="/user-profile"
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
