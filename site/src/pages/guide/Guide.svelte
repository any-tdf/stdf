<script>
	// @ts-nocheck
	import { onMount } from 'svelte';
	import Router, { querystring, push, location } from 'svelte-spa-router';
	import { isShowNavStore, isWideScreenStore } from '../../store';
	import Menu from '../../components/menu/Menu.svelte';

	import QuickStart from './QuickStart.svelte';
	import Theme from './Theme.svelte';
	import Faq from './Faq.svelte';
	import Color from './Color.svelte';
	import Color_en from './Color_en.svelte';
	import Icon from './Icon.svelte';
	import Internation from './Internation.svelte';
	import Compatibility from './Compatibility.svelte';
	import Logo from './Logo.svelte';
	import About from './About.svelte';
	import Changelog from './Changelog.svelte';
	import Future from './Future.svelte';
	import Shortkey from './Shortkey.svelte';
	import Contribution from './Contribution.svelte';
	import Milestone from './Milestone.svelte';
	import Vscode from './Vscode.svelte';
	import Generator from './Generator.svelte';
	import Create from './Create.svelte';
	import IconPlugin from './IconPlugin.svelte';

	const isZh = localStorage.getItem('lang') === 'zh_CN';

	const guideRoutes = {
		'/quick-start': QuickStart,
		'/theme': Theme,
		'/faq': Faq,
		'/color': isZh ? Color : Color_en,
		'/icon': Icon,
		'/internation': Internation,
		'/compatibility': Compatibility,
		'/logo': Logo,
		'/about': About,
		'/changelog': Changelog,
		'/future': Future,
		'/shortkey': Shortkey,
		'/contribution': Contribution,
		'/milestone': Milestone,
		'/vscode': Vscode,
		'/generator': Generator,
		'/create': Create,
		'/icon-plugin': IconPlugin,
		'/': QuickStart,
	};

	let params = new URLSearchParams('?' + $querystring);
	const menuList = [
		{
			class: '常规',
			class_en: 'General',
			childs: [
				{ title: '快速上手', title_en: 'Quick start', nav: 'quick-start', doc: 'quickStart' },
				{ title: '主题配置', title_en: 'Theme', nav: 'theme', doc: 'theme' },
				{ title: '图标', title_en: 'Icon', nav: 'icon', doc: 'icon' },
				{ title: '国际化', title_en: 'Internationalization', nav: 'internation', doc: 'internation' },
				{ title: '更新日志', title_en: 'Changelog', nav: 'changelog', doc: 'changelog' },
				{ title: '常见问题', title_en: 'FAQ', nav: 'faq', doc: 'faq' },
				{ title: '贡献指南', title_en: 'Contribution Guide', nav: 'contribution', doc: 'contribution' },
				{ title: '兼容性', title_en: 'Compatibility', nav: 'compatibility', doc: 'compatibility' },
			],
		},
		{
			class: '设计',
			class_en: 'Design',
			childs: [
				{ title: '色彩', title_en: 'Color', nav: 'color' },
				{ title: 'LOGO', title_en: 'LOGO', nav: 'logo' },
			],
		},
		{
			class: '工具',
			class_en: 'Tools',
			childs: [
				{ title: '主题生成器', title_en: 'Theme generator', nav: 'generator' },
				{ title: 'IDE 插件', title_en: 'IDE plugin', nav: 'vscode', doc: 'vscode' },
				{ title: '脚手架', title_en: 'Create cli', nav: 'create' },
				{ title: '图标插件', title_en: 'Icon plugin', nav: 'icon-plugin' },
				{ title: '快捷键', title_en: 'Shortcut key', nav: 'shortkey' },
			],
		},
		{
			class: '其他',
			class_en: 'Other',
			childs: [
				{ title: '关于', title_en: 'About', nav: 'about', doc: 'about' },
				{ title: '里程碑', title_en: 'Milestone', nav: 'milestone', doc: 'milestone' },
				{ title: '计划', title_en: 'Future', nav: 'future', doc: 'future' },
			],
		},
	];
	//扁平 menuList
	const flatMenuList = [];
	for (let e = 0; e < menuList.length; e++) {
		flatMenuList.push(...menuList[e].childs);
	}
	let currentNav = menuList[0].childs[0];
	let menuHeight = 0;
	const getMenuHeightFun = () => {
		menuHeight = document.documentElement.clientHeight - 56;
	};
	const menuClickFun = currentMenu => {
		if ($isShowNavStore) {
			isShowNavStore.set;
		}
		currentNav = currentMenu.detail;
		params.set('com', currentMenu.detail.nav);
		// push(`/guide?nav=${currentMenu.detail.nav}`);
		push(`/guide/${currentMenu.detail.nav}`);
	};
	onMount(() => {
		menuHeight = document.documentElement.clientHeight - 56;
		window.addEventListener('resize', getMenuHeightFun);
		// @ts-ignore
		hljs.highlightAll();
		// 获取路由
		// const currentRoute = window.location.href.split('#')[1];
		// 如果 $location 以 /guide 开头，去掉 /guide 保存到 location
		const locationNoGuide = $location.startsWith('/guide') ? $location.replace('/guide', '') : $location;
		// locationNoGuide 是否在 guideRoutes 中
		let isHave = false;
		for (let key in guideRoutes) {
			if (key === locationNoGuide) {
				isHave = true;
				break;
			}
		}
		if (isHave) {
			let arr = [];
			for (let e = 0; e < menuList.length; e++) {
				arr.push(...menuList[e].childs);
			}
			// 去掉 locationNoGuide 开头的 /
			const locationNoGuideNoSlash = locationNoGuide.replace('/', '');
			currentNav = arr.filter(item => item.nav === locationNoGuideNoSlash)[0];
		}
		return () => {
			window.removeEventListener('resize', getMenuHeightFun);
		};
	});
	// 全屏
	const changeFullFunc = () => {
		if ($isWideScreenStore) {
			isWideScreenStore.set(false);
			localStorage.setItem('isFull', 'notFull');
		} else {
			isWideScreenStore.set(true);
			localStorage.setItem('isFull', 'full');
		}
	};
	// 编辑地址处理
	const editUrlFn = nav => {
		if (nav === 'create') {
			return 'https://github.com/any-tdf/stdf/edit/main/packages/create-stdf/README' + (isZh ? '_CN' : '') + '.md';
		}
		if (nav === 'icon-plugin') {
			return 'https://github.com/any-tdf/stdf/edit/main/packages/rollup-plugin-stdf-icon/README' + (isZh ? '_CN' : '') + '.md';
		}
		return `https://github.com/any-tdf/stdf/edit/main/doc/guide/${flatMenuList.filter(item => item.nav === nav)[0]?.doc}${
			isZh ? '' : '_en'
		}.md`;
	};
