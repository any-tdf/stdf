<script>
	import { getContext } from 'svelte';
	import Icon from '../icon/Icon.svelte';

	/** @typedef {import('../../index.d').Checkbox} CheckboxProps */
	/** @type {CheckboxProps} */
	let { name = '', checkeds = [], outControl = false, textPosition = 'r', icon = 'default', iconChecked = 'default', children } = $props();

	// 父组件传过来的选定值
	// Selected value passed from parent component
	const STDF_checkboxCheckedsStore = getContext('STDF_checkboxCheckedsContext');

	// 设定当前选定值
	// Set current selected value
	STDF_checkboxCheckedsStore.set(checkeds);

	// 当前选定值
	// Current selected value
	let currentChecked = $derived(outControl ? checkeds.includes(name) : $STDF_checkboxCheckedsStore.includes(name));

	// 父组件传过来的排列方式
	// Layout type passed from parent component

	const STDF_checkboxLayoutStore = getContext('STDF_checkboxLayoutContext');

	// 点击选项事件
	// Click option event
	const clickRadioFun = () => {
		outControl && STDF_checkboxCheckedsStore.set([...checkeds]);
		if ($STDF_checkboxCheckedsStore.includes(name)) {
			const currentCheckeds = $STDF_checkboxCheckedsStore;
			currentCheckeds.splice(
				currentCheckeds.findIndex(item => item === name),
				1,
			);
			STDF_checkboxCheckedsStore.set(currentCheckeds);
		} else {
			STDF_checkboxCheckedsStore.update(olds => [...olds, name]);
		}
	};
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class={`${$STDF_checkboxLayoutStore === 'inline' ? 'inline-block' : 'flex'} grow active:opacity-80 ${
		textPosition === 'l' && $STDF_checkboxLayoutStore != 'v' ? 'justify-between' : ''
	} ${
		textPosition === 'b' || textPosition === 't'
			? 'flex-col items-center'
			: $STDF_checkboxLayoutStore === 'h'
				? 'justify-center'
				: 'items-center'
	}`}
	onclick={clickRadioFun}
>
	{#if textPosition === 'l' || textPosition === 't'}
		<div class={`${textPosition === 'l' && icon !== 'none' ? 'mr-0.5' : ''} ${$STDF_checkboxLayoutStore === 'v' ? 'grow' : ''}`}>
			{@render children?.()}
		</div>
	{/if}
	<div class:hidden={!currentChecked}>
		{#if iconChecked === 'none'}
			<!-- none -->
		{:else if iconChecked === 'default'}
			<Icon name="ri-checkbox-fill" theme top={textPosition === 't' || textPosition === 'b' ? 0 : -1} />
		{:else}
			<Icon {...iconChecked} theme />
		{/if}
	</div>
	<div class:hidden={currentChecked}>
		{#if icon === 'none'}
			<!-- none -->
		{:else if icon === 'default'}
			<Icon name="ri-checkbox-line" alpha={0.1} top={textPosition === 't' || textPosition === 'b' ? 0 : -1} />
		{:else}
			<Icon alpha={0.1} {...icon} />
		{/if}
	</div>
	{#if textPosition === 'r' || textPosition === 'b'}
		<div class={`${textPosition === 'r' && icon !== 'none' ? 'ml-0.5' : ''} ${$STDF_checkboxLayoutStore === 'v' ? 'grow' : ''}`}>
			{@render children?.()}
		</div>
	{/if}
</div>
