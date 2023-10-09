<!-- TabBar Demo -->
<script>
	import { TabBar } from '../../../../../packages/stdf/components';

	const labels = [
		{ text: '首页', icon: { name: 'ri-home-3-line', size: 20 }, activeIcon: { name: 'ri-home-3-fill', size: 20 } },
		{
			text: '发现',
			icon: { name: 'ri-compass-3-line', size: 20 },
			activeIcon: { name: 'ri-compass-3-fill', size: 20 },
		},
		{
			text: '消息',
			icon: { name: 'ri-discuss-line', size: 20 },
			activeIcon: { name: 'ri-discuss-fill', size: 20 },
		},
		{
			text: '我的',
			icon: { name: 'ri-account-circle-line', size: 20 },
			activeIcon: { name: 'ri-account-circle-fill', size: 20 },
		},
	];
	const labels1 = [{ text: '首页' }, { text: '发现' }, { text: '消息' }, { text: '我的' }];
	const labels2 = [
		{ icon: { name: 'ri-home-3-line', size: 26 }, activeIcon: { name: 'ri-home-3-fill', size: 26 } },
		{ icon: { name: 'ri-compass-3-line', size: 26 }, activeIcon: { name: 'ri-compass-3-fill', size: 26 } },
		{ icon: { name: 'ri-discuss-line', size: 26 }, activeIcon: { name: 'ri-discuss-fill', size: 26 } },
		{
			icon: { name: 'ri-account-circle-line', size: 26 },
			activeIcon: { name: 'ri-account-circle-fill', size: 26 },
		},
	];
	const labels3 = [
		{ text: '首页', icon: { name: 'ri-home-3-line', size: 20 } },
		{ text: '发现', icon: { name: 'ri-compass-3-line', size: 20 } },
		{ text: '消息', icon: { name: 'ri-discuss-line', size: 20 } },
		{ text: '我的', icon: { name: 'ri-account-circle-line', size: 20 } },
	];
	const labels4 = [
		{ text: '首页', icon: { name: 'ri-home-3-line', size: 20 }, activeIcon: { name: 'ri-home-3-fill', size: 20 } },
		{
			text: '消息',
			icon: { name: 'ri-discuss-line', size: 20 },
			activeIcon: { name: 'ri-discuss-fill', size: 20 },
		},
		{
			text: '我的',
			icon: { name: 'ri-account-circle-line', size: 20 },
			activeIcon: { name: 'ri-account-circle-fill', size: 20 },
		},
	];
	let active = 0;
	const tabBarChangeFun = e => {
		active = e.detail;
	};
</script>

<div class="py-8 mb-20">
	<div class="space-y-8 my-4">
		<div>
			<div class="font-bold px-4 mb-2">基础用法</div>
			<TabBar {labels} />
		</div>
		<div>
			<div class="font-bold px-4 mb-2">仅文字</div>
			<TabBar labels={labels1} />
		</div>
		<div>
			<div class="font-bold px-4 mb-2">仅图标</div>
			<TabBar labels={labels2} />
		</div>
		<div>
			<div class="font-bold px-4 mb-2">带线条</div>
			<TabBar {labels} line lineW={8} />
			<div class="mt-2"></div>
			<TabBar {labels} line />
			<div class="mt-2"></div>
			<TabBar {labels} line lineW={2} />
			<div class="mt-2"></div>
			<TabBar {labels} line lineW={1} />
		</div>
		<div>
			<div class="font-bold px-4 mb-2">图标仅换颜色</div>
			<TabBar labels={labels3} />
		</div>
		<div>
			<div class="font-bold px-4 mb-2">自定义最外层</div>
			<TabBar {labels} injClass="mx-2 rounded-full shadow-md dark:shadow-white/10" />
		</div>
		<div>
			<div class="font-bold px-4 mb-2">自定义 Tab</div>
			<TabBar {labels} tabInjClass="text-purple dark:text-orange" activeTabInjClass="!text-primary dark:!text-dark" />
		</div>
		<div>
			<div class="font-bold px-4 mb-2">自定义选定 Tab</div>
			<TabBar {labels} activeTabInjClass="text-green dark:text-orange" />
		</div>
		<div>
			<div class="font-bold px-4 mb-2">自定义线条</div>
			<TabBar {labels} line activeInjClass="bg-[red] dark:bg-[green]" />
		</div>
		<div>
			<div class="font-bold px-4 mb-2">关爱版</div>
			<TabBar {labels} love />
		</div>
		<div>
			<div class="font-bold px-4 mb-2">监听 change 事件</div>
			<div class="m-4">当前 TabBar 激活的 active：{active}</div>
			<TabBar {labels} on:change={tabBarChangeFun} />
		</div>
	</div>
</div>
<div class="fixed w-full bottom-0">
	<TabBar labels={labels4} injClass="bg-white/60 dark:bg-gray1/60 backdrop-blur" />
</div>
