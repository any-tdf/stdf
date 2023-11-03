<script>
	import { createEventDispatcher, getContext } from 'svelte';
	import Popup from '../popup/Popup.svelte';
	import Button from '../button/Button.svelte';
	import {
		getNowBeforeOrAfterMonth,
		getCalendarData,
		getMonthListRange,
		getDateRange,
		getCurrentWeek,
		getCurrentMonth,
		getCurrentQuarter,
		getDaysRangeWithToday,
	} from '../utils';
	import zh_CN from '../../lang/zh_CN';

	// 定义事件派发器
	// Define event dispatcher
	const dispatch = createEventDispatcher();

	// 当前语言
	// current language
	const currentLang = getContext('STDF_lang') || zh_CN;
	const calendarLang = currentLang.calendar;

	// 是否显示
	// Whether to show
	export let visible = false;

	// 传入的开始月，默认为当前月前6个月
	// The start month passed in, default is 6 months before the current month
	export let startMonth = getNowBeforeOrAfterMonth(-6);

	// 传入的结束月，默认为当前月后6个月
	// The end month passed in, default is 6 months after the current month
	export let endMonth = getNowBeforeOrAfterMonth(6);

	// 初始化时显示月份，默认当前月
	// The month displayed when initializing, default current month
	export let initMonth = getNowBeforeOrAfterMonth(0);

	// 选择模式，single 单选，multiple 多选，range 范围选择
	// Selection mode, single single selection, multiple multiple selection, range range selection
	export let mode = 'single';

	// 是否从周日开始
	// Whether to start from Sunday
	export let startSunday = false;

	// 周末文字是否标红
	// Whether the weekend text is marked red
	export let weekendRed = false;

	// 月数据是否使用卡片样式
	// Whether to use the card style for the month data
	export let monthCard = true;

	// 是否显示月份水印
	// Whether to show the month watermark
	export let monthMark = false;

	// 月份水印文字大小
	// Month watermark text size
	export let monthMarkSize = 'xl';

	// 高度百分比
	// Height percentage
	export let height = 50;

	// 显示信息的日期
	// Date to display information
	export let infoDates = [];

	// 不允许选择日期集合
	// Collection of dates not allowed to be selected
	export let disabledDates = [];

	// 圆角风格
	// Rounded style
	export let radius = 'xl';

	// 多选和范围选择时显示已选天数
	// Show the number of days selected when multiple and range selection
	export let showSelectedDay = true;

	// 确认文本
	// Confirm text
	export let confirmText = calendarLang.confirmText;

	// 已选文本
	// Selected text
	export let selectedText = calendarLang.selectedText;

	// 天数文本
	// Number of days text
	export let dayText = calendarLang.dayText;

	// 快速选择配置，可选值为：本周 currentWeek，本月 currentMonth，本季度 currentQuarter，前三天 beforeThreeDay，前7天 beforeSevenDay，前30天 beforeThirtyDay，后三天 afterThreeDay，后7天 afterSevenDay，后30天 afterThirtyDay
	// Quick selection configuration, optional values are: currentWeek, currentMonth, currentQuarter, beforeThreeDay, beforeSevenDay, beforeThirtyDay, afterThreeDay, afterSevenDay, afterThirtyDay
	export let quickSelects = [];

	// 快速选择天数时是否包含今天
	// Whether to include today when selecting the number of days quickly
	export let includeToday = false;

	// 自动滚动到某个月时，是否使用动画
	// Whether to use animation when automatically scrolling to a month
	export let useAnimation = true;

	// 高亮显示今天
	// Highlight today
	export let highlightToday = true;

	// 返回日期数据格式
	// Return data format
	export let outFormat = 'YMD';

	// 弹出层参数
	// Popup parameters
	export let popup = {};

	// 按钮参数
	// Button parameters
	export let button = {};

	// 圆角风格样式
	// Rounded style style
	const radiusClass = {
		base: 'rounded',
		xl: 'rounded-xl',
		'2xl': 'rounded-2xl',
		none: 'rounded-none',
	};

	// 月份水印文字大小样式
	// Month watermark text size style
	const monthMarkSizeClass = {
		'3xl': 'text-3xl',
		'4xl': 'text-4xl',
		'5xl': 'text-5xl',
		'6xl': 'text-6xl',
		'7xl': 'text-7xl',
		'8xl': 'text-8xl',
		'9xl': 'text-9xl',
	};

	// 当天日期字符串，YYYYMMDD，日和天不足两位时前面补0
	// Today's date string, YYYYMMDD, day and day are not less than two digits, and 0 is filled in front
	const now = new Date();
	const nowYear = now.getFullYear();
	const nowMonth = now.getMonth() + 1;
	const nowDay = now.getDate();
	const todayStr = `${nowYear}${nowMonth < 10 ? '0' + nowMonth : nowMonth}${nowDay < 10 ? '0' + nowDay : nowDay}`;

	// 滚动元素
	// Scroll element
	let scrollElement = null;

	// 是否点击了快速选择
	// Whether to click the quick selection
	let isQuickSelect = false;

	// 定义周数据文字
	// Define the week data text
	const weekTexts = startSunday ? calendarLang.weekSundayStartTextList : calendarLang.weekTextList;

	// 传入 startSunday 和位于周的索引，返回是否是周末
	// Pass in startSunday and the index of the week, and return whether it is a weekend
	const isWeekendFunc = (startSunday, index) => {
		if (startSunday) {
			return index === 0 || index === 6;
		} else {
			return index === 5 || index === 6;
		}
	};

	// 根据 startMonth 和 endMonth 将月份数据组成 monthList
	// According to startMonth and endMonth, the month data is assembled into monthList
	const monthList = getMonthListRange(startMonth, endMonth);

	// 如果 initMonth 在 startMonth 和 endMonth 之间 initMonthIndex 为 initMonth 在 monthList 中的索引，如果在 startMonth 之前，initMonthIndex 为 0，如果在 endMonth 之后，initMonthIndex 为 monthList.length - 1
	// If initMonth is between startMonth and endMonth, initMonthIndex is the index of initMonth in monthList. If it is before startMonth, initMonthIndex is 0. If it is after endMonth, initMonthIndex is monthList.length - 1
	const initMonthIndex = monthList.findIndex(item => item === initMonth);

	// 循环 monthList，根据每个月份的数据，生成全部的日历数据，其中 month 为当前月，year 为年，data 为日期数组
	// Loop monthList, generate all calendar data according to the data of each month, where month is the current month, year is the year, and data is the date array
	const allMonthData = monthList.map(monthStr => {
		return {
			year: monthStr.slice(0, 4),
			month: monthStr.slice(4),
			data: getCalendarData(monthStr, startSunday),
		};
	});

	// 如果 infoDates 不为空，循环 allMonthData，循环 data，循环 infoDates，如果 infoDates 中的日期和 data 中的日期相同，将 infoDates 中的 info 赋值给 data 中的 info
	// If infoDates is not empty, loop allMonthData, loop data, loop infoDates, if the date in infoDates is the same as the date in data, assign the info in infoDates to the info in data
	if (infoDates.length > 0) {
		allMonthData.forEach(monthData => {
			monthData.data.forEach(data => {
				infoDates.forEach(info => {
					if (info.date === monthData.year + monthData.month + data.day) {
						data.info = info.info;
					}
				});
			});
		});
	}

	// 如果 disabledDates 不为空，循环 allMonthData，循环 data，循环 disabledDates，如果 disabledDates 中的日期和 data 中的日期相同，将 disabledDates 中的 disabled 赋值给 data 中的 disabled
	// If disabledDates is not empty, loop allMonthData, loop data, loop disabledDates, if the date in disabledDates is the same as the date in data, assign the disabled in disabledDates to the disabled in data
	if (disabledDates.length > 0) {
		allMonthData.forEach(monthData => {
			monthData.data.forEach(data => {
				disabledDates.forEach(disabled => {
					if (disabled === monthData.year + monthData.month + data.day) {
						data.disabled = true;
					}
				});
			});
		});
	}

	// 选中的日期
	// Selected date
	let selectedDate = [];

	// 范围选择时，点击的开始与结束
	// When range selection is clicked, the beginning and end are clicked
	let rangeArr = [];

	// selectedDate 字符串
	// selectedDate string
	let selectedDateStr = '';

	// 点击日期事件
	// Click date event
	const clickDayFunc = (year, month, dayData) => {
		if (!dayData.day) {
			return;
		}
		if (isQuickSelect) {
			isQuickSelect = false;
			selectedDate = [];
		}
		if (mode === 'range') {
			rangeArr.push(`${year}${month}${dayData.day}`);
			if (rangeArr.length === 2) {
				// 将 rangeArr 排序，保证第一个日期小于第二个日期
				// Sort rangeArr to ensure that the first date is less than the second date
				rangeArr.sort((a, b) => {
					return Number(a) - Number(b);
				});
				selectedDate = getDateRange(rangeArr[0], rangeArr[1], disabledDates);
				rangeArr = [];
			} else {
				selectedDate = rangeArr;
			}
		} else if (mode === 'multiple') {
			const index = selectedDate.findIndex(item => item === `${year}${month}${dayData.day}`);
			if (index === -1) {
				selectedDate.push(`${year}${month}${dayData.day}`);
			} else {
				selectedDate.splice(index, 1);
			}
		} else {
			selectedDate = [`${year}${month}${dayData.day}`];
		}
		// 对 selectedDate 按照日期排序
		// Sort selectedDate by date
		selectedDate.sort((a, b) => {
			return Number(a) - Number(b);
		});
		selectedDateStr = selectedDate.join(',');
	};

	// 快速选择项目
	// Quick selection item
	let quickSelectItem = '';

	// 点击快速选择
	// Click quick selection
	const quickSelectFunc = type => {
		isQuickSelect = true;
		quickSelectItem = type;
		if (type === 'week') {
			selectedDate = getCurrentWeek(startSunday);
		}
		if (type === 'month') {
			selectedDate = getCurrentMonth();
		}
		if (type === 'quarter') {
			selectedDate = getCurrentQuarter();
		}
		// 如果 type 是数字类型且是整数，表示选择最近几天，负整数表示选择之前几天，正整数表示选择之后几天
		// If type is a number type and is an integer, it means to select the last few days. A negative integer means to select the previous few days, and a positive integer means to select the next few days
		if (Number.isInteger(type)) {
			selectedDate = getDaysRangeWithToday(type, includeToday);
		}
		// 剔除 disabledDates 中的日期
		// Remove dates in disabledDates
		if (disabledDates && disabledDates.length) {
			disabledDates.forEach(item => {
				const index = selectedDate.findIndex(date => date === item);
				if (index !== -1) {
					selectedDate.splice(index, 1);
				}
			});
		}
		selectedDateStr = selectedDate.join(',');
		// 对快速选择做自动滚动
		// Automatic scrolling for quick selection
		if (scrollElement) {
			// 取 selectedDate 的第一个值，再取出前6位，再在 monthList 中找到对应的索引，再根据索引计算出滚动的高度
			// Take the first value of selectedDate, then take the first 6 digits, then find the corresponding index in monthList, and then calculate the height of the scroll according to the index
			const index = monthList.findIndex(item => item === selectedDate[0].slice(0, 6));
			scrollElement.scrollTop = scrollElement.scrollHeight * (index / monthList.length);
		}
	};

	// 传入日期格式与日期字符对象，将其中的前四位对应 format 的Y，中间两位对应 format 的M，后两位对应 format 的D，返回格式化后的字符串
	// Pass in the date format and date character object, and return the formatted string
	const getDateStrFunc = (format, date) => {
		let year = date.slice(0, 4);
		let month = date.slice(4, 6);
		let day = date.slice(6, 8);
		format = format.replace('Y', year);
		format = format.replace('M', month);
		format = format.replace('D', day);
		return format;
	};

	// 点击确定事件
	// Click the confirm event
	const confirmFunc = () => {
		visible = false;
		// 根据传入的 outFormat，循环 selectedDate，将 selectedDate 中的日期使用 getDateStrFunc 转换为 outFormat 格式的日期字符串
		// Loop selectedDate according to the outFormat passed in, and use getDateStrFunc to convert the date in selectedDate to a date string in the outFormat format
		if (selectedDate.length) {
			selectedDate = selectedDate.map(item => {
				return getDateStrFunc(outFormat, item);
			});
		}
		dispatch('confirm', { dates: selectedDate });
	};

	// 根据 initMonthIndex 在 monthList 中的索引，自动滚动到 scrollElement 高度的百分比
	// Automatically scroll to the percentage of the height of scrollElement according to the index of initMonthIndex in monthList
	$: {
		if (scrollElement && visible && !isQuickSelect) {
			scrollElement.scrollTop = scrollElement.scrollHeight * (initMonthIndex / monthList.length);
		}
	}

	// 监听 visible 的变化，派发事件
	// Listen to the change of visible, dispatch events
	$: {
		if (visible) {
			dispatch('open');
		} else {
			selectedDate = [];
			selectedDateStr = '';
			dispatch('close');
		}
	}
