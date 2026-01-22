<script lang="ts">
	import { getContext } from 'svelte';
	import Popup from '../popup/Popup.svelte';
	import ScrollRadio from '../scrollRadio/ScrollRadio.svelte';
	import Tag from '../tag/Tag.svelte';
	import Icon from '../icon/Icon.svelte';
	import { zh_CN, type LangProps } from '../../lang/index.js';
	import type { PickerProps, PickerDatasProps, PickerDataChildProps, PickerMultipleItem } from '../../types/index.js';

	// 当前语言
	// current language
	const currentLang: LangProps = getContext('STDF_lang') || zh_CN;
	const pickerLang: LangProps['picker'] = currentLang.picker;

	let {
		visible = $bindable(false),
		datas = [],
		autoScrollToLast = true,
		cancelText = pickerLang.defaultCancel,
		confirmText = pickerLang.defaultConfirm,
		title = pickerLang.defaultTitle,
		isLinkage = false,
		linkageInitIndexs = [],
		linkageShowRows = [],
		linkageFlexs = [],
		linkageLabelKeys = [],
		linkageAligns = [],
		linkageChildrenKey = 'children',
		height = 30,
		popup = {},
		multiple = false,
		multipleIcon = { name: 'ri-checkbox-circle-line', type: 'symbol', size: 24 },
		multipleIconActive = { name: 'ri-checkbox-circle-fill', type: 'symbol', size: 24 },
		multipleSelected = $bindable([]),
		onclose,
		onconfirm,
		oncancel,
		onmultiplechange
	}: PickerProps = $props();

	// 是否使用弹出层，当 popup 为 null 时不使用
	// Whether to use popup, when popup is null, do not use
	const usePopup = $derived(popup !== null);

	// 内部使用的 datas
	// Datas used internally
	let newDatas: PickerDatasProps[] | PickerDataChildProps[] = $state([]);
	$effect(() => {
		newDatas = datas;
	});

	// 如果是多级联动，对 newDatas 进行处理，使其结构符合 ScrollRadio 组件的结构
	// If it is multi-level linkage, process newDatas to make its structure conform to the structure of the ScrollRadio component
	$effect(() => {
		if (isLinkage) {
			const newLinkageData: PickerDatasProps[] = [];
			// 多级联动时递归处理 newDatas，取原始数据每一级的第一条数据，组成新的数据结构
			// When multi-level linkage, recursively process newDatas to take the first piece of data in each level of the original data to form a new data structure
			const newDatasFormatFunc = (data: PickerDatasProps[] | PickerDataChildProps[], index: number) => {
				if (data && data.length > 0) {
					const newData = data.map((item: PickerDatasProps | PickerDataChildProps) => {
						const label = linkageLabelKeys[index]
							? (item as Record<string, string>)[linkageLabelKeys[index]]
							: (item as { label: string }).label;
						return { label };
					});
					newLinkageData.push({ data: newData, showRow: 5, labelKey: 'label' });
					if (data[0] && typeof data[0] === 'object' && linkageChildrenKey in data[0]) {
						const children = (data[0] as { [key: string]: PickerDataChildProps[] })[linkageChildrenKey];
						newDatasFormatFunc(children, index + 1);
					}
				}
			};
			if (datas.length > 0) {
				newDatasFormatFunc(datas, 0);
				newDatas = newLinkageData;
			}
		}
	});

	let scrollEndIndexs: number[] = [];
	let lastSelectedIndexs: number[] = $state([]);
	let showRowsArr: number[] = [];
	// 滚动中的索引，用于实时判断当前是否选中
	// Scrolling indexes, used to determine if currently selected in real-time
	let currentScrollingIndexs: number[] = $state([]);

	const initFn = () => {
		// 对 datas 处理，如果没有设置 initIndex 则默认为 0，如果没有设置 showRow 则默认为 5
		// Process datas, if initIndex is not set, it is default to 0, if showRow is not set, it is default to 5
		const processedDatas = newDatas.map((item, index) => {
			// 创建一个新的对象，避免直接修改响应式状态
			// Create a new object to avoid directly modifying reactive state
			const processedItem = { ...item };

			if (!processedItem.initIndex) {
				(processedItem as PickerDatasProps).initIndex = 0;
			}
			if (!processedItem.showRow) {
				processedItem.showRow = 5;
			}
			if (!(processedItem as PickerDatasProps).lastSelectedIndex) {
				(processedItem as PickerDatasProps).lastSelectedIndex = 0;
			}
			if (!processedItem.flex) {
				processedItem.flex = 1;
			}
			if (!processedItem.align) {
				processedItem.align = 'center';
			}
			if (isLinkage) {
				if (linkageInitIndexs[index]) {
					processedItem.initIndex = linkageInitIndexs[index];
				} else {
					processedItem.initIndex = 0;
				}
				if (linkageShowRows[index]) {
					(processedItem as PickerDatasProps).showRow = linkageShowRows[index] as 3 | 5 | 7;
				}
				if (linkageFlexs[index]) {
					processedItem.flex = linkageFlexs[index];
				}
				if (linkageAligns[index]) {
					processedItem.align = linkageAligns[index];
				}
				if (!processedItem.lastSelectedIndex) {
					processedItem.lastSelectedIndex = 0;
				}
			}
			return processedItem;
		}) as PickerDatasProps[];

		// 重新赋值 newDatas
		// Reassign newDatas
		newDatas = processedDatas;
		// 滚动结束时选中项组成的数组
		// An array of selected items when scrolling ends
		scrollEndIndexs = newDatas.map((item: PickerDatasProps | PickerDataChildProps) => item.initIndex as number);

		// 初始化滚动中的索引
		// Initialize scrolling indexes
		currentScrollingIndexs = [...scrollEndIndexs];

		// 上次所有选中项，由上次单列选中项组成的数组，初始值为 datas 中每项的 initIndex
		// All last selected items, an array of last single column selected items, the initial value is the initIndex of each item in datas
		lastSelectedIndexs = newDatas.map((item) => item.initIndex as number);

		// 循环 newDatas，将 每项的 showRow 组成一个数组 showRowsArr
		// Loop newDatas to form an array showRowsArr of each item's showRow
		showRowsArr = newDatas.map((item) => item.showRow as number);
	};
	initFn();

	// 找出 showRowsArr 中最大值
	// Find the maximum value in showRowsArr
	const maxShowRows = showRowsArr.length > 0 ? Math.max(...showRowsArr.filter((n): n is number => typeof n === 'number')) : 5;

	// 多级联动时，根据当前选中项的索引，需要知道滚动的上级、当前级、下级以及所有级的数据
	// When multi-level linkage, according to the index of the currently selected item, you need to know the data of the scrolling upper level, current level, next level and all levels
	let preLevelData: PickerDataChildProps[] | PickerDatasProps[] = [];
	let currentLevelData: PickerDataChildProps[] | PickerDatasProps[] = [];
	// let nextLevelData = [];
	let allLevelData: (PickerDataChildProps[] | PickerDatasProps[])[] = [];

	// 根据原始数据 datas 的层级，allLevelData 的长度为 datas 的层级，递归处理 datas 中每一级直至没有 children，将每一级的第一项取出，放到 allLevelData 中
	// According to the level of the original data datas, the length of allLevelData is the level of datas, and the data in each level of datas is processed recursively until there is no children, and the first item of each level is taken out and placed in allLevelData
	const getAllLevelDataFunc = (data: PickerDatasProps[] | PickerDataChildProps[], level: number) => {
		if (data && data.length > 0) {
			if (!allLevelData[level]) {
				allLevelData[level] = [];
			}
			// 使用类型断言确保类型安全
			const firstItem = data[0] as PickerDatasProps & PickerDataChildProps;
			allLevelData[level].push(firstItem);
			if (linkageChildrenKey in firstItem && firstItem[linkageChildrenKey]) {
				getAllLevelDataFunc(firstItem[linkageChildrenKey] as PickerDataChildProps[], level + 1);
			}
		}
	};
	$effect(() => {
		if (isLinkage) {
			getAllLevelDataFunc(datas, 0);
		}
	});

	// 点击取消按钮
	// Click cancel button
	const clickCancelFunc = () => {
		visible = false;
		oncancel?.();
		onclose?.();
	};

	// 点击确定按钮
	// Click confirm button
	const clickConfirmFunc = () => {
		visible = false;
		onclose?.();
		lastSelectedIndexs = scrollEndIndexs;
		let items: { [key: string]: string }[] = [];
		if (isLinkage) {
			// 获取 lastSelectedIndexs 的长度为 n，取 allLevelData 前面的 n 项，作为暂时数组 tempItems
			// Get the length of lastSelectedIndexs as n, take the first n items of allLevelData as the temporary array tempItems
			const tempItems = allLevelData.slice(0, lastSelectedIndexs.length);
			// 将 tempItems 中的每一项按照 lastSelectedIndexs 的索引取出，组成一个新数组 items
			// Take each item in tempItems out according to the index of lastSelectedIndexs to form a new array items
			items = tempItems.map((item: PickerDatasProps[] | PickerDataChildProps[], index: number) => {
				const selectedIndex = lastSelectedIndexs[index];
				if (Array.isArray(item) && item[selectedIndex]) {
					const selectedItem = item[selectedIndex] as PickerDataChildProps;
					// 根据 linkageLabelKeys 获取正确的 label
					// Get the correct label according to linkageLabelKeys
					const labelKey = linkageLabelKeys[index] || 'label';
					const label = selectedItem[labelKey] || selectedItem.label || '';
					return { label: label as string };
				}
				return { label: '' };
			});
		} else {
			// 循环 datas 与 scrollEndIndexs，按照 scrollEndIndexs 将 datas 中的 data 对应的项组成一个新数组
			// Loop datas and scrollEndIndexs to form a new array of values corresponding to data in datas according to scrollEndIndexs
			items = datas.map((item: PickerDatasProps | PickerDataChildProps, index: number) => {
				const data = (item as PickerDatasProps).data;
				if (Array.isArray(data)) {
					return data[scrollEndIndexs[index]] as { [key: string]: string };
				}
				return data as { [key: string]: string };
			}) as { [key: string]: string }[];
		}
		onconfirm?.(items, lastSelectedIndexs);
	};

	// 滚动中更新索引
	// Update index during scrolling
	const scrollingFunc = (index: number, col: number) => {
		currentScrollingIndexs[col] = index;
		currentScrollingIndexs = [...currentScrollingIndexs];
	};

	// 滚动结束
	// Scroll end
	const scrollEndFunc = (i: number, col: number) => {
		// col 为当前滚动结束的列的索引
		// index 为当前滚动结束的列的选中项的索引
		const index = i;
		scrollEndIndexs[col] = index;
		// 同步更新滚动中索引
		// Sync scrolling indexes
		currentScrollingIndexs[col] = index;
		currentScrollingIndexs = [...currentScrollingIndexs];
		if (isLinkage) {
			// 任何列滚动之后，使传入的 linkageInitIndexs 都会失效，将所有下级的初始选中项设置为 0
			// After any column scrolls, the linkageInitIndexs passed in will all be invalid, and set the initial selected item of all lower levels to 0
			newDatas = newDatas.map((item, index) => {
				if (index > col) {
					return { ...item, initIndex: 0 };
				}
				return item;
			}) as PickerDatasProps[];
			// 递归计算当前列的数据
			// Recursively calculate the data of the current column
			if (col === 0) {
				preLevelData = [];
				currentLevelData = datas as PickerDatasProps[];
				allLevelData[0] = datas as PickerDatasProps[];
			} else {
				preLevelData = allLevelData[col - 1] as PickerDatasProps[];
				if (preLevelData && preLevelData[scrollEndIndexs[col - 1]]) {
					const children = preLevelData[scrollEndIndexs[col - 1]][linkageChildrenKey as keyof PickerDatasProps] as PickerDataChildProps[];
					currentLevelData = Array.isArray(children) ? (children as PickerDataChildProps[]) : [];
					// 更新 allLevelData 当前级别的数据
					// Update allLevelData for current level
					allLevelData[col] = currentLevelData;
				} else {
					currentLevelData = [];
					allLevelData[col] = [];
				}
			}
			// 递归计算后面的所有列数据
			// Tail recursion to calculate the data of all columns behind
			const recursionFunc = (col: number, currentLevelData: PickerDataChildProps[] | PickerDatasProps[]) => {
				const nextCol = col + 1;
				if (nextCol < newDatas.length) {
					const nextLevelData =
						currentLevelData.length === 1
							? currentLevelData[0]
								? (currentLevelData[0] as PickerDatasProps)[linkageChildrenKey as keyof PickerDatasProps]
								: []
							: currentLevelData[index]
								? ((currentLevelData[index] as PickerDatasProps)[linkageChildrenKey as keyof PickerDatasProps] as PickerDataChildProps[])
								: [];
					if (nextLevelData && Array.isArray(nextLevelData) && nextLevelData.length > 0) {
						const nextData = (nextLevelData as PickerDataChildProps[]).map((item: PickerDataChildProps) =>
							linkageLabelKeys[col + 1] ? { label: item[linkageLabelKeys[col + 1]] } : { label: item.label }
						);
						// 将数据置空，此列数据为空，此列将立即消失，然后通过 setTimeout 立即设置数据，使得数据更新后，此列才会出现
						// Set the data to empty, the data of this column is empty, this column will disappear immediately, and then set the data immediately through setTimeout, so that the data is updated, this column will appear
						newDatas = newDatas.map((item, idx) => {
							if (idx === nextCol) {
								return { ...item, data: [] };
							}
							return item;
						}) as PickerDatasProps[];
						setTimeout(() => {
							newDatas = newDatas.map((item, idx) => {
								if (idx === nextCol) {
									return { ...item, data: nextData };
								}
								return item;
							}) as PickerDatasProps[];
						});
						// 确保 allLevelData 正确存储当前级别的完整数据
						// Ensure allLevelData correctly stores the complete data for current level
						allLevelData[nextCol] = nextLevelData;
						recursionFunc(nextCol, nextLevelData);
					} else {
						// 如果下一级没数据，则将下一级的数据置空
						// If there is no data in the next level, set the data of the next level to empty
						// 也可以用来解决数据层级超级大的时候，递归计算数据的性能问题，暂时将后面的数据置空，等到有数据的时候再设置，避免选择数据与视图不同步的问题
						// It can also be used to solve the performance problem of recursive calculation of data when the data hierarchy is super large. Temporarily set the data behind to empty, and set it when there is data, to avoid the problem that the selected data and the view are not synchronized
						newDatas = newDatas.map((item, idx) => {
							if (idx === nextCol) {
								return { ...item, data: [] };
							}
							return item;
						}) as PickerDatasProps[];
					}
				}
			};
			recursionFunc(col, currentLevelData);
		}
	};

	// 检查当前滚动位置是否已被选中（多选模式）
	// Check if current scroll position is selected (multiple mode)
	const isCurrentSelected = $derived(() => {
		if (!multiple || multipleSelected.length === 0) return false;
		return multipleSelected.some((item) => item.indexs.every((idx, i) => idx === currentScrollingIndexs[i]));
	});

	// 获取当前选中项的 label
	// Get label of current selected items
	const getCurrentLabel = (): string => {
		if (isLinkage) {
			const tempItems = allLevelData.slice(0, scrollEndIndexs.length);
			return tempItems
				.map((item, index) => {
					const selectedIndex = scrollEndIndexs[index];
					if (Array.isArray(item) && item[selectedIndex]) {
						const selectedItem = item[selectedIndex] as PickerDataChildProps;
						const labelKey = linkageLabelKeys[index] || 'label';
						return (selectedItem[labelKey] || selectedItem.label || '') as string;
					}
					return '';
				})
				.filter(Boolean)
				.join(' / ');
		} else {
			return datas
				.map((item, index) => {
					const data = (item as PickerDatasProps).data;
					if (Array.isArray(data) && data[scrollEndIndexs[index]]) {
						const labelKey = (item as PickerDatasProps).labelKey || 'label';
						return data[scrollEndIndexs[index]][labelKey] || '';
					}
					return '';
				})
				.filter(Boolean)
				.join(' / ');
		}
	};

	// 获取当前选中项的 items
	// Get items of current selection
	const getCurrentItems = (): { [key: string]: string }[] => {
		if (isLinkage) {
			const tempItems = allLevelData.slice(0, scrollEndIndexs.length);
			return tempItems.map((item, index) => {
				const selectedIndex = scrollEndIndexs[index];
				if (Array.isArray(item) && item[selectedIndex]) {
					const selectedItem = item[selectedIndex] as PickerDataChildProps;
					const labelKey = linkageLabelKeys[index] || 'label';
					const label = selectedItem[labelKey] || selectedItem.label || '';
					return { label: label as string };
				}
				return { label: '' };
			});
		} else {
			return datas.map((item, index) => {
				const data = (item as PickerDatasProps).data;
				if (Array.isArray(data)) {
					return data[scrollEndIndexs[index]] as { [key: string]: string };
				}
				return data as { [key: string]: string };
			}) as { [key: string]: string }[];
		}
	};

	// 点击多选图标
	// Click multiple selection icon
	const clickMultipleIcon = () => {
		const currentIndexs = [...scrollEndIndexs];
		const existingIndex = multipleSelected.findIndex((item) => item.indexs.every((idx, i) => idx === currentIndexs[i]));

		if (existingIndex >= 0) {
			// 已选中，取消选中
			// Already selected, deselect
			multipleSelected = multipleSelected.filter((_, i) => i !== existingIndex);
		} else {
			// 未选中，添加选中
			// Not selected, add selection
			const newItem: PickerMultipleItem = {
				indexs: currentIndexs,
				items: getCurrentItems(),
				label: getCurrentLabel()
			};
			multipleSelected = [...multipleSelected, newItem];
		}
		onmultiplechange?.(multipleSelected);
	};

	// 删除已选项
	// Remove selected item
	const removeSelectedItem = (index: number) => {
		multipleSelected = multipleSelected.filter((_, i) => i !== index);
		onmultiplechange?.(multipleSelected);
	};
