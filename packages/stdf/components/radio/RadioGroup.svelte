<script>
	import { setContext, createEventDispatcher } from 'svelte';
	import { writable } from 'svelte/store';

	/**
	 * 值，对应 Radio Props 的 name
	 * value, corresponding to Radio Props name
	 * @type {string}
	 * @default ''
	 */
	export let value = '';

	/**
	 * 是否水平排列
	 * horizontal
	 * @type {boolean}
	 * @default false
	 */
	export let horizontal = false;

	const STDF_radioValueStore = writable(value);
	const STDF_radioHorizontalStore = writable(horizontal);
	setContext('STDF_radioValueContext', STDF_radioValueStore);
	setContext('STDF_radioHorizontalContext', STDF_radioHorizontalStore);

	const dispatch = createEventDispatcher();
	STDF_radioValueStore.subscribe(v => {
		value = v;
		dispatch('change', value);
	});
</script>

<div class={`flex ${horizontal ? 'justify-between' : 'flex-col space-y-2'}`}><slot /></div>
