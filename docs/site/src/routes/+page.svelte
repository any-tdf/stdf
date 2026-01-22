<script lang="ts">
	import { fly } from 'svelte/transition';
	import { Confetti } from 'svelte-confetti';
	import { currentThemeStore, currentColorStore } from '../store';
	// @ts-ignore
	import { encodeData, rendererLine } from 'beautify-qrcode';
	import { Tab, Loading, Switch, Avatar, Pagination, Input, Rate, Icon, NoticeBar, Slider, Swiper, Button, Card } from 'stdf';
	import { menuList, type MenuList } from '../data/menuList';
	import { switchTheme, themes } from 'stdf/theme';

	// 导入首页子组件
	import ThemeSystem from '../lib/home/ThemeSystem.svelte';
	import ApiPlayground from '../lib/home/ApiPlayground.svelte';
	import StatCounter from '../lib/home/StatCounter.svelte';
	import ComponentsGrid from '../lib/home/ComponentsGrid.svelte';
	import LazyLoad from '../lib/LazyLoad.svelte';
	// 新增组件
	import TerminalDemo from '../lib/home/TerminalDemo.svelte';
	import ApiRichness from '../lib/home/ApiRichness.svelte';
	import MobileAdvantages from '../lib/home/MobileAdvantages.svelte';
	import TechStack from '../lib/home/TechStack.svelte';

	// 导入数据和工具
	import {
		themeLabels,
		swiperOptions,
		descList,
		ugly,
		thinkGithub,
		bottomInfo,
		avatarRadiusList,
		avatarImgs,
		switchRadiusList,
		switchInsideList,
		sliderRadiusList,
		sliderShowTipList,
		tabRadiusList,
		paginationTypeList,
		paginationRadiusList,
		injPaginationRadiusMap,
		inputRadiusList,
		inputStyleList,
		randomPick,
		randomRange,
		randomBool,
		getRandomEmoji,
		type AvatarRadius,
		type SwitchRadius,
		type SwitchInside,
		type SliderRadius,
		type SliderShowTip,
		type TabRadius,
		type PaginationType,
		type PaginationRadius,
		type InputRadius,
		type InputStyle
	} from '../data/homeData';

	// 导入 actions
	import { fadeInUp, staggerChildren } from '../actions';

	const isZh = localStorage.getItem('lang') === 'zh_CN';

	// 随机生成 Loading 类型
	const randomNumStr = `1_${randomRange(1, 53)}`;

	// 随机 Swiper 配置
	const swiperOption = randomPick(swiperOptions);

	// 数组二级组成新数组
	const ArrChildFun = (arr: MenuList[]) => {
		const newArr = [];
		for (let e = 0; e < arr.length; e++) {
			newArr.push(...arr[e].childs);
		}
		return newArr;
	};
	const menuChildList = ArrChildFun(menuList);

	// 从 menuChildList 中随机取 3 个
	const randomMenuChildList = menuChildList.sort(() => Math.random() - 0.5).slice(0, 3);
	const textList = randomMenuChildList.map((item, index) => {
		return `${index + 1}. ${isZh ? item.tip : item.tip_en}`;
	});
	const labels = randomMenuChildList.map((item) => {
		return { text: isZh ? item.title_zh : item.title_en };
	});

	// 使用数据文件中的配置和工具函数
	const avatarRadius: AvatarRadius = randomPick(avatarRadiusList);
	const avatar = randomPick(avatarImgs);
	const switchRadius: SwitchRadius = randomPick(switchRadiusList);
	const switchInside: SwitchInside = randomPick(switchInsideList);
	const sliderValue = randomRange(0, 100);
	const sliderRadius: SliderRadius = randomPick(sliderRadiusList);
	const sliderShowTip: SliderShowTip = randomPick(sliderShowTipList);
	const emoji = getRandomEmoji();
	const tabRadius: TabRadius = randomPick(tabRadiusList);
	const lineType = randomBool();
	const paginationTotal = randomRange(50, 200);
	const paginationCurrent = randomRange(1, Math.floor(paginationTotal / 10));
	const paginationType: PaginationType = randomPick(paginationTypeList);
	const paginationRadius: PaginationRadius = randomPick(paginationRadiusList);
	const injPaginationRadius = injPaginationRadiusMap[paginationRadius];

	// 随机主题
	const randomThemeFunc = () => {
		const item = randomPick(themes);
		currentColorStore.set(item.name);
		localStorage.setItem('theme_color', item.name);
		switchTheme(item.name);
	};

	// Input 配置
	const inputList = randomPick(randomMenuChildList);
	const inputTitle = isZh ? inputList.title_zh : inputList.title_en;
	let inputValue = $state(isZh ? inputList.tip : inputList.tip_en);
	const inputRadius: InputRadius = randomPick(inputRadiusList);
	const inputStyle: InputStyle = randomPick(inputStyleList);
	let showInputConfetti = $derived(inputValue === inputTitle);

	const inputFun = (v: string) => {
		inputValue = v;
	};

	let showQr = $state(false);
	let A_a1Svg = $state();

	const mouseenterFun = () => {
		const qrcode = encodeData({
			text: `HTTPS://DEMO.STDF.DESIGN?lang=${isZh ? 'zh_CN' : 'en_US'}`,
			isSpace: false
		});
		const color = $currentThemeStore === 'dark' ? 'var(--color-dark)' : 'var(--color-primary)';
		A_a1Svg = rendererLine(qrcode, { posType: 2, otherColor: color, posColor: color });
		showQr = true;
	};

	let showConfetti = $state(false);

	// 获取当前主题的圆角配置
	const currentThemeRadius = $derived(() => {
		const theme = themes.find((t) => t.name === $currentColorStore);
		const t = theme || themes[0];
		return {
			radiusBox: t['radius-box'],
			radiusForm: t['radius-form'],
			radiusSmall: t['radius-small']
		};
	});
