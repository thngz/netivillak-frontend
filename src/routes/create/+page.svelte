<script lang="ts">
    import * as Dialog from "$lib/components/ui/dialog";
    import { Button, buttonVariants } from "$lib/components/ui/button";
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";
    import * as Table from "$lib/components/ui/table";
    import { Clue } from "$lib/components/ui/clue";
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    // import type Question from "$lib/types/types";

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
    }

    const headings = [
        "Sport",
        "Varia",
        "Geography",
        "Culture",
        "Estonia",
        "Foods",
    ];

    let rows: Row[] = $state([]);
    let finalRows: Row[] = $state([]);

    onMount(() => {
        for (let i = 1; i < headings.length; i++) {
            let arr: Question[] = [];
            for (let j = 0; j < headings.length; j++) {
                arr.push({
                    clue: "nothing here yet",
                    answer: "nothing",
                    points: i * 100,
                    category: headings[j],
                    row: i - 1,
                    col: j,
                });
            }
            rows.push({ questions: arr });
        }

        console.log(rows);
    });

    function onSaveChanges() {
        finalRows = rows;
        console.log(JSON.stringify(finalRows));
    }

    function startGame() {
        const id = crypto.randomUUID();
        goto(`/play/${id}`);
    }
</script>

<div class="container w-screen h-screen flex items-center flex-col">
    <h3 class="scroll-m-20 text-xl font-bold tracking-tight lg:text-3xl m-4">
        Create a game
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
                            {#each headings as heading}
                                <Table.Head
                                    class="text-amber-400 font-bold text-xl"
                                    >{heading}</Table.Head
                                >
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

        <Button class="mt-4 self-center" onclick={startGame}>Start game</Button>
    </div>
</div>
