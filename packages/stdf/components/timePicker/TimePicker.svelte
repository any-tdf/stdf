<script>
    import { createEventDispatcher, getContext } from 'svelte';
    import Popup from '../popup/Popup.svelte';
    import ScrollRadio from '../scrollRadio/ScrollRadio.svelte';
    import { getDayNum } from '../utils';
    import zh_CN from '../../lang/zh_CN';

    // 定义事件派发器
    // Define event dispatcher
    const dispatch = createEventDispatcher();

    // 当前语言
    // current language
    const currentLang = getContext('STDF_lang') || zh_CN;
    const timePickerLang = currentLang.timePicker;

    // 是否显示
    // Whether to show
    export let visible = false;

    // 时间类型，由 Y M D h m s 组合而成
    // Time type, composed of Y M D h m s
    export let type = 'YMDhms';

    // 年月日时分秒参数，包含所占比例 flex，每行显示数量 showRow
    // Year month day hour minute second parameter, including the proportion of flex, the number of rows displayed per line
    export let yearProps = {};
    export let monthProps = {};
    export let dayProps = {};
    export let hourProps = {};
    export let minuteProps = {};
    export let secondProps = {};

    // 初始选定的年份
    // The initial selected year
    export let initYear = '';

    // 初始选定的月份
    // The initial selected month
    export let initMonth = '';

    // 初始选定的天数
    // The initial selected day
    export let initDay = '';

    // 初始选定的小时
    // The initial selected hour
    export let initHour = '';

    // 初始选定的分钟
    // The initial selected minute
    export let initMinute = '';

    // 初始选定的秒数
    // The initial selected second
    export let initSecond = '';

    // 分钟步长
    // Minute step
    export let minuteStep = 1;

    // 秒钟步长
    // Second step
    export let secondStep = 1;

    // 年份区间，数组，第一个值为开始年份，第二个值为结束年份
    // Year range, array, the first value is the start year, and the second value is the end year
    export let yearRange = [];

    // 月份区间，数组，第一个值为开始月份，第二个值为结束月份
    // Month range, array, the first value is the start month, and the second value is the end month
    export let monthRange = [1, 12];

    // 小时区间，数组，第一个值为开始小时，第二个值为结束小时
    // Hour range, array, the first value is the start hour, and the second value is the end hour
    export let hourRange = [0, 23];

    // 分钟区间，数组，第一个值为开始分钟，第二个值为结束分钟
    // Minute range, array, the first value is the start minute, and the second value is the end minute
    export let minuteRange = [0, 59];

    // 秒数区间，数组，第一个值为开始秒数，第二个值为结束秒数
    // Second range, array, the first value is the start second, and the second value is the end second
    export let secondRange = [0, 59];

    // 顶部是否显示提示文字
    // Whether to display a prompt at the top
    export let showTips = true;

    // 取消选项文本
    // Cancel option text
    export let cancelText = timePickerLang.defaultCancel;

    // 确定选项文本
    // Confirm option text
    export let confirmText = timePickerLang.defaultConfirm;

    // 中间选项文本
    // Middle option text
    export let title = timePickerLang.defaultTitle;

    // 年选项文本
    // Year option text
    export let yearText = timePickerLang.defaultYear;

    // 月选项文本
    // Month option text
    export let monthText = timePickerLang.defaultMonth;

    // 日选项文本
    // Day option text
    export let dayText = timePickerLang.defaultDay;

    // 时选项文本
    // Hour option text
    export let hourText = timePickerLang.defaultHour;

    // 分选项文本
    // Minute option text
    export let minuteText = timePickerLang.defaultMinute;

    // 秒选项文本
    // Second option text
    export let secondText = timePickerLang.defaultSecond;

    // 返回数据格式
    // Return data format
    export let outFormat = '';

    // 弹出层参数
    // Popup parameters
    export let popup = {};

    // 获取当前时间，取出对应的年月日时分秒，转成字符，月、日、时、分、秒小于 10 的前面补 0
    // Get the current time, take out the corresponding year, month, day, hour, minute, and second, convert to a character, and add 0 to the front of month, day, hour, minute, and second less than 10
    const now = new Date();
    const currentYear = now.getFullYear().toString();
    const currentMonth = (now.getMonth() + 1 < 10 ? '0' + (now.getMonth() + 1) : now.getMonth() + 1).toString();
    const currentDay = (now.getDate() < 10 ? '0' + now.getDate() : now.getDate()).toString();
    const currentHour = (now.getHours() < 10 ? '0' + now.getHours() : now.getHours()).toString();
    const currentMinute = (now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes()).toString();
    const currentSecond = (now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds()).toString();

    // 总共可以传入 13 种 type，做一个映射，方便后面使用
    // A total of 13 types can be passed in, do a mapping, and it is convenient to use later
    const typeMap = {
        Y: 'Y',
        M: 'M',
        h: 'h',
        m: 'm',
        s: 's',
        YM: 'YM',
        hm: 'hm',
        ms: 'ms',
        YMD: 'YMD',
        hms: 'hms',
        YMDh: 'YMDh',
        YMDhm: 'YMDhm',
        YMDhms: 'YMDhms',
    };

    // 定义 typeInner，对不在 typeMap 的 type 做一个过滤，不在 typeMap 的 type 设置为默认值 YMDhms
    // Define typeInner, filter out types that are not in typeMap, and set types that are not in typeMap to the default value YMDhms
    let typeInner = typeMap[type] || 'YMDhms';

    // 如果 yearRange 长度为2且后一项大于前一项，表示限定区间，否则取当前年的的前后 10 年
    // If the length of yearRange is 2 and the second item is greater than the first item, it means that the range is limited, otherwise the previous and next 10 years of the current year are taken
    let yearData = [];
    if (yearRange.length === 2 && yearRange[1] > yearRange[0]) {
        for (let i = yearRange[0]; i <= yearRange[1]; i++) {
            yearData.push({ label: i.toString() });
        }
    } else {
        for (let i = now.getFullYear() - 10; i <= now.getFullYear() + 10; i++) {
            yearData.push({ label: i.toString() });
        }
    }

    // 月份列数据，固定 12 个月，如果有限定区间
    // Month column data, fixed 12 months, if there is a limited range, it needs to be judged according to the year
    const baseMonthData = [];
    if (monthRange.length === 2 && monthRange[1] > monthRange[0] && monthRange[0] >= 1 && monthRange[1] <= 12) {
        for (let i = monthRange[0]; i <= monthRange[1]; i++) {
            baseMonthData.push({ label: (i < 10 ? '0' + i : i).toString() });
        }
    } else {
        for (let i = 1; i <= 12; i++) {
            baseMonthData.push({ label: (i < 10 ? '0' + i : i).toString() });
        }
    }

    // 小时列数据，根据限定小时区间计算
    // Hour column data, fixed 24 hours
    const baseHourData = [];
    if (hourRange.length === 2 && hourRange[1] > hourRange[0] && hourRange[0] >= 0 && hourRange[1] <= 23) {
        for (let i = hourRange[0]; i <= hourRange[1]; i++) {
            baseHourData.push({ label: (i < 10 ? '0' + i : i).toString() });
        }
    } else {
        for (let i = 0; i < 24; i++) {
            baseHourData.push({ label: (i < 10 ? '0' + i : i).toString() });
        }
    }

    // 分钟列数据，根据限定分钟区间计算
    // Minute column data, calculated according to the limited minute range
    const baseMinuteData = [];
    if (minuteRange.length === 2 && minuteRange[1] > minuteRange[0] && minuteRange[0] >= 0 && minuteRange[1] <= 59) {
        for (let i = minuteRange[0]; i <= minuteRange[1]; i += minuteStep) {
            baseMinuteData.push({ label: (i < 10 ? '0' + i : i).toString() });
        }
    } else {
        for (let i = 0; i < 60; i += minuteStep) {
            baseMinuteData.push({ label: (i < 10 ? '0' + i : i).toString() });
        }
    }

    // 秒列数据，根据限定秒区间计算
    // Second column data, calculated according to the limited second range
    const baseSecondData = [];
    if (secondRange.length === 2 && secondRange[1] > secondRange[0] && secondRange[0] >= 0 && secondRange[1] <= 59) {
        for (let i = secondRange[0]; i <= secondRange[1]; i += secondStep) {
            baseSecondData.push({ label: (i < 10 ? '0' + i : i).toString() });
        }
    } else {
        for (let i = 0; i < 60; i += secondStep) {
            baseSecondData.push({ label: (i < 10 ? '0' + i : i).toString() });
        }
    }

    // 找出 yearProps、monthProps、dayProps、hourProps、minuteProps、secondProps 中 showRow 的最大值
    // Find the maximum value of showRow in yearProps, monthProps, dayProps, hourProps, minuteProps, and secondProps
    const showRowsArr = [];
    showRowsArr.push(yearProps.showRow || 5);
    showRowsArr.push(monthProps.showRow || 5);
    showRowsArr.push(dayProps.showRow || 5);
    showRowsArr.push(hourProps.showRow || 5);
    showRowsArr.push(minuteProps.showRow || 5);
    showRowsArr.push(secondProps.showRow || 5);
    const maxShowRows = Math.max(...showRowsArr);

    // 天数列数据
    // Day column data
    let baseDayData = [];

    // 根据当前年月初始一次天数列数据
    // Initialize the day column data according to the current year and month
    for (let i = 1; i <= getDayNum(currentYear, currentMonth); i++) {
        baseDayData.push({ label: (i < 10 ? '0' + i : i).toString() });
    }

    // 初始时年份索引
    // Initial year index
    const initYearIndex =
        initYear === ''
            ? yearData.findIndex(item => item.label === currentYear)
            : yearData.findIndex(item => item.label === initYear?.toString());

    // 初始时月份索引
    // Initial month index
    const initMonthIndex =
        initMonth === ''
            ? baseMonthData.findIndex(item => item.label === currentMonth)
            : baseMonthData.findIndex(item => item.label === initMonth.toString());

    // 初始时天数索引
    // Initial day index
    let initDayIndex =
        initDay === ''
            ? baseDayData.findIndex(item => item.label === currentDay)
            : baseDayData.findIndex(item => item.label === initDay.toString());

    // 初始时小时索引
    // Initial hour index
    const initHourIndex =
        initHour === ''
            ? baseHourData.findIndex(item => item.label === currentHour)
            : baseHourData.findIndex(item => item.label === initHour.toString());

    // 初始时分钟索引
    // Initial minute index
    const initMinuteIndex =
        initMinute === ''
            ? baseMinuteData.findIndex(item => item.label === currentMinute)
            : baseMinuteData.findIndex(item => item.label === initMinute.toString());

    // 初始时秒索引
    // Initial second index
    const initSecondIndex =
        initSecond === ''
            ? baseSecondData.findIndex(item => item.label === currentSecond)
            : baseSecondData.findIndex(item => item.label === initSecond.toString());

    // 年月日时分秒初始索引
    // Year, month, day, hour, minute, second initial index
    let yearIndex = 0;
    let monthIndex = 0;
    let dayIndex = 0;
    let hourIndex = 0;
    let minuteIndex = 0;
    let secondIndex = 0;

    // 根据年份和月份获取对应的天数，更新 baseDayData
    // Get the number of days corresponding to the year and month according to the year and month, and update baseDayData
    const updateDayDataFunc = dayNum => {
        baseDayData = [];
        for (let i = 1; i <= dayNum; i++) {
            baseDayData.push({ label: (i < 10 ? '0' + i : i).toString() });
        }
    };

    // 初始一下生成天数数据
    // Generate day data initially
    updateDayDataFunc(getDayNum(yearData[yearIndex].label, baseMonthData[monthIndex].label));

    // 年数据滚动结束时的回调函数
    // Callback function when the year data scrolling ends
    const scrollEndYearFunc = e => {
        const { index, isTouch } = e.detail;
        yearIndex = index;
        // 如果月份是 2 月，需要重新计算天数
        // If the month is February, the number of days needs to be recalculated
        if (isTouch && baseMonthData[monthIndex].label === '02') {
            baseDayData = [];
            initDayIndex = 0;
            setTimeout(() => {
                updateDayDataFunc(getDayNum(yearData[yearIndex].label, baseMonthData[monthIndex].label));
            });
        }
    };

    // 月数据滚动结束时的回调函数
    // Callback function when the month data scrolling ends
    const scrollEndMonthFunc = e => {
        const { index, isTouch } = e.detail;
        monthIndex = index;
        // 根据年份和月份获取对应的天数
        // Get the number of days corresponding to the year and month according to the year and month
        if (isTouch) {
            baseDayData = [];
            initDayIndex = 0;
            setTimeout(() => {
                updateDayDataFunc(getDayNum(yearData[yearIndex].label, baseMonthData[monthIndex].label));
            });
        }
    };

    // 日数据滚动结束时的回调函数
    // Callback function when the day data scrolling ends
    const scrollEndDayFunc = e => {
        const { index } = e.detail;
        dayIndex = index;
    };

    // 时数据滚动结束时的回调函数
    // Callback function when the hour data scrolling ends
    const scrollEndHourFunc = e => {
        const { index } = e.detail;
        hourIndex = index;
    };

    // 分数据滚动结束时的回调函数
    // Callback function when the minute data scrolling ends
    const scrollEndMinuteFunc = e => {
        const { index } = e.detail;
        minuteIndex = index;
    };

    // 秒数据滚动结束时的回调函数
    // Callback function when the second data scrolling ends
    const scrollEndSecondFunc = e => {
        const { index } = e.detail;
        secondIndex = index;
    };

    // 点击取消按钮的回调函数
    // Callback function when clicking the cancel button
    const clickCancelFunc = () => {
        visible = false;
        dispatch('cancel');
    };

    // 传入时间格式与时间对象，返回时间字符串
    // Pass in the time format and time object, return the time string
    const getTimeStr = (format, timeObj) => {
        const { Y, M, D, h, m, s } = timeObj;
        const timeStr = format.replace('Y', Y).replace('M', M).replace('D', D).replace('h', h).replace('m', m).replace('s', s);
        return timeStr;
    };

    // 点击确定按钮的回调函数
    // Callback function when clicking the confirm button
    const clickConfirmFunc = () => {
        visible = false;
        const outData = {};
        if (typeInner.includes('Y')) {
            outData.Y = yearData[yearIndex].label;
        }
        if (typeInner.includes('M')) {
            outData.M = baseMonthData[monthIndex].label;
        }
        if (typeInner.includes('D')) {
            outData.D = baseDayData[dayIndex].label;
        }
        if (typeInner.includes('h')) {
            outData.h = baseHourData[hourIndex].label;
        }
        if (typeInner.includes('m')) {
            outData.m = baseMinuteData[minuteIndex].label;
        }
        if (typeInner.includes('s')) {
            outData.s = baseSecondData[secondIndex].label;
        }

        // 如果传入的 outFormat 为空，则根据 type 格式，否则去除里面的 YMDhms 以外的字符，再按照 YMDhms 的顺序拼接，再与 typeInner 比对，如果不一致，则给出警告
        // If the outFormat passed in is empty, it is formatted according to the type, otherwise the characters other than YMDhms are removed, and then they are spliced in the order of YMDhms, and then compared with typeInner. If they are inconsistent, a warning will be given
        if (outFormat === 'object') {
            // 如果 outFormat 为 object，则返回时间对象
            // If outFormat is empty, return the time object
            dispatch('confirm', { times: outData });
        } else {
            // 如果 outFormat 为空，则根据 type 格式
            // If outFormat is empty, format according to type
            if (outFormat === '') {
                // 预先根据 typeInner 生成一份 defaultOutFormat 字符，年月日之间用 - 连接，时分秒之间用 : 连接，年月日和时分秒之间用空格连接
                // Generate a copy of defaultOutFormat characters according to typeInner in advance, and connect the year, month and day with -, and connect the hour, minute and second with :, and connect the year, month, day and hour, minute and second with spaces
                let defaultOutFormat = typeInner
                    .replace(/Y/g, 'Y-')
                    .replace(/M/g, 'M-')
                    .replace(/D/g, 'D ')
                    .replace(/h/g, 'h:')
                    .replace(/m/g, 'm:')
                    .replace(/s/g, 's');
                // 如果 defaultOutFormat 以 - 或 : 或空格 结尾，则去掉最后一个字符
                // If defaultOutFormat ends with - or : or space, remove the last character
                if (defaultOutFormat.endsWith('-') || defaultOutFormat.endsWith(':') || defaultOutFormat.endsWith(' ')) {
                    defaultOutFormat = defaultOutFormat.slice(0, -1);
                }
                dispatch('confirm', { times: getTimeStr(defaultOutFormat, outData) });
            } else {
                // 删除掉 outFormat 里面 YMDhms 以外的所有字符
                // Delete all characters other than YMDhms in outFormat
                const outFormatInner = outFormat.replace(/[^YMDhms]/g, '');
                // 对 outFormatInner 字符按照 YMDhms 的顺序进行排序
                // Sort the outFormatInner character in the order of YMDhms
                const outFormatInnerArr = outFormatInner.split('');
                outFormatInnerArr.sort((a, b) => {
                    const aIndex = typeInner.indexOf(a);
                    const bIndex = typeInner.indexOf(b);
                    return aIndex - bIndex;
                });
                const outFormatInnerSort = outFormatInnerArr.join('');

                //  如果 outFormatInnerSort 与 typeInner 不一致，则给出警告
                // If outFormatInnerSort is inconsistent with typeInner, a warning will be given
                if (outFormatInnerSort !== typeInner) {
                    console.warn('The outFormat passed in is not consistent with the typeInner');
                } else {
                    // 如果 outFormat 为空，则返回时间对象，否则返回时间字符串
                    // If outFormat is empty, return the time object, otherwise return the time string
                    dispatch('confirm', { times: getTimeStr(outFormat, outData) });
                }
            }
        }
    };
    // 监听 visible 的变化，派发事件
    // Listen to the change of visible, dispatch events
    $: {
        if (visible) {
            dispatch('open');
        } else {
            dispatch('close');
        }
    }
