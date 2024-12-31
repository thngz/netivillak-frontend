<script lang="ts">
    import type { PageData } from "./$types";

    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";
    import * as Table from "$lib/components/ui/table";
    import { Clue } from "$lib/components/ui/clue";
    import { onMount } from "svelte";

    interface Question {
        clue: string;
        answer: string;
        points: number;
        category: string;
        row: number;
        col: number;
    }

    interface Row {
        questions: Question[];
        category: string;
    }

    let numCategories = 6;

    let rows: Row[] = $state([]);
    let finalRows: Row[] = $state([]);

    onMount(() => {
        for (let i = 1; i < numCategories; i++) {
            let arr: Question[] = [];
            for (let j = 0; j < numCategories; j++) {
                arr.push({
                    clue: "nothing here yet",
                    answer: "nothing",
                    points: i * 100,
                    row: i - 1,
                    col: j,
                });
            }
            rows.push({ questions: arr, category: "foo" });
        }

        console.log(rows);
    });
    let { data }: { data: PageData } = $props();
</script>

<div class="bg-jeopardy-blue text-amber-400">
    <Table.Root>
        <Table.Header>
            <Table.Row>
                {#each { length: numCategories }, i}
                    <Table.Head class="text-amber-400 font-bold text-xl">
                        <Label for="heading" class="text-right font-bold"
                            >Heading text</Label
                        >
                        {#if rows[i]}
                            <Input
                                id="heading"
                                bind:value={rows[i].category}
                                class="col-span-3 text-amber-400 bg-jeopardy-blue border-white"
                            />
                        {/if}
                    </Table.Head>
                {/each}
            </Table.Row>
        </Table.Header>
        <Table.Body>
            {#each rows as row}
                <Table.Row>
                    {#each row.questions as q}
                        <Table.Cell>
                            <Clue bind:rows row={q.row} col={q.col} />
                        </Table.Cell>
                    {/each}
                </Table.Row>
            {/each}
        </Table.Body>
    </Table.Root>
</div>

<b>{data.params.slug}</b>
