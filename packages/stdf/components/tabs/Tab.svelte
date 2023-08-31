<script>
	import { createEventDispatcher } from 'svelte';
	import Icon from '../icon/Icon.svelte';

	export let labels = []; //选项卡内容组  content group of tabs
	export let active = 0; //当前选中的选项卡索引  index of active tab
	export let lineType = false; //是否使用线性风格,layout为v时失效  whether to use linear style, invalid when layout is v
	export let radius = 'base'; //圆角风格：none/base/xl/full  radius style:none/base/xl/full
	export let duration = 'base'; //过渡时间fast/base/slow/slower  transition time:fast/base/slow/slower
	export let layout = 'h'; //布局，h/v，对应tabs的placement  layout,h/v,corresponding to placement of tabs
	export let love = false; //是否开启关爱版  whether to open love version
	export let injClass = ''; //Tab最外层注入CSS  Tab outermost layer injection CSS
	export let tabInjClass = ''; //tab注入CSS  tab injection CSS
	export let activeTabInjClass = ''; //选中tab注入CSS  selected tab injection CSS
	export let activeInjClass = ''; //指示器注入CSS  indicator injection CSS
	export let mx = '4'; //左右间距  left and right spacing

	const radiusObj = {
		none: 'rounded-none',
		base: 'rounded',
		xl: 'rounded-xl',
		full: 'rounded-full',
	};
	const durationObj = {
		fast: 'duration-150',
		base: 'duration-300',
		slow: 'duration-500',
		slower: 'duration-1000',
	};
	const mxClass = {
		'0': ' mx-0',
		'1': ' mx-1',
		'2': ' mx-2',
		'3': ' mx-3',
		'4': ' mx-4',
		'6': ' mx-6',
		'8': ' mx-8',
		'12': ' mx-12',
		'16': ' mx-16',
		'20': ' mx-20',
	};
	const dispatch = createEventDispatcher(); //事件派发器  event dispatcher

	const clickTabFun = i => {
		active = i;
		//派发Tab点击事件，i表示点击的Tab索引值，即labels索引值
		// dispatch Tab click event,i represents the index value of the clicked Tab, that is, the index value of labels
		dispatch('clicktab', i);
	};
	let tabW = 0;
	let tabH = 0;
	$: activeW = layout === 'h' ? (tabW - 4) / labels.length : tabW - 4;
	$: activeH = layout === 'h' ? tabH - 4 : (tabH - 4) / labels.length;
	$: activeLeft = layout === 'h' ? 2 + active * ((tabW - 4) / labels.length) : 2;
	$: activeTop = layout === 'h' ? (lineType ? tabH - 2 : 2) : 2 + active * ((tabH - 4) / labels.length);
</script>

<div
	bind:clientWidth={tabW}
	bind:clientHeight={tabH}
	class={`${lineType && layout !== 'v' ? '' : 'bg-black/5 dark:bg-white/5'} p-[2px] relative ${radiusObj[radius] || radiusObj.base}${
		mxClass[mx] || mxClass['4']
	} ${injClass}`}
>
	{#if lineType && layout !== 'v'}
		<div class="absolute h-[2px] bg-black/5 dark:bg-white/5 w-full bottom-0" />
	{/if}
	<div
		class={` ${lineType && layout !== 'v' ? '' : 'shadow dark:shadow-sm dark:shadow-white/10'} absolute transition-all ${
			durationObj[duration] || durationObj.base
		} ${radiusObj[radius] || radiusObj.base} ${
			lineType && layout !== 'v' ? 'bottom-0 bg-gray1 dark:bg-gray9' : 'bg-white dark:bg-gray1'
		} ${activeInjClass}`}
		style="width:{activeW}px;height:{lineType && layout !== 'v' ? 2 : activeH}px;left:{activeLeft}px;top:{activeTop}px"
	/>
	<div class={`relative ${layout === 'h' ? 'flex justify-between' : 'px-4  whitespace-nowrap'}`}>
		{#each labels as label, i}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<div
				class={`cursor-pointer flex-1 flex justify-center ${layout === 'h' ? 'py-1' : 'py-2'} font-medium ${
					love ? 'text-lg' : 'text-sm'
				} leading-6 ${radiusObj[radius] || radiusObj.base} ${tabInjClass} ${i === active ? activeTabInjClass : ''}`}
				on:click={() => clickTabFun(i)}
			>
				{#if label.icon}
					<div class={`mr-[2px] ${durationObj[duration] || durationObj.base}`}>
						<Icon {...label.icon} />
					</div>
				{/if}
				{#if label.text}
					<div class={`transition-all ${durationObj[duration] || durationObj.base}`}>{label.text}</div>
				{/if}
			</div>
		{/each}
	</div>
</div>
