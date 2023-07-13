<!-- TimePickerDemo Demo -->
<script>
    import { getContext } from 'svelte';
    import { Cell, TimePicker, NoticeBar } from '../../../../components';

    //Check whether it is an iframe
    const isIframe = getContext('iframe') === '1';

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

{#if isIframe}
    <NoticeBar
        textList={[
            'Dynamic update of day series data when finger is swiping (not scrolling) in the month/year area. Listening for Touch events. Please simulate mobile preview directly on mobile device or through developer tools.',
        ]}
        right="none"
    />
{/if}
<div class="py-4">
    <div class="px-4">
        {#if defaultTimeStr !== ''}
            Currently selected:
            <span class="mr-2 text-primary dark:text-dark">{defaultTimeStr}</span>
        {:else}
            <div>Please select the time</div>
        {/if}
    </div>
    <Cell title="Basic usage" subTitle="By default, the current time is selected. 10 years is optional" on:click={() => (visible1 = true)} />
    <TimePicker bind:visible={visible1} on:confirm={getDefaultFunc} />

    <Cell title="Just the year, the month and the day" on:click={() => (visible2 = true)} />
    <TimePicker bind:visible={visible2} type="YMD" />

    <Cell title="Misrepresentation unsupported type" subTitle="Use the default year, month, day, hour and second" on:click={() => (visible7 = true)} />
    <TimePicker bind:visible={visible7} type="MD" />

    <Cell title="Just use the minutes and seconds" on:click={() => (visible3 = true)} />
    <TimePicker bind:visible={visible3} type="hms" />

    <Cell title="Just the year, the month, the day" on:click={() => (visible4 = true)} />
    <TimePicker bind:visible={visible4} type="YMDh" />

    <Cell title="Do not display prompt" on:click={() => (visible5 = true)} />
    <TimePicker bind:visible={visible5} showTips={false} />

    <Cell title="Different columns have different visible rows" on:click={() => (visible6 = true)} />
    <TimePicker
        bind:visible={visible6}
        yearProps={{ showRow: 3 }}
        hourProps={{ showRow: 7 }}
        minuteProps={{ showRow: 7 }}
        secondProps={{ showRow: 7 }}
    />

    <Cell title="Different columns have different widths" on:click={() => (visible8 = true)} />
    <TimePicker bind:visible={visible8} yearProps={{ flex: 3 }} dayProps={{ flex: 2 }} />

    <Cell title="Align annual data to the right and daily data to the left" on:click={() => (visible22 = true)} />
    <TimePicker bind:visible={visible22} type="YMD" yearProps={{ align: 'right' }} dayProps={{ align: 'left' }} />

    <Cell title="Limited year interval" on:click={() => (visible9 = true)} />
    <TimePicker bind:visible={visible9} yearRange={[2022, 2025]} />

    <Cell title="Limited month range" on:click={() => (visible10 = true)} />
    <TimePicker bind:visible={visible10} monthRange={[2, 5]} />

    <Cell title="Limited time interval" on:click={() => (visible11 = true)} />
    <TimePicker bind:visible={visible11} hourRange={[2, 5]} minuteRange={[25, 45]} secondRange={[5, 10]} />

    <Cell title="The minute step length is 5" on:click={() => (visible12 = true)} />
    <TimePicker bind:visible={visible12} minuteStep={5} />

    <Cell title="The second step is 10" on:click={() => (visible13 = true)} />
    <TimePicker bind:visible={visible13} secondStep={10} />

    <div class="px-4">
        {#if customFormatStr !== ''}
            Currently selected:
            <span class="mr-2 text-primary dark:text-dark">{customFormatStr}</span>
        {:else}
            <div>Please select the time</div>
        {/if}
    </div>
    <Cell title="User-defined return time format" subTitle="The output format is Y year M month D day h hour m minute s second" on:click={() => (visible15 = true)} />
    <TimePicker bind:visible={visible15} outFormat="Y year, M month, D day, h hour, m minutes, s seconds" on:confirm={customFormatFunc} />

    <div class="px-4">
        {#if monthFirstStr !== ''}
            Currently selected:
            <span class="mr-2 text-primary dark:text-dark">{monthFirstStr}</span>
        {:else}
            <div>Please select the time</div>
        {/if}
    </div>
    <Cell title="Return time month before" on:click={() => (visible16 = true)} />
    <TimePicker bind:visible={visible16} type="YMD" outFormat="M/D/Y" on:confirm={monthFirstFunc} />

    <div class="px-4 text-xs">
        Currently selected:<br />
        <span class="mr-2 text-primary dark:text-dark break-words">{timeObjStr}</span>
    </div>
    <Cell title="Return time object" on:click={() => (visible17 = true)} />
    <TimePicker bind:visible={visible17} outFormat="object" on:confirm={getTimeObjFunc} />

    <Cell title="I want some rounded corners on the top" on:click={() => (visible14 = true)} />
    <TimePicker bind:visible={visible14} popup={{ radius: 'xl' }} />

    <Cell title="Custom title" on:click={() => (visible18 = true)} />
    <TimePicker bind:visible={visible18} title="Please select the time" />

    <Cell title="Specifies the initial selection year" on:click={() => (visible19 = true)} />
    <TimePicker bind:visible={visible19} initYear="2020" />

    <Cell title="Specifies the initial selected month" on:click={() => (visible20 = true)} />
    <TimePicker bind:visible={visible20} initMonth="05" />

    <Cell title="Specifies the initial selection time" on:click={() => (visible21 = true)} />
    <TimePicker bind:visible={visible21} initHour="05" initMinute="05" initSecond="05" />
</div>
