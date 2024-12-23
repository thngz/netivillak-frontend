<script>
    import * as Dialog from "$lib/components/ui/dialog";
    import { Button, buttonVariants } from "$lib/components/ui/button";
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";
    import * as Table from "$lib/components/ui/table";
    import Clue from "$lib/components/ui/clue/clue.svelte";

    const headings = [
        "Sport",
        "Varia",
        "Geography",
        "Culture",
        "Estonia",
        "Foods",
    ];
    const answersValue = [];

    for (let i = 1; i < headings.length; i++) {
        answersValue[i] = i * 100;
    }

    function startGame() {
        console.log("I run");
    }
</script>

<div class="container w-screen h-screen flex items-center flex-col">
    <h3 class="scroll-m-20 text-xl font-bold tracking-tight lg:text-3xl m-4">
        Create a game
    </h3>

    <div class="container flex flex-col items-start justify-center">
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
                >Add questions</Dialog.Trigger
            >
            <Dialog.Content
                class="w-screen bg-jeopardy-blue text-jeopardy-yellow"
            >
                <Dialog.Header>
                    <Dialog.Title>Add a new question</Dialog.Title>
                </Dialog.Header>

                <Table.Root>
                    <Table.Header>
                        <Table.Row>
                            {#each headings as heading}
                                <Table.Head class="text-jeopardy-yellow"
                                    >{heading}</Table.Head
                                >
                            {/each}
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {#each { length: 6 }, i}
                            <Table.Row>
                                {#each { length: 6 }, j}
                                    <Table.Cell
                                        onclick={() =>
                                            console.log(`Clicked ${i},${j} `)}
                                    >
                                        <Clue
                                            points={(i + 1) * 100}
                                            clue="Nothing here yet"
                                        />
                                    </Table.Cell>
                                {/each}
                            </Table.Row>
                        {/each}
                    </Table.Body>
                </Table.Root>

                <Dialog.Footer>
                    <Button type="submit">Save changes</Button>
                </Dialog.Footer>
            </Dialog.Content>
        </Dialog.Root>

        <Button class="mt-4 self-center" onclick={startGame}>Start game</Button>
    </div>
</div>
