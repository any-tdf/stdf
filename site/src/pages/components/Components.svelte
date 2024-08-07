<script>
	// @ts-nocheck
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { querystring, push } from 'svelte-spa-router';
	import { isShowNavStore, isCmdKStore } from '../../store';
	import menuList from '../../../../demo/src/data/menuList';

	import Menu from '../../components/menu/Menu.svelte';
	import Tab from '../../components/tab/Tab.svelte';

	import Component from './Component.svelte';
	import Guide from './Guide.svelte';
	import Api from './Api.svelte';
	import FAQ from './FAQ.svelte';
	import Version from './Version.svelte';

	// let Guide;
	// let Api;
	// let FAQ;
	// let Version;
	// let Component;

	let loading = true;

	const isZh = localStorage.getItem('lang') === 'zh_CN';

	let params = new URLSearchParams('?' + $querystring);
	//数组二级组成新数组
	const ArrChildFun = arr => {
		let newArr = [];
		for (let e = 0; e < arr.length; e++) {
			newArr.push(...arr[e].childs);
		}
		return newArr;
	};
	$: menuChildList = ArrChildFun(menuList);
	let currentNav = {};
	let currentTab = 0;
	let titleDom = null;
	let demoHeight = 0;
	let highlightedCode = '';
	let titleWidth = 0;
	let visible = true;
	let isShowIframe = true;
	let navBarHeight = 0;

	// 动态导入组件字符串
	const getComponentStrFunc = async name => {
		const rawObj = await import(`../../../../demo/src/routes/${isZh ? 'zh_CN' : 'en_US'}/${name}/+page.svelte?raw`);
		const componentStr = rawObj.default;
		// 将 componentStr 中的 from '../../../../../packages/stdf/components' 替换为 from 'stdf'
		return componentStr.replace('../../../../../packages/stdf/components', 'stdf');
	};

	const getDemoHeightFun = () => {
		demoHeight = document.documentElement.clientHeight - 70 - titleDom.offsetHeight - 100;
		navBarHeight = document.documentElement.clientHeight - 56;
	};
	onMount(async () => {
		// Component = (await import('./Component.svelte')).default;
		// Guide = (await import('./Guide.svelte')).default;
		// Api = (await import('./Api.svelte')).default;
		// FAQ = (await import('./FAQ.svelte')).default;
		// Version = (await import('./Version.svelte')).default;

		demoHeight = document.documentElement.clientHeight - 70 - titleDom.offsetHeight - 100;
		navBarHeight = document.documentElement.clientHeight - 56;
		window.addEventListener('resize', getDemoHeightFun);
		if (params.get('tab')) {
			currentTab = Number(params.get('tab'));
		}
		if (params.get('nav')) {
			currentNav = menuChildList.filter(item => item.nav === params.get('nav'))[0];
		} else {
			currentNav = menuList[0].childs[1];
		}
		loading = true;
		const componentStr = await getComponentStrFunc(currentNav.nav);
		loading = false;
		highlightedCode = hljs.highlight(componentStr, { language: 'svelte', ignoreIllegals: true }).value;
		// highlightedCode = hljs.highlight(map[currentNav.nav], { language: 'svelte', ignoreIllegals: true }).value;
		return () => {
			window.removeEventListener('resize', getDemoHeightFun);
		};
	});

	//监听箭头按键，方便键盘操作
	const handleKeydown = event => {
		if ($isCmdKStore) {
			return;
		}
		//左右箭头切换Tab
		if (event.code === 'ArrowLeft') {
			if (currentTab > 0) {
				isShowIframe = false;
				setTimeout(() => {
					isShowIframe = true;
				}, 100);
				currentTab--;
				params.set('tab', currentTab.toString());
				push(`/components?nav=${params.get('nav') ? params.get('nav') : 'button'}&tab=${currentTab}`);
			}
		}
		if (event.code === 'ArrowRight') {
			if (currentTab < 4) {
				isShowIframe = false;
				setTimeout(() => {
					isShowIframe = true;
				}, 100);
				currentTab++;
				params.set('tab', currentTab.toString());
				push(`/components?nav=${params.get('nav') ? params.get('nav') : 'button'}&tab=${currentTab}`);
			}
		}
		//上下箭头切换组件
		if (event.code === 'ArrowUp') {
			let currentMenuIndex = menuChildList.findIndex(item => item.nav === currentNav.nav);
			if (currentMenuIndex > 0) {
				visible = false;
				setTimeout(async () => {
					visible = true;
					currentNav = menuChildList[currentMenuIndex - 1];
					params.set('nav', currentNav.nav);
					push(`/components?nav=${currentNav.nav}&tab=${currentTab}`);
					const componentStr = await getComponentStrFunc(currentNav.nav);
					highlightedCode = hljs.highlight(componentStr, { language: 'svelte', ignoreIllegals: true }).value;
					// @ts-ignore
					// highlightedCode = hljs.highlight(map[currentNav.nav], { language: 'svelte', ignoreIllegals: true }).value;
				}, 10);
			}
		}
		if (event.code === 'ArrowDown') {
			let currentMenuIndex = menuChildList.findIndex(item => item.nav === currentNav.nav);
			if (currentMenuIndex < menuChildList.length - 1) {
				visible = false;
				setTimeout(async () => {
					visible = true;
					currentNav = menuChildList[currentMenuIndex + 1];
					params.set('nav', currentNav.nav);
					push(`/components?nav=${currentNav.nav}&tab=${currentTab}`);
					const componentStr = await getComponentStrFunc(currentNav.nav);
					highlightedCode = hljs.highlight(componentStr, { language: 'svelte', ignoreIllegals: true }).value;
					// @ts-ignore
					// highlightedCode = hljs.highlight(map[currentNav.nav], { language: 'svelte', ignoreIllegals: true }).value;
				}, 10);
			}
		}
	};
	const menuClickFun = currentMenu => {
		$isShowNavStore && ($isShowNavStore = false);
		visible = false;
		setTimeout(async () => {
			visible = true;
			currentNav = currentMenu.detail;
			params.set('nav', currentMenu.detail.nav);
			push(`/components?nav=${currentMenu.detail.nav}&tab=${params.get('tab') ? params.get('tab') : '0'}`);
			const componentStr = await getComponentStrFunc(currentNav.nav);
			highlightedCode = hljs.highlight(componentStr, { language: 'svelte', ignoreIllegals: true }).value;
		}, 10);
	};

	const tabClickFun = i => {
		isShowIframe = false;
		setTimeout(() => {
			isShowIframe = true;
		}, 100);
		currentTab = i.detail;
		params.set('tab', currentTab.toString());
		push(`/components?nav=${params.get('nav') ? params.get('nav') : 'button'}&tab=${currentTab}`);
	};
	$: QRValue =
		(import.meta.env.DEV ? location.protocol + '//' + location.hostname + ':8888/' : 'https://demo.stdf.design/') +
		(isZh ? 'zh_CN/' : 'en_US/') +
		currentNav.nav;