</script>

<Popup
	bind:visible
	size={0}
	maskClosable
	transitionDistance={(window.innerHeight * height) / 100 + 40 + 64 + (quickSelects.length > 0 && mode === 'range' ? 36 : 0)}
	{...popup}
>
	<div>
		<div class="sticky z-10 top-0 left-0 w-full bg-gray-50 dark:bg-gray-800">
			{#if quickSelects.length > 0 && mode === 'range'}
				<div class="flex flex-nowrap gap-4 px-4 pt-2 pb-1 overflow-x-auto calendar-container">
					{#each quickSelects as item}
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<!-- svelte-ignore a11y-no-static-element-interactions -->
						<div
							class="text-xs px-2 py-1 cursor-pointer flex-none bg-white dark:bg-black dark:shadow-white/10 shadow rounded"
							class:!bg-primary={isQuickSelect && quickSelectItem === item}
							class:text-white={isQuickSelect && quickSelectItem === item}
							class:dark:!bg-dark={isQuickSelect && quickSelectItem === item}
							class:dark:text-black={isQuickSelect && quickSelectItem === item}
							on:click={() => quickSelectFunc(item)}
						>
							{#if item === 'week'}
								{calendarLang.currentWeekText}
							{:else if item === 'month'}
								{calendarLang.currentMonthText}
							{:else if item === 'quarter'}
								{calendarLang.currentQuarterText}
							{:else if Number.isInteger(item) && item < 0}
								{calendarLang.beforeText + ' ' + Math.abs(item) + ' ' + calendarLang.dayText}
							{:else if Number.isInteger(item) && item > 0}
								{calendarLang.afterText + ' ' + Math.abs(item) + ' ' + calendarLang.dayText}
							{:else}
								<!-- else content here -->
							{/if}
						</div>
					{/each}
				</div>
			{/if}
			<div class="flex justify-around items-center text-center gap-1 px-6 h-10 leading-10">
				{#each weekTexts as item, index}
					<div class={`flex-1 font-bold${weekendRed && isWeekendFunc(startSunday, index) ? ' text-error' : ''}`}>
						{item}
					</div>
				{/each}
			</div>
		</div>
		<div
			class={`bg-gray-50 dark:bg-gray-800 py-2 px-4 flex flex-col gap-4 overflow-y-auto calendar-container ${
				useAnimation ? 'scroll-smooth' : 'scroll-auto'
			}`}
			style="height:{(window.innerHeight * height) / 100}px"
			bind:this={scrollElement}
		>
			{#each allMonthData as item}
				<div class={`${monthCard ? 'bg-white dark:bg-black shadow-md dark:shadow-white/5 rounded-xl ' : ''}relative`}>
					<div class="px-4 pt-4 text-xl text-black/30 dark:text-white/30">
						<span class="font-bold text-black dark:text-white mr-2">
							{calendarLang.monthTextList[Number(item.month) - 1]}
						</span>
						{item.year}
					</div>
					<div class={`grid grid-cols-7 gap-y-1 text-center p-2`}>
						{#each item.data as i}
							<!-- svelte-ignore a11y-click-events-have-key-events -->
							<!-- svelte-ignore a11y-no-static-element-interactions -->
							<div
								class={`p-px cursor-pointer${i.day ? ' bg-primary/10 dark:bg-dark/20' : ''}`}
								on:click={() => {
									if (!i.disabled) clickDayFunc(item.year, item.month, i);
								}}
								class:!bg-transparent={!selectedDateStr.includes(`${item.year}${item.month}${i.day}`)}
								class:!rounded-l-xl={radius === 'xl' &&
									mode === 'range' &&
									(selectedDateStr.indexOf(`${item.year}${item.month}${i.day}`) === 0 || i.start)}
								class:!rounded-r-xl={radius === 'xl' &&
									mode === 'range' &&
									(selectedDateStr.indexOf(`${item.year}${item.month}${i.day}`) === selectedDateStr.length - 8 || i.end)}
								class:!rounded-xl={radius === 'xl' && mode !== 'range'}
								class:!rounded-l-2xl={radius === '2xl' &&
									mode === 'range' &&
									(selectedDateStr.indexOf(`${item.year}${item.month}${i.day}`) === 0 || i.start)}
								class:!rounded-r-2xl={radius === '2xl' &&
									mode === 'range' &&
									(selectedDateStr.indexOf(`${item.year}${item.month}${i.day}`) === selectedDateStr.length - 8 || i.end)}
								class:!rounded-2xl={radius === '2xl' && mode !== 'range'}
								class:!rounded-l-none={radius === 'none' &&
									mode === 'range' &&
									(selectedDateStr.indexOf(`${item.year}${item.month}${i.day}`) === 0 || i.start)}
								class:!rounded-r-none={radius === 'none' &&
									mode === 'range' &&
									(selectedDateStr.indexOf(`${item.year}${item.month}${i.day}`) === selectedDateStr.length - 8 || i.end)}
								class:!rounded-none={radius === 'none' && mode !== 'range'}
								class:!rounded-l={radius === 'base' &&
									mode === 'range' &&
									(selectedDateStr.indexOf(`${item.year}${item.month}${i.day}`) === 0 || i.start)}
								class:!rounded-r={radius === 'base' &&
									mode === 'range' &&
									(selectedDateStr.indexOf(`${item.year}${item.month}${i.day}`) === selectedDateStr.length - 8 || i.end)}
								class:!rounded={radius === 'base' && mode !== 'range'}
							>
								<div
									class={`${radiusClass[radius] || 'rounded-xl'} relative w-full h-full flex flex-col justify-center ${
										i.info ? 'py-1' : 'py-2'
									}`}
									class:bg-primary={(i.day && mode !== 'range' && selectedDateStr.includes(`${item.year}${item.month}${i.day}`)) ||
										(i.day &&
											selectedDateStr.includes(`${item.year}${item.month}${i.day}`) &&
											mode === 'range' &&
											(selectedDateStr.indexOf(`${item.year}${item.month}${i.day}`) === 0 ||
												selectedDateStr.indexOf(`${item.year}${item.month}${i.day}`) === selectedDateStr.length - 8))}
									class:dark:bg-dark={(i.day && mode !== 'range' && selectedDateStr.includes(`${item.year}${item.month}${i.day}`)) ||
										(i.day &&
											selectedDateStr.includes(`${item.year}${item.month}${i.day}`) &&
											mode === 'range' &&
											(selectedDateStr.indexOf(`${item.year}${item.month}${i.day}`) === 0 ||
												selectedDateStr.indexOf(`${item.year}${item.month}${i.day}`) === selectedDateStr.length - 8))}
									class:text-white={(i.day && mode !== 'range' && selectedDateStr.includes(`${item.year}${item.month}${i.day}`)) ||
										(i.day &&
											selectedDateStr.includes(`${item.year}${item.month}${i.day}`) &&
											mode === 'range' &&
											(selectedDateStr.indexOf(`${item.year}${item.month}${i.day}`) === 0 ||
												selectedDateStr.indexOf(`${item.year}${item.month}${i.day}`) === selectedDateStr.length - 8))}
									class:dark:text-black={(i.day && mode !== 'range' && selectedDateStr.includes(`${item.year}${item.month}${i.day}`)) ||
										(i.day &&
											selectedDateStr.includes(`${item.year}${item.month}${i.day}`) &&
											mode === 'range' &&
											(selectedDateStr.indexOf(`${item.year}${item.month}${i.day}`) === 0 ||
												selectedDateStr.indexOf(`${item.year}${item.month}${i.day}`) === selectedDateStr.length - 8))}
									class:text-primary={mode === 'range' &&
										selectedDateStr.includes(`${item.year}${item.month}${i.day}`) &&
										selectedDateStr.indexOf(`${item.year}${item.month}${i.day}`) !== 0 &&
										selectedDateStr.indexOf(`${item.year}${item.month}${i.day}`) !== selectedDateStr.length - 8}
									class:dark:text-dark={mode === 'range' &&
										selectedDateStr.includes(`${item.year}${item.month}${i.day}`) &&
										selectedDateStr.indexOf(`${item.year}${item.month}${i.day}`) !== 0 &&
										selectedDateStr.indexOf(`${item.year}${item.month}${i.day}`) !== selectedDateStr.length - 8}
									class:border={item.year + item.month + i.day === todayStr && highlightToday}
									class:border-primary={item.year + item.month + i.day === todayStr && highlightToday}
									class:dark:border-dark={item.year + item.month + i.day === todayStr && highlightToday}
								>
									<div class="font-bold">
										{i.day ? Number(i.day) : ''}
									</div>
									<div class="text-xs opacity-50">{i.info || ''}</div>
									{#if i.day && i.disabled}
										<div
											class="absolute top-1/2 left-1/2 w-4/5 h-4/5 -translate-x-1/2 -translate-y-1/2 opacity-40 text-black/60 dark:text-white"
										>
											<svg viewBox="0 0 1024 1024" version="1.1" p-id="1470" width="100%" height="100%" style="fill: currentColor;">
												<path
													d="M512 85.333333c235.648 0 426.666667 191.018667 426.666667 426.666667s-191.018667 426.666667-426.666667 426.666667S85.333333 747.648 85.333333 512 276.352 85.333333 512 85.333333zM170.666667 512a341.333333 341.333333 0 0 0 550.016 270.08L241.92 303.36A339.84 339.84 0 0 0 170.666667 512z m341.333333-341.333333a339.882667 339.882667 0 0 0-209.877333 72.106666L781.226667 721.92A341.333333 341.333333 0 0 0 512 170.666667z"
													p-id="1471"
												/>
											</svg>
										</div>
									{/if}
								</div>
							</div>
						{/each}
					</div>
					{#if monthMark}
						<div
							class={`absolute pointer-events-none w-full ${
								monthMarkSizeClass[monthMarkSize] || 'text-7xl'
							} text-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-black/5 ${
								monthCard ? 'dark:text-white/10' : 'dark:text-white/5'
							}`}
						>
							{calendarLang.monthTextList[Number(item.month) - 1]}
						</div>
					{/if}
				</div>
			{/each}
		</div>
		<div class="sticky z-10 bottom-0 left-0 w-full bg-gray-50 dark:bg-gray-800">
			<Button {...button} on:click={confirmFunc}>
				{confirmText}
				{showSelectedDay && mode !== 'single' && selectedDateStr.split(',').length > 0
					? `(${selectedText} ${selectedDate.length} ${dayText})`
					: ''}
			</Button>
		</div>
	</div>
</Popup>

<style>
	.calendar-container::-webkit-scrollbar {
		display: none; /* Chrome Safari */
	}
</style>
