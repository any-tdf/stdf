<!-- Tabs Demo -->
<script>
	import { Tabs, Tab, TabContent, Divider } from '../../../../../packages/stdf/components';
	import { fly } from 'svelte/transition';

	const labels = [{ text: '飞机' }, { text: '轮船' }, { text: '火车' }, { text: '汽车' }];
	const labels1 = [
		{ icon: { name: 'ri-plane-line', theme: true, size: 20 } },
		{ icon: { name: 'ri-ship-2-line', theme: true, size: 20 } },
		{ icon: { name: 'ri-train-line', theme: true, size: 20 } },
		{ icon: { name: 'ri-car-line', theme: true, size: 20 } },
	];
	const labels2 = [
		{ text: '飞机', icon: { name: 'ri-plane-line', theme: true, size: 16, top: -1 } },
		{ text: '轮船', icon: { name: 'ri-ship-2-line', theme: true, size: 16, top: -1 } },
		{ text: '火车', icon: { name: 'ri-train-line', theme: true, size: 16, top: -1 } },
		{ text: '汽车', icon: { name: 'ri-car-line', theme: true, size: 16, top: -1 } },
	];
	const overflowLabels = [
		{ text: '飞机' },
		{ text: '轮船' },
		{ text: '火车' },
		{ text: '汽车' },
		{ text: '摩托车' },
		{ text: '自行车' },
		{ text: '热气球' },
		{ text: '火箭' },
		{ text: '拖拉机' },
		{ text: '地铁' },
		{ text: '公交车' },
		{ text: '滑板' },
		{ text: '飞碟' },
	];
	let width = $state(0);
	let changeActive = $state(0);
	let active = $state(2);
	const clicktabFun = a => {
		active = a;
	};
	const tabsChangeFun = a => {
		changeActive = a;
	};
</script>

