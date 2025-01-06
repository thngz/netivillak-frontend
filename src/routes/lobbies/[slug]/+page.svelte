<script lang="ts">
    import { onMount } from "svelte";
    import type { PageData } from "./$types";
    import type {
        ApiResponse,
        ApiResponseFailure,
        ApiResponseSuccess,
    } from "$lib/types/types";

    let { data }: { data: PageData } = $props();
    let players = $state<string[]>([]);
    let id = data.params.slug;

    onMount(async () => {
        const resp = await fetch(`http://localhost:3000/lobbies/${id}`);

        const msg: ApiResponse = await resp.json();
        let data = msg.data;
        if (msg.kind == "err") {
            data = data as ApiResponseFailure;
            console.error(data.err);
        } else {
            data = data as ApiResponseSuccess;
            players = data.message as string[]
            console.log(data.message);
        }
    });
</script>

<b>Lobby id: {id}</b>

<p>Players joined:</p>

{#each players as player}
    <li>Player: {player}</li>
{/each}


