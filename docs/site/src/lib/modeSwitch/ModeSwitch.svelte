<script lang="ts">
	let { useViewTransition = true } = $props();
	import darkMode from './darkMode';
	import { themeStore, sysThemeStore, currentThemeStore } from '../../store';
	let isClick = $state(false);
	//手动切换主题
	const toggleFun = (e: MouseEvent) => {
		// 阻止冒泡
		e.stopPropagation();
		isClick = true;
		setTimeout(() => {
			isClick = false;
		}, 150);
		if ($themeStore === 'light') {
			// 切换到 dark
			themeStore.set('dark');
			currentThemeStore.set('dark');
			localStorage.setItem('theme', 'dark');
			darkMode(true, e, useViewTransition);
		} else if ($themeStore === 'dark') {
			// 切换到 auto
			themeStore.set('auto');
			localStorage.setItem('theme', 'auto');
			if ($sysThemeStore === 'dark') {
				// 系统是暗模式
				darkMode(true, e, useViewTransition);
				currentThemeStore.set('dark');
			} else {
				darkMode(false, e, useViewTransition);
				currentThemeStore.set('light');
			}
		} else {
			// 切换到 light
			themeStore.set('light');
			currentThemeStore.set('light');
			localStorage.setItem('theme', 'light');
			darkMode(false, e, useViewTransition);
		}
	};
	//auto 时，监听系统主题
	const mql: MediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');
	mql.addEventListener('change', (e: MediaQueryListEvent) => {
		if ($themeStore === 'auto') {
			if (e.matches) {
				// 系统是暗模式
				darkMode(true, e as unknown as MouseEvent);
				sysThemeStore.set('dark');
				currentThemeStore.set('dark');
			} else {
				darkMode(false, e as unknown as MouseEvent);
				sysThemeStore.set('light');
				currentThemeStore.set('light');
			}
		}
	});
	const isZh = localStorage.getItem('lang') === 'zh_CN';
</script>

<button
	class="mx-auto flex cursor-pointer justify-between rounded-sm bg-black/5 p-0.5 text-center dark:bg-white/10"
	aria-label={isZh
		? `${$themeStore === 'light' ? '亮模式' : $themeStore === 'dark' ? '暗模式' : '跟随系统'}`
		: `${$themeStore === 'light' ? 'Light' : $themeStore === 'dark' ? 'Dark' : 'System'}`}
	onclick={toggleFun}
