<script lang="ts">
    import * as Dialog from "$lib/components/ui/dialog";
    import { Button } from "$lib/components/ui/button";
    import { Label } from "$lib/components/ui/label";
    import { Input } from "$lib/components/ui/input";
    import type Question from "$lib/types/types";

    let { rows = $bindable(), row, col } = $props();
    let question: Question = $state(rows[row].questions[col]);
</script>

<Dialog.Root>
    <Dialog.Trigger>{question.clue}</Dialog.Trigger>
    <Dialog.Content class="bg-jeopardy-blue sm:max-w[425px]">
        <Dialog.Header>
            <Dialog.Title>Add new question to category {question.category}</Dialog.Title>
        </Dialog.Header>
        <div class="grid grid-cols-4 items-center gap-4">
            <Label for="question" class="text-right">Question text</Label>
            <Input
                id="question"
                bind:value={question.clue}
                class="col-span-3 text-black"
            />
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
            <Label for="answer" class="text-right">Answer text</Label>
            <Input id="answer" value={question.answer} class="col-span-3 text-black" />
        </div>
        <Dialog.Footer>
            <Button type="submit">Continue</Button>
        </Dialog.Footer>
    </Dialog.Content>
</Dialog.Root>
