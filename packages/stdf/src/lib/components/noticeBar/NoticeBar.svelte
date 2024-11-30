<script lang="ts">
	import { onMount } from 'svelte';
	import Icon from '../icon/Icon.svelte';
	import type { NoticeBarProps } from '../../types/index.js';

	let {
		textList = [],
		leftIcon = {},
		rightIcon = 'close',
		fontSize = 'sm',
		space = 100,
		speed = 30,
		vertical = false,
		duration = 500,
		interval = 4,
		injClass = '',
		leftChild,
		rightChild,
		onclickRight
	}: NoticeBarProps = $props();

	// 如果 textList 不是数组给出中英文报错
	// If textList is not an array, give Chinese and English error
	if (!Array.isArray(textList)) {
		console.error('[STDF NoticeBar error]textList 必须是数组。(textList must be an array.)');
	}

	// 如果 textList 为空数组给出中英文报错
	// If textList is an empty array, give Chinese and English error
	if (textList.length === 0) {
		console.error('[STDF NoticeBar error]textList must not be empty.');
	}

	// 字体大小样式
	// Font size style
	const fontSizeClass = { xs: ' text-xs', sm: ' text-sm', base: ' text-base', lg: ' text-lg' };

	// 动画时长样式
	// Animation duration style
	const durationClass = {
		'100': ' duration-100',
		'300': ' duration-300',
		'500': ' duration-500',
		'700': ' duration-700',
		'1000': ' duration-1000'
	};

	let left = $state(speed);
	let boxDom = $state<HTMLDivElement | null>(null);
	let outBoxDom = $state<HTMLDivElement | null>(null);
	let boxWidth = $state(0);
	let outBoxWidth = $state(0);
	let outBoxHeight = $state(0);
	let requestAnimationFrameFlag = $state<number | undefined>(undefined);
	let startTime = 0;
	let fps = 0;

	//垂直滚动时的处理
	//Processing when scrolling vertically
	let times: number | null = null;
	let currentIndex = $state(0);
	let textListVertical = [...textList, textList[0]];
	let isTransition = $state(true);
	const stepFun = (time: number) => {
		fps = time - startTime;
		startTime = time;
		left -= (speed * fps) / 1000;
		requestAnimationFrameFlag = requestAnimationFrame(stepFun);
		if (left < -boxWidth / 2) {
			left = 0;
		}
	};
	let newTextList = $state([...textList, ...textList]);
	onMount(() => {
		if (!vertical) {
			boxWidth = boxDom?.getBoundingClientRect().width || 0;
		}
		outBoxWidth = outBoxDom?.getBoundingClientRect().width || 0;
		outBoxHeight = outBoxDom?.getBoundingClientRect().height || 0;
		if (!vertical && boxWidth / 2 - space < outBoxWidth) {
			newTextList = textList;
			left = 0;
			return;
		}
		requestAnimationFrameFlag = requestAnimationFrame(stepFun);
		if (vertical) {
			if (textListVertical.length > 1) {
				times = setInterval(() => {
					currentIndex++;
					if (currentIndex === textListVertical.length - 1) {
						setTimeout(() => {
							currentIndex = 0;
							isTransition = false;
						}, duration);
					} else {
						isTransition = true;
					}
				}, interval * 1000);
			}
		}
		return () => {
			if (vertical && times !== null) {
				clearInterval(times);
			} else if (requestAnimationFrameFlag) {
				cancelAnimationFrame(requestAnimationFrameFlag);
			}
		};
	});
	let isShow = $state(true);
	let isShowClose = $state(true);
	const clickFun = () => {
		if (rightIcon === 'close') {
			isShow = false;
			setTimeout(() => {
				isShowClose = false;
			}, 200);
		}
		onclickRight?.();
	};
</script>

{#if isShowClose}
	<div
		class="bg-primary/10 text-primary dark:bg-dark/10 flex justify-between dark:text-dark{fontSizeClass[fontSize] ||
			fontSizeClass['sm']} p-2{!rightIcon ? ' pr-2' : ' pr-0'} transition-all duration-300{isShow ? '' : ' scale-0'}{injClass === ''
			? ''
			: ` ${injClass}`}"
	>
		<div class={!leftIcon ? '' : 'mr-1'}>
			{#if leftChild}
				{@render leftChild()}
			{:else if !leftIcon}{:else}
				<Icon name="ri-volume-down-line" size={20} top={-1} {...leftIcon} />
			{/if}
		</div>
		{#if vertical}
			<div class="grow" bind:this={outBoxDom}>
				<div class="relative overflow-hidden" style="height:{outBoxHeight}px;">
					{#each textListVertical as item, i}
						<div
							class="absolute truncate{isTransition ? ' transition-all' : ' transition-none'}{durationClass[duration] ||
								durationClass['500']}"
							style="top:{-(currentIndex - i) * outBoxHeight}px;width:{outBoxWidth}px"
						>
							{item}
						</div>
					{/each}
				</div>
			</div>
		{:else}
			<div class="relative grow overflow-hidden" bind:this={outBoxDom}>
				<div class="absolute whitespace-nowrap" style="left:{left}px" bind:this={boxDom}>
					{#each newTextList as item}
						<div class="inline-block" style="margin-right:{space}px">{item}</div>
					{/each}
				</div>
			</div>
		{/if}
		<button class={!rightIcon ? '' : 'pl-2 pr-4'} onclick={clickFun}>
			{#if rightChild}
				{@render rightChild()}
			{:else if !rightIcon}{:else if rightIcon === 'close'}
				<Icon name="ri-close-line" size={20} top={-1} />
			{:else if rightIcon === 'arrow'}
				<Icon name="ri-arrow-right-s-line" size={20} top={-1} />
			{/if}
		</button>
	</div>
{/if}