</script>

{#snippet pickerContent()}
	<div class="flex items-center justify-between border-b border-black/10 bg-bg-surface dark:border-white/20 dark:bg-bg-surface-dark">
		<button class="h-10 cursor-pointer px-4 leading-10 text-black/60 dark:text-white/60" onclick={clickCancelFunc}>{cancelText}</button>
		<div>{title}</div>
		<button class="text-primary dark:text-dark h-10 cursor-pointer px-4 leading-10" onclick={clickConfirmFunc}>{confirmText}</button>
	</div>
	{#if multiple && multipleSelected.length > 0}
		<div class="picker-selected-tags flex gap-2 overflow-x-auto bg-bg-surface px-3 py-2 dark:bg-bg-surface-dark">
			{#each multipleSelected as item, index (index)}
				<Tag text={item.label} size="sm" closable onclose={() => removeSelectedItem(index)} />
			{/each}
		</div>
	{/if}
	<div
		class="flex items-center justify-around gap-1 bg-bg-surface dark:bg-bg-surface-dark"
		style={usePopup ? '' : `height:${(window.innerHeight * height) / 100}px`}
	>
		{#each newDatas as item, col (col)}
			<div class="truncate" style="flex:{item.flex || 1}">
				{#if (item as PickerDatasProps).data.length > 0}
					<ScrollRadio
						{...item}
						lastSelectedIndex={lastSelectedIndexs[col]}
						{autoScrollToLast}
						onscrollEnd={(index) => scrollEndFunc(index, col)}
						onscrolling={(index) => scrollingFunc(index, col)}
					/>
				{/if}
			</div>
		{/each}
		{#if multiple}
			<button
				class="flex h-full w-12 shrink-0 cursor-pointer items-center justify-center"
				onclick={clickMultipleIcon}
			>
				{#if isCurrentSelected()}
					<Icon {...multipleIconActive} state="theme" />
				{:else}
					<span class="text-gray-400 dark:text-gray-500">
						<Icon {...multipleIcon} />
					</span>
				{/if}
			</button>
		{/if}
	</div>
{/snippet}

{#if usePopup}
	<Popup
		bind:visible
		size={0}
		maskClosable
		transitionDistance={(maxShowRows === 3 ? 64 : maxShowRows === 5 ? 48 : 32) * maxShowRows + 41}
		{...popup}
	>
		{@render pickerContent()}
	</Popup>
{:else}
	{@render pickerContent()}
{/if}

<style>
	.picker-selected-tags::-webkit-scrollbar {
		display: none;
	}
	.picker-selected-tags {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}
</style>