</script>

<Popup
    bind:visible
    size={0}
    maskClosable
    transitionDistance={(maxShowRows === 3 ? 64 : maxShowRows === 5 ? 48 : 32) * maxShowRows + 41 + (showTips ? 32 : 0)}
    {...popup}
>
    <div class="flex justify-between items-center bg-white dark:bg-black border-b border-black/10 dark:border-white/20">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="text-black/60 dark:text-white/60 h-10 leading-10 px-4 cursor-pointer" on:click={clickCancelFunc}>{cancelText}</div>
        <div>{title}</div>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="text-primary dark:text-dark h-10 leading-10 px-4 cursor-pointer" on:click={clickConfirmFunc}>{confirmText}</div>
    </div>
    {#if showTips}
        <div
            class="flex justify-around items-center text-center gap-1 bg-white dark:bg-black text-black/60 dark:text-white/60 h-8 leading-8 text-sm"
        >
            {#if typeInner.includes('Y')}
                <div class="px-2" style="flex:{yearProps.flex || '1'};text-align:{yearProps.align}">{yearText}</div>{/if}
            {#if typeInner.includes('M')}
                <div class="px-2" style="flex:{monthProps.flex || '1'};text-align:{monthProps.align}">{monthText}</div>{/if}
            {#if typeInner.includes('D')}
                <div class="px-2" style="flex:{dayProps.flex || '1'};text-align:{dayProps.align}">{dayText}</div>{/if}
            {#if typeInner.includes('h')}
                <div class="px-2" style="flex:{hourProps.flex || '1'};text-align:{hourProps.align}">{hourText}</div>{/if}
            {#if typeInner.includes('m')}
                <div class="px-2" style="flex:{minuteProps.flex || '1'};text-align:{minuteProps.align}">{minuteText}</div>{/if}
            {#if typeInner.includes('s')}
                <div class="px-2" style="flex:{secondProps.flex || '1'};text-align:{secondProps.align}">{secondText}</div>{/if}
        </div>
    {/if}
    <div class="flex justify-around items-center gap-1 bg-white dark:bg-black">
        {#if typeInner.includes('Y')}
            <div class="truncate" style="flex:{yearProps.flex || '1'}">
                <ScrollRadio
                    data={yearData}
                    initIndex={initYearIndex}
                    autoScrollToLast={false}
                    {...yearProps}
                    on:scrollEnd={scrollEndYearFunc}
                />
            </div>
        {/if}
        {#if typeInner.includes('M')}
            <div class="truncate" style="flex:{monthProps.flex || '1'}">
                <ScrollRadio data={baseMonthData} lastSelectedIndex={initMonthIndex} {...monthProps} on:scrollEnd={scrollEndMonthFunc} />
            </div>
        {/if}
        {#if baseDayData.length > 0 && typeInner.includes('D')}
            <div class="truncate" style="flex:{dayProps.flex || '1'}">
                <ScrollRadio data={baseDayData} lastSelectedIndex={initDayIndex} {...dayProps} on:scrollEnd={scrollEndDayFunc} />
            </div>
        {/if}
        {#if typeInner.includes('h')}
            <div class="truncate" style="flex:{hourProps.flex || '1'}">
                <ScrollRadio data={baseHourData} lastSelectedIndex={initHourIndex} {...hourProps} on:scrollEnd={scrollEndHourFunc} />
            </div>
        {/if}
        {#if typeInner.includes('m')}
            <div class="truncate" style="flex:{minuteProps.flex || '1'}">
                <ScrollRadio
                    data={baseMinuteData}
                    lastSelectedIndex={initMinuteIndex}
                    {...minuteProps}
                    on:scrollEnd={scrollEndMinuteFunc}
                />
            </div>
        {/if}
        {#if typeInner.includes('s')}
            <div class="truncate" style="flex:{secondProps.flex || '1'}">
                <ScrollRadio
                    data={baseSecondData}
                    lastSelectedIndex={initSecondIndex}
                    {...secondProps}
                    on:scrollEnd={scrollEndSecondFunc}
                />
            </div>
        {/if}
    </div>
</Popup>
