<script lang="ts">
    import NotionStyleTaskList from "$lib/components/NotionStyleTaskList.svelte";
    import type { Task } from "$lib/types";

    let tasks = $state<Task[]>([
        {
            id: "1",
            title: "Review project proposal",
            completed: false,
            createdAt: new Date(),
            dueDate: new Date(),
            quadrant: "q1",
            rolledOver: false,
            rolloverCount: 0,
        },
        {
            id: "2",
            title: "Team meeting at 10 AM",
            completed: false,
            createdAt: new Date(Date.now() - 86400000),
            dueDate: new Date(),
            quadrant: "q1",
            rolledOver: true,
            rolloverCount: 1,
        },
        {
            id: "3",
            title: "Prepare slides",
            completed: true,
            createdAt: new Date(),
            completedAt: new Date(),
            dueDate: new Date(),
            quadrant: "q2",
            rolledOver: false,
            rolloverCount: 0,
        },
    ]);

    function getTodayDate() {
        return new Date().toLocaleDateString("en-US", {
            weekday: "long",
            month: "short",
            day: "numeric",
        });
    }

    function handleAddTask(title: string) {
        const newTask: Task = {
            id: Date.now().toString(),
            title,
            completed: false,
            createdAt: new Date(),
            dueDate: new Date(),
            quadrant: "q1",
            rolledOver: false,
            rolloverCount: 0,
        };
        tasks.push(newTask);
    }

    function handleToggleTask(id: string) {
        const task = tasks.find((t) => t.id === id);
        if (task) {
            task.completed = !task.completed;
            if (task.completed) {
                task.completedAt = new Date();
            } else {
                task.completedAt = undefined;
            }
        }
    }

    function handleDeleteTask(id: string) {
        tasks = tasks.filter((t) => t.id !== id);
    }

    function handleReorderTasks(fromIndex: number, toIndex: number) {
        const incompleteTasks = tasks.filter((t) => !t.completed);
        const completedTasks = tasks.filter((t) => t.completed);

        // Reorder incomplete tasks
        const [movedTask] = incompleteTasks.splice(fromIndex, 1);
        incompleteTasks.splice(toIndex, 0, movedTask);

        // Merge back
        tasks = [...incompleteTasks, ...completedTasks];
    }

    function handleReorderCompletedTasks(fromIndex: number, toIndex: number) {
        const incompleteTasks = tasks.filter((t) => !t.completed);
        const completedTasks = tasks.filter((t) => t.completed);

        // Reorder completed tasks
        const [movedTask] = completedTasks.splice(fromIndex, 1);
        completedTasks.splice(toIndex, 0, movedTask);

        // Merge back
        tasks = [...incompleteTasks, ...completedTasks];
    }

    function handleUpdateTask(id: string, title: string) {
        const task = tasks.find((t) => t.id === id);
        if (task) {
            task.title = title;
        }
    }

    let incompleteTasks = $derived(tasks.filter((t) => !t.completed));
    let completedTasks = $derived(tasks.filter((t) => t.completed));
</script>

<div class="pt-4">
    <!-- Header -->
    <div class="px-4 mb-4">
        <h1 class="text-3xl font-bold mb-1">⚡ DO</h1>
        <p class="text-sm text-gray-500">{getTodayDate()}</p>
    </div>

    <!-- Task List (Notion-style) -->
    <div class="px-4">
        <NotionStyleTaskList
            tasks={incompleteTasks}
            onAdd={handleAddTask}
            onToggle={handleToggleTask}
            onDelete={handleDeleteTask}
            onUpdate={handleUpdateTask}
            onReorder={handleReorderTasks}
            placeholder="Type to add a new task..."
        />
    </div>

    <!-- Completed Tasks Section -->
    {#if completedTasks.length > 0}
        <div class="mt-6 px-4">
            <h2 class="text-xs font-semibold text-gray-400 uppercase mb-2">
                Completed ({completedTasks.length})
            </h2>
            <NotionStyleTaskList
                tasks={completedTasks}
                onAdd={() => {}}
                onToggle={handleToggleTask}
                onDelete={handleDeleteTask}
                onUpdate={handleUpdateTask}
                onReorder={handleReorderCompletedTasks}
                showCompleted={true}
            />
        </div>
    {/if}
</div>
