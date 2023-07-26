<!-- TimePickerDemo Demo -->
<script>
    import { Cell, TimePicker } from '../../../../packages/stdf';

    let visible1 = false;
    let visible2 = false;
    let visible3 = false;
    let visible4 = false;
    let visible5 = false;
    let visible6 = false;
    let visible7 = false;
    let visible8 = false;
    let visible9 = false;
    let visible10 = false;
    let visible11 = false;
    let visible12 = false;
    let visible13 = false;
    let visible14 = false;
    let visible15 = false;
    let visible16 = false;
    let visible17 = false;
    let visible18 = false;
    let visible19 = false;
    let visible20 = false;
    let visible21 = false;
    let visible22 = false;

    let defaultTimeStr = '';
    const getDefaultFunc = e => {
        defaultTimeStr = e.detail.times;
    };
    let customFormatStr = '';
    const customFormatFunc = e => {
        customFormatStr = e.detail.times;
    };
    let monthFirstStr = '';
    const monthFirstFunc = e => {
        monthFirstStr = e.detail.times;
    };
    let timeObj = {};
    $: timeObjStr = JSON.stringify(timeObj);
    const getTimeObjFunc = e => {
        timeObj = e.detail.times;
    };
</script>

<div class="py-4">
    <div class="px-4">
        {#if defaultTimeStr !== ''}
            当前选定了：
            <span class="mr-2 text-primary dark:text-dark">{defaultTimeStr}</span>
        {:else}
            <div>请选定时间</div>
        {/if}
    </div>
    <Cell title="基础用法" subTitle="默认选定当前时间，可选前后十年" on:click={() => (visible1 = true)} />
    <TimePicker bind:visible={visible1} on:confirm={getDefaultFunc} />

    <Cell title="只用年月日" on:click={() => (visible2 = true)} />
    <TimePicker bind:visible={visible2} type="YMD" />

    <Cell title="误传不支持的 type" subTitle="使用默认年月日时分秒" on:click={() => (visible7 = true)} />
    <TimePicker bind:visible={visible7} type="MD" />

    <Cell title="只用时分秒" on:click={() => (visible3 = true)} />
    <TimePicker bind:visible={visible3} type="hms" />

    <Cell title="只用年月日时" on:click={() => (visible4 = true)} />
    <TimePicker bind:visible={visible4} type="YMDh" />

    <Cell title="不显示提示" on:click={() => (visible5 = true)} />
    <TimePicker bind:visible={visible5} showTips={false} />

    <Cell title="不同列不同可见行" on:click={() => (visible6 = true)} />
    <TimePicker
        bind:visible={visible6}
        yearProps={{ showRow: 3 }}
        hourProps={{ showRow: 7 }}
        minuteProps={{ showRow: 7 }}
        secondProps={{ showRow: 7 }}
    />

    <Cell title="不同列不同宽度" on:click={() => (visible8 = true)} />
    <TimePicker bind:visible={visible8} yearProps={{ flex: 3 }} dayProps={{ flex: 2 }} />

    <Cell title="年数据右对齐，日数据左对齐" on:click={() => (visible22 = true)} />
    <TimePicker bind:visible={visible22} type="YMD" yearProps={{ align: 'right' }} dayProps={{ align: 'left' }} />

    <Cell title="限定年份区间" on:click={() => (visible9 = true)} />
    <TimePicker bind:visible={visible9} yearRange={[2022, 2025]} />

    <Cell title="限定月份区间" on:click={() => (visible10 = true)} />
    <TimePicker bind:visible={visible10} monthRange={[2, 5]} />

    <Cell title="限定时分秒区间" on:click={() => (visible11 = true)} />
    <TimePicker bind:visible={visible11} hourRange={[2, 5]} minuteRange={[25, 45]} secondRange={[5, 10]} />

    <Cell title="分钟步长为 5" on:click={() => (visible12 = true)} />
    <TimePicker bind:visible={visible12} minuteStep={5} />

    <Cell title="秒步长为 10" on:click={() => (visible13 = true)} />
    <TimePicker bind:visible={visible13} secondStep={10} />

    <div class="px-4">
        {#if customFormatStr !== ''}
            当前选定了：
            <span class="mr-2 text-primary dark:text-dark">{customFormatStr}</span>
        {:else}
            <div>请选定时间</div>
        {/if}
    </div>
    <Cell title="自定义返回时间格式" subTitle="输出格式为 Y年M月D日 h时m分s秒" on:click={() => (visible15 = true)} />
    <TimePicker bind:visible={visible15} outFormat="Y年M月D日 h时m分s秒" on:confirm={customFormatFunc} />

    <div class="px-4">
        {#if monthFirstStr !== ''}
            当前选定了：
            <span class="mr-2 text-primary dark:text-dark">{monthFirstStr}</span>
        {:else}
            <div>请选定时间</div>
        {/if}
    </div>
    <Cell title="返回时间月份在前" on:click={() => (visible16 = true)} />
    <TimePicker bind:visible={visible16} type="YMD" outFormat="M/D/Y" on:confirm={monthFirstFunc} />

    <div class="px-4 text-xs">
        当前选定了：<br />
        <span class="mr-2 text-primary dark:text-dark break-words">{timeObjStr}</span>
    </div>
    <Cell title="返回时间对象" on:click={() => (visible17 = true)} />
    <TimePicker bind:visible={visible17} outFormat="object" on:confirm={getTimeObjFunc} />

    <Cell title="顶部来点圆角" on:click={() => (visible14 = true)} />
    <TimePicker bind:visible={visible14} popup={{ radius: 'xl' }} />

    <Cell title="自定义标题" on:click={() => (visible18 = true)} />
    <TimePicker bind:visible={visible18} title="请选择时间" />

    <Cell title="指定初始选定年份" on:click={() => (visible19 = true)} />
    <TimePicker bind:visible={visible19} initYear="2020" />

    <Cell title="指定初始选定月份" on:click={() => (visible20 = true)} />
    <TimePicker bind:visible={visible20} initMonth="05" />

    <Cell title="指定初始选定时分秒" on:click={() => (visible21 = true)} />
    <TimePicker bind:visible={visible21} initHour="05" initMinute="05" initSecond="05" />
</div>
