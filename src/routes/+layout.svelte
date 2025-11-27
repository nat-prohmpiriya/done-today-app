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

<div class="min-h-screen bg-white dark:bg-dark-bg">
	<main class="pb-24 max-w-md mx-auto">
		{@render children()}
	</main>
	<BottomNav />
</div>
