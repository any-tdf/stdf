/**
 * 防抖
 * debounce
 * @example
 * const fn = () => console.log('hello world');
 * const debounceFn = debounce(fn, 1000);
 */
export const debounce = <T extends (...args: unknown[]) => unknown>(fn: T, delay = 10): ((...args: Parameters<T>) => void) => {
	let timer: ReturnType<typeof setTimeout> | null = null;
	return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
		if (timer) {
			clearTimeout(timer);
		}
		timer = setTimeout(() => {
			fn.apply(this, args);
			timer = null;
		}, delay);
	};
};

/**
 * 节流
 * throttle
 * @example
 * const fn = () => console.log('hello world');
 * const throttleFn = throttle(fn, 1000);
 */
export const throttle = <T extends (...args: unknown[]) => unknown>(fn: T, delay = 50): ((...args: Parameters<T>) => void) => {
	let timer: ReturnType<typeof setTimeout> | null = null;
	return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
		if (timer) {
			return;
		}
		timer = setTimeout(() => {
			fn.apply(this, args);
			timer = null;
		}, delay);
	};
};

/**
 * 节流
 * throttle With requestAnimationFrame
 * @example
 * const fn = () => console.log('hello world');
 * const throttleWithRAFFn = throttleWithRAF(fn, 1000);
 */
export const throttleWithRAF = <T extends (e: PointerEvent) => void>(fn: T, delay = 16): ((...args: Parameters<T>) => void) => {
	let timeoutId: ReturnType<typeof setTimeout> | undefined = undefined;
	let rafId: number | undefined = undefined;
	let lastExec = 0;
	const throttledFn = function (this: unknown, ...args: Parameters<T>) {
		const now = performance.now();
		const remainingTime = delay - (now - lastExec);
		if (rafId === undefined && timeoutId === undefined) {
			// 如果没有 rafId 和 timeoutId，说明没有正在进行的动画帧或定时器
			// If there is no rafId and timeoutId, it means there is no animation frame or timer in progress.
			rafId = requestAnimationFrame(() => {
				// 在动画帧开始时执行函数
				// Executes a function at the beginning of an animation frame
				fn.apply(this, args);
				lastExec = performance.now();
				rafId = undefined;
			});
		} else if (remainingTime <= 0) {
			// 如果超过了延迟时间，取消当前的定时器，然后在下一个动画帧执行
			// If the delay time is exceeded, cancel the current timer and execute it in the next animation frame.
			clearTimeout(timeoutId);
			timeoutId = undefined;
			rafId = requestAnimationFrame(() => {
				fn.apply(this, args);
				lastExec = performance.now();
				rafId = undefined;
			});
		} else {
			// 如果还有剩余时间，设置定时器
			// If there is time left, set the timer
			clearTimeout(timeoutId);
			timeoutId = setTimeout(() => {
				rafId = requestAnimationFrame(() => {
					fn.apply(this, args);
					lastExec = performance.now();
					rafId = undefined;
				});
			}, remainingTime);
		}
	};
	throttledFn.clear = () => {
		if (timeoutId !== null) {
			clearTimeout(timeoutId);
			timeoutId = undefined;
		}
		if (rafId !== undefined) {
			cancelAnimationFrame(rafId);
			rafId = undefined;
		}
	};
	return throttledFn;
};

/**
 * 将数字按照步长进行四舍五入
 *  Round the number according to the step length
 * @example
 * stepNumberFun(18, 5) // 20
 */
export const stepNumberFun: (num: number, step?: number) => number = (num, step = 1) => {
	//将 step 乘 10，转换为整数，避免小数计算精度问题
	// Multiply step by 10, convert to integer, avoid decimal calculation precision problem
	const stepNum = step * 10;
	return (Math.round((num * 10) / stepNum) * stepNum) / 10;
};

/**
 * 传入 Dom 和一段字符串，返回占页面的宽度
 * Pass in Dom and a string, return the width occupied by the page
 * @example
 * getDomWidth(document.body, 'hello world') // 100
 */
