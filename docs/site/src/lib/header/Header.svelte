<script lang="ts">
	import { slide, fly } from 'svelte/transition';
	import ModeSwitch from '../modeSwitch/ModeSwitch.svelte';
	import ThemeSwitch from '../themeSwitch/ThemeSwitch.svelte';
	import { isShowNavStore, isShowFundStore, showThemeSwitchStore } from '../../store';
	import { page } from '$app/state';
	import stdfPackage from '../../../../../packages/stdf/package.json';

	let { showLeftNav = false, showBottonLine = false, onclickCmdK } = $props();

	let currentRoute = $state('/guide');
	$effect(() => {
		currentRoute = page.url.pathname;
	});
	let showNav = $state(false); //是否显示导航
	const toggleNavFun = () => {
		isShowNavStore.set(!$isShowNavStore);
	};
	//判断是 Mac 系统
	const isMac = navigator.userAgent.toUpperCase().indexOf('MAC') >= 0;
	const cmdkey = isMac ? '⌘' : 'Ctrl';
	const isZh = localStorage.getItem('lang') === 'zh_CN';

	// const dispatch = createEventDispatcher(); //创建事件派发器
	const clickCmdKFun = () => {
		onclickCmdK?.();
	};
	// 切换支持
	const toggleFundFunc = () => {
		isShowFundStore.set(true);
	};
	// 显示主题切换
	const showThemeFunc = () => {
		showThemeSwitchStore.set(!$showThemeSwitchStore);
	};
	let themeSwitchMobileRef: HTMLButtonElement | null = $state(null);
	let themeSwitchDesktopRef: HTMLDivElement | null = $state(null);
	// 监听 window 点击事件，如果点击的不是主题切换区域，则隐藏主题切换
	window.addEventListener('click', (e: MouseEvent) => {
		const target = e.target as Node;
		if (
			(themeSwitchMobileRef && themeSwitchMobileRef.contains(target)) ||
			(themeSwitchDesktopRef && themeSwitchDesktopRef.contains(target))
		) {
			return;
		}
		showThemeSwitchStore.set(false);
	});

	let showVersion = $state(false);
	let versionBtnRef: HTMLButtonElement | null = $state(null);

	const switchLangFunc = () => {
		const url = new URL(window.location.href);
		url.searchParams.set('lang', isZh ? 'en_US' : 'zh_CN');
		window.location.href = url.toString();
	};
</script>

<svelte:document
	onclick={(e) => {
		if (versionBtnRef && !versionBtnRef.contains(e.target as Node)) {
			showVersion = false;
		}
	}}
/>

