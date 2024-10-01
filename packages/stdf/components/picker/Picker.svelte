<script>
	import { createEventDispatcher, getContext } from 'svelte';
	import Popup from '../popup/Popup.svelte';
	import ScrollRadio from '../scrollRadio/ScrollRadio.svelte';
	import zh_CN from '../../lang/zh_CN';

	// 定义事件派发器
	// Define event dispatcher
	const dispatch = createEventDispatcher();

	// 当前语言
	// current language
	const currentLang = getContext('STDF_lang') || zh_CN;
	const pickerLang = currentLang.picker;

	/**
	 * 是否显示
	 * Whether to show
	 * @type {boolean}
	 * @default true
	 */
	export let visible = false;

	/**
	 * @typedef {Object} datasObj - 每一列的数据
	 * @property {Array} data - 每一列的数据
	 * @property {'left'|'center'|'right'} [align] - 对齐方式
	 * @property {3|5|7} [showRow] - 每列显示行数
	 * @property {Number} [initIndex] - 初始选中项
	 * @property {Boolean} [useAnimation] - 是否使用动画
	 * @property {String} [labelKey] - 显示文本的 key
	 * @property {Number} [flex] - 每列的宽度
	 * @property {Number} [lastSelectedIndex] - 上次选中项
	 */

	/**
	 * @typedef {Object} isLinkageObject - 对象类型的定义，必须包含两个属性，第一个属性的值为字符，第二个属性的值为数组
	 * @property {String} [label] - 显示文本
	 * @property {Array} [children] - 下级数据
	 * @property {Number} [initIndex] - 初始选中项
	 * @property {Array} [data] - 每一列的数据
	 * @property {3|5|7} [showRow] - 每列显示行数
	 * @property {String} [labelKey] - 显示文本的 key
	 * @property {Boolean} [useAnimation] - 是否使用动画
	 * @property {'left'|'center'|'right'} [align] - 对齐方式
	 * @property {Number} [flex] - 每列的宽度
	 */

	/**
	 * 所有列数据
	 * All column data
	 * @type {Array<datasObj>|Array<isLinkageObject>}
	 * @default []
	 */
	export let datas = [];

	/**
	 * 是否自动滚动到上次的选中项
	 * Whether to automatically scroll to the last selected item
	 * @type {boolean}
	 * @default true
	 */
	export let autoScrollToLast = true;

	/**
	 * 取消选项文本
	 * Cancel option text
	 * @type {string}
	 * @default Current language picker.cancelText
	 */
	export let cancelText = pickerLang.defaultCancel;

	/**
	 * 确定选项文本
	 * Confirm option text
	 * @type {string}
	 * @default Current language picker.confirmText
	 */
	export let confirmText = pickerLang.defaultConfirm;

	/**
	 * 中间选项文本
	 * Middle option text
	 * @type {string}
	 * @default Current language picker.defaultTitle
	 */
	export let title = pickerLang.defaultTitle;

	/**
	 * 是否多级联动
	 * Whether multi-level linkage
	 * @type {boolean}
	 * @default false
	 */
	export let isLinkage = false;

	/**
	 * 如果是多级联动，可以通过传入的 linkageInitIndexs 来设置初始选中项
	 * If it is multi-level linkage, you can set the initial selected item by passing in linkageInitIndexs
	 * @type {Array<Number>}
	 * @default []
	 */
	export let linkageInitIndexs = [];

	/**
	 * 如果是多级联动，可以通过传入的 linkageShowRows 来设置每列显示行数
	 * If it is multi-level linkage, you can set the number of rows displayed in each column by passing in linkageShowRows
	 * @type {Array<3|5|7>}
	 * @default []
	 */
	export let linkageShowRows = [];

	/**
	 * 如果是多级联动，可以通过传入的 linkageFlexs 来设置每列的宽度
	 * If it is multi-level linkage, you can set the width of each column by passing in linkageFlexs
	 * @type {Array<Number>}
	 * @default []
	 */
	export let linkageFlexs = [];

	/**
	 * 如果是多级联动，可以通过传入的 linkageLabelKeys 来设置每列的 labelKey
	 * If it is multi-level linkage, you can set the labelKey of each column by passing in linkageLabelKeys
	 * @type {Array<String>}
	 * @default []
	 */
	export let linkageLabelKeys = [];

	/**
	 * 如果是多级联动，可以通过传入的 linkageAligns 来设置每列的对齐方式
	 * If it is multi-level linkage, you can set the alignment of each column by passing in linkageAligns
	 * @type {Array<'left'|'center'|'right'>}
	 * @default []
	 */
	export let linkageAligns = [];

	/**
	 * 如果是多级联动，可以通过传入上下级 children 的 key 来设置
	 * If it is multi-level linkage, you can set the key of the children of the upper and lower levels by passing it in
	 * @type {string}
	 * @default 'children'
	 */
	export let linkageChildrenKey = 'children';

	/**
	 * 弹出层参数
	 * Popup parameters
	 * @type {Object}
	 * @default {}
	 */
	export let popup = {};

	/**
	 * 内部使用的 datas
	 * Datas used internally
	 * @type {Array<datasObj>|Array<isLinkageObject>}
	 */
	let newDatas = datas;

	// 如果是多级联动，对 newDatas 进行处理，使其结构符合 ScrollRadio 组件的结构
	// If it is multi-level linkage, process newDatas to make its structure conform to the structure of the ScrollRadio component
	if (isLinkage) {
		const newLinkageData = [];
		// 多级联动时递归处理 newDatas，取原始数据每一级的第一条数据，组成新的数据结构
		// When multi-level linkage, recursively process newDatas to take the first piece of data in each level of the original data to form a new data structure
		const newDatasFormatFunc = (data, index) => {
			if (data && data.length > 0) {
				const newData = data.map(item => (linkageLabelKeys[index] ? { label: item[linkageLabelKeys[index]] } : { label: item.label }));
				newLinkageData.push({ data: newData, showRow: 5, labelKey: 'label' });
				if (data[0][linkageChildrenKey]) {
					newDatasFormatFunc(data[0][linkageChildrenKey], index + 1);
				}
			}
		};
		newDatasFormatFunc(newDatas, 0);
		newDatas = newLinkageData;
	}
	// 对 datas 处理，如果没有设置 initIndex 则默认为 0，如果没有设置 showRow 则默认为 5
	// Process datas, if initIndex is not set, it is default to 0, if showRow is not set, it is default to 5
	newDatas = newDatas.map((item, index) => {
		if (!item.initIndex) {
			item.initIndex = 0;
		}
		if (!item.showRow) {
			item.showRow = 5;
		}
		if (!item.lastSelectedIndex) {
			item.lastSelectedIndex = 0;
		}
		if (!item.flex) {
			item.flex = 1;
		}
		if (!item.align) {
			item.align = 'center';
		}
		if (isLinkage) {
			if (linkageInitIndexs[index]) {
				item.initIndex = linkageInitIndexs[index];
			} else {
				item.initIndex = 0;
			}
			if (linkageShowRows[index]) {
				item.showRow = linkageShowRows[index];
			}
			if (linkageFlexs[index]) {
				item.flex = linkageFlexs[index];
			}
			if (linkageAligns[index]) {
				item.align = linkageAligns[index];
			}
			if (!item.lastSelectedIndex) {
				item.lastSelectedIndex = 0;
			}
		}
		return item;
	});
	// 滚动结束时选中项组成的数组
	// An array of selected items when scrolling ends
	let scrollEndIndexs = newDatas.map(item => item.initIndex);

	// 上次所有选中项，由上次单列选中项组成的数组，初始值为 datas 中每项的 initIndex
	// All last selected items, an array of last single column selected items, the initial value is the initIndex of each item in datas
	let lastSelectedIndexs = newDatas.map(item => item.initIndex);

	// 循环 newDatas，将 每项的 showRow 组成一个数组 showRowsArr
	// Loop newDatas to form an array showRowsArr of each item's showRow
	const showRowsArr = newDatas.map(item => item.showRow);

	// 找出 showRowsArr 中最大值
	// Find the maximum value in showRowsArr
	const maxShowRows = Math.max(...showRowsArr);

	// 多级联动时，根据当前选中项的索引，需要知道滚动的上级、当前级、下级以及所有级的数据
	// When multi-level linkage, according to the index of the currently selected item, you need to know the data of the scrolling upper level, current level, next level and all levels
	let preLevelData = [];
	let currentLevelData = [];
	// let nextLevelData = [];
	let allLevelData = [];

	// 根据原始数据 datas 的层级，allLevelData 的长度为 datas 的层级，递归处理 datas 中每一级直至没有 children，将每一级的第一项取出，放到 allLevelData 中
	// According to the level of the original data datas, the length of allLevelData is the level of datas, and the data in each level of datas is processed recursively until there is no children, and the first item of each level is taken out and placed in allLevelData
	const getAllLevelDataFunc = (data, level) => {
		if (data && data.length > 0) {
			if (!allLevelData[level]) {
				allLevelData[level] = [];
			}
			allLevelData[level].push(data[0]);
			if (data[0][linkageChildrenKey]) {
				getAllLevelDataFunc(data[0][linkageChildrenKey], level + 1);
			}
		}
	};

	isLinkage && getAllLevelDataFunc(datas, 0);

	// 点击取消按钮
	// Click cancel button
	const clickCancelFunc = () => {
		visible = false;
		dispatch('cancel');
	};

	// 点击确定按钮
	// Click confirm button
	const clickConfirmFunc = () => {
		visible = false;
		lastSelectedIndexs = scrollEndIndexs;
		let items = [];
		if (isLinkage) {
			// 获取 lastSelectedIndexs 的长度为n，取 allLevelData 前面的 n 项，作为暂时数组 tempItems
			// Get the length of lastSelectedIndexs as n, take the first n items of allLevelData as the temporary array tempItems
			const tempItems = allLevelData.slice(0, lastSelectedIndexs.length);
			// 将 tempItems 中的每一项按照 lastSelectedIndexs 的索引取出，组成一个新数组 items
			// Take each item in tempItems out according to the index of lastSelectedIndexs to form a new array items
			items = tempItems.map((item, index) => item[lastSelectedIndexs[index]]);
		} else {
			// 循环 datas 与 scrollEndIndexs，按照 scrollEndIndexs 将 datas 中的 data 对应的值组成一个新数组
			// Loop datas and scrollEndIndexs to form a new array of values corresponding to data in datas according to scrollEndIndexs
			items = datas.map((item, index) => item.data[scrollEndIndexs[index]]);
		}
		dispatch('confirm', { items, indexs: lastSelectedIndexs });
	};

	// 监听 visible 的变化，触发 show 或 close 事件
	// Listen to the change of visible, trigger the show or close event
	$: {
		if (visible) {
			dispatch('open');
		} else {
			dispatch('close');
		}
	}

	// 滚动结束
	// Scroll end
	const scrollEndFunc = (e, col) => {
		// col 为当前滚动结束的列的索引
		// index 为当前滚动结束的列的选中项的索引
		const { index } = e.detail;
		scrollEndIndexs[col] = index;
		if (isLinkage) {
			// 任何列滚动之后，使传入的 linkageInitIndexs 都会失效，将所有下级的初始选中项设置为 0
			// After any column scrolls, the linkageInitIndexs passed in will all be invalid, and set the initial selected item of all lower levels to 0
			for (let i = col + 1; i < newDatas.length; i++) {
				newDatas[i].initIndex = 0;
			}
			// 递归计算当前列的数据
			// Recursively calculate the data of the current column
			if (col === 0) {
				preLevelData = [];
				currentLevelData = datas;
				// nextLevelData = datas[index][linkageChildrenKey] || [];
				allLevelData[0] = datas;
			} else {
				preLevelData = allLevelData[col - 1];
				currentLevelData = preLevelData[scrollEndIndexs[col - 1]] ? preLevelData[scrollEndIndexs[col - 1]][linkageChildrenKey] : []; //当前级数据
			}
			// 递归计算后面的所有列数据
			// Tail recursion to calculate the data of all columns behind
			const recursionFunc = (col, currentLevelData) => {
				const nextCol = col + 1;
				if (nextCol < newDatas.length) {
					const nextLevelData =
						currentLevelData.length === 1
							? currentLevelData[0]
								? currentLevelData[0][linkageChildrenKey]
								: []
							: currentLevelData[index]
								? currentLevelData[index][linkageChildrenKey]
								: [];
					if (nextLevelData.length > 0) {
						const nextData = nextLevelData.map(item =>
							linkageLabelKeys[col + 1] ? { label: item[linkageLabelKeys[col + 1]] } : { label: item.label },
						);
						// 将数据置空，此列数据为空，此列将立即消失，然后通过 setTimeout 立即设置数据，使得数据更新后，此列才会出现
						// Set the data to empty, the data of this column is empty, this column will disappear immediately, and then set the data immediately through setTimeout, so that the data is updated, this column will appear
						newDatas[nextCol].data = [];
						setTimeout(() => {
							newDatas[nextCol].data = nextData;
						});
						allLevelData[nextCol] = nextLevelData;
						recursionFunc(nextCol, nextLevelData);
					} else {
						// 如果下一级没有数据，则将下一级的数据置空
						// If there is no data in the next level, set the data of the next level to empty
						// 也可以用来解决数据层级超级大的时候，递归计算数据的性能问题，暂时将后面的数据置空，等到有数据的时候再设置，避免选择数据与视图不同步的问题
						// It can also be used to solve the performance problem of recursive calculation of data when the data hierarchy is super large. Temporarily set the data behind to empty, and set it when there is data, to avoid the problem that the selected data and the view are not synchronized
						newDatas[nextCol].data = [];
					}
				}
			};

			// 递归计算后面的所有列数据
			// Recursively calculate the data of all columns behind
			// const recursionFunc = (col, currentLevelData) => {
			//     const nextCol = col + 1;
			//     if (nextCol < newDatas.length) {
			//         const nextLevelData =
			//             currentLevelData.length === 1
			//                 ? currentLevelData[0]
			//                     ? currentLevelData[0][linkageChildrenKey]
			//                     : []
			//                 : currentLevelData[index]
			//                 ? currentLevelData[index][linkageChildrenKey]
			//                 : [];
			//         if (nextLevelData.length > 0) {
			//             const nextData = nextLevelData.map(item =>
			//                 linkageLabelKeys[col + 1] ? { label: item[linkageLabelKeys[col + 1]] } : { label: item.label }
			//             );
			//             // 将数据置空，此列数据为空，此列将立即消失，然后通过 setTimeout 立即设置数据，此列数据不为空，此列将立即出现，由此保证下级数据从0开始
			//             // Set the data to empty, the data of this column is empty, this column will disappear immediately, and then set the data immediately through setTimeout, the data of this column is not empty, this column will appear immediately, thus ensuring that the next level data starts from 0
			//             newDatas[nextCol].data = [];
			//             setTimeout(() => {
			//                 newDatas[nextCol].data = nextData;
			//                 newDatas[nextCol].initIndex = 0;
			//             });
			//         }
			//         allLevelData[col] = currentLevelData;
			//         allLevelData[nextCol] = nextLevelData;
			//         recursionFunc(nextCol, nextLevelData);
			//     }
			//     // 使用尾递归优化 recursionFunc , 使其不会因为递归层级过深而导致栈溢出
			//     // Use tail recursion optimization recursionFunc to prevent stack overflow due to too deep recursion level
			// };
			recursionFunc(col, currentLevelData);
		}
	};
