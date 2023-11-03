<!-- Slider Demo -->
<script>
	import { Slider, Icon } from '../../../../../packages/stdf/components';

	let value = 20;
	const onChangeFun = e => {
		value = e.detail;
	};
	let valueRange = [50, 60];
	const onChangeRangeFun = e => {
		valueRange = e.detail;
	};
	//Generates an array of random numbers between the specified numbers
	const randomArray = (min, max, length) => {
		let arr = [];
		for (let i = 0; i < length; i++) {
			arr.push(Math.floor(Math.random() * (max - min + 1) + min));
		}
		return arr;
	};
	//Sort an array incrementally or decently
	const sortArray = (arr, isAsc) => {
		return arr.sort((a, b) => (isAsc ? a - b : b - a));
	};
	const barList1 = sortArray(randomArray(2, 60, 20), true);
	const barList2 = sortArray(randomArray(2, 60, 20), false);
	const barList = [...barList1, ...barList2];
	let valueBar = 70;
	const onChangeBarFun = e => {
		valueBar = e.detail;
	};
</script>

<div class="mx-4 mt-8 font-bold text-lg">Basic usage</div>
<div class="px-6 py-4">
	<Slider />
</div>
<div class="mx-4 mt-8 font-bold text-lg">monitor value</div>
<div class="px-6 py-4">
	<Slider on:change={onChangeFun} {value} />
	Current value:{value}
</div>
<div class="mx-4 mt-8 font-bold text-lg">Step size is 5</div>
<div class="px-6 py-4">
	<Slider step={5} />
</div>
<div class="mx-4 mt-8 font-bold text-lg">Step size is 0.1</div>
<div class="px-6 py-4">
	<Slider step={0.1} value={0.2} minRange={0} maxRange={1} />
</div>
<div class="mx-4 mt-8 font-bold text-lg">Set optional range (60-80)</div>
<div class="px-6 py-4">
	<Slider value={68} minRange={60} maxRange={80} />
</div>
<div class="mx-4 mt-8 font-bold text-lg">Interval selection</div>
<div class="px-6 py-4">
	<Slider isRange />
</div>
<div class="mx-4 mt-8 font-bold text-lg">Range setting Optional range (40-80)</div>
<div class="px-6 py-4">
	<Slider isRange minRange={40} maxRange={80} startValue={valueRange[0]} endValue={valueRange[1]} on:change={onChangeRangeFun} />
	Current interval:{valueRange[0]} - {valueRange[1]}
</div>
<div class="mx-4 mt-8 font-bold text-lg">Different fillet</div>
<div class="px-6 py-4">
	<Slider radius="base" />
</div>
<div class="px-6 py-4">
	<Slider radius="none" />
</div>
<div class="px-6 py-4">
	<Slider radius="base" isRange />
</div>
<div class="mx-4 mt-8 font-bold text-lg">Wire frame slider</div>
<div class="px-6 py-4">
	<Slider lineBlock radius="base" />
</div>
<div class="px-6 py-4">
	<Slider lineBlock isRange />
</div>
<div class="mx-4 mt-8 font-bold text-lg">Always show Tip</div>
<div class="px-6 py-4">
	<Slider showTip="always" />
</div>
<div class="px-6 py-4">
	<Slider showTip="always" isRange />
</div>
<div class="px-6 py-4">
	<Slider showTip="always" radius="none" />
</div>
<div class="mx-4 mt-8 font-bold text-lg">Do not display Tip</div>
<div class="px-6 py-4">
	<Slider showTip="never" />
</div>
<div class="mx-4 mt-8 font-bold text-lg">Composite layout</div>
<div class="flex space-x-3 p-4">
	<Icon name="ri-volume-mute-line" />
	<div class="grow">
		<Slider />
	</div>
	<Icon name="ri-volume-up-line" />
</div>
<div class="mx-4 mt-8 font-bold text-lg">use Slot</div>
<div class="px-6 pt-16">
	<Slider lineBlock showTip="never" useSlot value={valueBar} on:change={onChangeBarFun}>
		<div class="grow relative items-end">
			<div class="flex justify-between items-end overflow-hidden" style="transform: translateY(-30px);">
				{#each barList as item, i}
					<div
						class={`w-1 rounded-full${i / 40 < valueBar / 100 ? ' bg-primary dark:bg-dark' : ' bg-gray-200 dark:bg-gray-500'}`}
						style="height: {item}px"
					/>
				{/each}
			</div>
		</div>
	</Slider>
</div>
<div class="mx-4 mt-8 font-bold text-lg">disable</div>
<div class="px-6 py-4">
	<Slider disabled />
</div>
<div class="mx-4 mt-8 font-bold text-lg">Read only</div>
<div class="px-6 py-4">
	<Slider readonly />
</div>
