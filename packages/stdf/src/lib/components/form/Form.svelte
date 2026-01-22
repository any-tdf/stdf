<script lang="ts">
	import { getContext } from 'svelte';
	import Input from '../input/Input.svelte';
	import TimePicker from '../timePicker/TimePicker.svelte';
	import ActionSheet from '../actionSheet/ActionSheet.svelte';
	import Calendar from '../calendar/Calendar.svelte';
	import NumKeyboard from '../numKeyboard/NumKeyboard.svelte';
	import FullKeyboard from '../fullKeyboard/FullKeyboard.svelte';
	import Picker from '../picker/Picker.svelte';
	import Checkbox from '../checkbox/Checkbox.svelte';
	import Radio from '../radio/Radio.svelte';
	import Slider from '../slider/Slider.svelte';
	import Switch from '../switch/Switch.svelte';
	import Stepper from '../stepper/Stepper.svelte';
	import ColorPicker from '../colorPicker/ColorPicker.svelte';
	import Tag from '../tag/Tag.svelte';
	import Button from '../button/Button.svelte';
	import Card from '../card/Card.svelte';
	import { zh_CN, type LangProps } from '../../lang/index.js';
	import type {
		FormProps,
		FormValueProps,
		FormTimePickerValue,
		FormCalendarValue,
		FormActionSheetValue,
		FormPickerValue,
		FormSliderValue,
		FormColorPickerValue
	} from '../../types/index.js';

	// 当前语言
	// current language
	const currentLang = (getContext('STDF_lang') || zh_CN) as LangProps;
	const formLang: LangProps['form'] = currentLang.form;
	const inputLang: LangProps['input'] = currentLang.input;

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
		card,
		space = '0'
	}: FormProps = $props();

	const formatColorPickerValue = (value: FormColorPickerValue) => {
		if (!value) return '';
		if (typeof value === 'string') return value;
		if (Array.isArray(value)) return `rgb(${value.join(', ')})`;
		return `oklch(${value.l} ${value.c} ${value.h})`;
	};

	let formInner = $derived(
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
											? ({
													items: [],
													indexs: [],
													multipleSelected: item.picker?.multiple
														? item.picker?.multipleSelected || ((item.initValue as FormPickerValue)?.multipleSelected ?? [])
														: undefined
												} as FormPickerValue)
											: item.type === 'calendar'
												? ({ dates: [] } as FormCalendarValue)
												: item.type === 'fullKeyboard'
													? (item.fullKeyboard?.value as string) || (item.initValue as string) || ''
													: item.type === 'colorPicker'
														? ((item.colorPicker?.value as FormColorPickerValue) ?? (item.initValue as FormColorPickerValue))
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
				item.value = {
					items: [],
					indexs: [],
					multipleSelected: item.picker?.multiple
						? item.picker?.multipleSelected || ((item.initValue as FormPickerValue)?.multipleSelected ?? [])
						: undefined
				} as FormPickerValue;
			} else if (item.type === 'calendar') {
				item.value = { dates: [] } as FormCalendarValue;
			} else if (item.type === 'fullKeyboard') {
				item.value = (item.fullKeyboard?.value as string) || (item.initValue as string) || '';
			} else if (item.type === 'colorPicker') {
				item.value = (item.colorPicker?.value as FormColorPickerValue) ?? (item.initValue as FormColorPickerValue);
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
</script>

{#snippet formContent()}
	<div class={spaceClass[space] || 'space-y-0'}>
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
				{@const calendarDates = (item.value as FormCalendarValue)?.dates || []}
				{@const isCalendarMultiple = item.calendar?.mode === 'multiple'}
				{@const calendarPlaceholder =
					item.input?.placeholder && item.input.placeholder !== ''
						? item.input.placeholder
						: item.label
							? inputLang.pleaseSelect + ' ' + item.label
							: ''}
				{#if isCalendarMultiple}
					<!-- 多选模式：使用自定义展示容器 -->
					<div class="px-2 py-2">
						<div class="flex justify-between px-2">
							<div class="relative mb-1 text-sm font-semibold">
								{#if item.required}
									<span class="text-error absolute -left-2.5 text-base">*</span>
								{/if}
								{item.label}
							</div>
						</div>
						<div
							role="button"
							tabindex="0"
							class="bg-text-primary/5 dark:bg-text-dark/5 rounded-(--radius-form) relative my-0.5 flex min-h-12 w-full cursor-pointer items-center gap-2 px-2 py-3 text-left text-sm transition-all duration-300"
							onclick={() => {
								item.showPopup = true;
							}}
							onkeydown={(e) => (e.key === 'Enter' || e.key === ' ') && (item.showPopup = true)}
						>
							<div class="flex flex-1 flex-wrap items-center gap-2">
								{#if (item.value as FormCalendarValue)?.dates && (item.value as FormCalendarValue).dates!.length > 0}
									{#each (item.value as FormCalendarValue).dates! as date, index (date)}
										<Tag
											text={date}
											size="sm"
											fill="light"
											closable
											onclose={() => {
												const currentDates = (item.value as FormCalendarValue)?.dates || [];
												const nextDates = currentDates.filter((_: string, i: number) => i !== index);
												item.value = { dates: nextDates };
												handleFormChange(item, { dates: nextDates });
											}}
										/>
									{/each}
								{:else}
									<span class="font-semibold opacity-50">{calendarPlaceholder}</span>
								{/if}
							</div>
							{#if (item.value as FormCalendarValue)?.dates && (item.value as FormCalendarValue).dates!.length > 0}
								<button
									type="button"
									class="shrink-0"
									aria-label="clear"
									onclick={(e) => {
										e.stopPropagation();
										item.value = { dates: [] };
										handleFormChange(item, { dates: [] });
									}}
								>
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" class="fill-current opacity-30">
										<path
											d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 10.5858L9.17157 7.75736L7.75736 9.17157L10.5858 12L7.75736 14.8284L9.17157 16.2426L12 13.4142L14.8284 16.2426L16.2426 14.8284L13.4142 12L16.2426 9.17157L14.8284 7.75736L12 10.5858Z"
										></path>
									</svg>
								</button>
							{/if}
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="shrink-0 fill-current opacity-50">
								<path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"
								></path>
							</svg>
						</div>
					</div>
				{:else}
					<!-- 单选/范围模式：使用 Input 组件 -->
					<Input
						title={item.label}
						select
						value={(() => {
							if (calendarDates.length === 0) return '';
							const isRange = item.calendar?.mode === 'range';
							if (isRange && calendarDates.length >= 2) {
								return `${calendarDates[0]} - ${calendarDates[1]}`;
							}
							return calendarDates.join(',');
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
						{...item.input}
					/>
				{/if}
				{#key item.calendar?.mode === 'multiple' ? ((item.value as FormCalendarValue)?.dates || []).join('|') : item.name}
					<Calendar
						bind:visible={item.showPopup}
						{...item.calendar}
						initSelectedDates={(item.value as FormCalendarValue)?.dates || []}
						onconfirm={(dates) => {
							item.value = { dates };
							handleFormChange(item, { dates });
						}}
						clear={false}
					/>
				{/key}
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
			{:else if item.type === 'fullKeyboard'}
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
				<FullKeyboard
					bind:visible={item.showPopup}
					bind:value={item.value as string}
					onclick={() => {
						handleFormChange(item, item.value);
					}}
					onclose={() => {
						handleFormChange(item, item.value);
					}}
					{...item.fullKeyboard}
				/>
			{:else if item.type === 'colorPicker'}
				<Input
					title={item.label}
					select
					value={formatColorPickerValue(item.value as FormColorPickerValue)}
					clear
					required={item.required}
					onfocus={() => {
						item.showPopup = true;
					}}
					onclear={() => {
						item.value = undefined;
						handleFormChange(item, undefined);
					}}
					{...item.input}
				/>
				<ColorPicker
					bind:visible={item.showPopup}
					bind:value={item.value as FormColorPickerValue}
					onchange={() => {
						handleFormChange(item, item.value);
					}}
					onclose={() => {
						handleFormChange(item, item.value);
					}}
					{...item.colorPicker}
				/>
			{:else if item.type === 'picker'}
				{@const pickerValue = item.value as FormPickerValue}
				{@const pickerMultipleSelected = pickerValue?.multipleSelected || []}
				{@const isMultiple = item.picker?.multiple}
				{@const multiplePlaceholder =
					item.input?.placeholder && item.input.placeholder !== ''
						? item.input.placeholder
						: item.label
							? inputLang.pleaseSelect + ' ' + item.label
							: ''}
				{#if isMultiple}
					<!-- 多选模式：使用自定义展示容器 -->
					<div class="px-2 py-2">
						<div class="flex justify-between px-2">
							<div class="relative mb-1 text-sm font-semibold">
								{#if item.required}
									<span class="text-error absolute -left-2.5 text-base">*</span>
								{/if}
								{item.label}
							</div>
						</div>
						<div
							role="button"
							tabindex="0"
							class="bg-text-primary/5 dark:bg-text-dark/5 rounded-(--radius-form) relative my-0.5 flex min-h-12 w-full cursor-pointer items-center gap-2 px-2 py-3 text-left text-sm transition-all duration-300"
							onclick={() => {
								item.showPopup = true;
							}}
							onkeydown={(e) => (e.key === 'Enter' || e.key === ' ') && (item.showPopup = true)}
						>
							<div class="flex flex-1 flex-wrap items-center gap-2">
								{#if (item.value as FormPickerValue)?.multipleSelected && (item.value as FormPickerValue).multipleSelected!.length > 0}
									{#each (item.value as FormPickerValue).multipleSelected! as selectedItem, index (selectedItem.label)}
										<Tag
											text={selectedItem.label}
											size="sm"
											fill="light"
											closable
											onclose={() => {
												const currentSelected = (item.value as FormPickerValue)?.multipleSelected || [];
												const nextSelected = currentSelected.filter((_: unknown, i: number) => i !== index);
												item.value = {
													...(item.value as FormPickerValue),
													multipleSelected: nextSelected
												};
												handleFormChange(item, item.value);
											}}
										/>
									{/each}
								{:else}
									<span class="font-semibold opacity-50">{multiplePlaceholder}</span>
								{/if}
							</div>
							{#if (item.value as FormPickerValue)?.multipleSelected && (item.value as FormPickerValue).multipleSelected!.length > 0}
								<button
									type="button"
									class="shrink-0"
									aria-label="clear"
									onclick={(e) => {
										e.stopPropagation();
										item.value = {
											items: [],
											indexs: [],
											multipleSelected: []
										};
										handleFormChange(item, item.value);
									}}
								>
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" class="fill-current opacity-30">
										<path
											d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 10.5858L9.17157 7.75736L7.75736 9.17157L10.5858 12L7.75736 14.8284L9.17157 16.2426L12 13.4142L14.8284 16.2426L16.2426 14.8284L13.4142 12L16.2426 9.17157L14.8284 7.75736L12 10.5858Z"
										></path>
									</svg>
								</button>
							{/if}
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="shrink-0 fill-current opacity-50">
								<path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"
								></path>
							</svg>
						</div>
					</div>
				{:else}
					<!-- 单选模式：使用 Input 组件 -->
					<Input
						title={item.label}
						select
						value={pickerValue?.items?.map((item) => item.label).join(' / ') || ''}
						clear
						required={item.required}
						onfocus={() => {
							item.showPopup = true;
						}}
						onclear={() => {
							item.value = {
								items: [],
								indexs: [],
								multipleSelected: undefined
							};
							handleFormChange(item, item.value);
						}}
						{...item.input}
					/>
				{/if}
				<Picker
					bind:visible={item.showPopup}
					{...item.picker}
					datas={item.picker?.datas || []}
					multipleSelected={pickerMultipleSelected}
					onmultiplechange={(selected) => {
						item.value = {
							...pickerValue,
							multipleSelected: selected
						};
						handleFormChange(item, item.value);
					}}
					onconfirm={(items, indexs) => {
						item.value = {
							...pickerValue,
							items,
							indexs
						};
						handleFormChange(item, item.value);
					}}
					onclose={() => {
						item.showPopup = false;
					}}
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
{/snippet}

{#if card}
	<Card {...card}>
		{@render formContent()}
	</Card>
{:else}
	{@render formContent()}
{/if}
{#if submitChildren}
	{@render submitChildren?.()}
{:else if submitText}
	<Button onclick={submitFunc} {...submitButton}>{submitText}</Button>
{:else}{/if}
{#if resetChildren}
	{@render resetChildren?.()}
{:else if resetText}
	<Button fill="lineState" type="button" onclick={resetFunc} {...resetButton}>{resetText}</Button>
{:else}{/if}
