<script lang="ts">
    import type { Task } from "$lib/types";
    import { QUADRANTS } from "$lib/types";
    import KanbanColumn from "./KanbanColumn.svelte";

    interface Props {
        tasks: Task[];
        onToggle: (id: string) => void;
        onDelete: (id: string) => void;
        onUpdate: (id: string, title: string) => void;
        onAdd: (title: string, quadrant: "q1" | "q2" | "q3" | "q4") => void;
        onMoveTask: (
            taskId: string,
            toQuadrant: "q1" | "q2" | "q3" | "q4",
        ) => void;
    }

    let { tasks, onToggle, onDelete, onUpdate, onAdd, onMoveTask }: Props =
        $props();

    let q1Tasks = $derived(tasks.filter((t) => t.quadrant === "q1"));
    let q2Tasks = $derived(tasks.filter((t) => t.quadrant === "q2"));
    let q3Tasks = $derived(tasks.filter((t) => t.quadrant === "q3"));
    let q4Tasks = $derived(tasks.filter((t) => t.quadrant === "q4"));

    let draggedTaskId = $state<string | null>(null);

    function handleDragStart(taskId: string) {
        draggedTaskId = taskId;
    }

    function handleDragEnd() {
        draggedTaskId = null;
    }

    function handleDrop(quadrantId: "q1" | "q2" | "q3" | "q4") {
        if (draggedTaskId) {
            onMoveTask(draggedTaskId, quadrantId);
            draggedTaskId = null;
        }
    }
</script>

<!-- Mobile: Single column scrollable list -->
<div class="md:hidden h-full overflow-y-auto">
    <div class="flex flex-col gap-4 p-4">
        <KanbanColumn
            quadrant={QUADRANTS.q1}
            tasks={q1Tasks}
            {onToggle}
            {onDelete}
            {onUpdate}
            {onAdd}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDrop={() => handleDrop("q1")}
            isDragOver={draggedTaskId !== null}
        />
        <KanbanColumn
            quadrant={QUADRANTS.q2}
            tasks={q2Tasks}
            {onToggle}
            {onDelete}
            {onUpdate}
            {onAdd}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDrop={() => handleDrop("q2")}
            isDragOver={draggedTaskId !== null}
        />
        <KanbanColumn
            quadrant={QUADRANTS.q3}
            tasks={q3Tasks}
            {onToggle}
            {onDelete}
            {onUpdate}
            {onAdd}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDrop={() => handleDrop("q3")}
            isDragOver={draggedTaskId !== null}
        />
        <KanbanColumn
            quadrant={QUADRANTS.q4}
            tasks={q4Tasks}
            {onToggle}
            {onDelete}
            {onUpdate}
            {onAdd}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDrop={() => handleDrop("q4")}
            isDragOver={draggedTaskId !== null}
        />
    </div>
</div>

<!-- Desktop: 4 columns side by side, full height -->
<div class="hidden md:flex h-full">
    <div class="flex gap-4 p-4 w-full h-full">
        <KanbanColumn
            quadrant={QUADRANTS.q1}
            tasks={q1Tasks}
            {onToggle}
            {onDelete}
            {onUpdate}
            {onAdd}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDrop={() => handleDrop("q1")}
            isDragOver={draggedTaskId !== null}
        />
        <KanbanColumn
            quadrant={QUADRANTS.q2}
            tasks={q2Tasks}
            {onToggle}
            {onDelete}
            {onUpdate}
            {onAdd}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDrop={() => handleDrop("q2")}
            isDragOver={draggedTaskId !== null}
        />
        <KanbanColumn
            quadrant={QUADRANTS.q3}
            tasks={q3Tasks}
            {onToggle}
            {onDelete}
            {onUpdate}
            {onAdd}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDrop={() => handleDrop("q3")}
            isDragOver={draggedTaskId !== null}
        />
        <KanbanColumn
            quadrant={QUADRANTS.q4}
            tasks={q4Tasks}
            {onToggle}
            {onDelete}
            {onUpdate}
            {onAdd}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDrop={() => handleDrop("q4")}
            isDragOver={draggedTaskId !== null}
        />
    </div>
</div>
