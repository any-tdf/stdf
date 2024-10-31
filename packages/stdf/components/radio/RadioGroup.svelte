<script>
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';

	/** @typedef {import('../../index.d').RadioGroup} RadioGroup */
	/** @type {RadioGroup} */
	let { value = $bindable(''), horizontal = false, children, onchange } = $props();

	const STDF_radioValueStore = writable(value);
	const STDF_radioHorizontalStore = writable(horizontal);
	setContext('STDF_radioValueContext', STDF_radioValueStore);
	setContext('STDF_radioHorizontalContext', STDF_radioHorizontalStore);

	STDF_radioValueStore.subscribe(v => {
		value = v;
		onchange && onchange(value);
	});
</script>

<div class={`flex ${horizontal ? 'justify-between' : 'flex-col space-y-2'}`}>{@render children?.()}</div>
