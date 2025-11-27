<script lang="ts">
    import type { UserSettings } from "$lib/types";

    let userSettings = $state<UserSettings>({
        userId: "user@example.com",
        theme: "system",
        rolloverTime: "00:00",
        notifications: true,
        language: "en",
    });

    let isLoggedIn = $state(false);

    function handleDarkModeToggle() {
        userSettings.theme = userSettings.theme === "dark" ? "light" : "dark";
    }

    function handleNotificationsToggle() {
        userSettings.notifications = !userSettings.notifications;
    }

    function handleExportData() {
        // TODO: Implement export
        console.log("Export data");
    }

    function handleImportData() {
        // TODO: Implement import
        console.log("Import data");
    }

    function handleDeleteAllData() {
        // TODO: Implement delete
        if (confirm("Are you sure? This cannot be undone.")) {
            console.log("Delete all data");
        }
    }

    function handleLogin() {
        // TODO: Implement Firebase login
        console.log("Login");
    }

    function handleLogout() {
        // TODO: Implement logout
        isLoggedIn = false;
        console.log("Logout");
    }
</script>

<div class="pt-4 pb-8">
    <!-- Header (mobile only) -->
    <div class="px-4 mb-4 md:hidden">
        <h1 class="text-3xl font-bold mb-2">👤 ACCOUNT</h1>
    </div>

    <!-- User Section -->
    {#if isLoggedIn}
        <div class="card mx-4 mb-6">
            <div class="flex items-center gap-3 mb-4">
                <div
                    class="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold"
                >
                    {userSettings.userId.charAt(0).toUpperCase()}
                </div>
                <div class="flex-1">
                    <p class="font-medium text-sm">{userSettings.userId}</p>
                    <p class="text-xs text-gray-500">Last synced: now</p>
                </div>
            </div>
            <button
                onclick={handleLogout}
                class="w-full btn-secondary py-2 text-sm"
            >
                Sign Out
            </button>
        </div>
    {:else}
        <div class="card mx-4 mb-6 text-center">
            <p class="text-sm text-gray-500 mb-4">
                Sign in to sync across devices
            </p>
            <button
                onclick={handleLogin}
                class="w-full btn-primary py-2 text-sm"
            >
                Sign in with Google
            </button>
        </div>
    {/if}

    <!-- Settings Section -->
    <div class="px-4 mb-6">
        <h2 class="font-semibold text-sm mb-3 uppercase text-gray-600">
            Settings
        </h2>
        <div class="space-y-3">
            <!-- Dark Mode -->
            <div
                class="flex items-center justify-between p-3 bg-light-surface dark:bg-dark-surface rounded-lg"
            >
                <label class="flex items-center gap-2 cursor-pointer flex-1">
                    <span class="text-lg">🌙</span>
                    <span class="text-sm font-medium">Dark Mode</span>
                </label>
                <input
                    type="checkbox"
                    checked={userSettings.theme === "dark"}
                    onchange={handleDarkModeToggle}
                    class="w-5 h-5 cursor-pointer"
                />
            </div>

            <!-- Notifications -->
            <div
                class="flex items-center justify-between p-3 bg-light-surface dark:bg-dark-surface rounded-lg"
            >
                <label class="flex items-center gap-2 cursor-pointer flex-1">
                    <span class="text-lg">🔔</span>
                    <span class="text-sm font-medium">Notifications</span>
                </label>
                <input
                    type="checkbox"
                    checked={userSettings.notifications}
                    onchange={handleNotificationsToggle}
                    class="w-5 h-5 cursor-pointer"
                />
            </div>

            <!-- Rollover Time -->
            <div
                class="flex items-center justify-between p-3 bg-light-surface dark:bg-dark-surface rounded-lg"
            >
                <label class="flex items-center gap-2 flex-1">
                    <span class="text-lg">⏰</span>
                    <span class="text-sm font-medium">Rollover Time</span>
                </label>
                <input
                    type="time"
                    bind:value={userSettings.rolloverTime}
                    class="input-field w-24"
                />
            </div>

            <!-- Language -->
            <div
                class="flex items-center justify-between p-3 bg-light-surface dark:bg-dark-surface rounded-lg"
            >
                <label class="flex items-center gap-2 flex-1">
                    <span class="text-lg">🌐</span>
                    <span class="text-sm font-medium">Language</span>
                </label>
                <select
                    bind:value={userSettings.language}
                    class="input-field w-24"
                >
                    <option value="en">English</option>
                    <option value="th">ไทย</option>
                </select>
            </div>
        </div>
    </div>

    <!-- Data Section -->
    <div class="px-4 mb-6">
        <h2 class="font-semibold text-sm mb-3 uppercase text-gray-600">Data</h2>
        <div class="space-y-2">
            <button
                onclick={handleExportData}
                class="w-full flex items-center gap-2 p-3 bg-light-surface dark:bg-dark-surface rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors text-sm"
            >
                <span>📤</span>
                <span>Export Data</span>
            </button>
            <button
                onclick={handleImportData}
                class="w-full flex items-center gap-2 p-3 bg-light-surface dark:bg-dark-surface rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors text-sm"
            >
                <span>📥</span>
                <span>Import Data</span>
            </button>
            <button
                onclick={handleDeleteAllData}
                class="w-full flex items-center gap-2 p-3 bg-red-100 dark:bg-red-950 rounded-lg hover:bg-red-200 dark:hover:bg-red-900 transition-colors text-sm text-red-600 dark:text-red-400"
            >
                <span>🗑️</span>
                <span>Delete All Data</span>
            </button>
        </div>
    </div>

    <!-- About Section -->
    <div class="px-4">
        <h2 class="font-semibold text-sm mb-3 uppercase text-gray-600">
            About
        </h2>
        <div class="space-y-2">
            <button
                class="w-full flex items-center justify-between p-3 bg-light-surface dark:bg-dark-surface rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors text-sm text-left"
            >
                <span class="flex items-center gap-2">
                    <span>📖</span>
                    <span>How to Use</span>
                </span>
                <span class="text-gray-400">→</span>
            </button>
            <button
                class="w-full flex items-center justify-between p-3 bg-light-surface dark:bg-dark-surface rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors text-sm text-left"
            >
                <span class="flex items-center gap-2">
                    <span>📝</span>
                    <span>Send Feedback</span>
                </span>
                <span class="text-gray-400">→</span>
            </button>
            <div
                class="flex items-center justify-between p-3 bg-light-surface dark:bg-dark-surface rounded-lg text-sm"
            >
                <span class="flex items-center gap-2">
                    <span>ℹ️</span>
                    <span>Version</span>
                </span>
                <span class="text-gray-500">1.0.0</span>
            </div>
        </div>
    </div>
</div>