</script>

<div class="flex">
	<div
		class="fixed -left-52 md:left-0 top-14 w-48 overflow-y-scroll transition-all duration-300 z-[100] bg-white dark:bg-black md:bg-transparent dark:md:bg-transparent border-r border-black/10 dark:border-white/20"
		class:left-0={$isShowNavStore}
		class:-left-52={!$isShowNavStore}
		style="height:{menuHeight + 'px'}"
	>
		<Menu {menuList} currentNav={currentNav.nav} on:MenuClick={menuClickFun} showNum={false} />
	</div>
	<div class="md:pl-48 w-screen">
		{#if currentNav.nav !== 'generator'}
			<div class="px-4 py-12 md:px-8 md:py-4">
				<div class="font-bold text-4xl">
					{isZh ? currentNav.title : currentNav.title_en}
				</div>
			</div>
			<div class="h-px bg-black/10 dark:bg-white/20" />
		{/if}
		<div class="px-4 pt-4 {currentNav.nav === 'generator' ? 'md:pt-4 md:px-4' : 'md:pt-12 md:px-8'}">
			<Router routes={guideRoutes} prefix="/guide" />
		</div>
		{#if currentNav.nav != 'color' && currentNav.nav != 'logo' && currentNav.nav != 'shortkey' && currentNav.nav != 'generator'}
			<div class="px-4 md:px-8 pb-8 text-xs flex gap-2">
				<a href={editUrlFn(currentNav.nav)} class="flex text-primary dark:text-dark w-full" target="_blank">
					<span class="h-4 w-4 mr-1">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-4 h-4" style="fill: currentColor;">
							<path
								d="M12.8995 6.85431L17.1421 11.0969L7.24264 20.9964H3V16.7538L12.8995 6.85431ZM14.3137 5.44009L16.435 3.31877C16.8256 2.92825 17.4587 2.92825 17.8492 3.31877L20.6777 6.1472C21.0682 6.53772 21.0682 7.17089 20.6777 7.56141L18.5563 9.68273L14.3137 5.44009Z"
							/>
						</svg>
					</span>
					{isZh ? '在 GitHub 上编辑' : 'Edit on GitHub'}
				</a>
			</div>
		{/if}
	</div>
</div>

{#if !$location.includes('generator')}
	<button
		class="hidden md:block fixed right-2 bottom-4 z-50 p-1.5 w-8 h-8 rounded-full bg-primary dark:bg-dark text-white dark:text-black shadow-md shadow-primary/50 dark:shadow-dark/50"
		on:click={changeFullFunc}
	>
		{#if $isWideScreenStore}
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
				><path
					d="M20 3C20.5523 3 21 3.44772 21 4V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3H20ZM11 5H5V19H11V15H13V19H19V5H13V9H11V5ZM15 9L18 12L15 15V13H9V15L6 12L9 9V11H15V9Z"
					fill="currentColor"
				></path></svg
			>
		{:else}
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
				><path
					d="M20 3C20.5523 3 21 3.44772 21 4V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3H20ZM11 5H5V10.999H7V9L10 12L7 15V13H5V19H11V17H13V19H19V13H17V15L14 12L17 9V10.999H19V5H13V7H11V5ZM13 13V15H11V13H13ZM13 9V11H11V9H13Z"
					fill="currentColor"
				></path></svg
			>
		{/if}
	</button>
{/if}
<!-- 为 code-groups 预先编译 tailwind -->
<div
	class="hidden dark:bg-[#202020] border-b-2 peer-checked/tab-0-0:border-primary dark:peer-checked/tab-0-0:border-dark peer-checked/tab-0-0:block
peer-checked/tab-0-1:border-primary dark:peer-checked/tab-0-1:border-dark peer-checked/tab-0-1:block
peer-checked/tab-0-2:border-primary dark:peer-checked/tab-0-2:border-dark peer-checked/tab-0-2:block
peer-checked/tab-0-3:border-primary dark:peer-checked/tab-0-3:border-dark peer-checked/tab-0-3:block
peer-checked/tab-0-4:border-primary dark:peer-checked/tab-0-4:border-dark peer-checked/tab-0-4:block
peer-checked/tab-0-5:border-primary dark:peer-checked/tab-0-5:border-dark peer-checked/tab-0-5:block
peer-checked/tab-1-0:border-primary dark:peer-checked/tab-1-0:border-dark peer-checked/tab-1-0:block
peer-checked/tab-1-1:border-primary dark:peer-checked/tab-1-1:border-dark peer-checked/tab-1-1:block
peer-checked/tab-1-2:border-primary dark:peer-checked/tab-1-2:border-dark peer-checked/tab-1-2:block
peer-checked/tab-1-3:border-primary dark:peer-checked/tab-1-3:border-dark peer-checked/tab-1-3:block
peer-checked/tab-1-4:border-primary dark:peer-checked/tab-1-4:border-dark peer-checked/tab-1-4:block
peer-checked/tab-1-5:border-primary dark:peer-checked/tab-1-5:border-dark peer-checked/tab-1-5:block
peer-checked/tab-2-0:border-primary dark:peer-checked/tab-2-0:border-dark peer-checked/tab-2-0:block
peer-checked/tab-2-1:border-primary dark:peer-checked/tab-2-1:border-dark peer-checked/tab-2-1:block
peer-checked/tab-2-2:border-primary dark:peer-checked/tab-2-2:border-dark peer-checked/tab-2-2:block
peer-checked/tab-2-3:border-primary dark:peer-checked/tab-2-3:border-dark peer-checked/tab-2-3:block
peer-checked/tab-2-4:border-primary dark:peer-checked/tab-2-4:border-dark peer-checked/tab-2-4:block
peer-checked/tab-2-5:border-primary dark:peer-checked/tab-2-5:border-dark peer-checked/tab-2-5:block
peer-checked/tab-3-0:border-primary dark:peer-checked/tab-3-0:border-dark peer-checked/tab-3-0:block
peer-checked/tab-3-1:border-primary dark:peer-checked/tab-3-1:border-dark peer-checked/tab-3-1:block
peer-checked/tab-3-2:border-primary dark:peer-checked/tab-3-2:border-dark peer-checked/tab-3-2:block
peer-checked/tab-3-3:border-primary dark:peer-checked/tab-3-3:border-dark peer-checked/tab-3-3:block
peer-checked/tab-3-4:border-primary dark:peer-checked/tab-3-4:border-dark peer-checked/tab-3-4:block
peer-checked/tab-3-5:border-primary dark:peer-checked/tab-3-5:border-dark peer-checked/tab-3-5:block"
></div>
