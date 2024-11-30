<script lang="ts">
	import { onMount } from 'svelte';
	import type { LoadingProps } from '../../types/index.js';
	import {
		Loading1_0,
		Loading1_1,
		Loading1_2,
		Loading1_3,
		Loading1_4,
		Loading1_5,
		Loading1_6,
		Loading1_7,
		Loading1_8,
		Loading1_9,
		Loading1_10,
		Loading1_11,
		Loading1_12,
		Loading1_13,
		Loading1_14,
		Loading1_15,
		Loading1_16,
		Loading1_17,
		Loading1_18,
		Loading1_19,
		Loading1_20,
		Loading1_21,
		Loading1_22,
		Loading1_23,
		Loading1_24,
		Loading1_25,
		Loading1_26,
		Loading1_27,
		Loading1_28,
		Loading1_29,
		Loading1_30,
		Loading1_31,
		Loading1_32,
		Loading1_33,
		Loading1_34,
		Loading1_35,
		Loading1_36,
		Loading1_37,
		Loading1_38,
		Loading1_39,
		Loading1_40,
		Loading1_41,
		Loading1_42,
		Loading1_43,
		Loading1_44,
		Loading1_45,
		Loading1_46,
		Loading1_47,
		Loading1_48,
		Loading1_49,
		Loading1_50,
		Loading1_51,
		Loading1_52,
		Loading1_53
	} from './loadings/oneColor/index.js';
	import { Loading2_0, Loading2_1, Loading2_2, Loading2_3, Loading2_4, Loading2_5 } from './loadings/twoColor/index.js';
	import { Loading4_0, Loading4_1, Loading4_2, Loading4_3 } from './loadings/fourColor/index.js';

	let {
		type = '1_0',
		height = '8',
		width = '8',
		theme = false,
		inverse = false,
		customColor = [],
		lazyAnimation = true,
		speed = $bindable(1)
	}: LoadingProps = $props();

	// loading 元素
	// loading element
	let loadingDom: HTMLDivElement | null = $state(null);

	// 容器高度样式
	// container height class
	const heightClass = {
		'2': 'h-2',
		'4': 'h-4',
		'6': 'h-6',
		'8': 'h-8',
		'12': 'h-12',
		'16': 'h-16',
		'20': 'h-20',
		'28': 'h-28',
		'36': 'h-36',
		'48': 'h-48',
		'56': 'h-56',
		'64': 'h-64',
		'72': 'h-72',
		'80': 'h-80',
		'96': 'h-96',
		full: 'h-full'
	};

	// 容器宽度样式
	// container width class
	const widthClass = {
		'2': 'w-2',
		'4': 'w-4',
		'6': 'w-6',
		'8': 'w-8',
		'12': 'w-12',
		'16': 'w-16',
		'20': 'w-20',
		'28': 'w-28',
		'36': 'w-36',
		'48': 'w-48',
		'56': 'w-56',
		'64': 'w-64',
		'72': 'w-72',
		'80': 'w-80',
		'96': 'w-96',
		full: 'w-full'
	};

	// 组合容器高度和宽度样式
	// combine container height and width class
	const sizeFunc = (height: string, width: string) => {
		return heightClass[height as keyof typeof heightClass] + ' ' + widthClass[width as keyof typeof widthClass];
	};

	// 递归获取 dom 的所有后代元素
	// recursively get all descendants of dom
	const getAllChildren = (dom: HTMLElement) => {
		let children: HTMLElement[] = [];
		if (dom?.children?.length) {
			for (let i = 0; i < dom.children.length; i++) {
				children.push(dom.children[i] as HTMLElement);
				children = children.concat(getAllChildren(dom.children[i] as HTMLElement));
			}
		}
		return children;
	};

	//判断 Loading 容器是否在可视区域内，如果不在，则设置所有后代元素的动画状态为 paused
	//determine whether the Loading container is in the visible area. If not, set the animation state of all descendants to paused
	const io = new IntersectionObserver((ele) => {
		ele.forEach((item) => {
			if (!loadingDom) return;
			const loadingChildren = getAllChildren(loadingDom);
			// isIntersecting 是一个 Boolean 值，判断目标元素当前是否可见
			// isIntersecting is a Boolean value that determines whether the target element is currently visible
			if (item.isIntersecting) {
				//loadingDom 所有后代元素的 animation-play-state 设置为 running
				//loadingDom all descendants of the element's animation-play-state set to running
				if (loadingChildren.length > 0) {
					loadingChildren.forEach((item: HTMLElement) => {
						item.style.animationPlayState = 'running';
					});
				}
			} else {
				//loadingDom 所有后代元素的 animation-play-state 设置为 paused
				//loadingDom all descendants of the element's animation-play-state set to paused
				if (loadingChildren.length > 0) {
					loadingChildren.forEach((item: HTMLElement) => {
						item.style.animationPlayState = 'paused';
					});
				}
			}
		});
	});
	onMount(() => {
		if (lazyAnimation && loadingDom) {
			io.observe(loadingDom);
		}
	});
