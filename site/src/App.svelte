<script>
	import { afterUpdate, onMount } from 'svelte';
	import { location } from 'svelte-spa-router';
	import Router from 'svelte-spa-router';
	import routes from './routers';
	import Header from './components/header/Header.svelte';
	import Fund from './components/fund/Fund.svelte';
	import CmdK from './components/cmdk/CmdK.svelte';
	import { isCmdKStore, isShowFundStore } from './store';
	import { delParamsUrl } from './utils/index';

	let showLeftNav = false; //是否显示左侧导航
	//路由改变时，更新左侧导航
	afterUpdate(() => {
		showLeftNav = $location.startsWith('/guide') || $location === '/components';
	});
	$: isHome = $location === '/' || $location === '';

	const isZh = localStorage.getItem('lang') === 'zh_CN';
	// 修改HTML 上的lang
	document.documentElement.lang = isZh ? 'zh-CN' : 'en-US';

	onMount(() => {
		// 根据 params 判断当前 URL 是否含有 fund 参数，如果有则显示赞赏弹窗
		let urlLang = window.location.href.split('?')[1];
		let urlParams = new URLSearchParams(urlLang);
		const isFund = urlParams.has('fund');
		if (isFund) {
			isShowFundStore.set(true);
			// 去除 URL 中的 fund 参数
			setTimeout(() => {
				window.history.replaceState({}, '', delParamsUrl(window.location.href, 'fund'));
			}, 10);
		}
	});

	// 点击顶部菜单事件
	const headerCmdKFun = () => {
		isCmdKStore.set(true);
	};
</script>

<svelte:head>
	<title>STDF - {isZh ? '移动 web 组件库' : 'Mobile web component library'}</title>
</svelte:head>

<main class="bg-primaryWhite dark:bg-darkBlack text-black dark:text-white relative min-h-screen text-justify antialiased">
	<!-- main -> next -->
	{#if $location === '' || $location === '/'}
		<div class="bg-primary dark:bg-dark px-2 py-1 text-center text-xs text-white dark:text-black">
			{#if isZh}
				这是 v0.x 文档，v1.0.0@next 请访问 <a href="https://next.stdf.design" class="underline" target="_blank">next.stdf.design</a>
			{:else}
				This is the v0.x documentation, please visit <a href="https://next.stdf.design" class="underline" target="_blank">
					next.stdf.design
				</a> for v1.0.0@next
			{/if}
		</div>
	{/if}
	<Header {showLeftNav} showBottonLine={!isHome} on:clickCmdK={headerCmdKFun} />
	<Router {routes} />
	<CmdK />
	<!-- 赞赏 -->
	{#if $isShowFundStore}
		<Fund />
	{/if}
</main>
