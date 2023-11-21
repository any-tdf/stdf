<script>
	import { onMount } from 'svelte';
	import { Pagination, Loading } from '../../../../../packages/stdf/components';
	import aphorisms from '../../../data/aphorisms';

	// total data number, generally, the back-end interface returns
	const total = 200;

	// Current page number, demo event monitoring
	let current = 1;
	const preFunc = e => {
		current = e.detail;
	};
	const nextFunc = e => {
		current = e.detail;
	};
	const changeFunc = e => {
		current = e.detail;
	};

	// Simulation request data
	let data = [];
	let currentPage = 1;
	let pageSize = 4;
	let totalData = 0;
	let loading = false;
	const getData = () => {
		loading = true;
		// Simulate a request using setTimeout
		setTimeout(() => {
			loading = false;
			// Randomly extract pageSize pieces of data from aphorisms
			data = aphorisms.sort(() => Math.random() - 0.5).slice(0, pageSize);
			totalData = 64;
		}, 2000);
	};
	const changePageFunc = e => {
		currentPage = e.detail;
		getData();
	};
	// First page of the initial request
	onMount(() => {
		getData();
	});
</script>

<div class="m-4 mt-24 font-bold text-lg">Basic usage</div>
<Pagination {total} />

<div class="mx-4 mt-8 font-bold text-lg">Event monitoring</div>
<div class="mx-4 mb-2 text-sm">Current page number: {current}</div>
<Pagination {total} on:pre={preFunc} on:next={nextFunc} on:change={changeFunc} />

<div class="mx-4 mt-24 font-bold text-lg">Initially omitting page number</div>
<div class="mx-4 mb-4 text-xs">Can be used to guide users</div>
<Pagination {total} showNextOmitPage />

<div class="m-4 mt-8 font-bold text-lg">Set the initial page</div>
<Pagination {total} current={10} />

<div class="mx-4 mt-8 font-bold text-lg">Maximum display 11 pages</div>
<div class="mx-4 mb-4 text-xs">At the same time display more pages but the page number is small</div>
<Pagination maxShowPage={11} {total} />

<div class="mx-4 mt-8 font-bold text-lg">Maximum display 5 pages</div>
<div class="mx-4 mb-4 text-xs">Suitable for scenes with smaller paging area</div>
<div class="flex items-center">
	<div class="px-4">This is my site</div>
	<div class="flex-1">
		<Pagination maxShowPage={5} {total} />
	</div>
</div>

<div class="m-4 mt-8 font-bold text-lg">no data</div>
<Pagination total={0} />

<div class="m-4 mt-8 font-bold text-lg">Only one page</div>
<Pagination total={8} />

<div class="mx-4 mt-8 font-bold text-lg">The total number of pages does not exceed the maximum display page</div>
<div class="mx-4 mb-4 text-xs">There will be no omit -to -page number</div>
<Pagination total={70} />

<div class="mx-4 mt-8 font-bold text-lg">The total page number exceeds the maximum number of display pages, but not much</div>
<div class="mx-4 mb-4 text-xs">There will not be two provinces to elaborate before and after the same existence</div>
<Pagination total={90} maxShowPage={7} />

<div class="mx-4 mt-8 font-bold text-lg">A lot of total pages</div>
<div class="mx-4 mb-4 text-xs">There will be two provinces to omit the page number before and after at the same time</div>
<Pagination {total} />

<div class="m-4 mt-8 font-bold text-lg">Only 3 items per page</div>
<Pagination total={50} pageSize={3} />

<div class="m-4 mt-8 font-bold text-lg">Gao Liang Page Code is a border</div>
<Pagination {total} type="border" />

<div class="m-4 mt-8 font-bold text-lg">The highlight page number is block shape</div>
<Pagination {total} type="block" />

<div class="m-4 mt-8 font-bold text-lg">Increase high -bright pages round corners</div>
<Pagination {total} type="block" radius="xl" />

<div class="m-4 mt-8 font-bold text-lg">Number of omittings is 2</div>
<Pagination {total} pageCol={2} />

<div class="m-4 mt-8 font-bold text-lg">injection injClass</div>
<Pagination {total} injClass="mx-2 rounded-full shadow-md dark:shadow-white/10" />

<div class="m-4 mt-8 font-bold text-lg">Simulation request</div>
<div class="px-4 py-8 divide-y divide-black/5 dark:divide-white/5 min-h-[20rem] relative">
	{#each data as item}
		<div class:py-6={pageSize > 1}>
			<div class="text-sm text-justify">{item.text}</div>
			<div class="text-right mt-1" class:italic={item.fromItalic}>{item.from}</div>
		</div>
	{/each}
	{#if loading}
		<div class="absolute inset-0 w-full h-full backdrop-blur flex flex-col justify-center gap-8 text-center">
			<div>Query {currentPage} Page data...</div>
			<Loading />
		</div>
	{/if}
</div>
<Pagination {pageSize} total={totalData} on:change={changePageFunc} />

<div class="mx-4 mt-8 font-bold text-lg">Continuous mode</div>
<div class="mx-4 mb-4 text-xs">Only click on the previous page and next page</div>
<Pagination {total} continuous />

<div class="pb-10" />
