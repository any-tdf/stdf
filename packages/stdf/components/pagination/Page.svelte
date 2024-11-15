<script>
	/**
	 * @typedef {Object} Props
	 * @property {boolean} [active]
	 * @property {string} [radius]
	 * @property {string} [type]
	 * @property {import('svelte').Snippet} [children]
	 * @property {() => void} [onclick]
	 */
	/** @type {Props} */
	let { active = false, radius = 'md', type = 'border', children, onclick } = $props();

	const typeClass = {
		border: 'border-primary dark:border-dark text-primary dark:text-dark',
		block: 'bg-primary text-white dark:bg-dark dark:text-black',
		bold: 'font-bold text-primary dark:text-dark border-transparent',
	};

	const radiusClass = { base: 'rounded', md: 'rounded-md', lg: 'rounded-lg', xl: 'rounded-xl', full: 'rounded-full', none: 'rounded-none' };
</script>

<button
	{onclick}
	class="flex-1 py-2 border {active
		? typeClass[type] || typeClass.border
		: 'border-transparent' + (type === 'bold' ? ' opacity-50' : '')} {radiusClass[radius] || radiusClass.base}"
>
	{@render children?.()}
</button>
