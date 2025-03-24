<script lang="ts">
	import { onMount } from 'svelte';
	import { isShowNavStore, isWideScreenStore } from '../../store';
	import Menu from '$lib/menu/Menu.svelte';
	import { page } from '$app/stores';
	import type { MenuListChild } from '../../data/menuList.js';
	import { goto } from '$app/navigation';

	let { children } = $props();

	const isZh = localStorage.getItem('lang') === 'zh_CN';

	type menuListChildsProps = { title: string; title_en: string; nav: string; doc?: string };
	type menuListProps = { class: string; class_en: string; childs: menuListChildsProps[] };
	const menuList: menuListProps[] = [
		{
			class: '常规',
			class_en: 'General',
			childs: [
				{ title: '快速上手', title_en: 'Quick start', nav: 'quick-start', doc: 'quickStart' },
				{ title: '主题配置', title_en: 'Theme', nav: 'theme', doc: 'theme' },
				{ title: '图标', title_en: 'Icon', nav: 'icon', doc: 'icon' },
				{
					title: '国际化',
					title_en: 'Internationalization',
					nav: 'internation',
					doc: 'internation'
				},
				{ title: '更新日志', title_en: 'Changelog', nav: 'changelog', doc: 'changelog' },
				{ title: '常见问题', title_en: 'FAQ', nav: 'faq', doc: 'faq' },
				{
					title: '贡献指南',
					title_en: 'Contribution Guide',
					nav: 'contribution',
					doc: 'contribution'
				},
				{ title: '兼容性', title_en: 'Compatibility', nav: 'compatibility', doc: 'compatibility' }
			]
		},
		{
			class: '设计',
			class_en: 'Design',
			childs: [
				{ title: '色彩', title_en: 'Color', nav: 'color' },
				{ title: 'LOGO', title_en: 'LOGO', nav: 'logo' }
			]
		},
		{
			class: '工具',
			class_en: 'Tools',
			childs: [
				{ title: '主题生成器', title_en: 'Theme generator', nav: 'generator' },
				{ title: 'IDE 插件', title_en: 'IDE plugin', nav: 'vscode', doc: 'vscode' },
				{ title: '脚手架', title_en: 'Create cli', nav: 'create' },
				{ title: '图标插件', title_en: 'Icon plugin', nav: 'icon-plugin' },
				{ title: 'MD 插件', title_en: 'MD plugin', nav: 'md' },
				{ title: '快捷键', title_en: 'Shortcut key', nav: 'shortkey' }
			]
		},
		{
			class: '其他',
			class_en: 'Other',
			childs: [
				{ title: '关于', title_en: 'About', nav: 'about', doc: 'about' },
				{ title: '里程碑', title_en: 'Milestone', nav: 'milestone', doc: 'milestone' },
				{ title: '计划', title_en: 'Future', nav: 'future', doc: 'future' }
			]
		}
	];
	//扁平 menuList
	const flatMenuList: menuListChildsProps[] = [];
	for (let e = 0; e < menuList.length; e++) {
		flatMenuList.push(...menuList[e].childs);
	}
	let currentNav = $state(menuList[0].childs[0]);
	let menuHeight = $state(0);
	const getMenuHeightFun = () => {
		menuHeight = document.documentElement.clientHeight - 56;
	};
	const menuClickFun = (currentMenu: MenuListChild) => {
		if ($isShowNavStore) {
			isShowNavStore.set(false);
		}
		currentNav = currentMenu;
		// 将当前点击的 currentMenu 设置 url 参数
		// window.location.href = '/guide?nav=' + currentMenu.nav;
		goto(`/guide${currentMenu.nav === 'quick-start' ? '' : `/${currentMenu.nav}`}`);
	};

	onMount(() => {
		menuHeight = document.documentElement.clientHeight - 56;
		window.addEventListener('resize', getMenuHeightFun);

		// 根据 $page.url.pathname 获取 currentNav
		const urlNav = flatMenuList.find((item) => ($page.url.pathname.includes(item.nav) ? item : null));
		currentNav = urlNav || flatMenuList[0];

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
	const editUrlFn = (nav: string) => {
		// main -> next
		const baseUrl = 'https://github.com/any-tdf/stdf/edit/next/';
		if (nav === 'create') {
			return baseUrl + 'packages/create-stdf/README' + (isZh ? '_CN' : '') + '.md';
		}
		if (nav === 'icon-plugin') {
			return baseUrl + 'packages/rollup-plugin-stdf-icon/README' + (isZh ? '_CN' : '') + '.md';
		}
		return baseUrl + `docs/mds/guide/${flatMenuList.filter((item) => item.nav === nav)[0]?.doc}${isZh ? '' : '_en'}.md`;
	};
</script>

<div class="flex">
	<div
		class="fixed -left-52 top-14 z-[100] w-48 overflow-y-scroll border-r border-black/10 bg-white transition-all duration-300 md:left-0 md:bg-transparent dark:border-white/20 dark:bg-black dark:md:bg-transparent"
		class:left-0={$isShowNavStore}
		class:-left-52={!$isShowNavStore}
		style="height:{menuHeight + 'px'}"
	>
		<Menu {menuList} currentNav={currentNav.nav} onclickMenu={menuClickFun} showNum={false} />
	</div>
	<div class="w-screen md:pl-48">
		{#if !$page.url.pathname.includes('generator')}
			<div class="px-4 py-12 md:px-8 md:py-4">
				<div class="text-4xl font-bold">
					{isZh ? currentNav.title : currentNav.title_en}
				</div>
			</div>
			<div class="h-px bg-black/10 dark:bg-white/20"></div>
		{/if}
		<div class="px-4 pt-4 {$page.url.pathname.includes('generator') ? 'md:px-4 md:pt-4' : 'md:px-8 md:pt-12'}">
			{@render children()}
		</div>
		{#if !$page.url.pathname.includes('generator') && currentNav.nav != 'color' && currentNav.nav != 'logo' && currentNav.nav != 'shortkey'}
			<div class="flex gap-2 px-4 pb-8 text-xs md:px-8">
				<a href={editUrlFn(currentNav.nav)} class="text-primary dark:text-dark flex w-full" target="_blank">
					<span class="mr-1 h-4 w-4">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-4 w-4" style="fill: currentColor;">
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
{#if !$page.url.pathname.includes('generator')}
	<button
		class="bg-primary shadow-primary/50 dark:bg-dark dark:shadow-dark/50 fixed bottom-4 right-2 z-50 hidden h-8 w-8 rounded-full p-1.5 text-white shadow-md md:block dark:text-black"
		onclick={changeFullFunc}
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
	class="peer-checked/tab-0-0:border-primary peer-checked/tab-0-1:border-primary peer-checked/tab-0-2:border-primary peer-checked/tab-0-3:border-primary peer-checked/tab-0-4:border-primary peer-checked/tab-0-5:border-primary
peer-checked/tab-1-0:border-primary peer-checked/tab-1-1:border-primary peer-checked/tab-1-2:border-primary
peer-checked/tab-1-3:border-primary peer-checked/tab-1-4:border-primary peer-checked/tab-1-5:border-primary
peer-checked/tab-2-0:border-primary peer-checked/tab-2-1:border-primary peer-checked/tab-2-2:border-primary
peer-checked/tab-2-3:border-primary peer-checked/tab-2-4:border-primary peer-checked/tab-2-5:border-primary
peer-checked/tab-3-0:border-primary peer-checked/tab-3-1:border-primary peer-checked/tab-3-2:border-primary
peer-checked/tab-3-3:border-primary peer-checked/tab-3-4:border-primary peer-checked/tab-3-5:border-primary
peer-checked/tab-4-0:border-primary peer-checked/tab-4-1:border-primary peer-checked/tab-4-2:border-primary
peer-checked/tab-4-3:border-primary peer-checked/tab-4-4:border-primary peer-checked/tab-4-5:border-primary
dark:peer-checked/tab-0-0:border-dark dark:peer-checked/tab-0-1:border-dark dark:peer-checked/tab-0-2:border-dark
dark:peer-checked/tab-0-3:border-dark dark:peer-checked/tab-0-4:border-dark dark:peer-checked/tab-0-5:border-dark
dark:peer-checked/tab-1-0:border-dark dark:peer-checked/tab-1-1:border-dark dark:peer-checked/tab-1-2:border-dark
dark:peer-checked/tab-1-3:border-dark dark:peer-checked/tab-1-4:border-dark dark:peer-checked/tab-1-5:border-dark
dark:peer-checked/tab-2-0:border-dark dark:peer-checked/tab-2-1:border-dark dark:peer-checked/tab-2-2:border-dark
dark:peer-checked/tab-2-3:border-dark dark:peer-checked/tab-2-4:border-dark dark:peer-checked/tab-2-5:border-dark
dark:peer-checked/tab-3-0:border-dark dark:peer-checked/tab-3-1:border-dark dark:peer-checked/tab-3-2:border-dark
dark:peer-checked/tab-3-3:border-dark dark:peer-checked/tab-3-4:border-dark dark:peer-checked/tab-3-5:border-dark
dark:peer-checked/tab-4-0:border-dark dark:peer-checked/tab-4-1:border-dark dark:peer-checked/tab-4-2:border-dark
dark:peer-checked/tab-4-3:border-dark dark:peer-checked/tab-4-4:border-dark dark:peer-checked/tab-4-5:border-dark
hidden border-b-2 border-black/10 peer-checked/tab-0-0:block
peer-checked/tab-0-1:block peer-checked/tab-0-2:block peer-checked/tab-0-3:block
peer-checked/tab-0-4:block peer-checked/tab-0-5:block peer-checked/tab-1-0:block
peer-checked/tab-1-1:block peer-checked/tab-1-2:block peer-checked/tab-1-3:block
peer-checked/tab-1-4:block peer-checked/tab-1-5:block peer-checked/tab-2-0:block
peer-checked/tab-2-1:block peer-checked/tab-2-2:block peer-checked/tab-2-3:block
peer-checked/tab-2-4:block peer-checked/tab-2-5:block peer-checked/tab-3-0:block
peer-checked/tab-3-1:block peer-checked/tab-3-2:block peer-checked/tab-3-3:block
peer-checked/tab-3-4:block peer-checked/tab-3-5:block peer-checked/tab-4-0:block
peer-checked/tab-4-1:block peer-checked/tab-4-2:block peer-checked/tab-4-3:block
peer-checked/tab-4-4:block peer-checked/tab-4-5:block dark:border-white/10 dark:bg-[#202020]"
></div>
