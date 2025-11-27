<script lang="ts">
    import type { Task } from "$lib/types";

    let completedTasks = $state<Task[]>([
        {
            id: "1",
            title: "Review project proposal",
            completed: true,
            createdAt: new Date(Date.now() - 86400000),
            completedAt: new Date(),
            dueDate: new Date(Date.now() - 86400000),
            quadrant: "q1",
            rolledOver: false,
            rolloverCount: 0,
        },
        {
            id: "2",
            title: "Send email to client",
            completed: true,
            createdAt: new Date(Date.now() - 86400000),
            completedAt: new Date(Date.now() - 50000000),
            dueDate: new Date(Date.now() - 86400000),
            quadrant: "q1",
            rolledOver: false,
            rolloverCount: 0,
        },
        {
            id: "3",
            title: "Plan meeting",
            completed: true,
            createdAt: new Date(Date.now() - 172800000),
            completedAt: new Date(Date.now() - 172800000 + 3600000),
            dueDate: new Date(Date.now() - 172800000),
            quadrant: "q2",
            rolledOver: false,
            rolloverCount: 0,
        },
    ]);

    function groupByDate(tasks: Task[]) {
        const groups: Record<string, Task[]> = {};
        tasks.forEach((task) => {
            const dateKey = new Date(
                task.completedAt || task.dueDate,
            ).toLocaleDateString("en-US", {
                year: "numeric",
                month: "numeric",
                day: "numeric",
            });
            if (!groups[dateKey]) {
                groups[dateKey] = [];
            }
            groups[dateKey].push(task);
        });
        return Object.entries(groups).sort((a, b) => {
            const dateA = new Date(a[0]).getTime();
            const dateB = new Date(b[0]).getTime();
            return dateB - dateA;
        });
    }

    function formatDateHeader(dateStr: string) {
        const date = new Date(dateStr);
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        if (date.toDateString() === today.toDateString()) {
            return "Today";
        } else if (date.toDateString() === yesterday.toDateString()) {
            return "Yesterday";
        } else {
            return date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
            });
        }
    }

    function handleRestore(id: string) {
        // TODO: Move task back to Do page
        console.log("Restore task:", id);
    }

    function getGroupedTasks() {
        const groups: Record<string, Task[]> = {};
        completedTasks.forEach((task) => {
            const dateKey = new Date(
                task.completedAt || task.dueDate,
            ).toLocaleDateString("en-US", {
                year: "numeric",
                month: "numeric",
                day: "numeric",
            });
            if (!groups[dateKey]) {
                groups[dateKey] = [];
            }
            groups[dateKey].push(task);
        });
        return Object.entries(groups).sort((a, b) => {
            const dateA = new Date(a[0]).getTime();
            const dateB = new Date(b[0]).getTime();
            return dateB - dateA;
        });
    }
</script>

<div class="pt-4">
    <!-- Header -->
    <div class="px-4 mb-4">
        <h1 class="text-3xl font-bold mb-2">✅ DONE</h1>
        <p class="text-sm text-gray-500">{completedTasks.length} completed</p>
    </div>

    <!-- History List -->
    <div class="space-y-4 px-4">
        {#if completedTasks.length === 0}
            <div class="text-center py-12 text-gray-400">
                <p class="text-sm">No completed tasks yet</p>
                <p class="text-xs">
                    Complete tasks from the Do page to see them here
                </p>
            </div>
        {:else}
            {#each getGroupedTasks() as [dateStr, taskList]}
                <div>
                    <h2
                        class="text-sm font-semibold text-gray-500 mb-2 uppercase"
                    >
                        {formatDateHeader(dateStr)}
                        <span class="text-xs ml-2"
                            >{taskList.length}
                            {taskList.length === 1 ? "task" : "tasks"}</span
                        >
                    </h2>
                    <div
                        class="space-y-2 border-l-2 border-gray-300 dark:border-gray-600 pl-4"
                    >
                        {#each taskList as task (task.id)}
                            <div
                                class="flex items-center justify-between group"
                            >
                                <div class="flex items-center gap-2 flex-1">
                                    <span class="text-green-500">✓</span>
                                    <p
                                        class="text-sm line-through text-gray-400"
                                    >
                                        {task.title}
                                    </p>
                                </div>
                                <button
                                    onclick={() => handleRestore(task.id)}
                                    class="btn-icon text-gray-400 hover:text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                    title="Restore task"
                                >
                                    ↻
                                </button>
                            </div>
                        {/each}
                    </div>
                </div>
            {/each}
        {/if}
    </div>
</div>
