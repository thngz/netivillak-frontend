<script>
    import { Button } from "$lib/components/ui/button";
    // let count = $state(0);
    // let doubled = $derived(count * 2);
    //
    // $effect(() => {
    //     console.log("Count changed to: ", count);
    // });
    //
</script>

<div class="container w-screen h-screen flex items-center justify-center flex-col">
    <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Welcome to Netivillak
    </h1>

    <div class="container flex flex-col items-center ">
        <Button class="m-4" href="/join">Join a game</Button>
        <Button href="/create">Create new game</Button>
    </div>
</div>
