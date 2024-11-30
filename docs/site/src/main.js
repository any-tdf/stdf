// @ts-ignore
import App from './App.svelte';
import './app.css';
import { delParamsUrl } from './utils/index';
import { switchTheme } from '../../packages/stdf/theme';
import themes from '../../demo/src/data/themes';

const currentTheme = localStorage.getItem('theme_color') || 'STDF';
// 设置默认主题色
themes.forEach(item => {
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
	localStorage.setItem('lang', urlParams.get('lang'));
	setTimeout(() => {
		// window.location.href = window.location.href.replace(/(\?|#)[^'"]*/, '');//去除参数
		// @ts-ignore
		window.history.pushState({}, 0, delParamsUrl(window.location.href, 'lang')); //刷新页面
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

// 根据亮暗模式动态切换 favicon
// const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
// handleDarkmode(darkModeMediaQuery);
// function handleDarkmode(e) {
//     var darkModeOn = e.matches;
//     var favicon = document.querySelector('link[rel="icon"]'); // 获取声明中含 rel="icon" 的元素，你可以根据需要添加更多
//     if (!favicon) {
//         return;
//     }
//     if (darkModeOn) {
//         favicon.href = '/favicon_black.ico'; //黑暗模式下的 favicon
//     } else {
//         favicon.href = '/favicon.ico'; //其它时候的 favicon
//     }
// }
// darkModeMediaQuery.addEventListener('change', handleDarkmode);

const app = new App({
	target: document.body,
});
