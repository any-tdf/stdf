<!-- Tabs Demo -->
<script>
	import { Tabs, Tab, TabContent, Divider } from '../../../../../packages/stdf/components';
	import { fly } from 'svelte/transition';

	const labels = [{ text: 'aircraft' }, { text: 'steamer' }, { text: 'train' }, { text: 'car' }];
	const labels1 = [
		{ icon: { name: 'ri-plane-line', theme: true, size: 20 } },
		{ icon: { name: 'ri-ship-2-line', theme: true, size: 20 } },
		{ icon: { name: 'ri-train-line', theme: true, size: 20 } },
		{ icon: { name: 'ri-car-line', theme: true, size: 20 } },
	];
	const labels2 = [
		{ text: 'aircraft', icon: { name: 'ri-plane-line', theme: true, size: 16, top: -1 } },
		{ text: 'steamer', icon: { name: 'ri-ship-2-line', theme: true, size: 16, top: -1 } },
		{ text: 'train', icon: { name: 'ri-train-line', theme: true, size: 16, top: -1 } },
		{ text: 'car', icon: { name: 'ri-car-line', theme: true, size: 16, top: -1 } },
	];
	const overflowLabels = [
		{ text: 'aircraft' },
		{ text: 'steamer' },
		{ text: 'train' },
		{ text: 'car' },
		{ text: 'motorcycle' },
		{ text: 'bicycle' },
		{ text: 'hot air balloon' },
		{ text: 'rocket' },
		{ text: 'tractor' },
		{ text: 'subway' },
		{ text: 'bus' },
		{ text: 'skateboard' },
		{ text: 'flying saucer' },
	];
	let width = 0;
	let changeActive = 0;
	let active = 2;
	const clicktabFun = e => {
		active = e.detail;
	};
	const tabsChangeFun = e => {
		changeActive = e.detail;
	};
</script>

