<script lang="ts">
    import type { Task, QuadrantInfo } from "$lib/types";

    interface Props {
        quadrant: QuadrantInfo;
        tasks: Task[];
        onToggle: (id: string) => void;
        onDelete: (id: string) => void;
        onUpdate: (id: string, title: string) => void;
        onAdd: (title: string, quadrant: "q1" | "q2" | "q3" | "q4") => void;
        onDragStart: (taskId: string) => void;
        onDragEnd: () => void;
        onDrop: () => void;
        isDragOver: boolean;
    }

    let {
        quadrant,
        tasks,
        onToggle,
        onDelete,
        onUpdate,
        onAdd,
        onDragStart,
        onDragEnd,
        onDrop,
        isDragOver,
    }: Props = $props();

    let isHovering = $state(false);
    let editingId = $state<string | null>(null);
    let newTaskValue = $state("");
    let draggedTaskId = $state<string | null>(null);

    function handleDragOver(e: DragEvent) {
        e.preventDefault();
        isHovering = true;
    }

    function handleDragLeave(e: DragEvent) {
        // Only set to false if leaving the column entirely
        const relatedTarget = e.relatedTarget as HTMLElement | null;
        const currentTarget = e.currentTarget as HTMLElement | null;
        if (!relatedTarget || !currentTarget?.contains(relatedTarget)) {
            isHovering = false;
        }
    }

    function handleDrop(e: DragEvent) {
        e.preventDefault();
        isHovering = false;
        onDrop();
    }

    function handleTaskDragStart(taskId: string, e: DragEvent) {
        draggedTaskId = taskId;
        onDragStart(taskId);
        if (e.dataTransfer) {
            e.dataTransfer.effectAllowed = "move";
            e.dataTransfer.setData("text/plain", taskId);
        }
    }

    function handleTaskDragEnd() {
        draggedTaskId = null;
        onDragEnd();
    }

    function handleNewTaskKeydown(e: KeyboardEvent) {
        if (e.key === "Enter" && newTaskValue.trim()) {
            onAdd(
                newTaskValue.trim(),
                quadrant.id as "q1" | "q2" | "q3" | "q4",
            );
            newTaskValue = "";
        } else if (e.key === "Escape") {
            newTaskValue = "";
            (e.target as HTMLInputElement).blur();
        }
    }

    function handleTaskKeydown(e: KeyboardEvent, task: Task) {
        const target = e.target as HTMLInputElement;
        if (e.key === "Enter") {
            target.blur();
        } else if (e.key === "Backspace" && target.value === "") {
            e.preventDefault();
            onDelete(task.id);
        } else if (e.key === "Escape") {
            editingId = null;
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

<div
    class="flex flex-col bg-gray-100 dark:bg-gray-800 rounded-lg md:flex-1 md:min-w-0 md:h-full"
    ondragover={handleDragOver}
    ondragleave={handleDragLeave}
    ondrop={handleDrop}
    role="region"
    aria-label={quadrant.name}
>
    <!-- Column Header -->
    <div
        class={`px-3 py-2 rounded-t-lg border-b-2 ${quadrant.borderColor} ${quadrant.bgColor}`}
    >
        <div class="flex items-center justify-between">
            <h3
                class={`${quadrant.color} text-sm font-bold flex items-center gap-1.5`}
            >
                <span>{quadrant.emoji}</span>
                <span class="uppercase tracking-wide">{quadrant.name}</span>
            </h3>
            <span
                class="text-xs text-gray-500 bg-white/50 dark:bg-gray-700/50 px-2 py-0.5 rounded-full"
            >
                {tasks.length}
            </span>
        </div>
        <p class="text-[10px] text-gray-500 mt-0.5">{quadrant.description}</p>
    </div>

    <!-- Tasks Container -->
    <div
        class="flex-1 p-2 space-y-1 md:overflow-y-auto transition-colors {isHovering &&
        isDragOver
            ? 'bg-indigo-50 dark:bg-indigo-900/20'
            : ''}"
    >
        {#each tasks as task (task.id)}
            <!-- Task Row (Notion-style) -->
            <div
                class="group flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-white dark:hover:bg-gray-700 transition-colors cursor-grab active:cursor-grabbing"
                class:opacity-40={draggedTaskId === task.id}
                class:bg-white={draggedTaskId === task.id}
                class:ring-2={draggedTaskId === task.id}
                class:ring-indigo-400={draggedTaskId === task.id}
                draggable={editingId !== task.id}
                ondragstart={(e) => handleTaskDragStart(task.id, e)}
                ondragend={handleTaskDragEnd}
                role="listitem"
            >
                <!-- Drag Handle -->
                <div
                    class="text-gray-300 dark:text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity text-xs"
                >
                    ⋮⋮
                </div>

                <!-- Checkbox -->
                <input
                    type="checkbox"
                    checked={task.completed}
                    onchange={() => onToggle(task.id)}
                    class="w-4 h-4 rounded border-gray-300 text-indigo-500 focus:ring-indigo-500 cursor-pointer shrink-0"
                />

                <!-- Task Title -->
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
                        class="flex-1 bg-transparent border-none outline-none text-sm py-0 focus:ring-0 min-w-0"
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
                        {#if task.rolledOver}
                            <span class="text-xs text-orange-400 ml-1">↻</span>
                        {/if}
                    </div>
                {/if}

                <!-- Delete Button -->
                <button
                    onclick={() => onDelete(task.id)}
                    class="text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity text-lg leading-none shrink-0"
                    aria-label="Delete task"
                >
                    ×
                </button>
            </div>
        {/each}

        <!-- New Task Input Row (Notion-style inline) -->
        <div
            class="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-white/50 dark:hover:bg-gray-700/50"
        >
            <div class="text-gray-300 text-xs w-3">+</div>
            <div class="w-4"></div>
            <input
                type="text"
                bind:value={newTaskValue}
                onkeydown={handleNewTaskKeydown}
                placeholder="Add task..."
                class="flex-1 bg-transparent border-none outline-none text-sm text-gray-500 placeholder-gray-400 py-0 focus:ring-0 min-w-0"
            />
        </div>

        <!-- Drop indicator -->
        {#if isHovering && isDragOver}
            <div
                class="border-2 border-dashed border-indigo-300 rounded-md p-2 text-center text-xs text-indigo-400"
            >
                Drop here
            </div>
        {/if}
    </div>
</div>
