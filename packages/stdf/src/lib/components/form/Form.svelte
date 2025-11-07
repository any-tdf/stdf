<script lang="ts">
	import { getContext } from 'svelte';
	import Input from '../input/Input.svelte';
	import TimePicker from '../timePicker/TimePicker.svelte';
	import ActionSheet from '../actionSheet/ActionSheet.svelte';
	import Calendar from '../calendar/Calendar.svelte';
	import NumKeyboard from '../numKeyboard/NumKeyboard.svelte';
	import Picker from '../picker/Picker.svelte';
	import Checkbox from '../checkbox/Checkbox.svelte';
	import Radio from '../radio/Radio.svelte';
	import Slider from '../slider/Slider.svelte';
	import Switch from '../switch/Switch.svelte';
	import Stepper from '../stepper/Stepper.svelte';
	import Button from '../button/Button.svelte';
	import { zh_CN, type LangProps } from '../../lang/index.js';
	import type {
		FormProps,
		FormValueProps,
		FormTimePickerValue,
		FormCalendarValue,
		FormActionSheetValue,
		FormPickerValue,
		FormSliderValue
	} from '../../types/index.js';

	// 当前语言
	// current language
	const currentLang = (getContext('STDF_lang') || zh_CN) as LangProps;
	const formLang: LangProps['form'] = currentLang.form;

	let {
		form,
		onchange,
		submitText = formLang.submit,
		resetText = null,
		onsubmit,
		submitButton,
		resetButton,
		onreset,
		submitChildren,
		resetChildren,
		card = false,
		mx = '4',
		space = '0',
		radius = 'xl',
		px = '2',
		shadow = 'sm'
	}: FormProps = $props();

	let formInner = $state(
		form.map((item) => {
			const baseItem = {
				showPopup: false,
				data: null as unknown,
				// 保存初始值用于重置 / save init value for reset
				initValue: item.initValue,
				...item
			};

			if (item.type === 'slider') {
				const userValueRange = item.slider?.valueRange as [number, number];
				const userValue = item.slider?.value as number;

				return {
					...baseItem,
					value: item.slider?.isRange
						? ({ valueRange: userValueRange || (item.initValue as [number, number]) || [20, 60] } as FormSliderValue)
						: ({ value: userValue || (item.initValue as number) || 40 } as FormSliderValue),
					slider: {
						...item.slider,
						...(item.slider?.isRange
							? {
									startValue: userValueRange?.[0] || (item.initValue as [number, number])?.[0] || 20,
									endValue: userValueRange?.[1] || (item.initValue as [number, number])?.[1] || 60,
									valueRange: userValueRange || (item.initValue as [number, number]) || [20, 60]
								}
							: {
									value: userValue || (item.initValue as number) || 40
								})
					}
				};
			}

			return {
				...baseItem,
				value:
					item.type === 'checkbox'
						? ([] as string[])
						: item.type === 'switch'
							? false
							: item.type === 'stepper'
								? (item.initValue as number) || 0
								: item.type === 'timePicker'
									? ({ timeStr: '', timeObj: undefined } as FormTimePickerValue)
									: item.type === 'actionSheet'
										? ({ action: undefined, index: undefined } as FormActionSheetValue)
										: item.type === 'picker'
											? ({ items: [], indexs: [] } as FormPickerValue)
											: item.type === 'calendar'
												? ({ dates: [] } as FormCalendarValue)
												: (item.initValue as string) || ''
			};
		})
	);
	let model = $state<Record<string, FormValueProps>>({});
	// 统一的 onchange 处理函数 / unified onchange handler
	const handleFormChange = (currentItem: (typeof formInner)[0], currentValue: unknown) => {
		// 更新当前项的数据 / update current item data
		// currentItem.data = currentValue;
		model[currentItem.name] = currentValue as FormValueProps;
		onchange?.(model);
	};
	const submitFunc = () => {
		onsubmit?.(model as Record<string, FormValueProps>);
	};
	const resetFunc = () => {
		// 逐个重置每个表单项，避免完全重新赋值导致的页面滚动 / reset each form item to avoid page scroll caused by full reassignment
		const newModel: Record<string, FormValueProps> = {};
		formInner.forEach((item) => {
			if (item.type === 'slider') {
				const userValueRange = item.slider?.valueRange as [number, number];
				const userValue = item.slider?.value as number;

				item.value = item.slider?.isRange
					? ({ valueRange: userValueRange || (item.initValue as [number, number]) || [20, 60] } as FormSliderValue)
					: ({ value: userValue || (item.initValue as number) || 40 } as FormSliderValue);

				// 同时更新 slider 属性以确保重置生效 / also update slider properties to ensure reset takes effect
				if (item.slider?.isRange) {
					const resetRange = userValueRange || (item.initValue as [number, number]) || [20, 60];
					item.slider = {
						...item.slider,
						startValue: resetRange[0],
						endValue: resetRange[1],
						valueRange: resetRange
					};
				} else {
					const resetValue = userValue || (item.initValue as number) || 40;
					item.slider = {
						...item.slider,
						value: resetValue
					};
				}
			} else if (item.type === 'checkbox') {
				item.value = [] as string[];
			} else if (item.type === 'switch') {
				item.value = false;
			} else if (item.type === 'stepper') {
				item.value = (item.initValue as number) || 0;
			} else if (item.type === 'timePicker') {
				item.value = { timeStr: '', timeObj: undefined } as FormTimePickerValue;
			} else if (item.type === 'actionSheet') {
				item.value = { action: undefined, index: undefined } as FormActionSheetValue;
			} else if (item.type === 'picker') {
				item.value = { items: [], indexs: [] } as FormPickerValue;
			} else if (item.type === 'calendar') {
				item.value = { dates: [] } as FormCalendarValue;
			} else {
				item.value = (item.initValue as string) || '';
			}

			// 同时更新 model / also update model
			newModel[item.name] = item.value as FormValueProps;
			item.showPopup = false;
			item.data = null as unknown;
		});
		// 更新 model 对象 / update model object
		model = newModel;
		onchange?.(model);
		onreset?.();
	};

	// 间距 space / spacing
	const spaceClass = { '0': 'space-y-0', '1': 'space-y-1', '2': 'space-y-2', '4': 'space-y-4', '6': 'space-y-6', '8': 'space-y-8' };
	// 卡片圆角 card radius / card border radius
	const radiusClass = {
		sm: 'rounded-sm',
		md: 'rounded-md',
		lg: 'rounded-lg',
		xl: 'rounded-xl',
		'2xl': 'rounded-2xl',
		'3xl': 'rounded-3xl',
		'4xl': 'rounded-4xl'
	};
	// 水平外边距 mx / horizontal margin
	const mxClass = { '2': 'mx-2', '3': 'mx-3', '4': 'mx-4', '6': 'mx-6', '8': 'mx-8' };
	// 内边距 px / padding
	const pxClass = { '0': 'px-0', '1': 'px-1', '2': 'px-2', '4': 'px-4', '6': 'px-6' };
	// 阴影 shadow / shadow
	const shadowClass = {
		none: 'shadow-none',
		xs: 'shadow-xs dark:shadow-white/10',
		sm: 'shadow-sm dark:shadow-white/10',
		md: 'shadow-md dark:shadow-white/10',
		lg: 'shadow-lg dark:shadow-white/10',
		xl: 'shadow-xl dark:shadow-white/10',
		'2xl': 'shadow-2xl dark:shadow-white/10'
	};