export const getDomWidth: (dom: HTMLElement, str: string) => number = (dom, str) => {
	const span: HTMLSpanElement = document.createElement('span');
	span.innerHTML = str;
	span.style.visibility = 'hidden';
	dom.appendChild(span);
	const width = span.getBoundingClientRect().width;
	dom.removeChild(span);
	return width;
};

/**
 * 根据年份和月份获取对应的天数
 * Get the number of days corresponding to the year and month according to the year and month
 * @example
 * getDayNum('2020', '02') // 29
 */
export const getDayNum: (year: string, month: string) => number = (year, month) => {
	if (month === '02') {
		return isLeapYear(Number(year)) ? 29 : 28;
	} else if (month === '04' || month === '06' || month === '09' || month === '11') {
		return 30;
	} else {
		return 31;
	}
};

/**
 * 是否是闰年
 * Is it a leap year
 * @example
 * isLeapYear(2020) // true
 */
export const isLeapYear: (year: number) => boolean = (year) => {
	return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

/**
 * 返回当前日期所处周的开始与结束日期组成的数组，日期格式为 YYYYMMDD
 * return an array of start and end date of current week, date format is YYYYMMDD
 * @example
 * getWeekRange() // ['20200518', '20200524']
 */
export const getWeekRange: () => string[] = () => {
	const now = new Date();
	const year = now.getFullYear();
	const month = now.getMonth();
	const day = now.getDate();
	const week = now.getDay();
	const start = new Date(year, month, day - week + 1);
	const end = new Date(year, month, day + (7 - week));
	return [start, end].map((date) => {
		const year = date.getFullYear();
		const month = date.getMonth() + 1;
		const day = date.getDate();
		return `${year}${month < 10 ? `0${month}` : month}${day < 10 ? `0${day}` : day}`;
	});
};

/**
 * 返回当前日期所处月的开始与结束日期组成的数组，日期格式为 YYYYMMDD
 * return an array of start and end date of current month, date format is YYYYMMDD
 * @returns {Array}
 * @example
 * getMonthRange() // ['20200501', '20200531']
 */
export const getMonthRange: () => string[] = () => {
	const now = new Date();
	const year = now.getFullYear();
	const month = now.getMonth();
	const start = new Date(year, month, 1);
	const end = new Date(year, month + 1, 0);
	return [start, end].map((date) => {
		const year = date.getFullYear();
		const month = date.getMonth() + 1;
		const day = date.getDate();
		return `${year}${month < 10 ? `0${month}` : month}${day < 10 ? `0${day}` : day}`;
	});
};

/**
 * 传入年月数据 YYYYMM，返回开始日是周几
 * Pass in year and month data YYYYMM, return the start day of the week
 * @example
 * getStartDay('202005') // 6
 */
export const getStartDay: (yearMonth: string) => number = (yearMonth) => {
	const year = yearMonth.slice(0, 4);
	const month = yearMonth.slice(4);
	return new Date(`${year}-${month}-01`).getDay();
};

/**
 * 传入正数或者负数 n，返回当前月往前或者往后的 n 个月的年月数据，格式为 YYYYMM，不足两位的月份前面补 0
 * Pass in a positive or negative number n, return the year and month data of the current month forward or backward n months, the format is YYYYMM, and the month less than two digits is filled with 0
 * @example
 * getYearMonth(1) // '202006'
 */
export const getNowBeforeOrAfterMonth: (n: number) => string = (n) => {
	const now = new Date();
	const year = now.getFullYear();
	const month = now.getMonth() + 1;
	const newMonth = month + n;
	if (newMonth > 12) {
		return `${year + 1}${newMonth - 12 < 10 ? `0${newMonth - 12}` : newMonth - 12}`;
	} else if (newMonth < 1) {
		return `${year - 1}${newMonth + 12 < 10 ? `0${newMonth + 12}` : newMonth + 12}`;
	} else {
		return `${year}${newMonth < 10 ? `0${newMonth}` : newMonth}`;
	}
};

/**
 * 传入年月数据 YYYYMM，根据当月 1 日的周几，返回当月的日历数据数组。如果 startSunday 为 true 从周日开始，否则从周一开始，1 日之前的数据为空字符串，之后的数据为空字符串并去除
 * Pass in year and month data YYYYMM, return the calendar data array according to the week of the first day of the month. If startSunday is true, start from Sunday, otherwise start from Monday. The data before 1 day is an empty string, and the data after 1 day is an empty string and is removed
 * @example
 * getCalendarData('202005') // ['','','','','','','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','']
 */
export const getCalendarData: (yearMonth: string, startSunday?: boolean) => string[] = (yearMonth, startSunday) => {
	const year = yearMonth.slice(0, 4);
	const month = yearMonth.slice(4);
	const startDay = getStartDay(yearMonth);
	const dayNum = getDayNum(year, month);
	const data: { day: string; [key: string]: unknown }[] = [];
	for (let i = 0; i < (startDay > 0 ? startDay - (startSunday ? 0 : 1) : 7 - (startSunday ? 0 : 1)); i++) {
		data.push({ day: '' });
	}
	for (let i = 1; i <= dayNum; i++) {
		data.push({ day: i.toString().padStart(2, '0') });
	}
	for (let i = 0; i < 42 - startDay - (startSunday ? 0 : 1) - dayNum; i++) {
		data.push({ day: '' });
	}
	// 去除结尾的所有空字符
	// Remove all empty characters at the end
	while (data[data.length - 1].day === '') {
		data.pop();
	}
	// 如果 day 是 00 或 0 的替换为空字
	// If day is 00, replace it with an empty character
	data.forEach((item: { day: string; [key: string]: unknown }) => {
		if (item.day === '00' || item.day === '0') {
			item.day = '';
		}
	});
	// 循环 data，如果 day 不为 ''，则计算出 day 是周几，放在 week
	// Loop data, if day is not '', then calculate that day is what day of the week, put it in week
	data.forEach((item: { day: string; [key: string]: unknown }) => {
		if (item.day !== '') {
			item.week = new Date(`${year}-${month}-${item.day}`).getDay();
		}
	});
	// 循环 data，如果当天是月末，endDay 为 true，否则为 false
	// Loop data, if today is the end of the month, endDay is true, otherwise it is false
	data.forEach((item: { day: string; [key: string]: unknown }, index: number) => {
		if (item.day !== '') {
			item.endDay = index === data.length - 1;
			item.startDay = item.day === '01';
		}
	});
	// 根据从周一开始还是周末开始，循环 data，如果 day 不为 ''，判断每天是 周第一天 还是 周最后一天，分别放在 weekStartDay 和 weekEndDay
	// According to whether it starts from Monday or Sunday, loop data, if day is not '', judge whether each day is the first day of the week or the last day of the week, and put it in weekStartDay and weekEndDay respectively
	if (!startSunday) {
		data.forEach((item: { day: string; [key: string]: unknown }) => {
			if (item.day !== '') {
				item.weekStartDay = item.week === 1;
				item.weekEndDay = item.week === 0;
			}
		});
	} else {
		data.forEach((item: { day: string; [key: string]: unknown }) => {
			if (item.day !== '') {
				item.weekStartDay = item.week === 0;
				item.weekEndDay = item.week === 6;
			}
		});
	}
	// 根据每一天的 startDay 和 weekStartDay，endDay 和 weekEndDay，只要有一项是 true，就是月第一天或周第一天，放在 start 和 end 中
	// According to the startDay and weekStartDay of each day, endDay and weekEndDay, as long as one item is true, it is the first day of the month or the first day of the week, put it in start and end
	data.forEach((item: { day: string; [key: string]: unknown }) => {
		if (item.day !== '') {
			item.start = item.startDay || item.weekStartDay;
			item.end = item.endDay || item.weekEndDay;
		}
	});
	return data.map((item: { day: string; [key: string]: unknown }) => item.day);
};

/**
 * 传入格式为 YYYYMM 的开始与结束月份字符串，返回这两月份之间的所有月份数据数组，格式为 YYYYMM，不足两位的月份前面补 0
 * Pass in the start and end month strings in the format of YYYYMM, return the data array of all months between these two months, the format is YYYYMM, and the month less than two digits is filled with 0
 * @example
 * getMonthListRange('202005', '202007') // ['202005', '202006', '202007']
 */
export const getMonthListRange: (startMonthStr: string, endMonthStr: string) => string[] = (startMonthStr, endMonthStr) => {
	const startYear = startMonthStr.slice(0, 4);
	const startMonth = startMonthStr.slice(4);
	const endYear = endMonthStr.slice(0, 4);
	const endMonth = endMonthStr.slice(4);
	const data = [];
	if (startYear === endYear) {
		for (let i = Number(startMonth); i <= Number(endMonth); i++) {
			data.push(`${startYear}${i < 10 ? `0${i}` : i}`);
		}
	} else {
		for (let i = Number(startMonth); i <= 12; i++) {
			data.push(`${startYear}${i < 10 ? `0${i}` : i}`);
		}
		for (let i = 1; i <= Number(endMonth); i++) {
			data.push(`${endYear}${i < 10 ? `0${i}` : i}`);
		}
	}
	return data;
};

/**
 * 传入开始与结束日期 YYYYMMDD，需要剔除的日期组成的数组 disabledDates。返回中间的所有日期数组，包含开始与结束日期，月与日不足两位的前面补 0，格式为 YYYYMMDD
 * Pass in the start and end date YYYYMMDD, the array of disabled dates to be removed. Return the array of all dates in the middle, including the start and end dates, and the month and day less than two digits are filled with 0, in the format of YYYYMMDD
 * @example
 * getDateRange('20200501', '20200503') // ['20200501', '20200502', '20200503']
 */
export const getDateRange: (startDate: string, endDate: string, disabledDates: string[]) => string[] = (
	startDate,
	endDate,
	disabledDates
) => {
	// 将 startDate 与 endDate 转化为 YYYY-MM-DD 格式
	// Convert startDate and endDate to YYYY-MM-DD format
	const startYear = startDate.slice(0, 4);
	const startMonth = startDate.slice(4, 6);
	const startDay = startDate.slice(6);
	const endYear = endDate.slice(0, 4);
	const endMonth = endDate.slice(4, 6);
	const endDay = endDate.slice(6);
	const startTimeStr = new Date(`${startYear}-${startMonth}-${startDay}`).getTime();
	const endTimeStr = new Date(`${endYear}-${endMonth}-${endDay}`).getTime();
	const startTime = new Date(startTimeStr).getTime();
	const endTime = new Date(endTimeStr).getTime();
	const data: string[] = [];
	for (let i = startTime; i <= endTime; i += 24 * 60 * 60 * 1000) {
		const date = new Date(i);
		const year = date.getFullYear();
		const month = date.getMonth() + 1;
		const day = date.getDate();
		data.push(`${year}${month < 10 ? `0${month}` : month}${day < 10 ? `0${day}` : day}`);
	}
	// 剔除 disabledDates 中的日期
	// Remove dates in disabledDates
	if (disabledDates && disabledDates.length) {
		disabledDates.forEach((item) => {
			const index = data.indexOf(item);
			if (index > -1) {
				data.splice(index, 1);
			}
		});
	}

	return data;
};

/**
 * 传入 startSunday，返回当天所处周的所有日期数组，日期格式为 YYYYMMDD，月与日不足两位的前面补 0
 * Pass in startSunday, return the array of all dates in the week of the current day, the date format is YYYYMMDD, and the month and day less than two digits are filled with 0
 * @example
 * getWeekRange(true) // ['20200531', '20200601', '20200602', '20200603', '20200604', '20200605', '20200606']
 */
export const getCurrentWeek: (startSunday: boolean) => string[] = (startSunday) => {
	const now = new Date();
	const year = now.getFullYear();
	const month = now.getMonth() + 1;
	const date = now.getDate();
	const day = now.getDay();
	const weekDates: string[] = [];
	if (startSunday) {
		for (let i = 0; i < 7; i++) {
			const newDate = new Date(year, month - 1, date - day + i);
			const newYear = newDate.getFullYear();
			const newMonth = newDate.getMonth() + 1;
			const newDateNum = newDate.getDate();

			weekDates.push(`${newYear}${newMonth.toString().padStart(2, '0')}${newDateNum.toString().padStart(2, '0')}`);
		}
	} else {
		for (let i = 1; i < 8; i++) {
			const newDate = new Date(year, month - 1, date - day + i);
			const newYear = newDate.getFullYear();
			const newMonth = newDate.getMonth() + 1;
			const newDateNum = newDate.getDate();

			weekDates.push(`${newYear}${newMonth.toString().padStart(2, '0')}${newDateNum.toString().padStart(2, '0')}`);
		}
	}
	return weekDates;
};

/**
 * 返回当天所处月份的所有日期数组，日期格式为 YYYYMMDD，月与日不足两位的前面补 0
 * Return the array of all dates in the month of the current day, the date format is YYYYMMDD, and the month and day less than two digits are filled with 0
 * @example
 * getCurrentMonth() // ['20200501', '20200502', '20200503', ...]
 */
export const getCurrentMonth: () => string[] = () => {
	const now = new Date();
	const year = now.getFullYear();
	const month = now.getMonth() + 1;
	const days = new Date(year, month, 0).getDate();
	const dates: string[] = [];
	for (let i = 1; i <= days; i++) {
		dates.push(`${year}${month.toString().padStart(2, '0')}${i.toString().padStart(2, '0')}`);
	}
	return dates;
};

/**
 * 返回当天所处季度的所有日期数组，日期格式为 YYYYMMDD，月与日不足两位的前面补 0
 * Pass in the date, return the array of all dates in the quarter of the current day, the date format is YYYYMMDD, and the month and day less than two digits are filled with 0
 * @example
 * getCurrentQuarter() // ['20200401', '20200402', '20200403', ...]
 */
export const getCurrentQuarter: () => string[] = () => {
	const now = new Date();
	const year = now.getFullYear();
	const month = now.getMonth() + 1;
	const quarter = Math.floor((month - 1) / 3) + 1;
	const startMonth = (quarter - 1) * 3 + 1;
	const endMonth = quarter * 3;
	const days: string[] = [];
	for (let i = startMonth; i <= endMonth; i++) {
		const daysInMonth = new Date(year, i, 0).getDate();
		for (let j = 1; j <= daysInMonth; j++) {
			days.push(`${year}${i.toString().padStart(2, '0')}${j.toString().padStart(2, '0')}`);
		}
	}
	return days;
};

/**
 * 传入正数或负数天数 n 和是否从今天开始计算 today，返回对应的前后日期组成的数组，日期格式为 YYYYMMDD，月与日不足两位的前面补 0
 * Pass in a positive or negative number of days n, whether to include today hasToday, return the array of dates before and after the current day, the date format is YYYYMMDD, and the month and day less than two digits are filled with 0
 * @example
 * getDaysRangeWithToday(3) // ['20200501', '20200502', '20200503']
 */
export const getDaysRangeWithToday: (n: number, today: boolean) => string[] = (n = 0, today = true) => {
	const now = new Date();
	let fakeToday = now;
	if (today) {
		fakeToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	} else {
		if (n < 0) {
			fakeToday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
		} else if (n > 0) {
			fakeToday = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
		} else {
			fakeToday = now;
		}
	}
	const dates: string[] = [];
	for (let i = 0; i < Math.abs(n); i++) {
		const date = new Date(fakeToday.getTime() + (n > 0 ? i : -i) * 24 * 60 * 60 * 1000);
		dates.push(`${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}`);
	}
	// 对日期排序
	// Sort dates
	dates.sort((a, b) => Number(a) - Number(b));
	return dates;
};
