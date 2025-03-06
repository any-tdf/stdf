<script lang="ts">
	import { getContext } from 'svelte';
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
		getDaysRangeWithToday
	} from '../utils/index.js';
	import { zh_CN, type LangProps } from '../../lang/index.js';
	import type { CalendarProps } from '../../types/index.js';

	// 当前语言
	// current language
	const currentLang = (getContext('STDF_lang') || zh_CN) as LangProps;
	const calendarLang: LangProps['calendar'] = currentLang.calendar;

	let {
		visible = $bindable(false),
		startMonth = getNowBeforeOrAfterMonth(-6),
		endMonth = getNowBeforeOrAfterMonth(6),
		initMonth = getNowBeforeOrAfterMonth(0),
		mode = 'single',
		startSunday = false,
		weekendRed = false,
		monthCard = true,
		monthMark = false,
		monthMarkSize = '7xl',
		height = 50,
		infoDates = [],
		disabledDates = [],
		radius = 'xl',
		showSelectedDay = true,
		confirmText = calendarLang.confirmText,
		selectedText = calendarLang.selectedText,
		dayText = calendarLang.dayText,
		quickSelects = [],
		includeToday = false,
		useAnimation = true,
		highlightToday = true,
		outFormat = 'YYYYMMDD',
		popup = {},
		button = {},
		clear = true,
		onconfirm,
		onclose
	}: CalendarProps = $props();

	// 圆角风格样式
	// Rounded style style
	const radiusClass = { sm: 'rounded-sm', xl: 'rounded-xl', '2xl': 'rounded-2xl', none: 'rounded-none' };

	// 月份水印文字大小样式
	// Month watermark text size style
	const monthMarkSizeClass = {
		'3xl': 'text-3xl',
		'4xl': 'text-4xl',
		'5xl': 'text-5xl',
		'6xl': 'text-6xl',
		'7xl': 'text-7xl',
		'8xl': 'text-8xl',
		'9xl': 'text-9xl'
	};

	// 当天日期字符串，YYYYMMDD，日和天不足两位时前面补 0
	// Today's date string, YYYYMMDD, day and day are not less than two digits, and 0 is filled in front
	const now = new Date();
	const nowYear = now.getFullYear();
	const nowMonth = now.getMonth() + 1;
	const nowDay = now.getDate();
	const todayStr = `${nowYear}${nowMonth < 10 ? '0' + nowMonth : nowMonth}${nowDay < 10 ? '0' + nowDay : nowDay}`;

	// 滚动元素
	// Scroll element
	let scrollElement = $state<HTMLDivElement | null>(null);

	// 是否点击了快速选择
	// Whether to click the quick selection
	let isQuickSelect = $state(false);

	// 定义周数据文字
	// Define the week data text
	const weekTexts = startSunday ? calendarLang.weekSundayStartTextList : calendarLang.weekTextList;

	// 传入 startSunday 和位于周的索引，返回是否是周末
	// Pass in startSunday and the index of the week, and return whether it is a weekend
	const isWeekendFunc = (startSunday: boolean, index: number) => {
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
	const initMonthIndex = monthList.findIndex((item) => item === initMonth);

	// 循环 monthList，根据每个月份的数据，生成全部的日历数据，其中 month 为当前月，year 为年，data 为日期数组
	// Loop monthList, generate all calendar data according to the data of each month, where month is the current month, year is the year, and data is the date array
	const allMonthData: {
		year: string;
		month: string;
		days: { text: string; info?: string; disabled?: boolean; start?: boolean; end?: boolean }[];
	}[] = monthList.map((monthStr) => ({
		year: monthStr.slice(0, 4),
		month: monthStr.slice(4),
		days: getCalendarData(monthStr, startSunday).map((item) => ({
			text: item,
			info: '',
			disabled: false,
			start: false,
			end: false
		}))
	}));

	// 如果 infoDates 不为空，循环 allMonthData，循环 data，循环 infoDates，如果 infoDates 中的日期和 data 中的日期相同，将 infoDates 中的 info 赋值给 data 中的 info
	// If infoDates is not empty, loop allMonthData, loop data, loop infoDates, if the date in infoDates is the same as the date in data, assign the info in infoDates to the info in data
	if (infoDates.length > 0) {
		allMonthData.forEach((monthData) => {
			monthData.days.forEach((item) => {
				infoDates.forEach((info) => {
					if (info.text === monthData.year + monthData.month + item.text) {
						item.info = info.info;
					}
				});
			});
		});
	}

	// 如果 disabledDates 不为空，循环 allMonthData，循环 data，循环 disabledDates，如果 disabledDates 中的日期和 data 中的日期相同，将 disabledDates 中的 disabled 赋值给 data 中的 disabled
	// If disabledDates is not empty, loop allMonthData, loop data, loop disabledDates, if the date in disabledDates is the same as the date in data, assign the disabled in disabledDates to the disabled in data
	if (disabledDates.length > 0) {
		allMonthData.forEach((monthData) => {
			monthData.days.forEach((item) => {
				disabledDates.forEach((disabled) => {
					if (disabled === monthData.year + monthData.month + item.text) {
						item.disabled = true;
					}
				});
			});
		});
	}

	// 选中的日期
	// Selected date
	let selectedDate: string[] = $state([]);

	// 范围选择时，点击的开始与结束
	// When range selection is clicked, the beginning and end are clicked
	let rangeArr: string[] = [];

	// selectedDate 字符串
	// selectedDate string
	let selectedDateStr = $state('');

	// 点击日期事件
	// Click date event
	const clickDayFunc = (
		year: string,
		month: string,
		days: { text: string; info?: string; disabled?: boolean; start?: boolean; end?: boolean }
	) => {
		if (!days.text) {
			return;
		}
		if (isQuickSelect) {
			isQuickSelect = false;
			selectedDate = [];
		}
		if (mode === 'range') {
			rangeArr.push(`${year}${month}${days.text}`);
			if (rangeArr.length === 2) {
				// 将 rangeArr 排序，保证第一个日期小于第二个日期
				// Sort rangeArr to ensure that the first date is less than the second date
				rangeArr.sort((a, b) => Number(a) - Number(b));
				selectedDate = getDateRange(rangeArr[0], rangeArr[1], disabledDates);
				rangeArr = [];
			} else {
				selectedDate = rangeArr;
			}
		} else if (mode === 'multiple') {
			const index = selectedDate.findIndex((item) => item === `${year}${month}${days.text}`);
			if (index === -1) {
				selectedDate.push(`${year}${month}${days.text}`);
			} else {
				selectedDate.splice(index, 1);
			}
		} else {
			selectedDate = [`${year}${month}${days.text}`];
		}
		// 对 selectedDate 按照日期排序
		// Sort selectedDate by date
		selectedDate.sort((a, b) => Number(a) - Number(b));
		selectedDateStr = selectedDate.join(',');
	};

	// 快速选择项目
	// Quick selection item
	let quickSelectItem: string | number = $state('');

	// 点击快速选择
	// Click quick selection
	const quickSelectFunc = (type: string | number) => {
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
		if (typeof type === 'number' && Number.isInteger(type)) {
			selectedDate = getDaysRangeWithToday(type, includeToday);
		}
		// 剔除 disabledDates 中的日期
		// Remove dates in disabledDates
		if (disabledDates && disabledDates.length) {
			disabledDates.forEach((item) => {
				const index = selectedDate.findIndex((date) => date === item);
				if (index !== -1) {
					selectedDate.splice(index, 1);
				}
			});
		}
		selectedDateStr = selectedDate.join(',');
		// 对快速选择做自动滚动
		// Automatic scrolling for quick selection
		if (scrollElement) {
			// 取 selectedDate 的第一个值，再取出前 6 位，再在 monthList 中找到对应的索引，再根据索引计算出滚动的高度
			// Take the first value of selectedDate, then take the first 6 digits, then find the corresponding index in monthList, and then calculate the height of the scroll according to the index
			const index = monthList.findIndex((item) => item === selectedDate[0].slice(0, 6));
			scrollElement.scrollTop = scrollElement.scrollHeight * (index / monthList.length);
		}
	};

	// 传入日期格式与日期字符对象，将其中的前四位对应 format 的 YYYY，中间两位对应 format 的 MM，后两位对应 format 的 DD，返回格式化后的字符串
	// Pass in the date format and date character object, and return the formatted string
	const getDateStrFunc = (format: string, date: string) => {
		const year = date.slice(0, 4);
		const month = date.slice(4, 6);
		const day = date.slice(6, 8);
		format = format.replace('YYYY', year);
		format = format.replace('MM', month);
		format = format.replace('DD', day);
		return format;
	};

	// 点击确定事件
	// Click the confirm event
	const confirmFunc = () => {
		visible = false;
		// 根据传入的 outFormat，循环 selectedDate，将 selectedDate 中的日期使用 getDateStrFunc 转换为 outFormat 格式的日期字符串
		// Loop selectedDate according to the outFormat passed in, and use getDateStrFunc to convert the date in selectedDate to a date string in the outFormat format
		if (selectedDate.length) {
			selectedDate = selectedDate.map((item) => getDateStrFunc(outFormat, item));
		}
		onconfirm?.(selectedDate);
	};

	// 根据 initMonthIndex 在 monthList 中的索引，自动滚动到 scrollElement 高度的百分比
	// Automatically scroll to the percentage of the height of scrollElement according to the index of initMonthIndex in monthList
	$effect(() => {
		if (scrollElement && visible && !isQuickSelect) {
			scrollElement.scrollTop = scrollElement.scrollHeight * (initMonthIndex / monthList.length);
		}
	});

	// 监听 visible 的变化，派发事件
	// Listen to the change of visible, dispatch events
	$effect(() => {
		if (!visible) {
			if (clear) {
				selectedDate = [];
				selectedDateStr = '';
			}
			onclose?.();
		}
	});
</script>

<Popup
	bind:visible
	size={0}
	maskClosable
	transitionDistance={(window.innerHeight * height) / 100 + 40 + 64 + (quickSelects.length > 0 && mode === 'range' ? 36 : 0)}
	{...popup}
>
	<div>
		<div class="sticky left-0 top-0 z-10 w-full bg-gray-50 dark:bg-gray-800">
			{#if quickSelects.length > 0 && mode === 'range'}
				<div class="calendar-container flex flex-nowrap gap-4 overflow-x-auto px-4 pb-1 pt-2">
					{#each quickSelects as item}
						<button
							class="flex-none rounded-sm bg-white px-2 py-1 text-xs shadow-sm dark:bg-black dark:shadow-white/10"
							class:!bg-primary={isQuickSelect && quickSelectItem === item}
							class:text-white={isQuickSelect && quickSelectItem === item}
							class:dark:!bg-dark={isQuickSelect && quickSelectItem === item}
							class:dark:text-black={isQuickSelect && quickSelectItem === item}
							onclick={() => quickSelectFunc(item)}
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
						</button>
					{/each}
				</div>
			{/if}
			<div class="flex h-10 items-center justify-around gap-1 px-6 text-center leading-10">
				{#each weekTexts as item, index}
					<div class="flex-1 font-bold{weekendRed && isWeekendFunc(startSunday, index) ? ' text-error' : ''}">
						{item}
					</div>
				{/each}
			</div>
		</div>
		<div
			class="calendar-container flex flex-col gap-4 overflow-y-auto bg-gray-50 px-4 py-2 dark:bg-gray-800 {useAnimation
				? 'scroll-smooth'
				: 'scroll-auto'}"
			style="height:{(window.innerHeight * height) / 100}px"
			bind:this={scrollElement}
		>
			{#each allMonthData as item}
				<div
					class="{monthCard ? `bg-white shadow-md dark:bg-black dark:shadow-white/5 ${radiusClass[radius] || 'rounded-xl'}` : ''} relative"
				>
					<div class="px-4 pt-4 text-xl text-black/30 dark:text-white/30">
						<span class="mr-2 font-bold text-black dark:text-white">
							{calendarLang.monthTextList[Number(item.month) - 1]}
						</span>
						{item.year}
					</div>
					<div class="grid grid-cols-7 gap-y-1 p-2 text-center">
						{#each item.days as day}
							<button
								class="p-px{day.text ? ' bg-primary/10 dark:bg-dark/20' : ''}"
								onclick={() => {
									if (!day.disabled) clickDayFunc(item.year, item.month, day);
								}}
								class:!bg-transparent={!selectedDateStr.includes(`${item.year}${item.month}${day.text}`)}
								class:!rounded-l-xl={radius === 'xl' &&
									mode === 'range' &&
									(selectedDateStr.indexOf(`${item.year}${item.month}${day.text}`) === 0 || day.start)}
								class:!rounded-r-xl={radius === 'xl' &&
									mode === 'range' &&
									(selectedDateStr.indexOf(`${item.year}${item.month}${day.text}`) === selectedDateStr.length - 8 || day.end)}
								class:!rounded-xl={radius === 'xl' && mode !== 'range'}
								class:!rounded-l-2xl={radius === '2xl' &&
									mode === 'range' &&
									(selectedDateStr.indexOf(`${item.year}${item.month}${day.text}`) === 0 || day.start)}
								class:!rounded-r-2xl={radius === '2xl' &&
									mode === 'range' &&
									(selectedDateStr.indexOf(`${item.year}${item.month}${day.text}`) === selectedDateStr.length - 8 || day.end)}
								class:!rounded-2xl={radius === '2xl' && mode !== 'range'}
								class:!rounded-l-none={radius === 'none' &&
									mode === 'range' &&
									(selectedDateStr.indexOf(`${item.year}${item.month}${day.text}`) === 0 || day.start)}
								class:!rounded-r-none={radius === 'none' &&
									mode === 'range' &&
									(selectedDateStr.indexOf(`${item.year}${item.month}${day.text}`) === selectedDateStr.length - 8 || day.end)}
								class:!rounded-none={radius === 'none' && mode !== 'range'}
								class:!rounded-l-sm={radius === 'sm' &&
									mode === 'range' &&
									(selectedDateStr.indexOf(`${item.year}${item.month}${day.text}`) === 0 || day.start)}
								class:!rounded-r-sm={radius === 'sm' &&
									mode === 'range' &&
									(selectedDateStr.indexOf(`${item.year}${item.month}${day.text}`) === selectedDateStr.length - 8 || day.end)}
								class:!rounded-sm={radius === 'sn' && mode !== 'range'}
							>
								<div
									class="{radiusClass[radius] || 'rounded-xl'} relative flex h-full w-full flex-col justify-center {day.info
										? 'py-1'
										: 'py-2'}"
									class:bg-primary={(day.text && mode !== 'range' && selectedDateStr.includes(`${item.year}${item.month}${day.text}`)) ||
										(day.text &&
											selectedDateStr.includes(`${item.year}${item.month}${day.text}`) &&
											mode === 'range' &&
											(selectedDateStr.indexOf(`${item.year}${item.month}${day.text}`) === 0 ||
												selectedDateStr.indexOf(`${item.year}${item.month}${day.text}`) === selectedDateStr.length - 8))}
									class:dark:bg-dark={(day.text && mode !== 'range' && selectedDateStr.includes(`${item.year}${item.month}${day.text}`)) ||
										(day.text &&
											selectedDateStr.includes(`${item.year}${item.month}${day.text}`) &&
											mode === 'range' &&
											(selectedDateStr.indexOf(`${item.year}${item.month}${day.text}`) === 0 ||
												selectedDateStr.indexOf(`${item.year}${item.month}${day.text}`) === selectedDateStr.length - 8))}
									class:text-white={(day.text && mode !== 'range' && selectedDateStr.includes(`${item.year}${item.month}${day.text}`)) ||
										(day.text &&
											selectedDateStr.includes(`${item.year}${item.month}${day.text}`) &&
											mode === 'range' &&
											(selectedDateStr.indexOf(`${item.year}${item.month}${day.text}`) === 0 ||
												selectedDateStr.indexOf(`${item.year}${item.month}${day.text}`) === selectedDateStr.length - 8))}
									class:dark:text-black={(day.text &&
										mode !== 'range' &&
										selectedDateStr.includes(`${item.year}${item.month}${day.text}`)) ||
										(day.text &&
											selectedDateStr.includes(`${item.year}${item.month}${day.text}`) &&
											mode === 'range' &&
											(selectedDateStr.indexOf(`${item.year}${item.month}${day.text}`) === 0 ||
												selectedDateStr.indexOf(`${item.year}${item.month}${day.text}`) === selectedDateStr.length - 8))}
									class:text-primary={mode === 'range' &&
										selectedDateStr.includes(`${item.year}${item.month}${day.text}`) &&
										selectedDateStr.indexOf(`${item.year}${item.month}${day.text}`) !== 0 &&
										selectedDateStr.indexOf(`${item.year}${item.month}${day.text}`) !== selectedDateStr.length - 8}
									class:dark:text-dark={mode === 'range' &&
										selectedDateStr.includes(`${item.year}${item.month}${day.text}`) &&
										selectedDateStr.indexOf(`${item.year}${item.month}${day.text}`) !== 0 &&
										selectedDateStr.indexOf(`${item.year}${item.month}${day.text}`) !== selectedDateStr.length - 8}
									class:border={item.year + item.month + day.text === todayStr && highlightToday}
									class:border-primary={item.year + item.month + day.text === todayStr && highlightToday}
									class:dark:border-dark={item.year + item.month + day.text === todayStr && highlightToday}
								>
									<div class="font-bold">
										{day.text ? Number(day.text) : ''}
									</div>
									<div class="text-xs opacity-50">{day.info || ''}</div>
									{#if day.text && day.disabled}
										<div
											class="absolute left-1/2 top-1/2 h-4/5 w-4/5 -translate-x-1/2 -translate-y-1/2 text-black/60 opacity-40 dark:text-white"
										>
											<svg viewBox="0 0 1024 1024" version="1.1" width="100%" height="100%" style="fill: currentColor;">
												<path
													d="M512 85.333333c235.648 0 426.666667 191.018667 426.666667 426.666667s-191.018667 426.666667-426.666667 426.666667S85.333333 747.648 85.333333 512 276.352 85.333333 512 85.333333zM170.666667 512a341.333333 341.333333 0 0 0 550.016 270.08L241.92 303.36A339.84 339.84 0 0 0 170.666667 512z m341.333333-341.333333a339.882667 339.882667 0 0 0-209.877333 72.106666L781.226667 721.92A341.333333 341.333333 0 0 0 512 170.666667z"
												/>
											</svg>
										</div>
									{/if}
								</div>
							</button>
						{/each}
					</div>
					{#if monthMark}
						<div
							class="pointer-events-none absolute w-full {monthMarkSizeClass[monthMarkSize] ||
								'text-7xl'} left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center font-bold text-black/5 {monthCard
								? 'dark:text-white/10'
								: 'dark:text-white/5'}"
						>
							{calendarLang.monthTextList[Number(item.month) - 1]}
						</div>
					{/if}
				</div>
			{/each}
		</div>
		<div class="sticky bottom-0 left-0 z-10 w-full bg-gray-50 dark:bg-gray-800">
			<Button {...button} onclick={confirmFunc}>
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
