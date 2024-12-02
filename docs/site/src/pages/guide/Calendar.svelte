<script>
	import { getNowBeforeOrAfterMonth, getCalendarData, getMonthListRange, getDateRange } from 'stdf/utils';
	import {zh_CN,en_US}from 'stdf/lang';

	const isZh = localStorage.getItem('lang') === 'zh_CN';

	// 当前语言
	// current language
	const currentLang = isZh ? zh_CN : en_US;
	const calendarLang = currentLang.calendar;

	// 传入的开始月，默认为当前月前6个月
	// The start month passed in, default is 6 months before the current month
	export let startMonth = getNowBeforeOrAfterMonth(0);

	// 传入的结束月，默认为当前月后6个月
	// The end month passed in, default is 6 months after the current month
	export let endMonth = getNowBeforeOrAfterMonth(0);

	// 选择模式，single 单选，multiple 多选，range 范围选择
	// Selection mode, single single selection, multiple multiple selection, range range selection
	export let mode = 'range';

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

	// 显示信息的日期
	// Date to display information
	export let infoDates = [];

	// 不允许选择日期集合
	// Collection of dates not allowed to be selected
	export let disabledDates = [];

	// 圆角风格
	// Rounded style
	export let radius = 'xl';

	// 自动滚动到某个月时，是否使用动画
	// Whether to use animation when automatically scrolling to a month
	export let useAnimation = true;

	// 高亮显示今天
	// Highlight today
	export let highlightToday = true;

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

	// 生成一个随机数，在 5-20 之间，作为选定天数
	// Generate a random number between 5-20 as the selected day
	const randomDayNum = Math.floor(Math.random() * 16) + 5;

	// 从当前月份随机找到连续的 randomDayNum 天，作为 selectedDate 初始值，如 ['20231108', '20231109', '20231110', '20231111', '20231112']
	// From the current month, find randomDayNum consecutive days at random as the initial value of selectedDate, such as ['20231108', '20231109', '20231110', '20231111', '20231112']
	// 先获取当前月份所有日期，再获取当前月份所有日期中的连续 randomDayNum 天
	// First get all the dates of the current month, and then get randomDayNum consecutive days in all the dates of the current month
	let currentMonthAllDays = [];
	const currentMonth = new Date().getMonth() + 1;
	const currentYear = new Date().getFullYear();
	const currentMonthData = getCalendarData(`${currentYear}${currentMonth < 10 ? '0' + currentMonth : currentMonth}`, startSunday);
	const currentMonthDays = currentMonthData.filter(item => item.day).map(item => item.day);
	currentMonthDays.forEach((item, index) => {
		currentMonthAllDays.push(`${currentYear}${currentMonth < 10 ? '0' + currentMonth : currentMonth}${item}`);
	});
	// 从 currentMonthAllDays 随机找到连续的 5 天
	// Find 5 consecutive days at random from currentMonthAllDays
	const randomIndex = Math.floor(Math.random() * (currentMonthAllDays.length - randomDayNum));
	let selectedDate = currentMonthAllDays.slice(randomIndex, randomIndex + randomDayNum);

	// 范围选择时，点击的开始与结束
	// When range selection is clicked, the beginning and end are clicked
	let rangeArr = [];

	// selectedDate 字符串
	// selectedDate string
	$: selectedDateStr = selectedDate.join(',');

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

		// 对 selectedDate 按照日期排序
		// Sort selectedDate by date
		selectedDate.sort((a, b) => {
			return Number(a) - Number(b);
		});
	};
</script>

<div>
	<div class=" z-10 top-0 left-0 w-full">
		<div class="flex justify-around items-center text-center gap-1 px-6 h-10 leading-10">
			{#each weekTexts as item, index}
				<div class={`flex-1 font-bold${weekendRed && isWeekendFunc(startSunday, index) ? ' text-error' : ''}`}>
					{item}
				</div>
			{/each}
		</div>
	</div>
	<div class={` py-2 px-4 flex flex-col gap-4 overflow-y-auto calendar-container ${useAnimation ? 'scroll-smooth' : 'scroll-auto'}`}>
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
</div>
