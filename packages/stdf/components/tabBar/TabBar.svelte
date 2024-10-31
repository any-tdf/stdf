<script>
	import Icon from '../icon/Icon.svelte';

	/** @typedef {import('../../index.d').TabBar} TabBarProps */
	/** @type {TabBarProps} */
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
		onchange,
	} = $props();

	const clickFun = i => {
		active = i;
		onchange && onchange(active);
	};
	let tabW = $state(0);
	let activeW = $derived(tabW / labels.length / lineW);
	let activeLeft = $derived(active * (tabW / labels.length) + tabW / labels.length / 2 - activeW / 2);
</script>

<div bind:clientWidth={tabW} class="bg-white dark:bg-gray-800 relative {injClass}" style="padding-bottom: env(safe-area-inset-bottom);">
	{#if line}
		<div
			class="mx-auto rounded-full h-[2px] absolute transition-all bottom-px bg-primary dark:bg-dark {activeInjClass}"
			style="width: {lineW < 1 ? tabW / labels.length : activeW < 2 ? 2 : activeW}px;left: {lineW < 1
				? active * (tabW / labels.length)
				: activeLeft}px;"
		></div>
	{/if}
	<div class="flex justify-between">
		{#each labels as label, i}
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div
				onclick={() => clickFun(i)}
				class={`flex-1 flex flex-col justify-center text-center py-1 active:opacity-80 cursor-pointer ${
					i === active ? 'text-primary dark:text-dark' : 'text-black/80 dark:text-white/90'
				} ${love ? 'text-lg' : 'text-sm'} ${tabInjClass} ${i === active && activeTabInjClass}`}
			>
				{#if label.icon}
					<div class:py-2={!label.text}>
						<i class:hidden={i !== active}>
							<Icon
								{...label.icon}
								name={label.activeIcon ? label.activeIcon.name : label.icon.name}
								size={i === active
									? (label.activeIcon && label.activeIcon.size !== 'full' && label.activeIcon.size * (love ? 1.2 : 1)) ||
										(label.icon.size !== 'full' && label.icon.size * (love ? 1.2 : 1))
									: label.icon.size !== 'full' && label.icon.size * (love ? 1.2 : 1)}
								top={0}
							/>
						</i>
						<i class:hidden={i === active}>
							<Icon
								{...label.icon}
								name={label.icon.name}
								size={i === active
									? (label.activeIcon && label.activeIcon.size !== 'full' && label.activeIcon.size * (love ? 1.2 : 1)) ||
										(label.icon.size !== 'full' && label.icon.size * (love ? 1.2 : 1))
									: label.icon.size !== 'full' && label.icon.size * (love ? 1.2 : 1)}
								top={0}
							/>
						</i>
					</div>
				{/if}
				{#if label.text}
					<div class={`${label.icon ? 'mt-[2px]' : 'py-1 text-lg'} ${i === active && !label.icon ? ' font-bold' : ''}`}>
						{label.text}
					</div>
				{/if}
			</div>
		{/each}
	</div>
</div>
