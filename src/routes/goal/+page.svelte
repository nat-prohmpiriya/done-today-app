<script lang="ts">
    import KanbanBoard from "$lib/components/KanbanBoard.svelte";
    import RoutineList from "$lib/components/RoutineList.svelte";
    import type { Task, Routine } from "$lib/types";

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
            title: "Plan Q1 roadmap",
            completed: false,
            createdAt: new Date(),
            dueDate: new Date(),
            quadrant: "q2",
            rolledOver: false,
            rolloverCount: 0,
        },
        {
            id: "3",
            title: "Answer emails",
            completed: false,
            createdAt: new Date(),
            dueDate: new Date(),
            quadrant: "q3",
            rolledOver: false,
            rolloverCount: 0,
        },
    ]);

    let routines = $state<Routine[]>([
        {
            id: "r1",
            title: "Exercise",
            frequency: "daily",
            quadrant: "q1",
            enabled: true,
            createdAt: new Date(),
        },
        {
            id: "r2",
            title: "Team meeting",
            frequency: "weekly",
            daysOfWeek: [1],
            quadrant: "q1",
            enabled: true,
            createdAt: new Date(),
        },
        {
            id: "r3",
            title: "Weekly review",
            frequency: "weekly",
            daysOfWeek: [5],
            quadrant: "q2",
            enabled: true,
            createdAt: new Date(),
        },
    ]);

    let currentTab = $state<"matrix" | "routine">("matrix");

    function handleToggleTask(id: string) {
        const task = tasks.find((t) => t.id === id);
        if (task) {
            task.completed = !task.completed;
        }
    }

    function handleDeleteTask(id: string) {
        tasks = tasks.filter((t) => t.id !== id);
    }

    function handleToggleRoutine(id: string) {
        const routine = routines.find((r) => r.id === id);
        if (routine) {
            routine.enabled = !routine.enabled;
        }
    }

    function handleDeleteRoutine(id: string) {
        routines = routines.filter((r) => r.id !== id);
    }

    function handleEditRoutine(routine: Routine) {
        // TODO: Open edit modal
        console.log("Edit routine:", routine);
    }

    function handleAddRoutine() {
        // TODO: Open add modal
        console.log("Add routine");
    }

    function handleMoveTask(
        taskId: string,
        toQuadrant: "q1" | "q2" | "q3" | "q4",
    ) {
        const task = tasks.find((t) => t.id === taskId);
        if (task && task.quadrant !== toQuadrant) {
            task.quadrant = toQuadrant;
            // Trigger reactivity
            tasks = [...tasks];
        }
    }

    function handleUpdateTask(id: string, title: string) {
        const task = tasks.find((t) => t.id === id);
        if (task) {
            task.title = title;
        }
    }

    function handleAddTask(title: string, quadrant: "q1" | "q2" | "q3" | "q4") {
        const newTask: Task = {
            id: Date.now().toString(),
            title,
            completed: false,
            createdAt: new Date(),
            dueDate: new Date(),
            quadrant,
            rolledOver: false,
            rolloverCount: 0,
        };
        tasks = [...tasks, newTask];
    }
</script>

<div class="flex flex-col h-[calc(100vh-5rem)] md:h-[calc(100vh-3.5rem)]">
    <!-- Header (mobile only) -->
    <div class="px-4 pt-4 pb-2 shrink-0 md:hidden">
        <h1 class="text-3xl font-bold mb-2">🎯 GOAL</h1>
    </div>

    <!-- Tabs -->
    <div
        class="flex gap-2 px-4 mb-2 border-b border-gray-200 dark:border-gray-700 shrink-0"
    >
        <button
            onclick={() => (currentTab = "matrix")}
            class="px-4 py-2 font-medium border-b-2 transition-colors"
            class:border-indigo-500={currentTab === "matrix"}
            class:text-indigo-600={currentTab === "matrix"}
            class:border-transparent={currentTab !== "matrix"}
            class:text-gray-500={currentTab !== "matrix"}
        >
            Matrix
        </button>
        <button
            onclick={() => (currentTab = "routine")}
            class="px-4 py-2 font-medium border-b-2 transition-colors"
            class:border-indigo-500={currentTab === "routine"}
            class:text-indigo-600={currentTab === "routine"}
            class:border-transparent={currentTab !== "routine"}
            class:text-gray-500={currentTab !== "routine"}
        >
            Routine
        </button>
    </div>

    <!-- Tab Content -->
    <div class="flex-1 overflow-hidden">
        {#if currentTab === "matrix"}
            <KanbanBoard
                {tasks}
                onToggle={handleToggleTask}
                onDelete={handleDeleteTask}
                onUpdate={handleUpdateTask}
                onAdd={handleAddTask}
                onMoveTask={handleMoveTask}
            />
        {:else}
            <div class="p-4 overflow-y-auto h-full">
                <RoutineList
                    {routines}
                    onAddClick={handleAddRoutine}
                    onToggle={handleToggleRoutine}
                    onEdit={handleEditRoutine}
                    onDelete={handleDeleteRoutine}
                />
            </div>
        {/if}
    </div>
</div>
