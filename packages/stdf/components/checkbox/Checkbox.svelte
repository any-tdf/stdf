<script>
	import { getContext } from 'svelte';
	import Icon from '../icon/Icon.svelte';

	/**
	 * 标识符
	 * Identifier
	 * @type {string}
	 * @default ''
	 */
	export let name = '';

	/**
	 * Checkbox 所在的 CheckboxGroup 内所有选定项标识符组成的数组
	 * Array of all selected identifiers in the CheckboxGroup
	 * @type {string[]}
	 * @default []
	 */
	export let checkeds = [];

	/**
	 * 选中状态是否由外部控制
	 * Whether the selected state is controlled by the outside
	 * @type {boolean}
	 * @default false
	 */
	export let outControl = false;

	/**
	 * 选项内容区域位置
	 * Option content area position
	 * @type {'l' | 'r' | 't' | 'b'}
	 * @default 'r'
	 */
	export let textPosition = 'r';

	/**
	 * 未选中选项图标区域内容
	 * Unselected option icon area content
	 * @type {'none' | 'default' | Object}
	 * @default 'default'
	 */
	export let icon = 'default';

	/**
	 * 选中选项图标区域内容
	 * Selected option icon area content
	 * @type {'none' | 'default' | Object}
	 * @default 'default'
	 */
	export let iconChecked = 'default';

	// 父组件传过来的选定值
	// Selected value passed from parent component
	const STDF_checkboxCheckedsStore = getContext('STDF_checkboxCheckedsContext');

	// 设定当前选定值
	// Set current selected value
	STDF_checkboxCheckedsStore.set(checkeds);

	// 当前选定值
	// Current selected value
	$: currentChecked = outControl ? checkeds.includes(name) : $STDF_checkboxCheckedsStore.includes(name);

	/**
	 * 父组件传过来的排列方式
	 * Layout type passed from parent component
	 */
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

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
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
	on:click={clickRadioFun}
>
	{#if textPosition === 'l' || textPosition === 't'}
		<div class={`${textPosition === 'l' && icon !== 'none' ? 'mr-0.5' : ''} ${$STDF_checkboxLayoutStore === 'v' ? 'grow' : ''}`}>
			<slot />
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
			<Icon {...icon} alpha={0.1} />
		{/if}
	</div>
	{#if textPosition === 'r' || textPosition === 'b'}
		<div class={`${textPosition === 'r' && icon !== 'none' ? 'ml-0.5' : ''} ${$STDF_checkboxLayoutStore === 'v' ? 'grow' : ''}`}>
			<slot />
		</div>
	{/if}
</div>
