<!-- NavBar Demo -->
<script>
	import { NavBar, Icon, Toast } from '../../../../../packages/stdf/components';

	const icons1 = [{ name: 'ri-paint-brush-line', theme: true }, { name: 'ri-share-line' }];
	const icons2 = [{ name: 'ri-command-line' }, { name: 'ri-drag-move-line' }];
	const icons3 = [{ name: 'ri-indent-decrease' }, { name: 'ri-service-line' }];
	const icons4 = [{ name: 'ri-hand-heart-line', theme: true }, { name: 'ri-parent-line' }];

	let visible1 = $state(false);
	let visible2 = $state(false);
	let rightIndex = $state(0);
	let visible3 = $state(false);
</script>

<div class="flex flex-col space-y-8 py-8">
	<NavBar title="基础用法" />
	<NavBar title="右侧使用 Icon" rights={icons1} />
	<NavBar title="点击左侧" onclickLeft={() => (visible1 = true)} />
	<Toast bind:visible={visible1} message="点击了左侧！" />
	<NavBar
		title="点击右侧"
		rights={icons2}
		onclickRight={index => {
			visible2 = true;
			rightIndex = index;
		}}
	/>
	<Toast bind:visible={visible2} message={`点击的右侧图标索引值是 ${rightIndex}。`} />
	<NavBar title="无左侧与底分割线，文字过长长长长长长长" left={null} line={false} rights={icons3} />
	<NavBar title="自定义背景颜色 by injClass" injClass="bg-[wheat] dark:bg-extend0" />
	<NavBar>
		{#snippet titleChild()}
			<div class="text-[red] dark:text-extend1">自定义文字颜色 by Snippet</div>
		{/snippet}
	</NavBar>
	<NavBar>
		{#snippet titleChild()}
			<div class="flex flex-col justify-around text-xs h-12">
				<div class="text-sm">title 插槽渲染标题区域</div>
				<div>right 插槽渲染右侧且可点击</div>
			</div>
		{/snippet}
		{#snippet rightChild()}
			<div>
				<button class="h-12 w-12 text-center text-primary dark:text-dark cursor-pointer" onclick={() => (visible3 = true)}>Hello</button>
			</div>
		{/snippet}
	</NavBar>
	<Toast bind:visible={visible3} message="点击了右侧插槽内容！" />
	<NavBar title="关爱版导航栏" love rights={icons4} />
	<NavBar injClass="!bg-transparent" line={false}>
		{#snippet leftChild()}
			<div class="h-8 w-8 m-2 leading-8 text-center bg-white dark:bg-black/50 rounded-full">
				<Icon name="ri-home-7-line" size={18} top={-2} />
			</div>
		{/snippet}
		{#snippet titleChild()}
			<div class="px-3 h-8 my-2 leading-8 text-sm bg-white dark:bg-black/50 rounded-full">injClass 与 Snippet 结合自定义样式</div>
		{/snippet}
		{#snippet rightChild()}
			<div class="h-8 w-8 m-2 leading-8 text-center bg-white dark:bg-black/50 rounded-full">
				<Icon name="ri-customer-service-2-line" size={18} top={-2} />
			</div>
		{/snippet}
	</NavBar>
</div>
