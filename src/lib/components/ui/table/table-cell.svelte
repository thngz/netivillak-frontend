<script lang="ts">
    import type { HTMLTdAttributes } from "svelte/elements";
    import { cn } from "$lib/utils.js";

    type $$Props = HTMLTdAttributes;

    let className: $$Props["class"] = undefined;
    export { className as class };
</script>

<td
    class={cn(
        "p-4 align-middle [&:has([role=checkbox])]:pr-0 hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors ",
        className,
    )}
    {...$$restProps}
    on:click
    on:keydown
>
    <slot />
</td>
