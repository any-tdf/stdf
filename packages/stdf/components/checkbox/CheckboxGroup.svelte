<script>
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';

	/** @typedef {import('../../index.d').CheckboxGroup} CheckboxGroupProps */
	/** @type {CheckboxGroupProps} */
	let { layout = 'v', children, onchange } = $props();

	// 选中的值
	// checked value
	const STDF_checkboxCheckedsStore = writable([]);

	// 排列方式
	// layout type
	const STDF_checkboxLayoutStore = writable(layout);

	// 传递给子组件的选定值
	// checked value passed to child component
	setContext('STDF_checkboxCheckedsContext', STDF_checkboxCheckedsStore);
	setContext('STDF_checkboxLayoutContext', STDF_checkboxLayoutStore);

	// 监听排列方式变化
	// Listen for layout type changes
	STDF_checkboxCheckedsStore.subscribe(v => {
		onchange && onchange(v);
	});
</script>

<div class={`${layout === 'inline' ? '' : `flex ${layout === 'h' ? 'justify-between' : 'flex-col space-y-2'}`}`}>
	{@render children?.()}
</div>
