<script lang="ts">
	let { currentNav = $bindable(''), showNum = true, menuList = [], onclickMenu } = $props();
	import type { MenuListChild } from '../../data/menuList.js';

	const setClick = (menu: MenuListChild) => {
		currentNav = menu.nav;
		onclickMenu(menu);
	};
	const isZh = localStorage.getItem('lang') === 'zh_CN';
</script>

<div class="flex flex-col px-2 py-4">
	<span class="pb-3 text-xs text-gray-500">
		{isZh ? '最近更新：' : 'Last update:'}
		<br />
		{isZh ? import.meta.env.VITE_BUILD_TIME_ZH : import.meta.env.VITE_BUILD_TIME_EN}
	</span>
	{#each menuList as menu}
		<div class="text-xs">
			{isZh ? menu.class : menu.class_en}{showNum ? `（${menu.childs.length}）` : ''}
		</div>
		<div class="my-2 ml-1 flex flex-col gap-3 border-l-2 border-black/10 pr-0 dark:border-white/20">
			{#each menu.childs as child}
				<button
					onclick={(e: MouseEvent) => {
						e.preventDefault();
						// e.self();
						setClick(child);
					}}
					class="box-content -translate-x-0.5 cursor-pointer border-l-2 py-0.5 pl-2 text-left text-sm transition-all hover:font-bold {child.nav ===
					currentNav
						? 'border-primary text-primary dark:border-dark dark:text-dark font-bold'
						: 'border-transparent'}"
				>
					{isZh ? child.title : child.title_en}
				</button>
			{/each}
		</div>
	{/each}
</div>
