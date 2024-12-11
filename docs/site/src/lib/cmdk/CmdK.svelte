<script lang="ts">
	import { onMount } from 'svelte';
	import { fly, fade } from 'svelte/transition';
	import { menuList, type MenuList, type MenuListChild } from '../../data/menuList';
	import { page } from '$app/stores';

	import { isCmdKStore } from '../../store';
	import { goto } from '$app/navigation';

	let menuChildList: MenuListChild[] = $state([]); //展开的菜单列表
	let cmdKValue = $state(''); //cmd+k 搜索框的值
	let currentIndex = $state(0); //当前选中的索引
	let currentTab: number = $state(0); //当前选中的 tab
	let cmdFocus = $state(false); //cmd+k 搜索框是否获取焦点
	let cmdKInput: HTMLInputElement | null = $state(null); //cmd+k 搜索框的 dom
	let latelyList: MenuListChild[] = $state([]); //最近使用的列表
	let isDemoShake = $state(false); //是否显示 demo 抖动动画
	let isGuideShake = $state(false); //是否显示 guide 抖动动画

	const isZh = localStorage.getItem('lang') === 'zh_CN';

	const params = new URLSearchParams('?');

	let cmdKList = $derived(
		cmdKValue === '' ? latelyList : menuChildList.filter((item: any) => item.alias.indexOf(cmdKValue.toLowerCase()) > -1)
	); //cmd+k 搜索框的列表
	let currentMenu = $derived(cmdKList[currentIndex]); //当前选中的菜单
	//cmd+k 搜索框的事件
	const cmdKFun = (e: KeyboardEvent) => {
		// 判断是 Windows 还是 Mac，cmd+k 在 Windows 下是 ctrl+k，监听 e.ctrlKey，Mac 监听 metaKey
		const isMac = /macintosh|mac os x/i.test(navigator.userAgent);
		const isWindows = /windows|win32/i.test(navigator.userAgent);

		//按下 cmd+k 触发事件
		if (e.key === 'k' && ((isMac && e.metaKey) || (isWindows && e.ctrlKey))) {
			const latelyListStr = localStorage.getItem('latelyList');
			latelyList = latelyListStr ? JSON.parse(latelyListStr) : [];
			if ($isCmdKStore) {
				isCmdKStore.set(false);
				cmdFocus = false;
			} else {
				isCmdKStore.set(true);
				cmdFocus = true;
				cmdKValue = '';
				currentIndex = 0;
				currentTab = 0;
				setTimeout(() => {
					cmdKInput?.focus();
				}, 0);
			}
			e.preventDefault();
		}
		//按下 esc 触发事件
		if ($isCmdKStore && e.key === 'Escape') {
			// 阻止默认事件
			e.preventDefault();
			//如果搜索框没有获取焦点，按下 esc 获取焦点并选定搜索框的值
			if (!cmdFocus) {
				cmdFocus = true;
				setTimeout(() => {
					cmdKInput?.focus();
					cmdKInput?.select();
				}, 0);
			} else {
				isCmdKStore.set(false);
				cmdFocus = false;
			}
		}

		//显示 cmd+k 搜索框时，按下上下键触发事件
		if ($isCmdKStore && (e.key === 'ArrowUp' || e.key === 'ArrowDown')) {
			//阻止默认事件，防止下层滚动
			e.preventDefault();
			cmdFocus = false;
			cmdKInput?.blur();
			if (e.key === 'ArrowUp') {
				if (currentIndex === 0 && currentTab === 0) {
					isDemoShake = true;
					setTimeout(() => {
						isDemoShake = false;
					}, 820);
					return;
				}
				if (currentTab === 0) {
					currentIndex = currentIndex === 0 ? cmdKList.length - 1 : currentIndex - 1;
					currentTab = 2;
				} else {
					currentTab--;
				}
			}
			if (e.key === 'ArrowDown') {
				if (currentIndex === cmdKList.length - 1 && currentTab === 2) {
					isGuideShake = true;
					setTimeout(() => {
						isGuideShake = false;
					}, 820);
					return;
				}
				if (currentTab === 2) {
					currentIndex = currentIndex === cmdKList.length - 1 ? 0 : currentIndex + 1;
					currentTab = 0;
				} else {
					currentTab++;
				}
			}
		}
		//显示 cmd+k 搜索框时，按下回车键触发事件
		if ($isCmdKStore && e.key === 'Enter') {
			//将当前选中的菜单添加到最近使用的列表中，并存储到 localStorage 中，最多存储 3 条
			if (latelyList.length > 0 && latelyList[0]?.nav) {
				let index = latelyList.findIndex((item) => item.alias === currentMenu.alias);
				if (index > -1) {
					latelyList.splice(index, 1);
				}
				latelyList.unshift(currentMenu);
				if (latelyList.length > 3) {
					latelyList.pop();
				}
			} else {
				latelyList.push(currentMenu);
			}
			if (latelyList.length > 0 && latelyList[0]?.nav) {
				// 去重
				latelyList = Array.from(new Set(latelyList));
				localStorage.setItem('latelyList', JSON.stringify(latelyList));
			}

			isCmdKStore.set(false);
			cmdFocus = false;
			cmdKValue = '';
			params.set('nav', currentMenu.nav);
			params.set('tab', currentTab.toString());
			goto(`/components?nav=${currentMenu.nav}&tab=${currentTab}`);
			if ($page.url.pathname.includes('/components')) {
				setTimeout(() => {
					window.location.reload();
				}, 0);
			}
		}
	};
	//点击搜索框的事件
	const clickCmdKFun = (item: MenuListChild, index: number) => {
		//将当前选中的菜单添加到最近使用的列表中，并存储到 localStorage 中，最多存储 5 条
		if (latelyList.length === 0) {
			latelyList.push(item);
		} else {
			let index = latelyList.findIndex((item) => item.alias === item.alias);
			if (index > -1) {
				latelyList.splice(index, 1);
			}
			latelyList.unshift(item);
			if (latelyList.length > 3) {
				latelyList.pop();
			}
		}
		localStorage.setItem('latelyList', JSON.stringify(latelyList));

		isCmdKStore.set(false);
		cmdFocus = false;
		cmdKValue = '';
		params.set('nav', item.nav);
		params.set('tab', index.toString());
		if ($page.url.pathname === '/components') {
			setTimeout(() => {
				window.location.reload();
			}, 0);
		}
	};
	//关闭 cmd+k 搜索框
	const closeCmdKFun = () => {
		isCmdKStore.set(false);
		cmdFocus = false;
	};
	$effect(() => {
		if ($isCmdKStore) {
			const latelyListStr = localStorage.getItem('latelyList');
			console.log(8978, latelyListStr);

			latelyList = latelyListStr ? JSON.parse(latelyListStr) : [];
			isCmdKStore.set(true);
			cmdFocus = true;
			currentIndex = 0;
			currentTab = 0;
			setTimeout(() => {
				cmdKInput?.focus();
			}, 0);
		}
	});
	//数组二级组成新数组
	const ArrChildFun = (arr: MenuList[]) => {
		let newArr = [];
		for (let e = 0; e < arr.length; e++) {
			newArr.push(...arr[e].childs);
		}
		return newArr;
	};
	onMount(() => {
		menuChildList = ArrChildFun(menuList);
	});
