<script lang="ts">
	import { setContext, onMount } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { NavBar, Icon } from '$lib/index.js';
	import { zh_CN, en_US } from '$lib/lang/index.js';
	import '../app.css';
	import { menuList, type MenuListChild } from '../data/menuList.js';
	import ThemeSwitch from './components/ThemeSwitch.svelte';
	import { darkMode } from '$lib/theme/index.js';

	let { children } = $props();

	// 循环 menuList，将所有元素的 childs 组成一个数组
	// Cycle menuList, and combine the childs of all elements into an array
	const menuListArr: MenuListChild[] = menuList.reduce((acc: MenuListChild[], cur) => {
		if (cur.childs) {
			acc.push(...cur.childs);
		}
		return acc;
	}, []);

	// 使用 `URLSearchParams` 对象来获取 URL 查询参数
	// Use the `URLSearchParams` object to get the URL query parameters
	const urlParams = new URLSearchParams($page.url.search);
	const channel = urlParams.get('channel');
	// 判断是否是 iframe
	// judge whether it is iframe
	const isIframe = channel && channel === 'iframe' ? '1' : '0';
	// 设置 iframe
	// setting iframe
	setContext('iframe', isIframe);

	// 环境变量
	// environment variables
	const mode = import.meta.env.MODE;

	// mode 是否是指定组件模式
	// whether mode is specified component mode
	const isComponentMode = mode != 'production' && mode != 'development' && mode != 'english';

	let showLeft = $derived(!(isIframe === '1' || $page.url.pathname === '/' || isComponentMode));

	let theme = $state(localStorage.getItem('theme') === 'dark' ? 'dark' : 'light');

	// 设置亮暗模式
	// Set light and dark mode
	if (localStorage.getItem('theme') === 'dark') {
		darkMode();
	} else if (localStorage.getItem('theme') === 'light') {
		darkMode(false);
	} else {
		darkMode(false);
	}
	//手动切换亮暗模式
	// manually switch light and dark mode
	const toggleFun = () => {
		if (theme === 'dark') {
			// 切换到 light
			// switch to light
			theme = 'light';
			localStorage.setItem('theme', 'light');
			darkMode(false);
		} else {
			// 切换到 dark
			// switch to dark
			theme = 'dark';
			localStorage.setItem('theme', 'dark');
			darkMode();
		}
	};

	// 判断 mode 是否是 English 模式
	// Determine whether mode is English mode
	const englishMode = mode.slice(-3) === '_en' || mode === 'english';
	let lang = 'zh_CN';
	if (englishMode) {
		// 固定为英文
		// Fixed to English
		lang = 'en_US';
	} else {
		// 根据 url 或 urlParams 或 sessionStorage 获取语言，优先级为 urlParams > url  > sessionStorage
		// Get the language according to the url or urlParams or sessionStorage, the priority is urlParams > url > sessionStorage
		// 如果 urlParams 中有 ?lang=en_US，则设置为英文，如果有 ?lang=zh_CN，则设置为中文
		// If there is ?lang=en_US in urlParams, set it to English, if there is ?lang=zh_CN, set it to Chinese
		const urlParamsLang = urlParams.get('lang');
		if (urlParamsLang) {
			lang = urlParamsLang;
			// 将 url 的 ?lang=en_US 或 ?lang=zh_CN 去掉
			// Remove ?lang=en_US or ?lang=zh_CN from url
			setTimeout(() => {
				history.replaceState(null, '', location.href.replace(`?lang=${urlParamsLang}`, ''));
			}, 100);
		} else {
			// 如果 URL 中包含 /en_US/ 或 /zh_CN/，则设置为英文或中文
			// If the URL contains /en_US/ or /zh_CN/, set it to English or Chinese
			const urlLang = $page.url.pathname.split('/')[1];
			if (urlLang === 'en_US' || urlLang === 'zh_CN') {
				lang = urlLang;
			} else {
				// 如果 sessionStorage 中有 lang，则设置为 sessionStorage 中的 lang
				// If there is lang in sessionStorage, set it to lang in sessionStorage
				const sessionStorageLang = sessionStorage.getItem('lang');
				if (sessionStorageLang) {
					lang = sessionStorageLang;
				} else {
					// 如果 sessionStorage 中没有 lang，则设置为中文
					// If there is no lang in sessionStorage, set it to Chinese
					lang = 'zh_CN';
				}
			}
		}
	}
	sessionStorage.setItem('lang', lang);
	const isZh = lang === 'zh_CN';
	setContext('STDF_lang', isZh ? zh_CN : en_US);

	onMount(() => {
		if (isComponentMode) {
			// 英文模式去掉 mode 后面的 _en 作为 nav
			// English mode removes _en after mode as nav
			const nav = englishMode ? mode.slice(0, -3) : mode;
			goto(`/${nav}/${englishMode ? 'en_US' : 'zh_CN'}`);
		}
	});

	let showTheme = $state(false);
	// 切换主题
	// switch theme
	const switchThemeFunc = () => {
		showTheme = !showTheme;
	};
</script>

<div class="sticky top-0 z-[100]">
	<NavBar
		title={$page.url.pathname === '/'
			? isZh
				? 'STDF 示例'
				: 'STDF Demo'
			: menuListArr.filter((item) => item.nav === $page.url.pathname.split('/')[1])[0][isZh ? 'title_zh' : 'title_en'] +
				(isZh ? '示例' : ' Demo')}
		left={showLeft ? 'back' : null}
		injClass="bg-white/60 dark:bg-black/60 backdrop-blur-sm"
		onclickLeft={() => window.history.back()}
	>
		{#snippet rightChild()}
			<div class="flex text-center">
				{#if isIframe === '0'}
					<div class="h-12 w-10">
						<a href="https://github.com/any-tdf/stdf" target="_blank" rel="noreferrer">
							<Icon name="ri-github-fill" />
						</a>
					</div>
					<div class="h-12 w-10">
						<a
							href={`https://stdf.design${$page.url.pathname === '/' ? '' : `/components?nav=${$page.url.pathname.split('/')[1]}&tab=0`}`}
							target="_blank"
							rel="noreferrer"
						>
							<Icon name="ri-compass-line" />
						</a>
					</div>
				{/if}
				<button class="h-12 w-10" onclick={toggleFun} aria-label={theme === 'dark' ? '切换到亮色模式' : '切换到暗色模式'}>
					<Icon name={theme === 'dark' ? 'ri-moon-fill' : 'ri-sun-line'} theme />
				</button>
				<button class="h-12 w-10" onclick={switchThemeFunc} aria-label="切换主题">
					<Icon name="ri-palette-line" theme />
				</button>
			</div>
		{/snippet}
	</NavBar>
</div>
{@render children?.()}
<div
	class="fixed z-[1000] {showTheme
		? 'right-0'
		: '-right-80'} top-12 rounded-xl bg-white px-4 shadow-sm transition-all duration-500 dark:bg-black"
>
	<ThemeSwitch />
</div>
