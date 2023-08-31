<script>
	import { setContext, createEventDispatcher } from 'svelte';
	import { writable } from 'svelte/store';

	export let value = ''; //值
	export let horizontal = false; //是否水平排列

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
