<script lang="ts">
	import { switchTheme } from '$lib/theme/index.js';
	import themes from '../../data/themes/index.js';

	const isZh = sessionStorage.getItem('lang') === 'zh_CN';

	let currentColor = $state('STDF');

	const selectColorFunc = (e: MouseEvent, item: (typeof themes)[number]) => {
		// 阻止冒泡
		// Prevent bubbling
		e.stopPropagation();
		currentColor = item.name;
		switchTheme(item.theme);
	};
</script>

<div class="my-4 flex flex-col flex-wrap gap-2">
	{#each themes as item (item.name)}
		<button
			class="flex items-center justify-between gap-2 border p-2 {currentColor === item.name
				? 'border-primary dark:border-dark'
				: 'border-gray-100 dark:border-gray-700'} cursor-pointer rounded-md"
			onclick={(e) => selectColorFunc(e, item)}
		>
			<div class="h-5 w-5 {currentColor === item.name ? 'fill-primary dark:fill-dark' : 'fill-gray-300 dark:fill-gray-700'}">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
					<path
						d="M12 2C17.5222 2 22 5.97778 22 10.8889C22 13.9556 19.5111 16.4444 16.4444 16.4444H14.4778C13.5556 16.4444 12.8111 17.1889 12.8111 18.1111C12.8111 18.5333 12.9778 18.9222 13.2333 19.2111C13.5 19.5111 13.6667 19.9 13.6667 20.3333C13.6667 21.2556 12.9 22 12 22C6.47778 22 2 17.5222 2 12C2 6.47778 6.47778 2 12 2ZM7.5 12C8.32843 12 9 11.3284 9 10.5C9 9.67157 8.32843 9 7.5 9C6.67157 9 6 9.67157 6 10.5C6 11.3284 6.67157 12 7.5 12ZM16.5 12C17.3284 12 18 11.3284 18 10.5C18 9.67157 17.3284 9 16.5 9C15.6716 9 15 9.67157 15 10.5C15 11.3284 15.6716 12 16.5 12ZM12 9C12.8284 9 13.5 8.32843 13.5 7.5C13.5 6.67157 12.8284 6 12 6C11.1716 6 10.5 6.67157 10.5 7.5C10.5 8.32843 11.1716 9 12 9Z"
					>
					</path>
				</svg>
			</div>
			<div class="whitespace-nowrap">{isZh ? item.name_CN : item.name}</div>
			<div class="flex justify-between gap-2">
				<!-- theme  -->
				<div class="rounded-xs flex overflow-hidden">
					<div class="bg-primary w-6" style="background-color: {item.theme.color.primary.default};"></div>
					<div class="bg-dark w-6" style="background-color: {item.theme.color.dark.default};"></div>
				</div>
				<div class="flex flex-col justify-between gap-1">
					<!-- Functional -->
					<div class="flex gap-0.5">
						<div class="rounded-xs h-3 w-3" style="background-color: {item.theme.color.functional.success};"></div>
						<div class="rounded-xs h-3 w-3" style="background-color: {item.theme.color.functional.warning};"></div>
						<div class="rounded-xs h-3 w-3" style="background-color: {item.theme.color.functional.error};"></div>
						<div class="rounded-xs h-3 w-3" style="background-color: {item.theme.color.functional.info};"></div>
					</div>
					<!-- Extended -->
					<div class="flex gap-0.5">
						{#each item.theme.color?.extend ?? [] as child (child.alias)}
							<div class="rounded-xs h-3 w-3" style="background-color: {child.color};"></div>
						{/each}
					</div>
				</div>
			</div>
		</button>
	{/each}
</div>