</script>

<svelte:window on:keydown={handleKeydown} />

<div class="flex">
	<div
		class="fixed -left-52 md:left-0 top-14 w-52 overflow-y-scroll transition-all duration-300 z-[100] bg-white dark:bg-black md:bg-transparent dark:md:bg-transparent"
		class:left-0={$isShowNavStore}
		class:-left-52={!$isShowNavStore}
		style="height:{navBarHeight + 'px'}"
	>
		<Menu {menuList} currentNav={currentNav.nav} on:MenuClick={menuClickFun} />
	</div>
	{#if visible}
		<div class="md:pl-48 flex flex-col w-full" in:fly={{ x: 100, duration: 500 }} out:fly={{ x: 100, duration: 100 }}>
			<div class="px-4 pt-4 md:px-8 md:flex md:space-x-4 relative z-20" bind:this={titleDom}>
				{#if loading}
					{isZh ? '请等待...' : 'Please wait...'}
				{:else}
					<div class="font-bold text-2xl md:text-4xl flex items-center">
						<div>
							{isZh ? currentNav.title : currentNav.title_en}
						</div>
						<a href={QRValue} target="_blank">
							<div class="md:hidden bg-gray-100 dark:bg-gray-700 text-gray-500 rounded h-8 w-8 ml-2 p-1">
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" style="fill: currentColor">
									<path fill="none" d="M0 0h24v24H0z" />
									<path
										d="M13 21v2h-2v-2H3a1 1 0 0 1-1-1V6h20v14a1 1 0 0 1-1 1h-8zm-9-2h16V8H4v11zm9-9h5v2h-5v-2zm0 4h5v2h-5v-2zm-4-4v3h3a3 3 0 1 1-3-3zM2 3h20v2H2V3z"
									/>
								</svg>
							</div>
						</a>
					</div>
					<div class="mt-4 text-xs md:text-sm text-gray-500">{isZh ? currentNav.tip : currentNav.tip_en}</div>
				{/if}
			</div>
			<div class="p-4 md:px-8 md:py-4 -mt-14 relative z-10" bind:clientWidth={titleWidth}>
				<Tab {currentTab} on:TabClick={tabClickFun} />
			</div>
			<div class="my-4 ml-4">
				<div class="h-px bg-black/10 dark:bg-white/20" />
			</div>
			<div>
				<!-- <div class="relative overflow-hidden" style="width:{titleWidth}px;"> -->
				<!-- <div class="relative flex" style="width:{titleWidth * 3}px;left:-{currentTab * titleWidth}px;"> -->
				<!-- 示例 -->
				{#if currentTab === 0}
					<div
						in:fly={{ y: 100, duration: 500 }}
						out:fly={{ y: 100, duration: 100 }}
						class="flex-1 flex py-4 mt-2 md:pl-8 md:pr-4 justify-around"
						style="width:{titleWidth}px;"
					>
						<div class="grow overflow-y-scroll rounded bg-codeLight dark:bg-codeDark" style="height:{demoHeight}px;">
							<svelte:component this={Component} {highlightedCode} />
						</div>
						<div
							class="hidden ml-2 md:block border border-black/10 dark:border-white/10 w-[392px] grow-0 shrink-0"
							style="height:{demoHeight}px"
						>
							{#if currentNav.nav}
								{#if isShowIframe}
									<iframe
										title="Demo"
										id="iframe-id"
										src={import.meta.env.DEV
											? `http://localhost:8888/${isZh ? 'zh_CN' : 'en_US'}/${currentNav.nav}?channel=iframe`
											: `https://demo.stdf.design/${isZh ? 'zh_CN' : 'en_US'}/${currentNav.nav}?channel=iframe`}
										height={demoHeight - 2}
										width="390"
									/>
								{:else}
									<div class="flex justify-center flex-col text-primary dark:text-dark" style="width:390px;height:{demoHeight - 2}px;">
										<div>
											<svg class="animate-spin my-1 mx-auto h-10 w-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
					<div
						in:fly={{ y: 100, duration: 500 }}
						out:fly={{ y: 100, duration: 100 }}
						class={` flex-1 left-full p-4 mt-4 md:px-8 md:py-4`}
						style="width:{titleWidth}px;"
					>
						<svelte:component this={Api} api={currentNav.nav} />
						<!-- <Api api={currentNav.nav} /> -->
					</div>
				{/if}
				{#if currentTab === 2}
					<!-- 指南 -->
					<div
						in:fly={{ y: 100, duration: 500 }}
						out:fly={{ y: 100, duration: 100 }}
						class={`flex-1 p-4 mt-4 md:px-8 md:py-4 rounded `}
						style="width:{titleWidth}px;"
					>
						<svelte:component this={Guide} guide={currentNav.nav} />
						<!-- <Guide guide={currentNav.nav} /> -->
					</div>
				{/if}
				{#if currentTab === 3}
					<!-- FAQ -->
					<div
						in:fly={{ y: 100, duration: 500 }}
						out:fly={{ y: 100, duration: 100 }}
						class={`flex-1 p-4 mt-4 md:px-8 md:py-4 rounded `}
						style="width:{titleWidth}px;"
					>
						<svelte:component this={FAQ} guide={currentNav.nav} />
						<!-- <FAQ guide={currentNav.nav} /> -->
					</div>
				{/if}
				{#if currentTab === 4}
					<!-- Version -->
					<div
						in:fly={{ y: 100, duration: 500 }}
						out:fly={{ y: 100, duration: 100 }}
						class={`flex-1 p-4 mt-4 md:px-8 md:py-4 rounded `}
						style="width:{titleWidth}px;"
					>
						<svelte:component this={Version} guide={currentNav.nav} />
						<!-- <Version guide={currentNav.nav} /> -->
					</div>
				{/if}
			</div>
		</div>
	{/if}
</div>
