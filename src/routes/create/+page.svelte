<script lang="ts">
    import * as Dialog from "$lib/components/ui/dialog";
    import { Button, buttonVariants } from "$lib/components/ui/button";
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";
    import * as Table from "$lib/components/ui/table";
    import { Clue } from "$lib/components/ui/clue";
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import type { Question, Row } from "$lib/types";
    import GameService from "$lib/services/gameservice";
    import type {
        ApiResponse,
        ApiResponseFailure,
        ApiResponseSuccess,
    } from "$lib/types/types";

    let numCategories = 6;

    let rows: Row[] = $state([]);
    let finalRows: Row[] = $state([]);
    const service = GameService("http://localhost:3000")

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

    function onSaveChanges() {
        finalRows = rows;
        console.log(JSON.stringify(finalRows));
    }

    async function startGame() {
       service.CreateLobby(finalRows) 
    }
</script>

<div class="container w-screen h-screen flex items-center flex-col">
    <h3 class="scroll-m-20 text-xl font-bold tracking-tight lg:text-3xl m-4">
        Create a lobby
    </h3>

    <div class="container flex flex-col items-center justify-center">
        <div class="flex flex-col mb-4">
            <Label for="name">Enter game name here (Optional)</Label>
            <Input name="name" />
        </div>

        <div class="flex flex-col mb-4">
            <Label for="password">Enter game password here</Label>
            <Input name="password" />
        </div>
        <Dialog.Root>
            <Dialog.Trigger class={buttonVariants({ variant: "outline" })}
                >Edit game board</Dialog.Trigger
            >
            <Dialog.Content class="w-screen bg-jeopardy-blue text-amber-400">
                <Dialog.Header>
                    <Dialog.Title class="text-2xl self-center"
                        >Game board</Dialog.Title
                    >
                </Dialog.Header>

                <Table.Root>
                    <Table.Header>
                        <Table.Row>
                            {#each { length: numCategories }, i}
                                <Table.Head
                                    class="text-amber-400 font-bold text-xl"
                                >
                                    <Label
                                        for="heading"
                                        class="text-right font-bold"
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
                                        <Clue
                                            bind:rows
                                            row={q.row}
                                            col={q.col}
                                        />
                                    </Table.Cell>
                                {/each}
                            </Table.Row>
                        {/each}
                    </Table.Body>
                </Table.Root>

                <Dialog.Footer>
                    <Dialog.Close>
                        <Button onclick={onSaveChanges} type="submit"
                            >Save changes</Button
                        >
                    </Dialog.Close>
                </Dialog.Footer>
            </Dialog.Content>
        </Dialog.Root>

        <Button class="mt-4 self-center" onclick={startGame}
            >Create lobby</Button
        >
    </div>
</div>
