<script lang="ts">
	import "../app.css";
	import BottomNav from "$lib/components/BottomNav.svelte";
	import favicon from "$lib/assets/favicon.svg";

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>DoneToday</title>
</svelte:head>

<div class="min-h-screen bg-white dark:bg-dark-bg flex flex-col">
	<main class="flex-1 pb-20 md:pb-0 max-w-md md:max-w-none mx-auto w-full">
		{@render children()}
	</main>
	<BottomNav />
</div>
