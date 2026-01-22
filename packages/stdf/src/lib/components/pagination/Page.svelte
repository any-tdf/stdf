<script lang="ts">
	import type { Snippet } from 'svelte';
	import { radiusObj } from '../utils/index.js';

	type Props = {
		active?: boolean;
		radius?: string;
		type?: 'border' | 'block' | 'bold';
		children?: Snippet;
		onclick?: () => void;
	};
	let { active = false, radius = '', type = 'border', children, onclick }: Props = $props();

	const typeClass = {
		border: 'border-primary dark:border-dark text-primary dark:text-dark',
		block: 'bg-primary text-text-on-primary dark:bg-dark dark:text-text-on-dark border-transparent',
		bold: 'font-bold text-primary dark:text-dark border-transparent'
	};
</script>

<button
	{onclick}
	class="flex-1 border py-2 {active
		? typeClass[type] || typeClass.border
		: 'border-transparent' + (type === 'bold' ? ' opacity-50' : '')} {radius ? radiusObj[radius as keyof typeof radiusObj] : 'rounded-(--radius-form)'}"
>
	{@render children?.()}
</button>
