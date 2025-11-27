<script lang="ts">
    import { page } from "$app/stores";

    const navItems = [
        { path: "/", icon: "⚡", label: "Do" },
        { path: "/goal", icon: "🎯", label: "Goal" },
        { path: "/done", icon: "✅", label: "Done" },
        { path: "/account", icon: "👤", label: "Account" },
    ];

    function isActive(path: string) {
        return $page.url.pathname === path;
    }
</script>

<nav
    class="hidden md:block fixed top-0 left-0 right-0 bg-white dark:bg-dark-surface border-b border-gray-200 dark:border-gray-700 shadow-sm z-50"
>
    <div class="flex items-center justify-between h-14 px-6 max-w-7xl mx-auto">
        <!-- Logo -->
        <div class="flex items-center gap-2">
            <span class="text-2xl">✨</span>
            <span class="text-xl font-bold text-indigo-600 dark:text-indigo-400"
                >DoneToday</span
            >
        </div>

        <!-- Nav Items -->
        <div class="flex items-center gap-1">
            {#each navItems as item}
                <a
                    href={item.path}
                    class="flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-700 {isActive(
                        item.path,
                    )
                        ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400'
                        : ''}"
                >
                    <span class="text-lg">{item.icon}</span>
                    <span class="text-sm font-medium">{item.label}</span>
                </a>
            {/each}
        </div>

        <!-- Right side (optional: user avatar, settings) -->
        <div class="w-32"></div>
    </div>
</nav>
