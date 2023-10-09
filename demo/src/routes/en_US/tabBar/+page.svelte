<!-- TabBar Demo -->
<script>
	import { TabBar } from '../../../../../packages/stdf/components';

	const labels = [
		{ text: 'Home', icon: { name: 'ri-home-3-line', size: 20 }, activeIcon: { name: 'ri-home-3-fill', size: 20 } },
		{
			text: 'Discover',
			icon: { name: 'ri-compass-3-line', size: 20 },
			activeIcon: { name: 'ri-compass-3-fill', size: 20 },
		},
		{
			text: 'Message',
			icon: { name: 'ri-discuss-line', size: 20 },
			activeIcon: { name: 'ri-discuss-fill', size: 20 },
		},
		{
			text: 'Mine',
			icon: { name: 'ri-account-circle-line', size: 20 },
			activeIcon: { name: 'ri-account-circle-fill', size: 20 },
		},
	];
	const labels1 = [{ text: 'Home' }, { text: 'Discover' }, { text: 'Message' }, { text: 'Mine' }];
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
		{ text: 'Home', icon: { name: 'ri-home-3-line', size: 20 } },
		{ text: 'Discover', icon: { name: 'ri-compass-3-line', size: 20 } },
		{ text: 'Message', icon: { name: 'ri-discuss-line', size: 20 } },
		{ text: 'Mine', icon: { name: 'ri-account-circle-line', size: 20 } },
	];
	const labels4 = [
		{ text: 'Home', icon: { name: 'ri-home-3-line', size: 20 }, activeIcon: { name: 'ri-home-3-fill', size: 20 } },
		{
			text: 'Message',
			icon: { name: 'ri-discuss-line', size: 20 },
			activeIcon: { name: 'ri-discuss-fill', size: 20 },
		},
		{
			text: 'Mine',
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
			<div class="font-bold px-4 mb-2">Basic usage</div>
			<TabBar {labels} />
		</div>
		<div>
			<div class="font-bold px-4 mb-2">Text only</div>
			<TabBar labels={labels1} />
		</div>
		<div>
			<div class="font-bold px-4 mb-2">Icon only</div>
			<TabBar labels={labels2} />
		</div>
		<div>
			<div class="font-bold px-4 mb-2">Belt line</div>
			<TabBar {labels} line lineW={8} />
			<div class="mt-2"></div>
			<TabBar {labels} line />
			<div class="mt-2"></div>
			<TabBar {labels} line lineW={2} />
			<div class="mt-2"></div>
			<TabBar {labels} line lineW={1} />
		</div>
		<div>
			<div class="font-bold px-4 mb-2">ICONS change colors only</div>
			<TabBar labels={labels3} />
		</div>
		<div>
			<div class="font-bold px-4 mb-2">Customize the outermost layer</div>
			<TabBar {labels} injClass="mx-2 rounded-full shadow-md dark:shadow-white/10" />
		</div>
		<div>
			<div class="font-bold px-4 mb-2">customize Tab</div>
			<TabBar {labels} tabInjClass="text-purple dark:text-orange" activeTabInjClass="!text-primary dark:!text-dark" />
		</div>
		<div>
			<div class="font-bold px-4 mb-2">Custom selection Tab</div>
			<TabBar {labels} activeTabInjClass="text-green dark:text-orange" />
		</div>
		<div>
			<div class="font-bold px-4 mb-2">Custom line</div>
			<TabBar {labels} line activeInjClass="bg-[red] dark:bg-[green]" />
		</div>
		<div>
			<div class="font-bold px-4 mb-2">Care edition</div>
			<TabBar {labels} love />
		</div>
		<div>
			<div class="font-bold px-4 mb-2">monitor change event</div>
			<div class="m-4">At present TabBar activated active：{active}</div>
			<TabBar {labels} on:change={tabBarChangeFun} />
		</div>
	</div>
</div>
<div class="fixed w-full bottom-0">
	<TabBar labels={labels4} injClass="bg-white/60 dark:bg-gray1/60 backdrop-blur" />
</div>
