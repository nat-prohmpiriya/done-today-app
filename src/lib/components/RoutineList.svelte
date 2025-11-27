<script lang="ts">
    import type { Routine } from "$lib/types";
    import RoutineItem from "./RoutineItem.svelte";

    interface Props {
        routines: Routine[];
        onAddClick: () => void;
        onToggle: (id: string) => void;
        onEdit: (routine: Routine) => void;
        onDelete: (id: string) => void;
    }

    let { routines, onAddClick, onToggle, onEdit, onDelete }: Props = $props();
</script>

<div class="p-4 space-y-3">
    <button onclick={onAddClick} class="w-full btn-primary py-3">
        + Add Routine
    </button>

    {#if routines.length === 0}
        <div class="text-center py-12 text-gray-400">
            <p class="text-sm">No routines yet</p>
            <p class="text-xs">Create one to auto-generate tasks</p>
        </div>
    {:else}
        <div class="space-y-2">
            {#each routines as routine (routine.id)}
                <RoutineItem {routine} {onToggle} {onEdit} {onDelete} />
            {/each}
        </div>
    {/if}
</div>
