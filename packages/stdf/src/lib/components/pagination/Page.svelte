<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		active?: boolean;
		radius?: 'sm' | 'md' | 'lg' | 'xl' | 'full' | 'none';
		type?: 'border' | 'block' | 'bold';
		children?: Snippet;
		onclick?: () => void;
	};
	let { active = false, radius = 'md', type = 'border', children, onclick }: Props = $props();

	const typeClass = {
		border: 'border-primary dark:border-dark text-primary dark:text-dark',
		block: 'bg-primary text-white dark:bg-dark dark:text-black',
		bold: 'font-bold text-primary dark:text-dark border-transparent'
	};

	const radiusClass = {
		sm: 'rounded-sm',
		md: 'rounded-md',
		lg: 'rounded-lg',
		xl: 'rounded-xl',
		full: 'rounded-full',
		none: 'rounded-none'
	};
</script>

<button
	{onclick}
	class="flex-1 border py-2 {active
		? typeClass[type] || typeClass.border
		: 'border-transparent' + (type === 'bold' ? ' opacity-50' : '')} {radiusClass[radius] || radiusClass.md}"
>
	{@render children?.()}
</button>