</script>

<Popup
	bind:visible
	size={0}
	maskClosable
	transitionDistance={(maxShowRows === 3 ? 64 : maxShowRows === 5 ? 48 : 32) * maxShowRows + 41}
	{...popup}
>
	<div class="flex justify-between items-center bg-white dark:bg-black border-b border-black/10 dark:border-white/20">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div class="text-black/60 dark:text-white/60 h-10 leading-10 px-4 cursor-pointer" on:click={clickCancelFunc}>{cancelText}</div>
		<div>{title}</div>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div class="text-primary dark:text-dark h-10 leading-10 px-4 cursor-pointer" on:click={clickConfirmFunc}>{confirmText}</div>
	</div>
	<div class="flex justify-around items-center gap-1 bg-white dark:bg-black">
		{#each newDatas as item, col}
			<div class="truncate" style="flex:{item.flex}">
				{#if item.data.length > 0}
					<ScrollRadio
						data={item.data}
						initIndex={item.initIndex}
						showRow={item.showRow}
						labelKey={item.labelKey}
						align={item.align}
						useAnimation={item.useAnimation}
						lastSelectedIndex={lastSelectedIndexs[col]}
						{autoScrollToLast}
						on:scrollEnd={e => scrollEndFunc(e, col)}
					/>
				{/if}
			</div>
		{/each}
	</div>
</Popup>
