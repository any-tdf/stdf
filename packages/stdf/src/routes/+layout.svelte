<script lang="ts">
	import { setContext } from 'svelte';
	import { page } from '$app/state';
	import { NavBar, Icon, FeedbackContainer } from '$lib/index.js';
	import { zh_CN, en_US } from '$lib/lang/index.js';
	import '../app.css';
	import { menuList } from '../data/menuList.js';
	import type { MenuListChild } from '../data/menuList.js';
	import ThemeSwitch from './components/ThemeSwitch.svelte';
	import { switchTheme, switchMode } from '$lib/theme/index.js';

	let { children } = $props();
	let currentColor = $state('STDF');

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
	const urlParams = new URLSearchParams(page.url.search);
	const channel = urlParams.get('channel');
	// 判断是否是 iframe
	// judge whether it is iframe
	const isIframe = channel === 'iframe' || (typeof window !== 'undefined' && window.self !== window.top) ? '1' : '0';
	// 设置 iframe
	// setting iframe
	setContext('iframe', isIframe);
	const storedTheme = localStorage.getItem('theme_color') || 'STDF';

	let lang = 'zh_CN';

	if (isIframe === '1') {
		// 获取 url 中的 theme 和 mode 和 lang
		// get theme, mode and lang from url
		const urlTheme = urlParams.get('theme');
		const themeToUse = urlTheme || storedTheme;
		const urlMode = urlParams.get('darkMode');
		currentColor = themeToUse;
		switchTheme(themeToUse);
		if (urlTheme) {
			localStorage.setItem('theme_color', urlTheme);
		}
		if (urlMode === 'dark') {
			switchMode('dark');
			localStorage.setItem('theme', 'dark');
		} else if (urlMode === 'light') {
			switchMode('primary');
			localStorage.setItem('theme', 'primary');
		}
		const urlLang = urlParams.get('lang');
		if (urlLang) {
			lang = urlLang;
		}
	} else {
		currentColor = storedTheme;
		switchTheme(storedTheme);
	}

	// 环境变量
	// environment variables
	const mode = import.meta.env.MODE;

	// mode 是否是指定组件模式
	// whether mode is specified component mode
	const isComponentMode = mode != 'production' && mode != 'development' && mode != 'english';

	let showLeft = $derived(!(isIframe === '1' || page.url.pathname === '/' || isComponentMode));

	let theme = $state(localStorage.getItem('theme') === 'dark' ? 'dark' : 'primary');

	// 设置亮暗模式
	// Set primary and dark mode
	if (localStorage.getItem('theme') === 'dark') {
		switchMode('dark');
	} else {
		switchMode('primary');
	}
	//手动切换亮暗模式
	// manually switch primary and dark mode
	const toggleFun = () => {
		if (theme === 'dark') {
			// 切换到 primary
			// switch to primary
			theme = 'primary';
			localStorage.setItem('theme', 'primary');
			switchMode('primary');
		} else {
			// 切换到 dark
			// switch to dark
			theme = 'dark';
			localStorage.setItem('theme', 'dark');
			switchMode('dark');
		}
	};

	// 判断 mode 是否是 English 模式
	// Determine whether mode is English mode
	const englishMode = mode.slice(-3) === '_en' || mode === 'english';

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
			const urlLang = page.url.pathname.split('/')[1];
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

	// 组件模式下重定向到对应路由
	// Redirect to corresponding route in component mode
	if (isComponentMode && typeof window !== 'undefined') {
		const nav = englishMode ? mode.slice(0, -3) : mode;
		const targetPath = `/${nav}/${englishMode ? 'en_US' : 'zh_CN'}`;
		if (window.location.pathname !== targetPath) {
			window.location.replace(targetPath);
		}
	}

	let showTheme = $state(false);
	// 切换主题
	// switch theme
	const switchThemeFunc = () => {
		showTheme = !showTheme;
	};
</script>

<div class="z-100 sticky top-0">
	<NavBar
		title={page.url.pathname === '/'
			? isZh
				? 'STDF 示例'
				: 'STDF Demo'
			: menuListArr.filter((item) => item.nav === page.url.pathname.split('/')[1])[0][isZh ? 'title_zh' : 'title_en'] +
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
							href={`https://stdf.design${page.url.pathname === '/' ? '' : `/components?nav=${page.url.pathname.split('/')[1]}&tab=0`}`}
							target="_blank"
							rel="noreferrer"
						>
							<Icon name="ri-compass-line" />
						</a>
					</div>
				{/if}
				<button class="h-12 w-10" onclick={toggleFun} aria-label={theme === 'dark' ? '切换到亮色模式' : '切换到暗色模式'}>
					<Icon name={theme === 'dark' ? 'ri-moon-fill' : 'ri-sun-line'} state="theme" />
				</button>
				<button class="h-12 w-10" onclick={switchThemeFunc} aria-label="切换主题">
					<Icon name="ri-palette-line" state="theme" />
				</button>
			</div>
		{/snippet}
	</NavBar>
</div>
{@render children?.()}
<div class="z-1000 pointer-events-none fixed inset-x-0 top-14 overflow-hidden pb-4 pl-2">
	<div
		class="pointer-events-auto mr-2 rounded-lg border border-black/10 bg-white p-2 shadow-md transition-transform duration-500 dark:border-white/10 dark:bg-black {showTheme
			? 'translate-x-0'
			: 'translate-x-[calc(100%+8px)]'}"
	>
		<ThemeSwitch {currentColor} />
	</div>
</div>

<!-- 全局反馈组件容器 -->
<!-- Global feedback component container -->
<FeedbackContainer />