</script>

<div bind:this={loadingDom}>
	<!--one-->
	{#if type === '1_0'}
		<Loading1_0 {theme} {inverse} size={sizeFunc(height, width)} {customColor} bind:speed />
	{:else if type === '1_1'}
		<Loading1_1 {theme} {inverse} size={sizeFunc(height, width)} {customColor} bind:speed />
	{:else if type === '1_2'}
		<Loading1_2 {theme} {inverse} size={sizeFunc(height, width)} {customColor} bind:speed />
	{:else if type === '1_3'}
		<Loading1_3 {theme} {inverse} size={sizeFunc(height, width)} {customColor} bind:speed />
	{:else if type === '1_4'}
		<Loading1_4 {theme} {inverse} size={sizeFunc(height, width)} {customColor} bind:speed />
	{:else if type === '1_5'}
		<Loading1_5 {theme} {inverse} size={sizeFunc(height, width)} {customColor} bind:speed />
	{:else if type === '1_6'}
		<Loading1_6 {theme} {inverse} size={sizeFunc(height, width)} {customColor} bind:speed />
	{:else if type === '1_7'}
		<Loading1_7 {theme} {inverse} size={sizeFunc(height, width)} {customColor} bind:speed />
	{:else if type === '1_8'}
		<Loading1_8 {theme} {inverse} size={sizeFunc(height, width)} {customColor} bind:speed />
	{:else if type === '1_9'}
		<Loading1_9 {theme} {inverse} size={sizeFunc(height, width)} {customColor} bind:speed />
	{:else if type === '1_10'}
		<Loading1_10 {theme} {inverse} size={sizeFunc(height, width)} {customColor} bind:speed />
	{:else if type === '1_11'}
		<Loading1_11 {theme} {inverse} size={sizeFunc(height, width)} {customColor} bind:speed />
	{:else if type === '1_12'}
		<Loading1_12 {theme} {inverse} size={sizeFunc(height, width)} {customColor} bind:speed />
	{:else if type === '1_13'}
		<Loading1_13 {theme} {inverse} size={sizeFunc(height, width)} {customColor} bind:speed />
	{:else if type === '1_14'}
		<Loading1_14 {theme} {inverse} size={sizeFunc(height, width)} {customColor} bind:speed />
	{:else if type === '1_15'}
		<Loading1_15 {theme} {inverse} size={sizeFunc(height, width)} {customColor} bind:speed />
	{:else if type === '1_16'}
		<Loading1_16 {theme} {inverse} size={sizeFunc(height, width)} {customColor} bind:speed />
	{:else if type === '1_17'}
		<Loading1_17 {theme} {inverse} size={sizeFunc(height, width)} {customColor} bind:speed />
	{:else if type === '1_18'}
		<Loading1_18 {theme} {inverse} size={sizeFunc(height, width)} {customColor} bind:speed />
	{:else if type === '1_19'}
		<Loading1_19 {theme} {inverse} size={sizeFunc(height, width)} {customColor} bind:speed />
	{:else if type === '1_20'}
		<Loading1_20 {theme} {inverse} size={sizeFunc(height, width)} {customColor} bind:speed />
	{:else if type === '1_21'}
		<Loading1_21 {theme} {inverse} size={sizeFunc(height, width)} {customColor} bind:speed />
	{:else if type === '1_22'}
		<Loading1_22 {theme} {inverse} size={sizeFunc(height, width)} {customColor} bind:speed />
	{:else if type === '1_23'}
		<Loading1_23 {theme} {inverse} size={sizeFunc(height, width)} {customColor} bind:speed />
	{:else if type === '1_24'}
		<Loading1_24 {theme} {inverse} size={sizeFunc(height, width)} {customColor} bind:speed />
	{:else if type === '1_25'}
		<Loading1_25 {theme} {inverse} size={sizeFunc(height, width)} {customColor} bind:speed />
	{:else if type === '1_26'}
		<Loading1_26 {theme} {inverse} size={sizeFunc(height, width)} {customColor} bind:speed />
	{:else if type === '1_27'}
		<Loading1_27 {theme} {inverse} size={sizeFunc(height, width)} {customColor} bind:speed />
	{:else if type === '1_28'}
		<Loading1_28 {theme} {inverse} size={sizeFunc(height, width)} {customColor} bind:speed />
	{:else if type === '1_29'}
		<Loading1_29 {theme} {inverse} size={sizeFunc(height, width)} {customColor} bind:speed />
	{:else if type === '1_30'}
		<Loading1_30 {theme} {inverse} size={sizeFunc(height, width)} {customColor} bind:speed />
	{:else if type === '1_31'}
		<Loading1_31 {theme} {inverse} size={sizeFunc(height, width)} {customColor} bind:speed />
	{:else if type === '1_32'}
		<Loading1_32 {theme} {inverse} size={sizeFunc(height, width)} {customColor} bind:speed />
	{:else if type === '1_33'}
		<Loading1_33 {theme} {inverse} size={sizeFunc(height, width)} {customColor} bind:speed />
	{:else if type === '1_34'}
		<Loading1_34 {theme} {inverse} size={sizeFunc(height, width)} {customColor} bind:speed />
	{:else if type === '1_35'}
		<Loading1_35 {theme} {inverse} size={sizeFunc(height, width)} {customColor} bind:speed />
	{:else if type === '1_36'}
		<Loading1_36 {theme} {inverse} size={sizeFunc(height, width)} {customColor} bind:speed />
	{:else if type === '1_37'}
		<Loading1_37 {theme} {inverse} size={sizeFunc(height, width)} {customColor} bind:speed />
	{:else if type === '1_38'}
		<Loading1_38 {theme} {inverse} size={sizeFunc(height, width)} {customColor} bind:speed />
	{:else if type === '1_39'}
		<Loading1_39 {theme} {inverse} size={sizeFunc(height, width)} {customColor} bind:speed />
	{:else if type === '1_40'}
		<Loading1_40 {theme} {inverse} size={sizeFunc(height, width)} {customColor} bind:speed />
	{:else if type === '1_41'}
		<Loading1_41 {theme} {inverse} size={sizeFunc(height, width)} {customColor} bind:speed />
	{:else if type === '1_42'}
		<Loading1_42 {theme} {inverse} size={sizeFunc(height, width)} {customColor} bind:speed />
	{:else if type === '1_43'}
		<Loading1_43 {theme} {inverse} size={sizeFunc(height, width)} {customColor} bind:speed />
	{:else if type === '1_44'}
		<Loading1_44 {theme} {inverse} size={sizeFunc(height, width)} {customColor} bind:speed />
	{:else if type === '1_45'}
		<Loading1_45 {theme} {inverse} size={sizeFunc(height, width)} {customColor} bind:speed />
	{:else if type === '1_46'}
		<Loading1_46 {theme} {inverse} size={sizeFunc(height, width)} {customColor} bind:speed />
	{:else if type === '1_47'}
		<Loading1_47 {theme} {inverse} size={sizeFunc(height, width)} {customColor} bind:speed />
	{:else if type === '1_48'}
		<Loading1_48 {theme} {inverse} size={sizeFunc(height, width)} {customColor} bind:speed />
	{:else if type === '1_49'}
		<Loading1_49 {theme} {inverse} size={sizeFunc(height, width)} {customColor} bind:speed />
	{:else if type === '1_50'}
		<Loading1_50 {theme} {inverse} size={sizeFunc(height, width)} {customColor} bind:speed />
	{:else if type === '1_51'}
		<Loading1_51 {theme} {inverse} size={sizeFunc(height, width)} {customColor} bind:speed />
	{:else if type === '1_52'}
		<Loading1_52 {theme} {inverse} size={sizeFunc(height, width)} {customColor} bind:speed />
	{:else if type === '1_53'}
		<Loading1_53 {theme} {inverse} size={sizeFunc(height, width)} {customColor} bind:speed />

		<!--twoColor-->
	{:else if type === '2_0'}
		<Loading2_0 {inverse} size={sizeFunc(height, width)} {customColor} bind:speed />
	{:else if type === '2_1'}<Loading2_1 {inverse} size={sizeFunc(height, width)} {customColor} bind:speed />
	{:else if type === '2_2'}<Loading2_2 {inverse} size={sizeFunc(height, width)} {customColor} bind:speed />
	{:else if type === '2_3'}<Loading2_3 {inverse} size={sizeFunc(height, width)} {customColor} bind:speed />
	{:else if type === '2_4'}<Loading2_4 {inverse} size={sizeFunc(height, width)} {customColor} bind:speed />
	{:else if type === '2_5'}<Loading2_5 {inverse} size={sizeFunc(height, width)} {customColor} bind:speed />

		<!--fourColor-->
	{:else if type === '4_0'}
		<Loading4_0 size={sizeFunc(height, width)} {customColor} bind:speed />
	{:else if type === '4_1'}
		<Loading4_1 size={sizeFunc(height, width)} {customColor} bind:speed />
	{:else if type === '4_2'}
		<Loading4_2 size={sizeFunc(height, width)} {customColor} bind:speed />
	{:else if type === '4_3'}
		<Loading4_3 size={sizeFunc(height, width)} {customColor} bind:speed />
	{:else}
		<Loading1_0 {theme} {inverse} size={sizeFunc(height, width)} {customColor} bind:speed />
	{/if}
</div>
