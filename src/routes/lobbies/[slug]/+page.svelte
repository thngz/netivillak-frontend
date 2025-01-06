<script lang="ts">
    import { onMount } from "svelte";
    import type { PageData } from "./$types";
    import { playerState } from "$lib/state/userstate.svelte";

    let { data }: { data: PageData } = $props();
    let id = data.params.slug;

    onMount(async () => {});
</script>

<b>Lobby id: {id}</b>

<p>Players joined:</p>

{#each playerState.players as player}
    <li>Player: {player}</li>
{/each}
