<script lang="ts">
    import { goto } from "$app/navigation";
    import { Button, buttonVariants } from "$lib/components/ui/button";
    import * as Dialog from "$lib/components/ui/dialog";
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";
    import type {
        ApiResponse,
        ApiResponseSuccess,
        ApiResponseFailure,
    } from "$lib/types/types";

    let id = $state("");

    function onJoinClicked() {
        const sock = new WebSocket("http://localhost:3000/joinlobby");
        sock.addEventListener("open", () => {
            console.log("Opened connection");
            sock.send(id);
        });

        sock.addEventListener("message", (msg) => {
            let resp: ApiResponse = JSON.parse(msg.data);
            let data = resp.data;
            if (resp.kind === "err") {
                data = data as ApiResponseFailure;
                console.error(data.err);
            } else {
                data = data as ApiResponseSuccess;
                console.log("Message received", data.message);
                goto(`/lobbies/${id}`);
            }
        });
    }
</script>

<div
    class="container w-screen h-screen flex items-center justify-center flex-col"
>
    <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Welcome to Netivillak
    </h1>

    <div class="container flex flex-col items-center">
        <Dialog.Root>
            <Dialog.Trigger class={buttonVariants({ variant: "default" })}
                >Join an existing game!</Dialog.Trigger
            >
            <Dialog.Content class="sm:max-w-[425px]">
                <Dialog.Header>
                    <Dialog.Title class="text-2xl self-center"
                        >Join a game</Dialog.Title
                    >
                </Dialog.Header>

                <div
                    class="container flex flex-col items-center justify-center"
                >
                    <div class="flex flex-col mb-4">
                        <Label for="name">Enter game code here</Label>
                        <Input name="name" bind:value={id} />
                    </div>
                </div>
                <Dialog.Footer>
                    <Dialog.Close>
                        <Button onclick={onJoinClicked}>Join!</Button>
                    </Dialog.Close>
                </Dialog.Footer>
            </Dialog.Content>
        </Dialog.Root>

        <Button href="/create" class="mt-4">Create new game</Button>
    </div>
</div>
