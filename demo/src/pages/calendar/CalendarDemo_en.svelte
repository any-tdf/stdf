<!-- Calendar Demo -->
<script>
	import { Cell, Calendar } from 'stdf';

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
	let visible23 = false;

	// The 6 days after the current date randomly takes out the INFODATES array, the Date format is yyyymmdd, and the month and day make up for 2 digits
	const now = new Date();
	const infoDates = [];
	for (let i = 0; i < 6; i++) {
		const date = new Date(now.getTime() + i * 24 * 60 * 60 * 1000);
		infoDates.push(
			`${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}`,
		);
	}
	// Loop infoDates, in turn, each item is converted to an object, date is the date, and info is respectively departure, check-in, shopping, photography, check-out, and return
	infoDates.forEach((date, index) => {
		infoDates[index] = {
			date,
			info: ['Set off', 'Stay', 'Shopping', 'Photo', 'Leave', 'Return'][index],
		};
	});

	// For a total of 14 days before the current date and 7 days after 7 days, the formation of the array DisableDates. The DATE format is yyyymmdd, and the month and day are added.
	const disabledDates = [];
	const before7 = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
	for (let i = 0; i < 14; i++) {
		const date = new Date(before7.getTime() + i * 24 * 60 * 60 * 1000);
		disabledDates.push(
			`${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}`,
		);
	}
	// Pass the number N and return to the month of the N -month month in the current month. The format is yyyymm, and the month is added 2 digits.
	const getInitMonth = n => {
		const now = new Date();
		const year = now.getFullYear();
		const month = now.getMonth() + 1;
		const newMonth = month - n;
		if (newMonth > 0) {
			return `${year}${newMonth.toString().padStart(2, '0')}`;
		} else {
			return `${year - 1}${(12 + newMonth).toString().padStart(2, '0')}`;
		}
	};
	const initMonth = getInitMonth(3);

	const quickSelects = ['week', 'month', 'quarter', -3, -7, -30, 3, 7, 30];
	const quickSelectsDay = [-5, -2, 3, 7];

	let selectedDates = [];
	const getSelectedDatesFunc = e => {
		selectedDates = e.detail.dates;
	};

	let selectedFormatDates = [];
	const getSelectedFormatDatesFunc = e => {
		selectedFormatDates = e.detail.dates;
	};
</script>

<div class="py-4">
	<Cell title="Basic usage" on:click={() => (visible1 = true)} />
	<Calendar bind:visible={visible1} />

	<Cell title="Choice" on:click={() => (visible7 = true)} />
	<Calendar bind:visible={visible7} mode="multiple" />

	<Cell title="Range selection" on:click={() => (visible8 = true)} />
	<Calendar bind:visible={visible8} mode="range" />

	<Cell title="Starting from Sunday" on:click={() => (visible2 = true)} />
	<Calendar bind:visible={visible2} startSunday />

	<Cell title="Weekend text marking red" on:click={() => (visible3 = true)} />
	<Calendar bind:visible={visible3} weekendRed />

	<Cell title="No card style but add watermark" on:click={() => (visible4 = true)} />
	<Calendar bind:visible={visible4} monthCard={false} monthMark />

	<Cell title="Higher" on:click={() => (visible5 = true)} />
	<Calendar bind:visible={visible5} height={60} />

	<Cell title="Customize the date of display information" on:click={() => (visible6 = true)} />
	<Calendar bind:visible={visible6} {infoDates} />

	<Cell title="Do not round the corner" on:click={() => (visible9 = true)} />
	<Calendar bind:visible={visible9} mode="range" radius="none" />

	<Cell title="Increase the corner" on:click={() => (visible10 = true)} />
	<Calendar bind:visible={visible10} mode="range" radius="2xl" />

	<Cell title="Turn off the animation when rolling" on:click={() => (visible18 = true)} />
	<Calendar bind:visible={visible18} useAnimation={false} />

	<Cell title="Configure confirmation button style" on:click={() => (visible11 = true)} />
	<Calendar bind:visible={visible11} button={{ radius: 'full' }} />

	<Cell title="Top rounded corner" on:click={() => (visible19 = true)} />
	<Calendar bind:visible={visible19} popup={{ radius: 'xl' }} />

	<Cell title="Definition start and end month" on:click={() => (visible12 = true)} />
	<Calendar bind:visible={visible12} startMonth="202101" endMonth="202106" />

	<Cell title="Customize the unsalented date" on:click={() => (visible13 = true)} />
	<Calendar bind:visible={visible13} {disabledDates} mode="range" />

	<Cell title="No showed days have been displayed" on:click={() => (visible14 = true)} />
	<Calendar bind:visible={visible14} mode="range" showSelectedDay={false} />

	<Cell title="Customized initial display month" subTitle="Third month before the current month" on:click={() => (visible15 = true)} />
	<Calendar bind:visible={visible15} {initMonth} />

	<Cell title="Show some fast selection items" on:click={() => (visible16 = true)} />
	<Calendar bind:visible={visible16} mode="range" {quickSelects} />

	<Cell title="Quickly choose to include that day" on:click={() => (visible23 = true)} />
	<Calendar bind:visible={visible23} mode="range" quickSelects={quickSelectsDay} includeToday />

	<Cell title="Select this week from Sunday" on:click={() => (visible17 = true)} />
	<Calendar bind:visible={visible17} mode="range" startSunday quickSelects={['week']} />

	<div class="px-4">
		{#if selectedDates.length}
			The following is the following total {selectedDates.length} day:
		{:else}
			<div>Please select the date</div>
		{/if}
	</div>
	<div class="grid grid-cols-4 gap-2 p-2 text-primary dark:text-dark">
		{#each selectedDates as item}
			<div class="text-center">{item}</div>
		{/each}
	</div>
	<Cell title="Get the selection date of returning" on:click={() => (visible20 = true)} />
	<Calendar bind:visible={visible20} mode="range" on:confirm={getSelectedDatesFunc} />

	<div class="px-4">
		{#if selectedFormatDates.length}
			The following is the following total {selectedFormatDates.length} day:
		{:else}
			<div>Please select the date</div>
		{/if}
	</div>
	<div class="grid grid-cols-3 gap-2 p-2 text-primary dark:text-dark text-sm">
		{#each selectedFormatDates as item}
			<div class="text-center">{item}</div>
		{/each}
	</div>
	<Cell title="Customized date format" on:click={() => (visible21 = true)} />
	<Calendar bind:visible={visible21} mode="range" outFormat="M/D/Y" on:confirm={getSelectedFormatDatesFunc} />

	<Cell title="Turn off today's highlight display" on:click={() => (visible22 = true)} />
	<Calendar bind:visible={visible22} highlightToday={false} />
</div>
