<script lang="ts">
	import themes from '../data/themes/index.js';
	import { switchTheme } from 'stdf/theme';
	import Header from '$lib/header/Header.svelte';
	import CmdK from '$lib/cmdk/CmdK.svelte';
	import Fund from '$lib/fund/Fund.svelte';
	import { page } from '$app/stores';
	import { isCmdKStore, isShowFundStore } from '../store.js';
	import '../app.css';
	import { delParamsUrl } from '../utils/index.js';

	let { children } = $props();

	let showLeftNav = $state(false); //是否显示左侧导航
	let isHome = $page.url.pathname === '/' || $page.url.pathname === '';

	//路由改变时，更新左侧导航
	$effect(() => {
		showLeftNav = $page.url.pathname.startsWith('/guide') || $page.url.pathname === '/components';
	});
	// 点击顶部菜单事件
	const headerCmdKFun = () => {
		isCmdKStore.set(true);
	};

	const currentTheme = localStorage.getItem('theme_color') || 'STDF';
	// 设置默认主题色
	themes.forEach((item) => {
		if (item.name === currentTheme) {
			const theme = item.theme;
			switchTheme(theme);
			// 修改 HTML 的 meta name="theme-color" 属性，适配 Safari 的 tab 背景色，需要设置 light 和 dark 两种颜色
			const safariLight = theme.color.primaryWhite;
			const safariDark = theme.color.darkBlack;
			// 查找 meta 标签，name="theme-color" 且 media="(prefers-color-scheme: light)"
			const lightMeta = document.querySelector('meta[name="theme-color"][media="(prefers-color-scheme: light)"]');
			// 查找 meta 标签，name="theme-color" 且 media="(prefers-color-scheme: dark)"
			const darkMeta = document.querySelector('meta[name="theme-color"][media="(prefers-color-scheme: dark)"]');
			// 如果找到了，就修改它的 content 属性
			if (lightMeta) {
				lightMeta.setAttribute('content', safariLight);
			}
			if (darkMeta) {
				darkMeta.setAttribute('content', safariDark);
			}
		}
	});

	let urlLang = window.location.href.split('?')[1];
	if (!urlLang || (urlLang && !urlLang.includes('lang'))) {
		if (!localStorage.getItem('lang')) {
			//获取浏览器语言前两位
			const lang = navigator.language.substring(0, 2);
			if (lang === 'en') {
				localStorage.setItem('lang', 'en_US');
			} else {
				localStorage.setItem('lang', 'zh_CN');
			}
		}
	} else {
		let urlParams = new URLSearchParams(urlLang);
		localStorage.setItem('lang', urlParams.get('lang') || '');
		setTimeout(() => {
			// window.location.href = window.location.href.replace(/(\?|#)[^'"]*/, '');//去除参数
			const url = new URL(window.location.href);
			url.searchParams.delete('lang');
			window.history.pushState({}, '', url.toString()); //刷新页面
		}, 10);
	}
	if (localStorage.getItem('theme') === 'dark') {
		document.documentElement.classList.add('dark');
	} else if (localStorage.getItem('theme') === 'light') {
		document.documentElement.classList.remove('dark');
	} else {
		if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	}
	const isZh = localStorage.getItem('lang') === 'zh_CN';

	// 根据 params 判断当前 URL 是否含有 fund 参数，如果有则显示赞赏弹窗
	const urlFund = window.location.href.split('?')[1];
	const urlParams = new URLSearchParams(urlFund);
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

<main class="bg-primaryWhite dark:bg-darkBlack relative min-h-screen text-justify text-black antialiased dark:text-white">
	<Header {showLeftNav} showBottonLine={!isHome} onclickCmdK={headerCmdKFun} />
	<!-- <Router {routes} /> -->
	{@render children()}

	<CmdK />
	<!-- 赞赏 -->
	{#if $isShowFundStore}
		<Fund />
	{/if}
</main>
