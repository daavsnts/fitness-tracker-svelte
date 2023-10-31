<script lang="ts">
  import { push, querystring } from "svelte-spa-router";
</script>

<h1>403 - Forbidden</h1>

<p>{$querystring}</p>

<button
  on:click={() => {
    push("/").catch((e) => {
      throw e;
    });
  }}>Go home</button
>
