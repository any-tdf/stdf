<script lang="ts">
	import { switchTheme } from 'stdf/theme';
	import Header from '$lib/header/Header.svelte';
	import CmdK from '$lib/cmdk/CmdK.svelte';
	import Fund from '$lib/fund/Fund.svelte';
	import { page } from '$app/state';
	import { isCmdKStore, isShowFundStore, currentColorStore } from '../store.js';
	import '../app.css';
	import { delParamsUrl } from '../utils/index.js';

	let { children } = $props();

	let showLeftNav = $state(false); //是否显示左侧导航
	let isHome = page.url.pathname === '/';

	//路由改变时，更新左侧导航
	$effect(() => {
		showLeftNav = page.url.pathname.startsWith('/guide') || page.url.pathname === '/components';
	});
	// 点击顶部菜单事件
	const headerCmdKFun = () => {
		isCmdKStore.set(true);
	};

	const urlParams = new URLSearchParams(window.location.search);
	// 设置默认主题色
	const themeParam = urlParams.get('theme');
	const storedTheme = localStorage.getItem('theme_color') || 'STDF';
	const isIframe = window.self !== window.top;
	const currentTheme = isIframe && themeParam ? themeParam : storedTheme;
	if (isIframe && themeParam) {
		localStorage.setItem('theme_color', themeParam);
		currentColorStore.set(themeParam);
	}
	switchTheme(currentTheme);

	const langParam = urlParams.get('lang');
	if (langParam) {
		// URL 中有 lang 参数，更新 localStorage
		localStorage.setItem('lang', langParam);
		// 删除 URL 中的 lang 参数
		setTimeout(() => {
			const url = new URL(window.location.href);
			url.searchParams.delete('lang');
			window.history.pushState({}, '', url.toString());
		}, 10);
	} else if (!localStorage.getItem('lang')) {
		// 没有 lang 参数，也没有本地存储，根据浏览器语言设置默认值
		const lang = navigator.language.substring(0, 2);
		if (lang === 'en') {
			localStorage.setItem('lang', 'en_US');
		} else {
			localStorage.setItem('lang', 'zh_CN');
		}
	}
	if (localStorage.getItem('theme') === 'dark') {
		document.documentElement.setAttribute('data-mode', 'dark');
	} else if (localStorage.getItem('theme') === 'light') {
		document.documentElement.setAttribute('data-mode', 'light');
	} else {
		if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
			document.documentElement.setAttribute('data-mode', 'dark');
		} else {
			document.documentElement.setAttribute('data-mode', 'light');
		}
	}
	const isZh = localStorage.getItem('lang') === 'zh_CN';

	// 根据 params 判断当前 URL 是否含有 fund 参数，如果有则显示赞赏弹窗
	const isFund = urlParams.has('fund');
	if (isFund) {
		isShowFundStore.set(true);
		// 去除 URL 中的 fund 参数
		setTimeout(() => {
			window.history.replaceState({}, '', delParamsUrl(window.location.href, 'fund'));
		}, 10);
	}
</script>

<svelte:head>
	<title>STDF - {isZh ? '移动 web 组件库' : 'Mobile web component library'}</title>
</svelte:head>

<main class="relative min-h-screen text-justify antialiased">
	<Header {showLeftNav} showBottonLine={!isHome} onclickCmdK={headerCmdKFun} />
	<!-- <Router {routes} /> -->
	<!-- <div class="mx-auto max-w-screen-2xl"> -->
	{@render children()}
	<!-- </div> -->

	<CmdK />
	<!-- 赞赏 -->
	{#if $isShowFundStore}
		<Fund />
	{/if}
</main>
