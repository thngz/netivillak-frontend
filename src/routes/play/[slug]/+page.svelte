<script lang="ts">
    import type { PageData } from "./$types";

    let { data }: { data: PageData } = $props();
</script>

<b>Lobby id: {data.params.slug}</b>

<p>Players joined: </p>
