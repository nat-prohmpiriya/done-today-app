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

    // Placeholder data for sidebar
    let streakDays = $state(5);
    let upcomingRoutines = $state([
        { id: "1", title: "Exercise", frequency: "Daily" },
        { id: "2", title: "Weekly review", frequency: "Friday" },
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
    let totalTasks = $derived(tasks.length);
    let completedCount = $derived(completedTasks.length);
    let progressPercent = $derived(
        totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0
    );

    function getMotivationalMessage(percent: number, remaining: number): string {
        if (percent === 100) return "All done! Great job today!";
        if (percent >= 75) return "Almost there! Keep pushing!";
        if (percent >= 50) return "Halfway done! You're doing great!";
        if (percent > 0) return `Keep going! ${remaining} more to go`;
        return "Let's get started!";
    }
</script>

<div class="pt-4 px-4">
    <!-- Header -->
    <div class="mb-6 flex items-center gap-4">
        <h1 class="text-3xl font-bold">⚡ DO</h1>
        <p class="text-md text-gray-600 dark:text-gray-400">{getTodayDate()}</p>
    </div>

    <!-- Main Content: 2-column on desktop -->
    <div class="flex flex-col lg:flex-row gap-6">
        <!-- Left Column: Tasks -->
        <div class="flex-1 space-y-4">
            <!-- Progress Card (Mobile only) -->
            <div class="card lg:hidden">
                <h3 class="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-3">
                    Today's Progress
                </h3>
                <div class="flex items-center gap-3 mb-2">
                    <div class="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                            class="h-full bg-indigo-500 rounded-full transition-all duration-500"
                            style="width: {progressPercent}%"
                        ></div>
                    </div>
                    <span class="text-sm font-medium text-gray-600 dark:text-gray-300">
                        {progressPercent}%
                    </span>
                </div>
                <p class="text-xs text-gray-500 dark:text-gray-400">
                    {completedCount} of {totalTasks} completed
                </p>
                <p class="text-sm text-indigo-600 dark:text-indigo-400 mt-2 font-medium">
                    {getMotivationalMessage(progressPercent, totalTasks - completedCount)}
                </p>
            </div>

            <!-- Tasks Card -->
            <div class="card">
                <div class="flex items-center justify-between mb-3">
                    <h3 class="text-sm font-semibold text-gray-600 dark:text-gray-300">
                        Tasks
                    </h3>
                    <span class="text-xs text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full">
                        {incompleteTasks.length}
                    </span>
                </div>
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

            <!-- Completed Tasks Card -->
            {#if completedTasks.length > 0}
                <div class="card">
                    <div class="flex items-center justify-between mb-3">
                        <h3 class="text-sm font-semibold text-gray-600 dark:text-gray-300">
                            Completed
                        </h3>
                        <span class="text-xs text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full">
                            {completedTasks.length}
                        </span>
                    </div>
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

        <!-- Right Column: Sidebar (Desktop only) -->
        <div class="hidden lg:block w-72 space-y-4">
            <!-- Stats Card -->
            <div class="card">
                <h3 class="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-4">
                    Today's Stats
                </h3>

                <!-- Progress -->
                <div class="mb-4">
                    <div class="flex items-center justify-between mb-2">
                        <span class="text-xs text-gray-500 dark:text-gray-400">Progress</span>
                        <span class="text-sm font-medium text-gray-700 dark:text-gray-200">
                            {completedCount}/{totalTasks}
                        </span>
                    </div>
                    <div class="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                            class="h-full bg-indigo-500 rounded-full transition-all duration-500"
                            style="width: {progressPercent}%"
                        ></div>
                    </div>
                    <p class="text-sm text-indigo-600 dark:text-indigo-400 mt-2 font-medium">
                        {getMotivationalMessage(progressPercent, totalTasks - completedCount)}
                    </p>
                </div>

                <!-- Divider -->
                <hr class="border-gray-200 dark:border-gray-700 my-4" />

                <!-- Streak -->
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                        <span class="text-lg">🔥</span>
                    </div>
                    <div>
                        <p class="text-sm font-medium text-gray-700 dark:text-gray-200">
                            {streakDays} day streak
                        </p>
                        <p class="text-xs text-gray-500 dark:text-gray-400">Keep it up!</p>
                    </div>
                </div>
            </div>

            <!-- Upcoming Routines Card -->
            <div class="card">
                <h3 class="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-3">
                    Coming Up
                </h3>
                <div class="space-y-2">
                    {#each upcomingRoutines as routine (routine.id)}
                        <div class="flex items-center gap-3 text-sm">
                            <span class="text-gray-400">•</span>
                            <span class="flex-1 text-gray-700 dark:text-gray-300">{routine.title}</span>
                            <span class="text-xs text-gray-400 dark:text-gray-500">{routine.frequency}</span>
                        </div>
                    {/each}
                </div>
                {#if upcomingRoutines.length === 0}
                    <p class="text-sm text-gray-400 dark:text-gray-500">No routines scheduled</p>
                {/if}
            </div>
        </div>
    </div>
</div>