</script>

<svelte:window onkeydown={cmdKFun} />
<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
{#if $isCmdKStore}
	<div
		transition:fade={{ duration: 50 }}
		class="fixed left-0 top-0 flex h-screen w-screen flex-col bg-black/20 pt-20 text-left backdrop-blur"
		style="z-index: 10000"
		onclick={closeCmdKFun}
	>
		<div
			in:fly={{ y: 100, duration: 300, delay: 50 }}
			class="mx-auto w-1/2 rounded-xl bg-white shadow-lg dark:bg-black"
			onclick={(e: Event) => e.stopPropagation()}
		>
			<div class="flex items-center border-b border-black/10 px-4 py-3 text-sm text-gray-500 dark:border-white/10">
				<div class="">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" style="fill: currentColor;">
						<path fill="none" d="M0 0h24v24H0z" />
						<path
							d="M11 2c4.968 0 9 4.032 9 9s-4.032 9-9 9-9-4.032-9-9 4.032-9 9-9zm0 16c3.867 0 7-3.133 7-7 0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7zm8.485.071l2.829 2.828-1.415 1.415-2.828-2.829 1.414-1.414z"
						/>
					</svg>
				</div>
				<div class="grow px-3 text-gray-800 dark:text-gray-200">
					<input
						bind:this={cmdKInput}
						bind:value={cmdKValue}
						class="focus:ring-b w-full caret-primary placeholder:text-black/20 focus:outline-none dark:bg-black dark:caret-dark dark:placeholder:text-white/10"
						type="text"
						placeholder={isZh ? '请输入组件关键字' : 'Please enter the component keyword'}
					/>
				</div>
				<div class="rounded border border-black/10 px-2 py-1 text-xs font-bold dark:border-white/10">ESC</div>
			</div>
			<div class="overflow-y-auto px-6 pb-6" style="max-height: {(document.documentElement.clientHeight * 3) / 4}px">
				{#if cmdKValue === ''}
					<div class="mt-2 text-xs text-black/50 dark:text-white/30">
						{#if latelyList.length === 0}
							{isZh ? `最近无搜索，请输入关键字搜索。` : `No recent searches, please enter a keyword to search.`}
						{:else}
							{isZh ? `最近搜索 ${latelyList.length} 条结果` : `Recent search ${latelyList.length} results`}
						{/if}
					</div>
				{/if}
				{#if cmdKValue !== ''}
					{#if cmdKList.length === 0}
						<div class="mt-2 text-xs text-black/50 dark:text-white/30">
							{isZh ? '没有搜索到结果' : 'No results found'}
						</div>
					{:else}
						<div class="mt-2 text-xs text-black/50 dark:text-white/30">
							{isZh
								? `搜索到包含 "${cmdKValue}" 的 ${cmdKList.length} 条结果`
								: `Found ${cmdKList.length} results containing "${cmdKValue}"`}
						</div>
					{/if}
				{/if}
				{#each cmdKList as item, index}
					<div>
						<div class="mt-4 py-2 text-lg font-bold">{isZh ? item?.title : item?.title_en}</div>
						<div class="border-l border-black/10 pl-3 dark:border-white/10">
							<button
								class="my-2 flex w-full cursor-pointer justify-between rounded border py-2 pl-4 {index === currentIndex && currentTab === 0
									? 'border-primary bg-primary text-white dark:border-dark dark:bg-dark dark:text-black'
									: 'text-balck border-primary-50 dark:border-dark-950 dark:text-white'}"
								class:animate-shake={isDemoShake && index === 0}
								onclick={() => clickCmdKFun(item, 0)}
							>
								<div>{isZh ? '示例' : 'Demo'}</div>
								<div>
									<svg
										class={index === currentIndex && currentTab === 0 ? 'fill-white dark:fill-black' : 'fill-gray-500'}
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										width="24"
										height="24"
									>
										<path fill="none" d="M0 0h24v24H0z" />
										<path d="M12.172 12L9.343 9.172l1.414-1.415L15 12l-4.243 4.243-1.414-1.415z" />
									</svg>
								</div>
							</button>
							<button
								class="my-2 flex w-full cursor-pointer justify-between rounded border py-2 pl-4 {index === currentIndex && currentTab === 1
									? 'border-primary bg-primary text-white dark:border-dark dark:bg-dark dark:text-black'
									: 'text-balck border-primary-50 dark:border-dark-950 dark:text-white'}"
								onclick={() => clickCmdKFun(item, 1)}
							>
								<div>API</div>
								<div>
									<svg
										class={index === currentIndex && currentTab === 1 ? 'fill-white dark:fill-black' : 'fill-gray-500'}
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										width="24"
										height="24"
									>
										<path fill="none" d="M0 0h24v24H0z" />
										<path d="M12.172 12L9.343 9.172l1.414-1.415L15 12l-4.243 4.243-1.414-1.415z" />
									</svg>
								</div>
							</button>
							<button
								class="my-2 flex w-full cursor-pointer justify-between rounded border py-2 pl-4 {index === currentIndex && currentTab === 2
									? 'border-primary bg-primary text-white dark:border-dark dark:bg-dark dark:text-black'
									: 'text-balck border-primary-50 dark:border-dark-950 dark:text-white'}"
								class:animate-shake={isGuideShake && index === cmdKList.length - 1}
								onclick={() => clickCmdKFun(item, 2)}
							>
								<div>{isZh ? '指南' : 'Guide'}</div>
								<div>
									<svg
										class={index === currentIndex && currentTab === 2 ? 'fill-white dark:fill-black' : 'fill-gray-500'}
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										width="24"
										height="24"
									>
										<path fill="none" d="M0 0h24v24H0z" />
										<path d="M12.172 12L9.343 9.172l1.414-1.415L15 12l-4.243 4.243-1.414-1.415z" />
									</svg>
								</div>
							</button>
						</div>
					</div>
				{/each}
			</div>
			<div class="flex gap-4 border-t border-black/10 px-4 py-2 text-xs opacity-60 dark:border-white/10">
				<div class="flex gap-1">
					<div class="h-4 w-4">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="fill-black dark:fill-white">
							<path
								d="M19.0003 13.9999L19.0004 5.00003L17.0004 5L17.0003 11.9999L6.82845 12L10.7782 8.05027L9.36396 6.63606L3 13L9.36396 19.364L10.7782 17.9498L6.8284 14L19.0003 13.9999Z"
							/>
						</svg>
					</div>
					{isZh ? '选择' : 'Select'}
				</div>
				<div class="flex gap-1">
					<div class="h-4 w-4">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="fill-black dark:fill-white"
							><path
								d="M12.9999 16.1716L18.3638 10.8076L19.778 12.2218L11.9999 20L4.22168 12.2218L5.63589 10.8076L10.9999 16.1716V4H12.9999V16.1716Z"
							/></svg
						>
					</div>
					{isZh ? '向下' : 'Down'}
				</div>
				<div class="flex gap-1">
					<div class="h-4 w-4">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="fill-black dark:fill-white"
							><path
								d="M12.9999 7.82843V20H10.9999V7.82843L5.63589 13.1924L4.22168 11.7782L11.9999 4L19.778 11.7782L18.3638 13.1924L12.9999 7.82843Z"
							/></svg
						>
					</div>
					{isZh ? '向上' : 'Up'}
				</div>
				<div class="flex gap-1">
					<div class="h-4">ESC</div>
					{isZh ? '关闭' : 'Close'}
				</div>
			</div>
		</div>
	</div>
{/if}