</script>

<div
	class="{spaceClass[space] || 'space-y-0'}{card
		? ` ${radiusClass[radius] || 'rounded-xl'} ${mxClass[mx] || 'mx-4'} ${pxClass[px] || 'px-2'} ${shadowClass[shadow] || shadowClass.sm} mb-2 bg-white py-2 dark:bg-black`
		: ''}"
>
	{#each formInner as item (item.name)}
		{#if item.type === 'input' || !item.type}
			<Input
				title={item.label}
				bind:value={item.value as string}
				clear
				required={item.required}
				onclear={() => {
					item.value = '';
					handleFormChange(item, '');
				}}
				onchange={() => handleFormChange(item, item.value)}
				{...'input' in item ? item.input : {}}
			/>
		{:else if item.type === 'timePicker'}
			<Input
				title={item.label}
				select
				value={(item.value as FormTimePickerValue)?.timeStr || ''}
				clear
				required={item.required}
				onfocus={() => {
					item.showPopup = true;
				}}
				onclear={() => {
					item.value = { timeStr: '', timeObj: undefined };
					handleFormChange(item, { timeStr: '', timeObj: undefined });
				}}
				{...item?.input}
			/>
			<TimePicker
				bind:visible={item.showPopup}
				onconfirm={(timeStr, timeObj) => {
					item.value = { timeStr, timeObj };
					handleFormChange(item, { timeStr, timeObj });
				}}
				{...item.timePicker}
			/>
		{:else if item.type === 'actionSheet'}
			<Input
				title={item.label}
				select
				value={(item.value as FormActionSheetValue)?.action?.content || ''}
				clear
				required={item.required}
				onfocus={() => {
					item.showPopup = true;
				}}
				onclear={() => {
					item.value = { action: undefined, index: undefined };
					handleFormChange(item, { action: undefined, index: undefined });
				}}
				{...item?.input}
			/>
			<ActionSheet
				bind:visible={item.showPopup}
				onclickAction={(index: number, action) => {
					item.value = { action, index };
					handleFormChange(item, { action, index });
				}}
				{...item.actionSheet}
			/>
		{:else if item.type === 'calendar'}
			<Input
				title={item.label}
				select
				value={(() => {
					const dates = (item.value as FormCalendarValue)?.dates;
					if (!dates || dates.length === 0) return '';
					// 如果是范围选择，格式为 "开始日期 - 结束日期" / if range selection, format as "start date - end date"
					const isRange = item.calendar?.mode === 'range';
					if (isRange && dates.length >= 2) {
						return `${dates[0]} - ${dates[1]}`;
					}
					return dates.join(',');
				})()}
				clear
				required={item.required}
				onfocus={() => {
					item.showPopup = true;
				}}
				onclear={() => {
					item.value = { dates: [] };
					handleFormChange(item, { dates: [] });
				}}
				{...item?.input}
			/>
			<Calendar
				bind:visible={item.showPopup}
				onconfirm={(dates) => {
					item.value = { dates };
					handleFormChange(item, { dates });
				}}
				clear={false}
				{...item.calendar}
			/>
		{:else if item.type === 'numKeyboard'}
			<Input
				title={item.label}
				select
				bind:value={item.value as string}
				clear
				required={item.required}
				onfocus={() => {
					item.showPopup = true;
				}}
				onclear={() => {
					item.value = '';
					handleFormChange(item, '');
				}}
				{...item.input}
			/>
			<NumKeyboard
				bind:visible={item.showPopup}
				onclick={(key) => {
					if (key === 'close' || key === 'done') {
						item.showPopup = false;
					} else if (key === 'delete') {
						item.value = (item.value as string).slice(0, -1);
					} else {
						item.value = (item.value as string) + key;
					}
					handleFormChange(item, item.value);
				}}
				{...item.numKeyboard}
			/>
		{:else if item.type === 'picker'}
			<Input
				title={item.label}
				select
				value={(item.value as FormPickerValue)?.items?.map((item) => item.label).join(' / ') || ''}
				clear
				required={item.required}
				onfocus={() => {
					item.showPopup = true;
				}}
				onclear={() => {
					item.value = { items: [], indexs: [] };
					handleFormChange(item, { items: [], indexs: [] });
				}}
				{...item?.input}
			/>
			<Picker
				bind:visible={item.showPopup}
				datas={item.picker?.datas || []}
				onconfirm={(items, indexs) => {
					item.value = { items, indexs };
					handleFormChange(item, { items, indexs });
				}}
				onclose={() => {
					item.showPopup = false;
				}}
				{...item.picker}
			/>
		{:else if item.type === 'checkbox'}
			<div class="p-2">
				<div class="mb-2 flex justify-between px-2">
					<div class="relative mb-1 text-sm font-semibold">
						{#if item.required}
							<span class="text-error absolute -left-2.5 text-base">*</span>
						{/if}
						{item.label}
					</div>
					<div class="flex space-x-2 text-xs"></div>
				</div>
				<Checkbox
					data={item.checkbox?.data || []}
					{...item.checkbox}
					bind:checkeds={item.value as string[]}
					onchange={(checkeds: string[]) => handleFormChange(item, checkeds)}
				/>
			</div>
		{:else if item.type === 'radio'}
			<div class="p-2">
				<div class="mb-2 flex justify-between px-2">
					<div class="relative mb-1 text-sm font-semibold">
						{#if item.required}
							<span class="text-error absolute -left-2.5 text-base">*</span>
						{/if}
						{item.label}
					</div>
					<div class="flex space-x-2 text-xs"></div>
				</div>
				<Radio
					data={item.radio?.data || []}
					{...item.radio}
					bind:value={item.value as string}
					onchange={(value: string) => handleFormChange(item, value)}
				/>
			</div>
		{:else if item.type === 'slider'}
			<div class="p-2">
				<div class="mb-2 flex justify-between px-2">
					<div class="relative mb-1 text-sm font-semibold">
						{#if item.required}
							<span class="text-error absolute -left-2.5 text-base">*</span>
						{/if}
						{item.label}
					</div>
					<div class="flex space-x-2 text-xs"></div>
				</div>
				<div class="mx-4">
					<Slider
						{...item.slider}
						onchange={(value, valueRange) => {
							if (item.slider?.isRange) {
								if (valueRange) {
									(item.value as FormSliderValue).valueRange = valueRange;
									handleFormChange(item, { valueRange });
								}
							} else {
								(item.value as FormSliderValue).value = value;
								handleFormChange(item, { value });
							}
						}}
					/>
				</div>
			</div>
		{:else if item.type === 'switch'}
			<div class="p-2">
				<div class="mb-2 flex justify-between px-2">
					<div class="relative mb-1 text-sm font-semibold">
						{#if item.required}
							<span class="text-error absolute -left-2.5 text-base">*</span>
						{/if}
						{item.label}
					</div>
					<div class="flex space-x-2 text-xs"></div>
				</div>
				<Switch {...item.switch} bind:active={item.value as boolean} onchange={(value: boolean) => handleFormChange(item, value)} />
			</div>
		{:else if item.type === 'stepper'}
			<div class="p-2">
				<div class="mb-2 flex justify-between px-2">
					<div class="relative mb-1 text-sm font-semibold">
						{#if item.required}
							<span class="text-error absolute -left-2.5 text-base">*</span>
						{/if}
						{item.label}
					</div>
					<div class="flex space-x-2 text-xs"></div>
				</div>
				<Stepper {...item.stepper} bind:value={item.value as number} onchange={(value: number) => handleFormChange(item, value)} />
			</div>
		{:else}{/if}
	{/each}
</div>
{#if submitChildren}
	{@render submitChildren?.()}
{:else if submitText}
	<Button onclick={submitFunc} {...submitButton}>{submitText}</Button>
{:else}{/if}
{#if resetChildren}
	{@render resetChildren?.()}
{:else if resetText}
	<Button fill="lineTheme" type="button" onclick={resetFunc} {...resetButton}>{resetText}</Button>
{:else}{/if}
