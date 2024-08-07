<script>
	// @ts-nocheck
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	export let currentNav = '';
	export let showNum = true;
	const setClick = menu => {
		currentNav = menu.nav;
		dispatch('MenuClick', menu);
	};
	export let menuList = [];
	const isZh = localStorage.getItem('lang') === 'zh_CN';
</script>

<div class="flex flex-col px-2 py-4">
	<span class="text-gray-500 text-xs pb-3">
		{isZh ? '最新：' + import.meta.env.VITE_BUILD_TIME_ZH : 'Latest: ' + import.meta.env.VITE_BUILD_TIME_EN}
	</span>
	{#each menuList as menu}
		<div class="text-xs">{isZh ? menu.class : menu.class_en}{showNum ? `（${menu.childs.length}）` : ''}</div>
		<div class="flex flex-col ml-1 pr-0 my-2">
			{#each menu.childs as child, i}
				<button
					on:click|preventDefault|self={() => setClick(child)}
					class={`cursor-pointer transition-all pl-2 py-2 text-left hover:font-bold border-l-2 text-sm box-content ${
						child.nav === currentNav ? 'border-primary dark:border-dark font-bold text-primary dark:text-dark' : ''
					}`}
				>
					{isZh ? child.title : child.title_en}
				</button>
			{/each}
		</div>
	{/each}
</div>
