<script lang="ts">
    import type { Task } from "$lib/types";

    interface Props {
        tasks: Task[];
        onAdd: (title: string) => void;
        onToggle: (id: string) => void;
        onDelete: (id: string) => void;
        onUpdate: (id: string, title: string) => void;
        onReorder: (fromIndex: number, toIndex: number) => void;
        placeholder?: string;
        showCompleted?: boolean;
    }

    let {
        tasks,
        onAdd,
        onToggle,
        onDelete,
        onUpdate,
        onReorder,
        placeholder = "Type to add a task...",
        showCompleted = false,
    }: Props = $props();

    let draggedIndex = $state<number | null>(null);
    let dragOverIndex = $state<number | null>(null);
    let editingId = $state<string | null>(null);
    let newTaskValue = $state("");

    function handleDragStart(index: number, e: DragEvent) {
        draggedIndex = index;
        if (e.dataTransfer) {
            e.dataTransfer.effectAllowed = "move";
            e.dataTransfer.setData("text/plain", index.toString());
        }
    }

    function handleDragOver(index: number, e: DragEvent) {
        e.preventDefault();
        if (draggedIndex !== null && draggedIndex !== index) {
            dragOverIndex = index;
        }
    }

    function handleDragLeave() {
        dragOverIndex = null;
    }

    function handleDrop(index: number, e: DragEvent) {
        e.preventDefault();
        if (draggedIndex !== null && draggedIndex !== index) {
            onReorder(draggedIndex, index);
        }
        draggedIndex = null;
        dragOverIndex = null;
    }

    function handleDragEnd() {
        draggedIndex = null;
        dragOverIndex = null;
    }

    function handleNewTaskKeydown(e: KeyboardEvent) {
        if (e.key === "Enter" && newTaskValue.trim()) {
            onAdd(newTaskValue.trim());
            newTaskValue = "";
        }
    }

    function handleTaskKeydown(e: KeyboardEvent, task: Task) {
        const target = e.target as HTMLInputElement;
        if (e.key === "Enter") {
            target.blur();
        } else if (e.key === "Backspace" && target.value === "") {
            e.preventDefault();
            onDelete(task.id);
        }
    }

    function handleTaskBlur(task: Task, value: string) {
        editingId = null;
        if (value.trim() === "") {
            onDelete(task.id);
        } else if (value !== task.title) {
            onUpdate(task.id, value);
        }
    }

    function startEditing(taskId: string) {
        editingId = taskId;
    }

    function focusOnMount(node: HTMLElement) {
        node.focus();
    }
</script>

<div class="space-y-1">
    {#each tasks as task, index (task.id)}
        <div
            class="group flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-150"
            class:opacity-50={draggedIndex === index}
            class:border-t-2={dragOverIndex === index &&
                draggedIndex !== null &&
                draggedIndex < index}
            class:border-b-2={dragOverIndex === index &&
                draggedIndex !== null &&
                draggedIndex > index}
            class:border-indigo-500={dragOverIndex === index}
            draggable={editingId !== task.id}
            ondragstart={(e) => handleDragStart(index, e)}
            ondragover={(e) => handleDragOver(index, e)}
            ondragleave={handleDragLeave}
            ondrop={(e) => handleDrop(index, e)}
            ondragend={handleDragEnd}
            role="listitem"
        >
            <!-- Drag Handle -->
            <div
                class="cursor-grab active:cursor-grabbing text-gray-300 dark:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity"
            >
                <span class="text-sm">⋮⋮</span>
            </div>

            <!-- Checkbox -->
            <input
                type="checkbox"
                checked={task.completed}
                onchange={() => onToggle(task.id)}
                class="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-indigo-500 focus:ring-indigo-500 cursor-pointer"
            />

            <!-- Task Title (Editable) -->
            {#if editingId === task.id}
                <input
                    type="text"
                    value={task.title}
                    onblur={(e) =>
                        handleTaskBlur(
                            task,
                            (e.target as HTMLInputElement).value,
                        )}
                    onkeydown={(e) => handleTaskKeydown(e, task)}
                    class="flex-1 bg-transparent border-none outline-none text-sm py-0.5 focus:ring-0"
                    class:line-through={task.completed}
                    class:text-gray-400={task.completed}
                    use:focusOnMount
                />
            {:else}
                <div
                    class="flex-1 min-w-0 cursor-text"
                    onclick={() => startEditing(task.id)}
                    onkeydown={(e) =>
                        e.key === "Enter" && startEditing(task.id)}
                    role="button"
                    tabindex="0"
                >
                    <span
                        class="text-sm"
                        class:line-through={task.completed}
                        class:text-gray-400={task.completed}
                    >
                        {task.title}
                    </span>
                    {#if task.rolledOver && !showCompleted}
                        <span class="text-xs text-orange-400 ml-2">↻</span>
                    {/if}
                </div>
            {/if}

            <!-- Delete Button -->
            <button
                onclick={() => onDelete(task.id)}
                class="text-gray-300 dark:text-gray-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity text-lg leading-none"
                aria-label="Delete task"
            >
                ×
            </button>
        </div>
    {/each}

    <!-- New Task Input Row -->
    {#if !showCompleted}
        <div
            class="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800/50"
        >
            <div class="w-4 text-gray-300 dark:text-gray-600">
                <span class="text-sm">+</span>
            </div>
            <div class="w-4"></div>
            <input
                type="text"
                bind:value={newTaskValue}
                onkeydown={handleNewTaskKeydown}
                {placeholder}
                class="flex-1 bg-transparent border-none outline-none text-sm text-gray-500 placeholder-gray-400 dark:placeholder-gray-500 py-0.5 focus:ring-0"
            />
        </div>
    {/if}
</div>
