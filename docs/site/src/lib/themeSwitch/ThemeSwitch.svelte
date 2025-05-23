<script lang="ts">
	import { switchTheme, type ThemeProps } from 'stdf/theme';
	import themes from '../../data/themes/index.js';
	import { currentColorStore } from '../../store.js';

	type ThemeItem = { name: string; name_CN: string; theme: ThemeProps };

	// 横排还是竖排
	export let vertical = false;

	const isZh = localStorage.getItem('lang') === 'zh_CN';

	const selectColorFunc = (e: MouseEvent, item: ThemeItem) => {
		// 阻止冒泡
		e.stopPropagation();
		currentColorStore.set(item.name);
		localStorage.setItem('theme_color', item.name);
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
	};
</script>

<div class="flex {vertical ? 'flex-col gap-1' : 'flex-row gap-2'} my-2 flex-wrap">
	{#each themes as item}
		<button
			class="flex items-center justify-between gap-0.5 border px-0.5 py-1 {$currentColorStore === item.name
				? 'border-primary dark:border-dark'
				: 'border-gray-100 dark:border-gray-700'} cursor-pointer rounded-sm"
			on:click={(e) => selectColorFunc(e, item)}
		>
			<div class="size-3 {$currentColorStore === item.name ? 'fill-primary dark:fill-dark' : 'fill-gray-300 dark:fill-gray-700'}">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
					<path
						d="M12 2C17.5222 2 22 5.97778 22 10.8889C22 13.9556 19.5111 16.4444 16.4444 16.4444H14.4778C13.5556 16.4444 12.8111 17.1889 12.8111 18.1111C12.8111 18.5333 12.9778 18.9222 13.2333 19.2111C13.5 19.5111 13.6667 19.9 13.6667 20.3333C13.6667 21.2556 12.9 22 12 22C6.47778 22 2 17.5222 2 12C2 6.47778 6.47778 2 12 2ZM7.5 12C8.32843 12 9 11.3284 9 10.5C9 9.67157 8.32843 9 7.5 9C6.67157 9 6 9.67157 6 10.5C6 11.3284 6.67157 12 7.5 12ZM16.5 12C17.3284 12 18 11.3284 18 10.5C18 9.67157 17.3284 9 16.5 9C15.6716 9 15 9.67157 15 10.5C15 11.3284 15.6716 12 16.5 12ZM12 9C12.8284 9 13.5 8.32843 13.5 7.5C13.5 6.67157 12.8284 6 12 6C11.1716 6 10.5 6.67157 10.5 7.5C10.5 8.32843 11.1716 9 12 9Z"
					>
					</path>
				</svg>
			</div>
			<div class="flex-1 whitespace-nowrap text-left text-xs font-normal">{isZh ? item.name_CN : item.name}</div>
			<div class="flex justify-between gap-1">
				<!-- theme  -->
				<div class="rounded-xs flex overflow-hidden">
					<div class="bg-primary w-3" style="background-color: {item.theme.color.primary.default};"></div>
					<div class="bg-dark w-3" style="background-color: {item.theme.color.dark.default};"></div>
				</div>
				<div class="flex flex-col justify-between gap-px">
					<!-- Functional -->
					<div class="flex gap-px">
						<div class="size-1.5 rounded" style="background-color: {item.theme.color.functional.success};"></div>
						<div class="size-1.5 rounded" style="background-color: {item.theme.color.functional.warning};"></div>
						<div class="size-1.5 rounded" style="background-color: {item.theme.color.functional.error};"></div>
						<div class="size-1.5 rounded" style="background-color: {item.theme.color.functional.info};"></div>
					</div>
					<!-- Extended -->
					<div class="flex justify-between gap-px">
						{#each item.theme.color.extend as child}
							<div class="size-1.5 rounded" style="background-color: {child.color};"></div>
						{/each}
					</div>
				</div>
			</div>
		</button>
	{/each}
	{#if vertical}
		<a
			href="/guide/generator"
			target="_blank"
			class="text-primary hover:border-primary dark:text-dark dark:hover:border-dark group mt-2 flex items-center justify-center gap-1 rounded-sm border border-gray-100 py-1 text-xs transition-all duration-300 dark:border-gray-700"
		>
			<svg class="size-4 transition-all duration-300 group-hover:scale-95" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
				<path
					class="fill-primary dark:fill-dark"
					d="M15.1986 9.94435C14.7649 9.53358 14.4859 8.98601 14.4085 8.39371L14.0056 5.31126L11.275 6.79711C10.7503 7.08262 10.1433 7.17876 9.55608 7.06936L6.49998 6.50003L7.06931 9.55612C7.17871 10.1434 7.08257 10.7503 6.79707 11.275L5.31121 14.0056L8.39367 14.4085C8.98596 14.4859 9.53353 14.7649 9.94431 15.1986L12.0821 17.4555L13.4178 14.6485C13.6745 14.1091 14.109 13.6745 14.6484 13.4179L17.4555 12.0821L15.1986 9.94435ZM15.2238 15.5078L13.0111 20.1579C12.8687 20.4572 12.5107 20.5843 12.2115 20.4419C12.1448 20.4102 12.0845 20.3664 12.0337 20.3127L8.49229 16.574C8.39749 16.4739 8.27113 16.4095 8.13445 16.3917L3.02816 15.7242C2.69958 15.6812 2.46804 15.3801 2.51099 15.0515C2.52056 14.9782 2.54359 14.9074 2.5789 14.8425L5.04031 10.3191C5.1062 10.198 5.12839 10.0579 5.10314 9.92241L4.16 4.85979C4.09931 4.53402 4.3142 4.22074 4.63997 4.16005C4.7126 4.14652 4.78711 4.14652 4.85974 4.16005L9.92237 5.10319C10.0579 5.12843 10.198 5.10625 10.319 5.04036L14.8424 2.57895C15.1335 2.42056 15.4979 2.52812 15.6562 2.81919C15.6916 2.88409 15.7146 2.95495 15.7241 3.02821L16.3916 8.13449C16.4095 8.27118 16.4739 8.39754 16.5739 8.49233L20.3127 12.0337C20.5533 12.2616 20.5636 12.6414 20.3357 12.8819C20.2849 12.9356 20.2246 12.9794 20.1579 13.0111L15.5078 15.2238C15.3833 15.2831 15.283 15.3833 15.2238 15.5078ZM16.0206 17.4349L17.4348 16.0207L21.6775 20.2633L20.2633 21.6775L16.0206 17.4349Z"
				>
				</path>
			</svg>
			{isZh ? '创建新主题' : 'Create new theme'}
		</a>
	{/if}
</div>
