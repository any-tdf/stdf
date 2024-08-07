<script>
	export let open = false;

	let isClick = false;

	const toggleFun = () => {
		isClick = true;
		setTimeout(() => {
			isClick = false;
		}, 150);
		open = !open;
	};
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="w-12 h-6 rounded-full relative ring-1 ring-gray-400 dark:ring-gray-300 cursor-pointer" on:click={toggleFun}>
	<div
		class="absolute {open
			? 'left-[26px] bg-primary dark:bg-dark'
			: 'left-0.5 bg-gray-300 dark:bg-gray-600'} top-0.5 w-5 h-5 transition-all duration-300 rounded-full"
		style="transform:scaleX({isClick ? '1.3' : '1'});})"
	></div>
</div>
