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
    class="fixed bottom-0 left-0 right-0 bg-white dark:bg-dark-surface border-t border-gray-200 dark:border-gray-700 shadow-lg"
>
    <div
        class="flex justify-around items-center h-20 max-w-md mx-auto px-4 w-full"
    >
        {#each navItems as item}
            <a
                href={item.path}
                class="flex flex-col items-center justify-center gap-1 w-16 h-16 rounded-lg transition-all duration-200"
                class:bg-light-surface={isActive(item.path)}
                class:dark:bg-gray-700={isActive(item.path)}
            >
                <span class="text-2xl">{item.icon}</span>
                <span
                    class="text-xs font-medium"
                    class:text-indigo-600={isActive(item.path)}
                    class:dark:text-indigo-400={isActive(item.path)}
                >
                    {item.label}
                </span>
            </a>
        {/each}
    </div>
</nav>

<style>
    nav {
        width: 100%;
    }
</style>