</script>

<!-- <div style="width: 100%; height: 100vh; background: #f0f0f0"> -->
<!-- </div> -->

<!-- 全局背景效果 -->
<div class="pointer-events-none fixed inset-0 z-0 overflow-hidden">
	<!-- 渐变球 -->
	<div
		class="animate-blob from-primary/20 dark:from-dark/15 absolute -left-40 -top-40 h-125 w-125 rounded-full bg-linear-to-r to-purple-500/20 blur-3xl dark:to-cyan-500/15"
	></div>
	<div
		class="animation-delay-2000 animate-blob absolute -bottom-40 -right-40 h-125 w-125 rounded-full bg-linear-to-r from-pink-500/20 to-orange-500/20 blur-3xl dark:from-blue-500/15 dark:to-purple-500/15"
	></div>
	<div
		class="animation-delay-4000 animate-blob absolute left-1/4 top-1/3 h-100 w-100 rounded-full bg-linear-to-r from-cyan-500/15 to-blue-500/15 blur-3xl dark:from-emerald-500/10 dark:to-teal-500/10"
	></div>
	<!-- 网格背景 -->
	<div
		class="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:80px_80px] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)]"
	></div>
</div>

<div class="relative z-10 mx-auto max-w-screen-2xl">
	<div class="justify-center lg:flex">
		<div class="flex basis-2/5 flex-col justify-center py-16 text-center md:py-20">
			<div class="relative mb-20 mt-16 flex h-20 flex-col items-center justify-center md:h-28">
				<div class="animate-dynamicsBg absolute rounded-full opacity-50 blur-xl md:opacity-100 md:blur-3xl">
					<svg viewBox="0 0 100 100">
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M50 0V100C22.3858 100 0 77.6142 0 50C0 22.3858 22.3858 0 50 0Z"
							class="fill-dark"
						/>
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M50 100V0C77.6142 0 100 22.3858 100 50C100 77.6142 77.6142 100 50 100Z"
							class="fill-primary"
						/>
						<circle cx="50" cy="25" r="25" class="fill-primary" />
						<circle cx="50" cy="75" r="25" class="fill-dark" />
						<circle cx="50.25" cy="25.25" r="6.25" class="fill-dark" />
						<circle cx="50.25" cy="75.25" r="6.25" class="fill-primary" />
					</svg>
				</div>
				<div
					class="absolute h-full w-28 md:w-36"
					style="filter: drop-shadow(0 10px 8px rgb(0 0 0 / 0.05)) drop-shadow(0 4px 3px rgb(0 0 0 / 0.1));"
				>
					<svg viewBox="0 0 80 80" class="group">
						<path
							class="fill-primary dark:fill-dark"
							d="M40 0C54.8054 0 67.7312 8.04427 74.6475 20H30V30H40C45.5228 30 50 34.4772 50 40C50 45.5228 45.5228 50 40 50H30V80H10V20H0V0H40ZM78.7393 30C79.5619 33.1962 80 36.547 80 40C80 62.0914 62.0914 80 40 80V60C51.0457 60 60 51.0457 60 40C60 36.3571 59.0259 32.9417 57.3242 30H78.7393Z"
						/>
						<path
							style="stroke-dasharray: 400;stroke-dashoffset: 400;"
							class="fill-dark stroke-dark text-dark group-hover:animate-path dark:fill-primary dark:stroke-primary dark:text-primary stroke-1"
							d="M20 30H40L20 80V50H0L20 0V30Z"
						/>
					</svg>
				</div>
			</div>
			<div class="text-6xl md:text-8xl">STDF</div>
			<div class="md:text-md mb-10 mt-4 px-4 text-gray-700 md:mb-0 dark:text-gray-300">
				{#if isZh}
					基于
					<a
						href="https://svelte.dev"
						class="decoration-svelte hover:text-svelte underline underline-offset-2 transition-all"
						target="_blank"
						title={isZh ? '打开 Svelte 官方站点' : 'Open Svelte official website'}
					>
						Svelte
					</a>
					与
					<a
						href="https://tailwindcss.com/"
						class="decoration-tailwind hover:text-tailwind underline underline-offset-2 transition-all"
						target="_blank"
						title={isZh ? '打开 Tailwind CSS 官方站点' : 'Open Tailwind CSS official website'}
					>
						Tailwind
					</a>
					的移动 web 组件库
				{:else}
					Mobile web component
					<br class="md:hidden" />
					library based on
					<a
						href="https://svelte.dev"
						class="decoration-svelte hover:text-svelte underline underline-offset-2 transition-all"
						target="_blank"
					>
						Svelte
					</a>
					and
					<a
						href="https://tailwindcss.com/"
						class="decoration-tailwind hover:text-tailwind underline underline-offset-2 transition-all"
						target="_blank"
					>
						Tailwind
					</a>
				{/if}
			</div>
			<div class="mb-16 mt-8 flex justify-center gap-8 md:mt-16">
				<a
					href="/guide"
					onmouseenter={() => (showConfetti = true)}
					onmouseleave={() => (showConfetti = false)}
					class="bg-primary hover:bg-primary/80 dark:bg-dark hover:dark:bg-dark/80 group relative rounded-sm px-6 py-2 text-white transition-all dark:text-black"
				>
					<div class="group flex items-center gap-2">
						{isZh ? '开始使用' : 'Get Started'}
						<div class="size-3 translate-y-px">
							<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
								<rect
									x="6"
									y="14"
									width="10"
									height="2"
									fill="currentColor"
									class="scale-x-135 -translate-x-2 -translate-y-2 transition-all duration-500 group-hover:translate-x-0 group-hover:translate-y-0"
								/>
								<path
									d="M8.48535 7.07129L1.41406 14.1426L0 12.7275L5.65625 7.07031L0 1.41406L1.41406 0L8.48535 7.07129Z"
									fill="currentColor"
									class="translate-x-2 transition-all duration-500 group-hover:translate-x-0"
								/>
							</svg>
						</div>
						{#if showConfetti}
							<span class="absolute left-1/2 top-0">
								<Confetti rounded />
							</span>
						{/if}
					</div>
				</a>
				<a
					href={`https://demo.stdf.design?lang=${isZh ? 'zh_CN' : 'en_US'}`}
					target="_blank"
					onmouseleave={() => (showQr = false)}
					onmouseenter={mouseenterFun}
					class="border-primary dark:border-dark relative hidden rounded-sm border border-solid px-6 py-2 transition-all md:block"
				>
					{isZh ? '示例' : 'Demo'}
					{#if showQr}
						<div
							transition:fly={{ duration: 300, x: -10, opacity: 0 }}
							class="z-100 absolute left-full top-0 block w-44 -translate-y-1/3 translate-x-1 rounded-lg border border-black/5 p-2 shadow-lg dark:hidden"
						>
							<span>{@html A_a1Svg}</span>
						</div>
						<div
							transition:fly={{ duration: 300, x: -10, opacity: 0 }}
							class="z-100 absolute left-full top-0 hidden w-44 -translate-y-1/3 translate-x-1 rounded-lg border bg-black p-2 shadow-lg shadow-white/10 dark:block dark:border-white/10"
						>
							<span>{@html A_a1Svg}</span>
						</div>
					{/if}
				</a>
				<a
					href={'https://demo.stdf.design?lang=' + (isZh ? 'zh_CN' : 'en_US')}
					target="_blank"
					class="border-primary dark:border-dark block rounded-sm border border-solid px-6 py-2 transition-all md:hidden"
				>
					{isZh ? '示例' : 'Demo'}
				</a>
			</div>
		</div>
		<div
			class="relative mt-10 hidden basis-3/5 xl:mt-0 xl:block"
			data-theme={$currentColorStore}
			data-mode={$currentThemeStore}
			style="--radius-box: {currentThemeRadius().radiusBox}; --radius-form: {currentThemeRadius().radiusForm}; --radius-small: {currentThemeRadius().radiusSmall};"
		>
			<div class="animate-elementUpDownMove1 -translate-x-18 absolute inset-1/2 size-20 -translate-y-12">
				{#if avatar}
					<Avatar size="md" image={avatar} injClass="shadow-lg dark:shadow-white/10" />
				{:else}
					<Avatar size="md" injClass="shadow-lg dark:shadow-white/10" />
				{/if}
			</div>
			<div class="animate-elementUpDownMove1 absolute inset-1/2 -translate-x-96 -translate-y-40">
				<Loading type={randomNumStr} theme />
			</div>
			<div class="animate-elementUpDownMove3 absolute inset-1/2 -translate-y-48 translate-x-52">
				<Switch inside={switchInside} active />
			</div>
			<div class="animate-elementUpDownMove6 -translate-y-42 absolute inset-1/2 w-96 -translate-x-72">
				<Tab {labels} {lineType} />
			</div>
			<div class="animate-elementUpDownMove5 absolute inset-1/2 h-24 w-96 translate-x-20 translate-y-6">
				<Card bg="gray" injClass="shadow-lg dark:shadow-white/10 px-2">
					<Input
						title={inputTitle}
						value={inputValue}
						{inputStyle}
						placeholder={isZh ? `请输入${inputTitle}` : `Input ${inputTitle}`}
						lineTransition="left"
						clear
						onchange={inputFun}
					/>
				</Card>
				<span class="absolute left-0 top-1/2 {showInputConfetti ? 'block' : 'hidden'}">
					<Confetti infinite rounded x={[-0.5, 0.5]} y={[-0.5, 0.5]} />
				</span>
			</div>
			<div class="animate-elementUpDownMove6 absolute inset-1/2 w-96 translate-x-2 translate-y-48">
				<Pagination total={paginationTotal} type={paginationType} current={paginationCurrent} injClass="shadow-lg dark:shadow-white/10" />
			</div>
			<div class="animate-elementUpDownMove4 absolute inset-1/2 w-64 -translate-x-80 -translate-y-8">
				{#if emoji === 'default'}
					<Rate />
				{:else}
					<Rate half opacity="0.2" value={3.5}>
						{#if emoji === 'love'}
							<Icon name="ri-heart-3-fill" injClass="text-[red]" />
						{:else}
							<div class="text-xl">{emoji}</div>
						{/if}
					</Rate>
				{/if}
			</div>
			<div class="animate-elementUpDownMove3 absolute inset-1/2 w-96 -translate-x-96 -translate-y-80">
				<Card bg="gray" injClass="shadow-lg dark:shadow-white/10 p-3">
					<NoticeBar vertical {textList}></NoticeBar>
				</Card>
			</div>
			<div class="animate-elementUpDownMove1 absolute inset-1/2 w-64 -translate-y-20 translate-x-32">
				<Slider value={sliderValue} showTip={sliderShowTip} />
			</div>
			<div class="animate-elementUpDownMove5 h-54 -translate-x-110 absolute inset-1/2 w-97.5 translate-y-16 overflow-hidden">
				<Swiper {...swiperOption} />
			</div>
			<div class="animate-elementUpDownMove1 -translate-y-74 group absolute inset-1/2 w-64 translate-x-32">
				<Button heightIn="2" onclick={randomThemeFunc}>
					<span class="transition-all duration-500 group-hover:translate-x-1">
						{isZh ? themeLabels[$currentColorStore] || $currentColorStore : $currentColorStore}
					</span>
					<span
						class="ml-1 size-4 -translate-x-4 text-white opacity-0 transition-all delay-100 duration-500 group-hover:translate-x-0 group-hover:opacity-100 dark:text-black"
					>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
							<path
								d="M1.99974 13.0001L1.9996 11.0002L18.1715 11.0002L14.2218 7.05044L15.636 5.63623L22 12.0002L15.636 18.3642L14.2218 16.9499L18.1716 13.0002L1.99974 13.0001Z"
							></path>
						</svg>
					</span>
				</Button>
			</div>
		</div>
	</div>
	<div class="mt-16 flex flex-wrap justify-around gap-12 px-8 xl:flex-nowrap" use:staggerChildren={{ stagger: 100 }}>
		{#each descList as desc (desc)}
			<div
				class="shadow-primary/10 dark:shadow-dark/20 group flex w-full flex-col space-y-5 overflow-hidden rounded-2xl shadow-xl transition-all duration-300 sm:w-2/3 md:w-80 lg:w-96"
			>
				<div class="relative w-full">
					<img
						class="aspect-5/3 block h-full w-full object-cover transition-all duration-500 group-hover:scale-125 dark:hidden"
						src={desc.icon}
						alt=""
					/>
					<img
						class="aspect-5/3 hidden h-full w-full object-cover transition-all duration-500 group-hover:scale-125 dark:block"
						src={desc.icon_d}
						alt=""
					/>
					<div
						class="text-shadow-lg bg-primary/10 dark:bg-dark/10 absolute bottom-1.5 left-0 right-0 mx-1.5 flex flex-col justify-center rounded-2xl border border-white/30 px-3 py-1.5 text-white backdrop-blur-sm"
					>
						<div class="mb-0.5 text-3xl font-bold transition-all duration-500 group-hover:translate-x-4">{desc.title}</div>
						<div class="text-xs font-bold transition-all duration-500">
							{isZh ? desc.desc : desc.descEn}
						</div>
					</div>
				</div>
			</div>
		{/each}
	</div>

	<!-- 终端演示 -->
	<div class="mt-16 px-8">
		<TerminalDemo lang={isZh ? 'zh_CN' : 'en_US'} />
	</div>

	<!-- 主题系统（单独一行） -->
	<div class="mt-16 px-8">
		<ThemeSystem />
	</div>

	<!-- StatCounter -->
	<div class="mt-16 px-8">
		<LazyLoad height="600px">
			<StatCounter />
		</LazyLoad>
	</div>

	<!-- ApiPlayground + ApiRichness -->
	<div class="mt-16 flex flex-col gap-8 px-8 xl:flex-row xl:items-start xl:gap-12">
		<div class="xl:w-1/2">
			<LazyLoad height="600px">
				<ApiPlayground />
			</LazyLoad>
		</div>
		<div class="xl:w-1/2">
			<LazyLoad height="600px">
				<ApiRichness lang={isZh ? 'zh_CN' : 'en_US'} />
			</LazyLoad>
		</div>
	</div>

	<!-- MobileAdvantages -->
	<div class="mt-16 px-8">
		<LazyLoad height="800px">
			<MobileAdvantages lang={isZh ? 'zh_CN' : 'en_US'} />
		</LazyLoad>
	</div>

	<!-- TechStack -->
	<div class="mt-16 px-8">
		<LazyLoad height="700px">
			<TechStack lang={isZh ? 'zh_CN' : 'en_US'} />
		</LazyLoad>
	</div>

	<!-- ComponentsGrid -->
	<div class="mt-16 px-8">
		<LazyLoad height="600px">
			<ComponentsGrid />
		</LazyLoad>
	</div>

	<!-- 提前警告 -->
	<section class="py-20 md:py-32">
		<div class="mx-auto max-w-6xl px-4">
			<!-- 标题区域 -->
			<div class="mb-12 text-center" use:fadeInUp>
				<!-- 标签 -->
				<div
					class="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/5 px-4 py-1.5 text-sm text-amber-600 dark:border-amber-400/20 dark:bg-amber-400/5 dark:text-amber-400"
				>
					<svg class="size-4" viewBox="0 0 24 24" fill="currentColor">
						<path
							d="M12.866 3l9.526 16.5a1 1 0 0 1-.866 1.5H2.474a1 1 0 0 1-.866-1.5L11.134 3a1 1 0 0 1 1.732 0zM11 16v2h2v-2h-2zm0-7v5h2V9h-2z"
						/>
					</svg>
					<span>{isZh ? '提前警告' : 'Early Warning'}</span>
				</div>

				<h2
					class="mb-4 bg-linear-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-3xl font-bold text-transparent md:text-4xl dark:from-white dark:via-gray-300 dark:to-white"
				>
					{isZh ? '使用前须知' : 'Before You Start'}
				</h2>
				<p class="mx-auto max-w-2xl text-base text-gray-600 dark:text-gray-400">
					{isZh ? '一些需要提前了解的事项' : 'Things you need to know in advance'}
				</p>
			</div>

			<!-- 警告卡片网格 -->
			<div class="grid grid-cols-1 gap-6 md:grid-cols-2" use:staggerChildren={{ stagger: 100 }}>
				{#each ugly.data as item, i (i)}
					{@const warningIcons = [
						'M12 6.99999C16.4183 6.99999 20 10.5817 20 15C20 19.4183 16.4183 23 12 23C7.58172 23 4 19.4183 4 15C4 10.5817 7.58172 6.99999 12 6.99999ZM12 8.99999C8.68629 8.99999 6 11.6863 6 15C6 18.3137 8.68629 21 12 21C15.3137 21 18 18.3137 18 15C18 11.6863 15.3137 8.99999 12 8.99999ZM12 10.5L13.3225 13.1797L16.2798 13.6094L14.1399 15.6953L14.645 18.6406L12 17.25L9.35497 18.6406L9.86012 15.6953L7.72025 13.6094L10.6775 13.1797L12 10.5ZM18 1.99999V4.99999L16.6366 6.13755C15.5305 5.5577 14.3025 5.17884 13.0011 5.04948L13 1.99899L18 1.99999ZM11 1.99899L10.9997 5.04939C9.6984 5.17863 8.47046 5.55735 7.36441 6.13703L6 4.99999V1.99999L11 1.99899Z',
						'M3.16113 4.46875C5.58508 2.0448 9.44716 1.9355 12.0008 4.14085C14.5528 1.9355 18.4149 2.0448 20.8388 4.46875C23.2584 6.88836 23.3716 10.741 21.1785 13.2947L13.4142 21.0858C12.6686 21.8313 11.4809 21.8652 10.6952 21.1874L10.5858 21.0858L2.82141 13.2947C0.628282 10.741 0.741522 6.88836 3.16113 4.46875ZM4.57534 5.88296C2.86819 7.59011 2.81942 10.3276 4.42902 12.0937L4.57534 12.2469L12 19.6715L17.3026 14.3675L13.7677 10.8327L12.7071 11.8934C11.5355 13.0649 9.636 13.0649 8.46443 11.8934C7.29286 10.7218 7.29286 8.8223 8.46443 7.65073L10.5656 5.54823C8.85292 4.17713 6.37076 4.23993 4.7286 5.73663L4.57534 5.88296ZM13.0606 8.71139C13.4511 8.32086 14.0843 8.32086 14.4748 8.71139L18.7168 12.9533L19.4246 12.2469C21.1819 10.4896 21.1819 7.64032 19.4246 5.88296C17.7174 4.17581 14.9799 4.12704 13.2139 5.73663L13.0606 5.88296L9.87864 9.06494C9.51601 9.42757 9.49011 9.99942 9.80094 10.3919L9.87864 10.4792C10.2413 10.8418 10.8131 10.8677 11.2056 10.5569L11.2929 10.4792L13.0606 8.71139Z',
						'M10.6144 17.7956C10.277 18.5682 9.20776 18.5682 8.8704 17.7956L7.99275 15.7854C7.21171 13.9966 5.80589 12.5726 4.0523 11.7942L1.63658 10.7219C.868536 10.381.868537 9.26368 1.63658 8.92276L3.97685 7.88394C5.77553 7.08552 7.20657 5.60881 7.97427 3.75892L8.8633 1.61673C9.19319.821767 10.2916.821765 10.6215 1.61673L11.5105 3.75894C12.2782 5.60881 13.7092 7.08552 15.5079 7.88394L17.8482 8.92276C18.6162 9.26368 18.6162 10.381 17.8482 10.7219L15.4325 11.7942C13.6789 12.5726 12.2731 13.9966 11.492 15.7854L10.6144 17.7956ZM4.53956 9.82234C6.8254 10.837 8.68402 12.5048 9.74238 14.7996 10.8008 12.5048 12.6594 10.837 14.9452 9.82234 12.6321 8.79557 10.7676 7.04647 9.74239 4.71088 8.71719 7.04648 6.85267 8.79557 4.53956 9.82234ZM19.4014 22.6899 19.6482 22.1242C20.0882 21.1156 20.8807 20.3125 21.8695 19.8732L22.6299 19.5353C23.0412 19.3526 23.0412 18.7549 22.6299 18.5722L21.9121 18.2532C20.8978 17.8026 20.0911 16.9698 19.6586 15.9269L19.4052 15.3156C19.2285 14.8896 18.6395 14.8896 18.4628 15.3156L18.2094 15.9269C17.777 16.9698 16.9703 17.8026 15.956 18.2532L15.2381 18.5722C14.8269 18.7549 14.8269 19.3526 15.2381 19.5353L15.9985 19.8732C16.9874 20.3125 17.7798 21.1156 18.2198 22.1242L18.4667 22.6899C18.6473 23.104 19.2207 23.104 19.4014 22.6899ZM18.3745 19.0469 18.937 18.4883 19.4878 19.0469 18.937 19.5898 18.3745 19.0469Z',
						'M6 5C5.44772 5 5 5.44772 5 6C5 6.55228 5.44772 7 6 7C6.55228 7 7 6.55228 7 6C7 5.44772 6.55228 5 6 5ZM3 6C3 4.34315 4.34315 3 6 3C7.65685 3 9 4.34315 9 6C9 7.30622 8.16519 8.41746 7 8.82929V15.1707C8.16519 15.5825 9 16.6938 9 18C9 19.6569 7.65685 21 6 21C4.34315 21 3 19.6569 3 18C3 16.6938 3.83481 15.5825 5 15.1707V8.82929C3.83481 8.41746 3 7.30622 3 6ZM15.2929 3.29289C15.6834 2.90237 16.3166 2.90237 16.7071 3.29289L18 4.58579L19.2929 3.29289C19.6834 2.90237 20.3166 2.90237 20.7071 3.29289C21.0976 3.68342 21.0976 4.31658 20.7071 4.70711L19.4142 6L20.7071 7.29289C21.0976 7.68342 21.0976 8.31658 20.7071 8.70711C20.3166 9.09763 19.6834 9.09763 19.2929 8.70711L18 7.41421L16.7071 8.70711C16.3166 9.09763 15.6834 9.09763 15.2929 8.70711C14.9024 8.31658 14.9024 7.68342 15.2929 7.29289L16.5858 6L15.2929 4.70711C14.9024 4.31658 14.9024 3.68342 15.2929 3.29289ZM18 10C18.5523 10 19 10.4477 19 11V15.1707C20.1652 15.5825 21 16.6938 21 18C21 19.6569 19.6569 21 18 21C16.3431 21 15 19.6569 15 18C15 16.6938 15.8348 15.5825 17 15.1707V11C17 10.4477 17.4477 10 18 10ZM6 17C5.44772 17 5 17.4477 5 18C5 18.5523 5.44772 19 6 19C6.55228 19 7 18.5523 7 18C7 17.4477 6.55228 17 6 17ZM18 17C17.4477 17 17 17.4477 17 18C17 18.5523 17.4477 19 18 19C18.5523 19 19 18.5523 19 18C19 17.4477 18.5523 17 18 17Z'
					]}
					<div
						class="group rounded-2xl bg-white/50 p-6 transition-all duration-500 ease-out hover:bg-white/80 dark:bg-gray-800/50 dark:hover:bg-gray-800/80"
					>
						<div
							class="mb-4 flex size-12 items-center justify-center rounded-xl bg-amber-500/10 transition-transform duration-300 group-hover:scale-110 dark:bg-amber-400/10"
						>
							<svg class="size-6 text-amber-600 dark:text-amber-400" viewBox="0 0 24 24" fill="currentColor">
								<path d={warningIcons[i]} />
							</svg>
						</div>
						<p class="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
							{isZh ? item.p : item.p_en}
						</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- <div class="hidden md:flex justify-center mb-20">
    <article class={`prose dark:prose-invert max-w-none text-xs overflow-auto`} style="height:{500}px">
        <pre><code class="hljs">{@html highlightedCode}</code></pre>
    </article>
    <div class=" ml-2 border border-black/10 dark:border-gray-400 w-98 grow-0 shrink-0 overflow-auto" style="height:{500}px">
        <img src="/assets/images/home/zh/9.png" alt="" class='w-full' />
    </div>
</div> -->

	<div class="px-4 pb-10 text-center md:px-12 md:pb-20">
		<div class="my-5 text-2xl font-bold transition-all ease-out md:my-10 md:text-4xl" use:fadeInUp>
			🎖 {isZh ? '贡献者' : 'Contributors'}
		</div>
		<div class="flex justify-center" use:fadeInUp={{ delay: 100 }}>
			<a href="https://github.com/any-tdf/stdf/graphs/contributors" target="_blank">
				<img src="https://contrib.nn.ci/api?repo=any-tdf/stdf&cols=7" title={isZh ? '贡献者' : 'Contributors'} alt="" />
			</a>
		</div>
	</div>

	<!-- 赞助者 -->
	<div class="px-4 pb-20 text-center md:px-12 md:pb-40">
		<div class="my-5 text-2xl font-bold transition-all ease-out md:my-10 md:text-4xl" use:fadeInUp>
			🙏 {isZh ? '赞助者' : 'Sponsors'}
		</div>
		<div use:fadeInUp={{ delay: 100 }}>
			<div class="mb-4">GitHub</div>
			<div class="flex flex-wrap justify-center gap-4">
				{#each thinkGithub as item (item)}
					<a href={'https://github.com/' + item.name} target="_blank">
						<img
							class="h-16 w-16 overflow-hidden rounded-full"
							src={'https://avatars.githubusercontent.com/' + item.name}
							title={(isZh ? '感谢 ' : 'Thanks ') + item.name}
							alt=""
						/>
					</a>
				{/each}
			</div>
		</div>
	</div>
</div>
<div>
	<div class="mx-auto grid max-w-screen-2xl grid-cols-2 gap-10 px-6 py-10 md:grid-cols-4 md:px-20">
		{#each bottomInfo as item (item)}
			<div>
				<div class="mb-2 text-lg font-bold">{isZh ? item.title : item.title_en}</div>
				<div class="flex flex-col gap-2">
					{#each item.list as i (i)}
						<a href={i.link} target={i._blank ? '_blank' : '_self'} title={i.link} class="text-sm hover:underline">
							{isZh ? i.title : i.title_en}
						</a>
					{/each}
				</div>
			</div>
		{/each}
	</div>
</div>

<div class="py-4 text-center text-xs">
	<div class="flex justify-center gap-1">
		<div><span title="Svelte · Tailwind · DuFu">STDF</span> DESIGN • MADE BY DUFU</div>
		<div>
			{#if isZh}
				• <a href="https://beian.miit.gov.cn" target="_blank">滇 ICP 备 17004037 号 -4</a>
			{/if}
		</div>
	</div>
</div>