<div class="py-8">
	<div class="font-bold text-xl px-4">使用 Tabs</div>
	<div class="space-y-4 my-4">
		<div class="font-bold px-4">基础用法</div>
		<Tabs tab={{ labels }}>
			<TabContent>我是飞机</TabContent>
			<TabContent>我是轮船</TabContent>
			<TabContent>我是火车</TabContent>
			<TabContent>我是汽车</TabContent>
		</Tabs>
		<Divider />

		<div class="font-bold px-4">加快过渡</div>
		<Tabs duration="fast" tab={{ labels }}>
			<TabContent>我是飞机</TabContent>
			<TabContent>我是轮船</TabContent>
			<TabContent>我是火车</TabContent>
			<TabContent>我是汽车</TabContent>
		</Tabs>
		<Divider />

		<div class="font-bold px-4">减缓过渡</div>
		<Tabs duration="slower" tab={{ labels }}>
			<TabContent>我是飞机</TabContent>
			<TabContent>我是轮船</TabContent>
			<TabContent>我是火车</TabContent>
			<TabContent>我是汽车</TabContent>
		</Tabs>
		<Divider />

		<div class="font-bold px-4">使用线性风格</div>
		<Tabs tab={{ labels, lineType: true }}>
			<TabContent>我是飞机</TabContent>
			<TabContent>我是轮船</TabContent>
			<TabContent>我是火车</TabContent>
			<TabContent>我是汽车</TabContent>
		</Tabs>
		<Divider />

		<div class="font-bold px-4">选项卡位于底部</div>
		<Tabs tab={{ labels }} position="b">
			<TabContent>我是飞机</TabContent>
			<TabContent>我是轮船</TabContent>
			<TabContent>我是火车</TabContent>
			<TabContent>我是汽车</TabContent>
		</Tabs>
		<Divider />

		<div class="font-bold px-4">选项卡位于左侧</div>
		<Tabs tab={{ labels }} position="l">
			{#snippet children({ active })}
				<TabContent show={active === 0}>我是飞机</TabContent>
				<TabContent show={active === 1}>我是轮船</TabContent>
				<TabContent show={active === 2}>我是火车</TabContent>
				<TabContent show={active === 3}>我是汽车</TabContent>
			{/snippet}
		</Tabs>
		<Divider />

		<div class="font-bold px-4">选项卡位于右侧</div>
		<Tabs tab={{ labels }} position="r">
			{#snippet children({ active })}
				<TabContent show={active === 0}>我是飞机</TabContent>
				<TabContent show={active === 1}>我是轮船</TabContent>
				<TabContent show={active === 2}>我是火车</TabContent>
				<TabContent show={active === 3}>我是汽车</TabContent>
			{/snippet}
		</Tabs>
		<Divider />

		<div class="font-bold px-4" bind:clientWidth={width}>自定义过渡</div>
		<Tabs tab={{ labels }} transition={false}>
			{#snippet children({ active })}
				<div class="relative py-8">
					{#each labels as item, i}
						{#if active === i}
							<div class="absolute" in:fly={{ y: -80, x: (width / 4) * i, duration: 1000 }}>我是{item.text}</div>
						{/if}
					{/each}
				</div>
			{/snippet}
		</Tabs>
		<Divider />

		<div class="font-bold px-4">监听 change 事件</div>
		<Tabs tab={{ labels }} onchange={tabsChangeFun}>
			<TabContent>我是飞机</TabContent>
			<TabContent>我是轮船</TabContent>
			<TabContent>我是火车</TabContent>
			<TabContent>我是汽车</TabContent>
		</Tabs>
		<div class="mt-4">当前 Tabs 激活的 active：{changeActive}</div>
		<Divider />

		<div class="font-bold px-4">溢出模式</div>
		<Tabs tab={{ labels: overflowLabels, overflow: true }}>
			{#each overflowLabels as item}
				<TabContent>我是{item.text}</TabContent>
			{/each}
		</Tabs>
		<Tabs tab={{ labels: overflowLabels, overflow: true, lineType: true }}>
			{#each overflowLabels as item}
				<TabContent>我是{item.text}</TabContent>
			{/each}
		</Tabs>
		<Divider />

		<div class="font-bold px-4">溢出模式关闭自动滚动</div>
		<Tabs tab={{ labels: overflowLabels, overflow: true, autoScroll: false }}>
			{#each overflowLabels as item}
				<TabContent>我是{item.text}</TabContent>
			{/each}
		</Tabs>
		<Divider />

		<div class="font-bold px-4">溢出模式完整显示 2 项</div>
		<Tabs tab={{ labels: overflowLabels, overflow: true, showNum: 2 }}>
			{#each overflowLabels as item}
				<TabContent>我是{item.text}</TabContent>
			{/each}
		</Tabs>
	</div>
	<Divider />

	<div class="font-bold mt-8 text-xl px-4">不同的 Tab 风格</div>
	<div class="flex flex-col space-y-2 mt-4">
		<div class="font-bold px-4">不同圆角</div>
		<Tab {labels} radius="none" />
		<Tab {labels} />
		<Tab {labels} radius="xl" />
		<Tab {labels} radius="full" />

		<div class="font-bold px-4">文字与图标搭配</div>
		<Tab {labels} />
		<Tab labels={labels1} />
		<Tab labels={labels2} />

		<div class="font-bold px-4">关爱版</div>
		<Tab {labels} love />

		<div class="font-bold px-4">线性风格</div>
		<Tab {labels} lineType />
		<Tab labels={labels2} lineType />

		<div class="font-bold px-4">自定义 Tab 外层风格</div>
		<Tab {labels} injClass="bg-gradient-to-b from-[#e3c6ff] to-[#b6aeff]" />

		<div class="font-bold px-4">自定义 Tab 风格</div>
		<Tab {labels} tabInjClass="underline text-primary decoration-primary dark:text-dark dark:decoration-dark" />

		<div class="font-bold px-4">自定义选定 Tab 风格</div>
		<Tab {labels} activeTabInjClass="text-primary dark:text-dark !text-base transition-all" />

		<div class="font-bold px-4">自定义指示器风格</div>
		<Tab {labels} activeInjClass="bg-gradient-to-b from-[#CE9FFC] to-[#7367F0]" activeTabInjClass="text-white" />
		<Tab {labels} lineType activeInjClass="bg-gradient-to-r from-[#CE9FFC] to-[#7367F0]" />

		<div class="font-bold px-4">不同的左右间距</div>
		<div class="flex flex-col space-y-2 mt-4">
			<Tab {labels} mx="12" />
			<Tab {labels} lineType mx="12" />
			<Tab {labels} mx="0" />
			<Tab {labels} lineType mx="0" />
		</div>
	</div>
	<Divider />

	<div class="font-bold my-8 text-xl px-4">单独使用 Tab</div>
	<div class="my-4">
		<Tab {labels} {active} onclickTab={clicktabFun} />
		<div class="mt-4">当前 Tab 点击的 active：{active}</div>
	</div>
	<Divider />
</div>