>
	<div
		class:scale-75={isClick}
		class="min-h-full px-1 transition-all duration-150 rounded-sm{$themeStore === 'light' ? ' shadow-xs bg-white/80' : ''}"
		style="color:{$sysThemeStore === 'dark'
			? $themeStore === 'light'
				? '#ff3f2e'
				: '#646464'
			: $themeStore === 'light'
				? '#ff3f2e'
				: $themeStore === 'dark'
					? '#646464'
					: '#cecece'}"
	>
		<svg width="20" height="20" viewBox="0 0 20 24" fill="none" style="display: inline;" xmlns="http://www.w3.org/2000/svg">
			<path
				fill="currentColor"
				d="M9.99996 3.15217C10.5252 3.15217 10.951 2.72636 10.951 2.20109C10.951 1.67582 10.5252 1.25 9.99996 1.25C9.47469 1.25 9.04887 1.67582 9.04887 2.20109C9.04887 2.72636 9.47469 3.15217 9.99996 3.15217Z"
			/>
			<path
				fill="currentColor"
				d="M9.99992 4.29348C6.84829 4.29348 4.2934 6.84838 4.2934 10C4.2934 13.1516 6.84829 15.7065 9.99992 15.7065C13.1515 15.7065 15.7064 13.1516 15.7064 10C15.7064 6.84838 13.1515 4.29348 9.99992 4.29348Z"
			/>
			<path
				fill="currentColor"
				d="M16.4673 4.4837C16.4673 5.00896 16.0415 5.43478 15.5162 5.43478C14.991 5.43478 14.5652 5.00896 14.5652 4.4837C14.5652 3.95843 14.991 3.53261 15.5162 3.53261C16.0415 3.53261 16.4673 3.95843 16.4673 4.4837Z"
			/>
			<path
				fill="currentColor"
				d="M17.7989 10.9511C18.3241 10.9511 18.75 10.5253 18.75 10C18.75 9.47474 18.3241 9.04891 17.7989 9.04891C17.2736 9.04891 16.8478 9.47474 16.8478 10C16.8478 10.5253 17.2736 10.9511 17.7989 10.9511Z"
			/>
			<path
				fill="currentColor"
				d="M16.4673 15.5163C16.4673 16.0416 16.0415 16.4674 15.5162 16.4674C14.991 16.4674 14.5652 16.0416 14.5652 15.5163C14.5652 14.991 14.991 14.5652 15.5162 14.5652C16.0415 14.5652 16.4673 14.991 16.4673 15.5163Z"
			/>
			<path
				fill="currentColor"
				d="M9.99996 18.75C10.5252 18.75 10.951 18.3242 10.951 17.7989C10.951 17.2736 10.5252 16.8478 9.99996 16.8478C9.47469 16.8478 9.04887 17.2736 9.04887 17.7989C9.04887 18.3242 9.47469 18.75 9.99996 18.75Z"
			/>
			<path
				fill="currentColor"
				d="M5.43469 15.5163C5.43469 16.0416 5.00887 16.4674 4.4836 16.4674C3.95833 16.4674 3.53252 16.0416 3.53252 15.5163C3.53252 14.991 3.95833 14.5652 4.4836 14.5652C5.00887 14.5652 5.43469 14.991 5.43469 15.5163Z"
			/>
			<path
				fill="currentColor"
				d="M2.20096 10.9511C2.72623 10.9511 3.15205 10.5253 3.15205 10C3.15205 9.47474 2.72623 9.04891 2.20096 9.04891C1.67569 9.04891 1.24988 9.47474 1.24988 10C1.24988 10.5253 1.67569 10.9511 2.20096 10.9511Z"
			/>
			<path
				fill="currentColor"
				d="M5.43469 4.4837C5.43469 5.00896 5.00887 5.43478 4.4836 5.43478C3.95833 5.43478 3.53252 5.00896 3.53252 4.4837C3.53252 3.95843 3.95833 3.53261 4.4836 3.53261C5.00887 3.53261 5.43469 3.95843 5.43469 4.4837Z"
			/>
		</svg>
	</div>
	<div
		class:scale-75={isClick}
		class="min-h-full px-1 transition-all duration-150 rounded-sm{$themeStore === 'dark' ? ' shadow-xs bg-black/50' : ''}"
		style="color:{$sysThemeStore === 'light'
			? $themeStore === 'auto'
				? '#cecece'
				: $themeStore === 'dark'
					? '#fff'
					: '#cecece'
			: $themeStore === 'light'
				? '#cecece'
				: $themeStore === 'auto'
					? '#646464'
					: '#fff'}"
	>
		<svg width="20" height="20" style="display: inline;position:relative;top:-1px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
			<path
				fill="currentColor"
				d="M9.99993 3.12494C6.20294 3.12494 3.12488 6.203 3.12488 10C3.12488 13.797 6.20294 16.8751 9.99993 16.8751C13.7969 16.8751 16.875 13.797 16.875 10C16.875 9.52352 16.8264 9.0577 16.7337 8.6075C16.6752 8.32295 16.4282 8.11628 16.1378 8.10872C15.8474 8.10117 15.5901 8.29473 15.5168 8.57585C15.1411 10.0167 13.8302 11.0795 12.2727 11.0795C10.4212 11.0795 8.92039 9.57869 8.92039 7.72726C8.92039 6.16969 9.98319 4.85879 11.4241 4.48312C11.7052 4.40983 11.8988 4.15249 11.8912 3.86207C11.8836 3.57165 11.677 3.32473 11.3924 3.26616C10.9422 3.1735 10.4764 3.12494 9.99993 3.12494Z"
			/>
		</svg>
	</div>
	<div
		class="min-h-full px-1 transition-all duration-150 rounded-sm{$themeStore === 'auto' && $sysThemeStore === 'light'
			? ' bg-white/80'
			: ''}{$themeStore === 'auto' && $sysThemeStore === 'dark' ? ' bg-black/50' : ''}{$themeStore === 'auto' && $sysThemeStore === 'light'
			? ' shadow-xs'
			: ''}"
		style="color:{$themeStore === 'light'
			? '#cecece'
			: $themeStore === 'dark'
				? '#646464'
				: $themeStore === 'auto' && $sysThemeStore === 'light'
					? '#ff3f2e'
					: '#fff'};background-size: 30%;"
	>
		<svg xmlns="http://www.w3.org/2000/svg" style="display: inline;" viewBox="0 0 24 28" width="20" height="20">
			<path
				fill="currentColor"
				d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-2V6a6 6 0 1 1 0 12z"
			/>
		</svg>
	</div>
</button>