<div class="z-100 sticky top-0 flex h-14 items-center justify-between border-black/5 backdrop-blur-sm dark:border-white/10">
	{#if showLeftNav}
		<button class="cursor-pointer p-4 md:hidden" onclick={toggleNavFun}>
			{#if !$isShowNavStore}
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M21.0001 4.50004L7.50007 4.5L7.50006 6L21.0001 6.00004V4.50004Z" fill="currentColor" />
					<path d="M5.25007 4.5L3.00098 4.5L3.00098 6L5.25007 6V4.5Z" fill="currentColor" />
					<path d="M7.50007 11.2501L21.0001 11.2501V12.7501L7.50006 12.7501L7.50007 11.2501Z" fill="currentColor" />
					<path d="M3.00098 11.2501H5.25007V12.7501H3.00098L3.00098 11.2501Z" fill="currentColor" />
					<path d="M7.50007 18L21.0001 18V19.5L7.50006 19.5L7.50007 18Z" fill="currentColor" />
					<path d="M3.00098 18H5.25007V19.5H3.00098L3.00098 18Z" fill="currentColor" />
				</svg>
			{:else}
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
					<path
						fill="currentColor"
						d="M10.4143 4.58594L10.4142 11.0003L16.0003 11.0004L16.0003 13.0004L10.4142 13.0003L10.4141 19.4144L3 12.0002L10.4143 4.58594ZM18.0002 19.0002V5.00018H20.0002V19.0002H18.0002Z"
					/>
				</svg>
			{/if}
		</button>
	{/if}

	<div class="flex items-end">
		<a href="/" class="flex items-center justify-between py-2 md:pl-6" aria-label={isZh ? '首页' : 'Home'}>
			<div class="fill-primary flex h-8 w-16 flex-col items-center justify-center">
				<svg viewBox="0 0 80 80">
					<path
						class="fill-primary dark:fill-dark"
						d="M40 0C54.8054 0 67.7312 8.04427 74.6475 20H30V30H40C45.5228 30 50 34.4772 50 40C50 45.5228 45.5228 50 40 50H30V80H10V20H0V0H40ZM78.7393 30C79.5619 33.1962 80 36.547 80 40C80 62.0914 62.0914 80 40 80V60C51.0457 60 60 51.0457 60 40C60 36.3571 59.0259 32.9417 57.3242 30H78.7393Z"
					/>
					<path class="fill-dark dark:fill-primary" d="M20 30H40L20 80V50H0L20 0V30Z" />
				</svg>
			</div>
		</a>
		<!-- 下拉选项，选择版本 -->
		{#if page.url.pathname === '/'}
			<div class="relative bottom-1">
				<button
					bind:this={versionBtnRef}
					class="flex cursor-pointer py-0.5 pl-2 pr-4 text-xs text-gray-500"
					onclick={() => (showVersion = !showVersion)}
				>
					{stdfPackage.version}
					<span class="absolute -bottom-px left-8 w-5 text-gray-500">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
							<path d="M12 15.0006L7.75732 10.758L9.17154 9.34375L12 12.1722L14.8284 9.34375L16.2426 10.758L12 15.0006Z"></path>
						</svg>
					</span>
				</button>
				{#if showVersion}
					<div
						transition:fly={{ duration: 300, y: -20, opacity: 0 }}
						class="absolute left-0 top-10 w-28 rounded-xl bg-white p-4 text-xs shadow-md dark:bg-black dark:shadow-white/10"
					>
						<div class="text-primary dark:text-dark relative flex py-0.5">
							<span class="mr-1">
								<svg xmlns="http://www.w3.org/2000/svg" class="w-4" viewBox="0 0 24 24">
									<path
										fill="currentColor"
										d="M3 20q-.825 0-1.412-.587T1 18V6q0-.825.588-1.412T3 4h18q.825 0 1.413.588T23 6v12q0 .825-.587 1.413T21 20zm1.75-8.5l2.375 3.25q.075.125.2.188T7.6 15h.3q.25 0 .425-.175T8.5 14.4V9.625q0-.275-.175-.45T7.875 9t-.45.175t-.175.45V12.5L4.925 9.25q-.1-.125-.225-.187T4.425 9h-.3q-.275 0-.45.175t-.175.45v4.75q0 .275.175.45t.45.175t.45-.175t.175-.45zM10 15h2.875q.275 0 .45-.175t.175-.45t-.175-.45t-.45-.175H11v-1.1h1.875q.275 0 .45-.175t.175-.45t-.175-.45t-.45-.175H11v-1.15h1.875q.275 0 .45-.175t.175-.45t-.175-.45t-.45-.175H10q-.2 0-.35.15t-.15.35v5q0 .2.15.35T10 15m5.5 0h4q.425 0 .713-.288T20.5 14V9.625q0-.275-.175-.45T19.875 9t-.45.175t-.175.45V13.5h-1.1v-2.875q0-.275-.175-.45t-.45-.175t-.45.175t-.175.45V13.5h-1.15V9.625q0-.275-.175-.45T15.125 9t-.45.175t-.175.45V14q0 .425.288.713T15.5 15"
									/>
								</svg>
							</span>
							{stdfPackage.version}
							<span class="absolute bottom-1 left-12 w-3">
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
									<path d="M9.9997 15.1709L19.1921 5.97852L20.6063 7.39273L9.9997 17.9993L3.63574 11.6354L5.04996 10.2212L9.9997 15.1709Z"
									></path>
								</svg>
							</span>
						</div>
						<div class="my-2 h-px bg-black/5 dark:bg-white/20"></div>
						<a href="/guide/changelog" class="hover:underline">
							<span class="inline-block size-3 translate-y-0.5">
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
									<path
										d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12H4C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C9.25022 4 6.82447 5.38734 5.38451 7.50024L8 7.5V9.5H2V3.5H4L3.99989 5.99918C5.82434 3.57075 8.72873 2 12 2ZM13 7L12.9998 11.585L16.2426 14.8284L14.8284 16.2426L10.9998 12.413L11 7H13Z"
									>
									</path>
								</svg>
							</span>
							{isZh ? '更新日志' : 'Changelog'}
						</a>
						<div class="my-2 h-px bg-black/5 dark:bg-white/20"></div>
						<div class="flex flex-col space-y-2">
							<a href="https://1.stdf.design" target="_blank" class="hover:underline">Version 1.x </a>
							<a href="https://0.stdf.design" target="_blank" class="hover:underline">Version 0.x </a>
						</div>
					</div>
				{/if}
			</div>
		{/if}
	</div>
	<div>
		<div class="cursor-pointer p-4 md:hidden">
			<button onclick={() => (showNav = !showNav)}>
				{#if !showNav}
					<svg width="24" height="24" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M12 6v.01M12 12v.01M12 18v.01M12 7a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm0 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm0 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"
							stroke="currentColor"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				{:else}
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
						<path
							fill="currentColor"
							d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM12 10.5858L14.8284 7.75736L16.2426 9.17157L13.4142 12L16.2426 14.8284L14.8284 16.2426L12 13.4142L9.17157 16.2426L7.75736 14.8284L10.5858 12L7.75736 9.17157L9.17157 7.75736L12 10.5858Z"
						/>
					</svg>
				{/if}
			</button>
			{#if showNav}
				<!-- 移动端 -->
				<div
					transition:slide={{ duration: 300, axis: 'y' }}
					class="absolute right-2 top-14 flex flex-col space-y-3 rounded-sm border border-black/10 bg-white p-1 pt-4 text-center text-sm font-bold shadow-lg backdrop-blur-sm dark:border-white/20 dark:bg-gray-950 dark:shadow-white/20"
				>
					<!-- AI 问答 -->
					<a
						href="https://deepwiki.com/any-tdf/stdf"
						class="px-4 py-1 text-center"
						target="_blank"
						title={isZh ? '到 DeepWiki 提问' : 'Ask questions on DeepWiki'}
						aria-label={isZh ? '到 DeepWiki 提问' : 'Ask questions on DeepWiki'}
					>
						<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="inline-block" fill="currentColor">
							<path
								d="M20.7134 8.12811L20.4668 8.69379C20.2864 9.10792 19.7136 9.10792 19.5331 8.69379L19.2866 8.12811C18.8471 7.11947 18.0555 6.31641 17.0677 5.87708L16.308 5.53922C15.8973 5.35653 15.8973 4.75881 16.308 4.57612L17.0252 4.25714C18.0384 3.80651 18.8442 2.97373 19.2761 1.93083L19.5293 1.31953C19.7058 0.893489 20.2942 0.893489 20.4706 1.31953L20.7238 1.93083C21.1558 2.97373 21.9616 3.80651 22.9748 4.25714L23.6919 4.57612C24.1027 4.75881 24.1027 5.35653 23.6919 5.53922L22.9323 5.87708C21.9445 6.31641 21.1529 7.11947 20.7134 8.12811ZM10 3H14V5H10C6.68629 5 4 7.68629 4 11C4 14.61 6.46208 16.9656 12 19.4798V17H14C17.3137 17 20 14.3137 20 11H22C22 15.4183 18.4183 19 14 19V22.5C9 20.5 2 17.5 2 11C2 6.58172 5.58172 3 10 3Z"
							>
							</path>
						</svg>
					</a>
					<a
						href={currentRoute.includes('/guide') ? 'javascript:void(0)' : '/guide'}
						class="px-4 py-1 text-center {currentRoute.includes('/guide') ? ' text-primary dark:text-dark' : ''}"
					>
						{isZh ? '指南' : 'Guide'}
					</a>
					<a
						href={currentRoute.includes('/components') ? 'javascript:void(0)' : '/components?nav=button&tab=0'}
						class="px-4 py-1 text-center {currentRoute.includes('/components') ? ' text-primary dark:text-dark' : ''}"
					>
						{isZh ? '组件' : 'Components'}
					</a>
					<button class="relative px-4 py-1 text-center" onclick={showThemeFunc} bind:this={themeSwitchMobileRef}>
						{isZh ? '主题' : 'Theme'}
						{#if $showThemeSwitchStore}
							<div
								transition:slide={{ duration: 300, axis: 'x' }}
								class="absolute top-0 min-w-44 rounded-lg bg-white p-3 shadow-lg dark:bg-black/95 dark:shadow-white/40"
								style="right:{isZh ? '66px' : '128px'}"
							>
								<ModeSwitch />
								<ThemeSwitch vertical />
							</div>
						{/if}
					</button>
					<button class="px-4 py-1 text-center" onclick={toggleFundFunc}>
						{isZh ? '支持' : 'Support'}
					</button>

					<!-- 语言切换 -->
					<button
						onclick={switchLangFunc}
						aria-label={isZh ? '跳转英文站点' : 'Jump to Chinese Site'}
						class="cursor-pointer px-4 py-1 text-center"
					>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" class="inline-block">
							<path fill="none" d="M0 0h24v24H0z" />
							<path
								fill="currentColor"
								d="M5 15v2a2 2 0 0 0 1.85 1.995L7 19h3v2H7a4 4 0 0 1-4-4v-2h2zm13-5l4.4 11h-2.155l-1.201-3h-4.09l-1.199 3h-2.154L16 10h2zm-1 2.885L15.753 16h2.492L17 12.885zM8 2v2h4v7H8v3H6v-3H2V4h4V2h2zm9 1a4 4 0 0 1 4 4v2h-2V7a2 2 0 0 0-2-2h-3V3h3zM6 6H4v3h2V6zm4 0H8v3h2V6z"
							/>
						</svg>
					</button>
					<!-- GitHub -->
					<a
						href="https://github.com/any-tdf/stdf"
						class="px-4 py-1 text-center"
						target="_blank"
						aria-label={isZh ? '跳转至 GitHub' : 'Jump to GitHub'}
					>
						<svg width="20" height="20" viewBox="0 0 24 24" class="inline-block" xmlns="http://www.w3.org/2000/svg">
							<path
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M12 2.23999C6.475 2.23999 2 6.71499 2 12.24C2 16.665 4.8625 20.4025 8.8375 21.7275C9.3375 21.815 9.525 21.515 9.525 21.2525C9.525 21.015 9.5125 20.2275 9.5125 19.39C7 19.8525 6.35 18.7775 6.15 18.215C6.0375 17.9275 5.55 17.04 5.125 16.8025C4.775 16.615 4.275 16.1525 5.1125 16.14C5.9 16.1275 6.4625 16.865 6.65 17.165C7.55 18.6775 8.9875 18.2525 9.5625 17.99C9.65 17.34 9.9125 16.9025 10.2 16.6525C7.975 16.4025 5.65 15.54 5.65 11.715C5.65 10.6275 6.0375 9.72749 6.675 9.02749C6.575 8.77749 6.225 7.75249 6.775 6.37749C6.775 6.37749 7.6125 6.11499 9.525 7.40249C10.325 7.17749 11.175 7.06499 12.025 7.06499C12.875 7.06499 13.725 7.17749 14.525 7.40249C16.4375 6.10249 17.275 6.37749 17.275 6.37749C17.825 7.75249 17.475 8.77749 17.375 9.02749C18.0125 9.72749 18.4 10.615 18.4 11.715C18.4 15.5525 16.0625 16.4025 13.8375 16.6525C14.2 16.965 14.5125 17.565 14.5125 18.5025C14.5125 19.84 14.5 20.915 14.5 21.2525C14.5 21.515 14.6875 21.8275 15.1875 21.7275C17.1727 21.0573 18.8977 19.7815 20.1198 18.0795C21.3419 16.3776 21.9995 14.3352 22 12.24C22 6.71499 17.525 2.23999 12 2.23999Z"
								fill="currentColor"
							/>
						</svg>
					</a>
				</div>
			{/if}
		</div>
		<!--PC 端-->
		<div class="hidden items-center space-x-2 px-6 font-bold md:flex">
			<!-- AI 问答 -->
			<a
				href="https://deepwiki.com/any-tdf/stdf"
				class="inline-block px-2 py-1"
				target="_blank"
				title={isZh ? '到 DeepWiki 提问' : 'Ask questions on DeepWiki'}
				aria-label={isZh ? '到 DeepWiki 提问' : 'Ask questions on DeepWiki'}
			>
				<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
					><path
						d="M20.7134 8.12811L20.4668 8.69379C20.2864 9.10792 19.7136 9.10792 19.5331 8.69379L19.2866 8.12811C18.8471 7.11947 18.0555 6.31641 17.0677 5.87708L16.308 5.53922C15.8973 5.35653 15.8973 4.75881 16.308 4.57612L17.0252 4.25714C18.0384 3.80651 18.8442 2.97373 19.2761 1.93083L19.5293 1.31953C19.7058 0.893489 20.2942 0.893489 20.4706 1.31953L20.7238 1.93083C21.1558 2.97373 21.9616 3.80651 22.9748 4.25714L23.6919 4.57612C24.1027 4.75881 24.1027 5.35653 23.6919 5.53922L22.9323 5.87708C21.9445 6.31641 21.1529 7.11947 20.7134 8.12811ZM10 3H14V5H10C6.68629 5 4 7.68629 4 11C4 14.61 6.46208 16.9656 12 19.4798V17H14C17.3137 17 20 14.3137 20 11H22C22 15.4183 18.4183 19 14 19V22.5C9 20.5 2 17.5 2 11C2 6.58172 5.58172 3 10 3Z"
					></path></svg
				>
			</a>
			<button
				class="flex cursor-pointer rounded-sm border border-black/10 p-0.5 text-xs font-normal text-black/40 transition-all hover:border-black/20 dark:border-white/10 dark:text-white/40 dark:hover:border-white/20"
				onclick={clickCmdKFun}
			>
				<div class="mr-1 flex flex-col justify-center">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="12" height="12" style="fill: currentColor;">
						<path fill="none" d="M0 0h24v24H0z" />
						<path
							d="M11 2c4.968 0 9 4.032 9 9s-4.032 9-9 9-9-4.032-9-9 4.032-9 9-9zm0 16c3.867 0 7-3.133 7-7 0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7zm8.485.071l2.829 2.828-1.415 1.415-2.828-2.829 1.414-1.414z"
						/>
					</svg>
				</div>
				<div class="mr-2 flex flex-col justify-center">
					{isZh ? '搜索...' : 'Search...'}
				</div>
				<div class="rounded-sm bg-black/5 px-1 dark:bg-white/5">{cmdkey} K</div>
			</button>
			<a
				href={currentRoute.includes('/guide') ? 'javascript:void(0)' : '/guide'}
				class="px-2 py-1{currentRoute.includes('/guide') ? ' text-primary dark:text-dark' : ''}"
			>
				{isZh ? '指南' : 'Guide'}
			</a>
			<a
				href={currentRoute.includes('/components') ? 'javascript:void(0)' : '/components?nav=button&tab=0'}
				class="inline-block px-2 py-1 text-center{currentRoute.includes('/components')
					? ' text-primary dark:text-dark pointer-events-none'
					: ''}"
			>
				{isZh ? '组件' : 'Components'}
			</a>
			<div
				class="relative"
				role="button"
				tabindex="0"
				bind:this={themeSwitchDesktopRef}
				onmouseenter={() => showThemeSwitchStore.set(true)}
				onmouseleave={() => showThemeSwitchStore.set(false)}
			>
				<button class="px-2 py-1 text-center">
					{isZh ? '主题' : 'Theme'}
				</button>
				{#if $showThemeSwitchStore}
					<div transition:slide={{ duration: 300, axis: 'y' }} class="absolute left-1/2 top-8 -translate-x-1/2 pt-2">
						<div class="min-w-44 rounded-md bg-white px-3 pb-1 pt-2 shadow-lg dark:bg-black/95 dark:shadow-white/10">
							<div class="mb-2 flex items-center justify-between">
								<div class="w-auto">
									<ModeSwitch />
								</div>
								<a
									href="/guide/generator"
									target="_blank"
									class="text-primary hover:bg-primary/10 dark:text-dark dark:hover:bg-dark/10 flex items-center gap-1 rounded-sm px-2 py-1 text-xs transition-all duration-300"
								>
									<svg class="size-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
										<path
											class="fill-primary dark:fill-dark"
											d="M15.1986 9.94435C14.7649 9.53358 14.4859 8.98601 14.4085 8.39371L14.0056 5.31126L11.275 6.79711C10.7503 7.08262 10.1433 7.17876 9.55608 7.06936L6.49998 6.50003L7.06931 9.55612C7.17871 10.1434 7.08257 10.7503 6.79707 11.275L5.31121 14.0056L8.39367 14.4085C8.98596 14.4859 9.53353 14.7649 9.94431 15.1986L12.0821 17.4555L13.4178 14.6485C13.6745 14.1091 14.109 13.6745 14.6484 13.4179L17.4555 12.0821L15.1986 9.94435ZM15.2238 15.5078L13.0111 20.1579C12.8687 20.4572 12.5107 20.5843 12.2115 20.4419C12.1448 20.4102 12.0845 20.3664 12.0337 20.3127L8.49229 16.574C8.39749 16.4739 8.27113 16.4095 8.13445 16.3917L3.02816 15.7242C2.69958 15.6812 2.46804 15.3801 2.51099 15.0515C2.52056 14.9782 2.54359 14.9074 2.5789 14.8425L5.04031 10.3191C5.1062 10.198 5.12839 10.0579 5.10314 9.92241L4.16 4.85979C4.09931 4.53402 4.3142 4.22074 4.63997 4.16005C4.7126 4.14652 4.78711 4.14652 4.85974 4.16005L9.92237 5.10319C10.0579 5.12843 10.198 5.10625 10.319 5.04036L14.8424 2.57895C15.1335 2.42056 15.4979 2.52812 15.6562 2.81919C15.6916 2.88409 15.7146 2.95495 15.7241 3.02821L16.3916 8.13449C16.4095 8.27118 16.4739 8.39754 16.5739 8.49233L20.3127 12.0337C20.5533 12.2616 20.5636 12.6414 20.3357 12.8819C20.2849 12.9356 20.2246 12.9794 20.1579 13.0111L15.5078 15.2238C15.3833 15.2831 15.283 15.3833 15.2238 15.5078ZM16.0206 17.4349L17.4348 16.0207L21.6775 20.2633L20.2633 21.6775L16.0206 17.4349Z"
										></path>
									</svg>
									{isZh ? '创建新主题' : 'Create'}
								</a>
							</div>
							<ThemeSwitch vertical />
						</div>
					</div>
				{/if}
			</div>
			<button class="cursor-pointer px-2 py-1 text-center" onclick={toggleFundFunc}>
				{isZh ? '支持' : 'Support'}
			</button>
			<!-- 语言切换 -->
			<button
				onclick={switchLangFunc}
				class="cursor-pointer px-2 py-1 text-center"
				aria-label={isZh ? '跳转英文站点' : 'Jump to Chinese Site'}
			>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" class="inline-block">
					<path fill="none" d="M0 0h24v24H0z" />
					<path
						fill="currentColor"
						d="M5 15v2a2 2 0 0 0 1.85 1.995L7 19h3v2H7a4 4 0 0 1-4-4v-2h2zm13-5l4.4 11h-2.155l-1.201-3h-4.09l-1.199 3h-2.154L16 10h2zm-1 2.885L15.753 16h2.492L17 12.885zM8 2v2h4v7H8v3H6v-3H2V4h4V2h2zm9 1a4 4 0 0 1 4 4v2h-2V7a2 2 0 0 0-2-2h-3V3h3zM6 6H4v3h2V6zm4 0H8v3h2V6z"
					/>
				</svg>
			</button>
			<!-- GitHub -->
			<a
				href="https://github.com/any-tdf/stdf"
				class="inline-block px-2 py-1"
				target="_blank"
				aria-label={isZh ? '跳转至 GitHub' : 'Jump to GitHub'}
			>
				<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="inline-block">
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M12 2.23999C6.475 2.23999 2 6.71499 2 12.24C2 16.665 4.8625 20.4025 8.8375 21.7275C9.3375 21.815 9.525 21.515 9.525 21.2525C9.525 21.015 9.5125 20.2275 9.5125 19.39C7 19.8525 6.35 18.7775 6.15 18.215C6.0375 17.9275 5.55 17.04 5.125 16.8025C4.775 16.615 4.275 16.1525 5.1125 16.14C5.9 16.1275 6.4625 16.865 6.65 17.165C7.55 18.6775 8.9875 18.2525 9.5625 17.99C9.65 17.34 9.9125 16.9025 10.2 16.6525C7.975 16.4025 5.65 15.54 5.65 11.715C5.65 10.6275 6.0375 9.72749 6.675 9.02749C6.575 8.77749 6.225 7.75249 6.775 6.37749C6.775 6.37749 7.6125 6.11499 9.525 7.40249C10.325 7.17749 11.175 7.06499 12.025 7.06499C12.875 7.06499 13.725 7.17749 14.525 7.40249C16.4375 6.10249 17.275 6.37749 17.275 6.37749C17.825 7.75249 17.475 8.77749 17.375 9.02749C18.0125 9.72749 18.4 10.615 18.4 11.715C18.4 15.5525 16.0625 16.4025 13.8375 16.6525C14.2 16.965 14.5125 17.565 14.5125 18.5025C14.5125 19.84 14.5 20.915 14.5 21.2525C14.5 21.515 14.6875 21.8275 15.1875 21.7275C17.1727 21.0573 18.8977 19.7815 20.1198 18.0795C21.3419 16.3776 21.9995 14.3352 22 12.24C22 6.71499 17.525 2.23999 12 2.23999Z"
						fill="currentColor"
					/>
				</svg>
			</a>
		</div>
	</div>
</div>