<div class="py-8">
	<div class="font-bold text-xl px-4">use Tabs</div>
	<div class="space-y-4 my-4">
		<div class="font-bold px-4">Basic usage</div>
		<Tabs tab={{ labels }}>
			<TabContent>I am a plane</TabContent>
			<TabContent>I am a ship</TabContent>
			<TabContent>I am a train</TabContent>
			<TabContent>I am a car</TabContent>
		</Tabs>
		<Divider />

		<div class="font-bold px-4">Accelerate the transition</div>
		<Tabs duration="fast" tab={{ labels }}>
			<TabContent>I am a plane</TabContent>
			<TabContent>I am a ship</TabContent>
			<TabContent>I am a train</TabContent>
			<TabContent>I am a car</TabContent>
		</Tabs>
		<Divider />

		<div class="font-bold px-4">Transition mitigation</div>
		<Tabs duration="slower" tab={{ labels }}>
			<TabContent>I am a plane</TabContent>
			<TabContent>I am a ship</TabContent>
			<TabContent>I am a train</TabContent>
			<TabContent>I am a car</TabContent>
		</Tabs>
		<Divider />

		<div class="font-bold px-4">Use linear style</div>
		<Tabs tab={{ labels, lineType: true }}>
			<TabContent>I am a plane</TabContent>
			<TabContent>I am a ship</TabContent>
			<TabContent>I am a train</TabContent>
			<TabContent>I am a car</TabContent>
		</Tabs>
		<Divider />

		<div class="font-bold px-4">The TAB is located at the bottom</div>
		<Tabs tab={{ labels }} position="b">
			<TabContent>I am a plane</TabContent>
			<TabContent>I am a ship</TabContent>
			<TabContent>I am a train</TabContent>
			<TabContent>I am a car</TabContent>
		</Tabs>
		<Divider />

		<div class="font-bold px-4">The TAB is located on the left</div>
		<Tabs tab={{ labels }} position="l" let:active>
			<TabContent show={active === 0}>I am a plane</TabContent>
			<TabContent show={active === 1}>I am a ship</TabContent>
			<TabContent show={active === 2}>I am a train</TabContent>
			<TabContent show={active === 3}>I am a car</TabContent>
		</Tabs>
		<Divider />

		<div class="font-bold px-4">The TAB is located on the right</div>
		<Tabs tab={{ labels }} position="r" let:active>
			<TabContent show={active === 0}>I am a plane</TabContent>
			<TabContent show={active === 1}>I am a ship</TabContent>
			<TabContent show={active === 2}>I am a train</TabContent>
			<TabContent show={active === 3}>I am a car</TabContent>
		</Tabs>
		<Divider />

		<div class="font-bold px-4" bind:clientWidth={width}>Custom transition</div>
		<Tabs tab={{ labels }} let:active transition={false}>
			<div class="relative py-8">
				{#if active === 0}
					<div class="absolute" in:fly={{ y: -60, x: 0, duration: 1000 }}>I am a plane</div>
				{:else if active === 1}
					<div class="absolute" in:fly={{ y: -60, x: width / 4, duration: 1000 }}>I am a ship</div>
				{:else if active === 2}
					<div class="absolute" in:fly={{ y: -60, x: width / 2, duration: 1000 }}>I am a train</div>
				{:else if active === 3}
					<div class="absolute" in:fly={{ y: -60, x: (width / 4) * 3, duration: 1000 }}>I am a car</div>
				{/if}
			</div>
		</Tabs>
		<Divider />

		<div class="font-bold px-4">monitor change event</div>
		<Tabs tab={{ labels }} on:change={tabsChangeFun}>
			<TabContent>I am a plane</TabContent>
			<TabContent>I am a ship</TabContent>
			<TabContent>I am a train</TabContent>
			<TabContent>I am a car</TabContent>
		</Tabs>
		<div class="mt-4">At present Tabs activated active：{changeActive}</div>
		<Divider />

		<div class="font-bold px-4">Overflow mode</div>
		<Tabs tab={{ labels: overflowLabels, overflow: true }}>
			{#each overflowLabels as item}
				<TabContent>I am {item.text}</TabContent>
			{/each}
		</Tabs>
		<Tabs tab={{ labels: overflowLabels, overflow: true, lineType: true }}>
			{#each overflowLabels as item}
				<TabContent>I am {item.text}</TabContent>
			{/each}
		</Tabs>
		<Divider />

		<div class="font-bold px-4">Overflow mode closes automatic scrolling</div>
		<Tabs tab={{ labels: overflowLabels, overflow: true, autoScroll: false }}>
			{#each overflowLabels as item}
				<TabContent>I am {item.text}</TabContent>
			{/each}
		</Tabs>
		<Divider />

		<div class="font-bold px-4">Overflow mode shows 2 items</div>
		<Tabs tab={{ labels: overflowLabels, overflow: true, showNum: 5 }}>
			{#each overflowLabels as item}
				<TabContent>I am {item.text}</TabContent>
			{/each}
		</Tabs>
	</div>
	<Divider />

	<div class="font-bold mt-8 text-xl px-4">different Tab style</div>
	<div class="flex flex-col space-y-2 mt-4">
		<div class="font-bold px-4">Different fillet</div>
		<Tab {labels} radius="none" />
		<Tab {labels} />
		<Tab {labels} radius="xl" />
		<Tab {labels} radius="full" />

		<div class="font-bold px-4">Match text with ICONS</div>
		<Tab {labels} />
		<Tab labels={labels1} />
		<Tab labels={labels2} />

		<div class="font-bold px-4">Care edition</div>
		<Tab {labels} love />

		<div class="font-bold px-4">Linear style</div>
		<Tab {labels} lineType />
		<Tab labels={labels2} lineType />

		<div class="font-bold px-4">customize Tab Outer style</div>
		<Tab {labels} injClass="bg-gradient-to-b from-[#e3c6ff] to-[#b6aeff]" />

		<div class="font-bold px-4">customize Tab style</div>
		<Tab {labels} tabInjClass="underline text-primary decoration-primary dark:text-dark dark:decoration-dark" />

		<div class="font-bold px-4">Custom selection Tab style</div>
		<Tab {labels} activeTabInjClass="text-primary dark:text-dark !text-base transition-all" />

		<div class="font-bold px-4">Customize the indicator style</div>
		<Tab {labels} activeInjClass="bg-gradient-to-b from-[#CE9FFC] to-[#7367F0]" activeTabInjClass="text-white" />
		<Tab {labels} lineType activeInjClass="bg-gradient-to-r from-[#CE9FFC] to-[#7367F0]" />

		<div class="font-bold px-4">Different mx</div>
		<div class="flex flex-col space-y-2 mt-4">
			<Tab {labels} mx="12" />
			<Tab {labels} lineType mx="12" />
			<Tab {labels} mx="0" />
			<Tab {labels} lineType mx="0" />
		</div>
	</div>
	<Divider />

	<div class="font-bold my-8 text-xl px-4">Use alone Tab</div>
	<div class="my-4">
		<Tab {labels} {active} on:clicktab={clicktabFun} />
		<div class="mt-4">At present Tab clickable active：{active}</div>
	</div>
	<Divider />
</div>
