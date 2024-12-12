<script lang="ts">
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { isShowNavStore, isCmdKStore } from '../../store';
	import { menuList, type MenuList } from '../../data/menuList';
	import { page } from '$app/stores';
	import hljs from 'highlight.js';
	import type { MenuListChild } from '../../data/menuList.js';
	import Menu from '$lib/menu/Menu.svelte';
	import Tab from '$lib/tab/Tab.svelte';
	import { goto } from '$app/navigation';

	import Component from './Component.svelte';
	import Guide from './Guide.svelte';
	import Api from './Api.svelte';
	import FAQ from './FAQ.svelte';
	import Version from './Version.svelte';

	let loading = $state(true);

	const isZh = localStorage.getItem('lang') === 'zh_CN';

	const params = $page.url.searchParams;

	//数组二级组成新数组
	const ArrChildFun = (arr: MenuList[]) => {
		let newArr = [];
		for (let e = 0; e < arr.length; e++) {
			newArr.push(...arr[e].childs);
		}
		return newArr;
	};
	let menuChildList = $derived(ArrChildFun(menuList));
	let currentNav = $state<MenuListChild | null>(null);
	let currentTab = $state(0);
	let titleDom: HTMLElement | null = $state(null);
	let demoHeight = $state(0);
	let highlightedCode = $state('');
	let titleWidth = $state(0);
	let visible = $state(true);
	let isShowIframe = $state(true);
	let navBarHeight = $state(0);
	let menuChange = $state(true);

	// 动态导入组件字符串
	const getComponentStrFunc = async (name: string) => {
		const rawObj = await import(`../../../../../packages/stdf/src/routes/${name}/${isZh ? 'zh_CN' : 'en_US'}/+page.svelte?raw`);
		// 将 componentStr 中所有的 from '$lib/index.js' 替换为 from 'stdf'
		// 将 componentStr 中所有的 from '$lib/types/index.js' 替换为 from 'stdf/types'
		return rawObj.default
			.replace(/from ['"]\$lib\/index\.js['"]/g, "from 'stdf'")
			.replace(/from ['"]\$lib\/types\/index\.js['"]/g, "from 'stdf/types'");
	};
	const getDemoHeightFun = () => {
		if (titleDom) {
			demoHeight = document.documentElement.clientHeight - 70 - titleDom.offsetHeight - 100;
			navBarHeight = document.documentElement.clientHeight - 56;
		}
	};
	const initFn = async () => {
		if (params.get('tab')) {
			currentTab = Number(params.get('tab'));
		}
		if (params.get('nav')) {
			currentNav = menuChildList.filter((item) => item.nav === params.get('nav'))[0];
		} else {
			currentNav = menuList[0].childs[1];
		}
		loading = true;

		const componentStr = await getComponentStrFunc(currentNav.nav);
		loading = false;
		highlightedCode = hljs.highlight(componentStr, {
			language: 'svelte',
			ignoreIllegals: true
		}).value;
	};
	onMount(() => {
		if (titleDom) {
			demoHeight = document.documentElement.clientHeight - 70 - titleDom.offsetHeight - 100;
			navBarHeight = document.documentElement.clientHeight - 56;
		}
		window.addEventListener('resize', getDemoHeightFun);
		initFn();
		return () => {
			window.removeEventListener('resize', getDemoHeightFun);
		};
	});

	//监听箭头按键，方便键盘操作
	const handleKeydown = (event: KeyboardEvent) => {
		if ($isCmdKStore) {
			return;
		}
		//左右箭头切换Tab
		if (event.code === 'ArrowLeft') {
			if (currentTab > 0) {
				isShowIframe = false;
				setTimeout(() => {
					isShowIframe = true;
				}, 10);
				currentTab--;
				params.set('tab', currentTab.toString());
				goto(`/components?nav=${params.get('nav') ? params.get('nav') : 'button'}&tab=${currentTab}`);
			}
		}
		if (event.code === 'ArrowRight') {
			if (currentTab < 4) {
				isShowIframe = false;
				setTimeout(() => {
					isShowIframe = true;
				}, 10);
				currentTab++;
				params.set('tab', currentTab.toString());
				goto(`/components?nav=${params.get('nav') ? params.get('nav') : 'button'}&tab=${currentTab}`);
			}
		}
		//上下箭头切换组件
		if (event.code === 'ArrowUp') {
			let currentMenuIndex = menuChildList.findIndex((item) => item.nav === currentNav?.nav);
			if (currentMenuIndex > 0) {
				visible = false;
				menuChange = false;
				setTimeout(async () => {
					visible = true;
					currentNav = menuChildList[currentMenuIndex - 1];
					params.set('nav', currentNav.nav);
					goto(`/components?nav=${currentNav.nav}&tab=${currentTab}`);
					const componentStr = await getComponentStrFunc(currentNav.nav);
					highlightedCode = hljs.highlight(componentStr, {
						language: 'svelte',
						ignoreIllegals: true
					}).value;
					menuChange = true;
				}, 10);
			}
		}
		if (event.code === 'ArrowDown') {
			let currentMenuIndex = menuChildList.findIndex((item) => item.nav === currentNav?.nav);
			if (currentMenuIndex < menuChildList.length - 1) {
				visible = false;
				setTimeout(async () => {
					visible = true;
					menuChange = false;
					currentNav = menuChildList[currentMenuIndex + 1];
					params.set('nav', currentNav.nav);
					goto(`/components?nav=${currentNav.nav}&tab=${currentTab}`);
					const componentStr = await getComponentStrFunc(currentNav.nav);
					highlightedCode = hljs.highlight(componentStr, {
						language: 'svelte',
						ignoreIllegals: true
					}).value;
					menuChange = true;
				}, 10);
			}
		}
	};
	const menuClickFun = (currentMenu: MenuListChild) => {
		$isShowNavStore && ($isShowNavStore = false);
		visible = false;
		menuChange = false;
		setTimeout(async () => {
			visible = true;
			currentNav = currentMenu;
			params.set('nav', currentMenu.nav);
			goto(`/components?nav=${currentMenu.nav}&tab=${params.get('tab') ? params.get('tab') : '0'}`);
			const componentStr = await getComponentStrFunc(currentMenu.nav);
			highlightedCode = hljs.highlight(componentStr, {
				language: 'svelte',
				ignoreIllegals: true
			}).value;
			menuChange = true;
		}, 10);
	};

	const tabClickFun = (i: number) => {
		isShowIframe = false;
		setTimeout(() => {
			isShowIframe = true;
		}, 10);
		currentTab = i;
		params.set('tab', currentTab.toString());
		goto(`/components?nav=${params.get('nav') ? params.get('nav') : 'button'}&tab=${currentTab}`);
	};
	// main -> next
	let QRValue = $derived(
		(import.meta.env.DEV ? location.protocol + '//' + location.hostname + ':8888/' : 'https://next-demo.stdf.design/') +
			currentNav?.nav +
			(isZh ? '/zh_CN' : '/en_US')
	);
</script>

<svelte:window onkeydown={handleKeydown} />

<div class="flex">
	<div
		class="fixed -left-52 top-14 z-[100] w-52 overflow-y-scroll border-r border-black/10 bg-white transition-all duration-300 md:left-0 md:bg-transparent dark:border-white/20 dark:bg-black dark:md:bg-transparent"
		class:left-0={$isShowNavStore}
		class:-left-52={!$isShowNavStore}
		style="height:{navBarHeight + 'px'}"
	>
		<Menu {menuList} currentNav={currentNav?.nav} onclickMenu={menuClickFun} />
	</div>
	{#if visible}
		<div class="flex w-full flex-col md:pl-48" in:fly={{ x: 100, duration: 500 }} out:fly={{ x: 100, duration: 100 }}>
			<div class="relative z-20 px-4 pt-4 md:flex md:space-x-4 md:px-8" bind:this={titleDom}>
				{#if loading}
					{isZh ? '请等待...' : 'Please wait...'}
				{:else}
					<div class="flex items-center text-2xl font-bold md:text-4xl">
						<div>
							{isZh ? currentNav?.title : currentNav?.title_en}
						</div>
						<a href={QRValue} target="_blank" aria-label={isZh ? '扫码预览' : 'Scan to preview'}>
							<div class="ml-2 h-8 w-8 rounded bg-gray-100 p-1 text-gray-500 md:hidden dark:bg-gray-700">
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" style="fill: currentColor">
									<path fill="none" d="M0 0h24v24H0z" />
									<path
										d="M13 21v2h-2v-2H3a1 1 0 0 1-1-1V6h20v14a1 1 0 0 1-1 1h-8zm-9-2h16V8H4v11zm9-9h5v2h-5v-2zm0 4h5v2h-5v-2zm-4-4v3h3a3 3 0 1 1-3-3zM2 3h20v2H2V3z"
									/>
								</svg>
							</div>
						</a>
					</div>
					<div class="mt-4 text-xs text-gray-500 md:text-sm">
						{isZh ? currentNav?.tip : currentNav?.tip_en}
					</div>
				{/if}
			</div>
			<div class="relative z-10 -mt-14 p-4 md:px-8 md:py-4" bind:clientWidth={titleWidth}>
				<Tab {currentTab} onclickTab={tabClickFun} />
			</div>
			<div class="my-4 ml-4">
				<div class="h-px bg-black/10 dark:bg-white/20"></div>
			</div>
			<div>
				<!-- 示例 -->
				{#if currentTab === 0}
					<div
						in:fly={{ y: 100, duration: 500 }}
						out:fly={{ y: 100, duration: 100 }}
						class="mt-2 flex flex-1 justify-around py-4 md:pl-8 md:pr-4"
						style="width:{titleWidth}px;"
					>
						<div class="bg-codeLight dark:bg-codeDark grow overflow-y-scroll rounded" style="height:{demoHeight}px;">
							<Component {highlightedCode} />
						</div>
						<div
							class="ml-2 hidden w-[392px] shrink-0 grow-0 border border-black/10 md:block dark:border-white/10"
							style="height:{demoHeight}px"
						>
							{#if currentNav?.nav}
								{#if isShowIframe}
									<!-- main -> next -->
									<iframe
										title="Demo"
										id="iframe-id"
										src={import.meta.env.DEV
											? `http://localhost:8888/${currentNav?.nav}/${isZh ? 'zh_CN' : 'en_US'}?channel=iframe`
											: `https://next-demo.stdf.design/${currentNav?.nav}/${isZh ? 'zh_CN' : 'en_US'}?channel=iframe`}
										height={demoHeight - 2}
										width="390"
									></iframe>
								{:else}
									<div class="text-primary dark:text-dark flex flex-col justify-center" style="width:390px;height:{demoHeight - 2}px;">
										<div>
											<svg class="mx-auto my-1 h-10 w-10 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
												<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
												<path
													class="opacity-75"
													fill="currentColor"
													d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
												/>
											</svg>
										</div>
									</div>
								{/if}
							{/if}
						</div>
					</div>
				{/if}
				{#if currentTab === 1}
					<!-- api -->
					{#if menuChange}
						<div
							in:fly={{ y: 100, duration: 500 }}
							out:fly={{ y: 100, duration: 100 }}
							class={` left-full mt-4 flex-1 p-4 md:px-8 md:py-4`}
							style="width:{titleWidth}px;"
						>
							<Api api={currentNav?.nav} />
						</div>
					{/if}
				{/if}
				{#if currentTab === 2}
					<!-- 指南 -->
					{#if menuChange}
						<div
							in:fly={{ y: 100, duration: 500 }}
							out:fly={{ y: 100, duration: 100 }}
							class={`mt-4 flex-1 rounded p-4 md:px-8 md:py-4 `}
							style="width:{titleWidth}px;"
						>
							<Guide guide={currentNav?.nav} />
						</div>
					{/if}
				{/if}
				{#if currentTab === 3}
					<!-- FAQ -->
					{#if menuChange}
						<div
							in:fly={{ y: 100, duration: 500 }}
							out:fly={{ y: 100, duration: 100 }}
							class={`mt-4 flex-1 rounded p-4 md:px-8 md:py-4 `}
							style="width:{titleWidth}px;"
						>
							<FAQ guide={currentNav?.nav} />
						</div>
					{/if}
				{/if}
				{#if currentTab === 4}
					<!-- Version -->
					{#if menuChange}
						<div
							in:fly={{ y: 100, duration: 500 }}
							out:fly={{ y: 100, duration: 100 }}
							class={`mt-4 flex-1 rounded p-4 md:px-8 md:py-4 `}
							style="width:{titleWidth}px;"
						>
							<Version guide={currentNav?.nav} />
						</div>
					{/if}
				{/if}
			</div>
		</div>
	{/if}
</div>
