<script lang="ts">
	import Icon from '../icon/Icon.svelte';
	import type { TabBarProps } from '../../types/index.js';

	let {
		labels = [],
		active = $bindable(0),
		line = false,
		lineW = 4,
		love = false,
		injClass = '',
		tabInjClass = '',
		activeTabInjClass = '',
		activeInjClass = '',
		onchange
	}: TabBarProps = $props();

	const clickFun = (i: number) => {
		active = i;
		onchange?.(active);
	};
	let tabW = $state(0);
	let activeW = $derived(tabW / labels.length / lineW);
	let activeLeft = $derived(active * (tabW / labels.length) + tabW / labels.length / 2 - activeW / 2);
</script>

<div bind:clientWidth={tabW} class="relative bg-white dark:bg-gray-800 {injClass}" style="padding-bottom: env(safe-area-inset-bottom);">
	{#if line}
		<div
			class="bg-primary dark:bg-dark absolute bottom-px mx-auto h-[2px] rounded-full transition-all {activeInjClass}"
			style="width: {lineW < 1 ? tabW / labels.length : activeW < 2 ? 2 : activeW}px;left: {lineW < 1
				? active * (tabW / labels.length)
				: activeLeft}px;"
		></div>
	{/if}
	<div class="flex justify-between">
		{#each labels as label, i}
			<button
				onclick={() => clickFun(i)}
				class="flex flex-1 flex-col items-center justify-center py-1 text-center active:opacity-80 {i === active
					? 'text-primary dark:text-dark'
					: 'text-black/80 dark:text-white/90'} {love ? 'text-lg' : 'text-sm'} {tabInjClass} {i === active && activeTabInjClass}"
			>
				{#if label.icon}
					<div class:py-2={!label.text}>
						<i class:hidden={i !== active}>
							<Icon
								{...label.icon}
								name={label.activeIcon ? label.activeIcon.name : label.icon.name}
								size={i === active
									? label.activeIcon?.size !== 'full' && label.activeIcon?.size
										? label.activeIcon.size * (love ? 1.2 : 1)
										: label.icon.size !== 'full' && label.icon.size
											? label.icon.size * (love ? 1.2 : 1)
											: undefined
									: label.icon.size !== 'full' && label.icon.size
										? label.icon.size * (love ? 1.2 : 1)
										: undefined}
								top={0}
							/>
						</i>
						<i class:hidden={i === active}>
							<Icon
								{...label.icon}
								name={label.icon.name}
								size={i === active
									? label.activeIcon?.size !== 'full' && label.activeIcon?.size
										? label.activeIcon.size * (love ? 1.2 : 1)
										: label.icon.size !== 'full' && label.icon.size
											? label.icon.size * (love ? 1.2 : 1)
											: undefined
									: label.icon.size !== 'full' && label.icon.size
										? label.icon.size * (love ? 1.2 : 1)
										: undefined}
								top={0}
							/>
						</i>
					</div>
				{/if}
				{#if label.text}
					<div class="{label.icon ? 'mt-[2px]' : 'py-1 text-lg'} {i === active && !label.icon ? ' font-bold' : ''}">
						{label.text}
					</div>
				{/if}
			</button>
		{/each}
	</div>
</div>
