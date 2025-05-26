<script lang="ts">
	import { onMount } from 'svelte';
	import Icon from '../icon/Icon.svelte';
	import type { NoticeBarProps } from '../../types/index.js';

	let {
		textList = [],
		leftIcon = 'volume',
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
	let times: ReturnType<typeof setInterval>;
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
		<div class={leftIcon ? 'mr-1' : ''}>
			{#if leftChild}
				{@render leftChild()}
			{:else if leftIcon === 'volume'}
				<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" class="mx-auto block fill-current">
					<path
						d="M13 7.22056L9.60282 10.0001H6V14.0001H9.60282L13 16.7796V7.22056ZM8.88889 16.0001H5C4.44772 16.0001 4 15.5524 4 15.0001V9.00007C4 8.44778 4.44772 8.00007 5 8.00007H8.88889L14.1834 3.66821C14.3971 3.49335 14.7121 3.52485 14.887 3.73857C14.9601 3.8279 15 3.93977 15 4.05519V19.9449C15 20.2211 14.7761 20.4449 14.5 20.4449C14.3846 20.4449 14.2727 20.405 14.1834 20.3319L8.88889 16.0001ZM18.8631 16.5911L17.4411 15.1691C18.3892 14.4376 19 13.2902 19 12.0001C19 10.5697 18.2493 9.31476 17.1203 8.60766L18.5589 7.16906C20.0396 8.26166 21 10.0187 21 12.0001C21 13.8422 20.1698 15.4905 18.8631 16.5911Z"
					>
					</path>
				</svg>
			{:else if leftIcon}
				<Icon {...leftIcon} />
			{:else}{/if}
		</div>
		{#if vertical}
			<div class="grow" bind:this={outBoxDom}>
				<div class="relative overflow-hidden" style="height:{outBoxHeight}px;">
					{#each textListVertical as item, i (i)}
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
					{#each newTextList as item, i (i)}
						<div class="inline-block" style="margin-right:{space}px">{item}</div>
					{/each}
				</div>
			</div>
		{/if}
		<button class={!rightIcon ? '' : 'pl-2 pr-4'} onclick={clickFun}>
			{#if rightChild}
				{@render rightChild()}
			{:else if !rightIcon}{:else if rightIcon === 'close'}
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" class="mx-auto block fill-current">
					<path
						d="M12.0007 10.5865L16.9504 5.63672L18.3646 7.05093L13.4149 12.0007L18.3646 16.9504L16.9504 18.3646L12.0007 13.4149L7.05093 18.3646L5.63672 16.9504L10.5865 12.0007L5.63672 7.05093L7.05093 5.63672L12.0007 10.5865Z"
					>
					</path>
				</svg>
			{:else if rightIcon === 'arrow'}
				<svg xmlns="http://www.w3.org/2000/svg" class="fill-current" width="20" height="20" viewBox="0 0 24 24">
					<path d="M13.1714 12.0007L8.22168 7.05093L9.63589 5.63672L15.9999 12.0007L9.63589 18.3646L8.22168 16.9504L13.1714 12.0007Z"
					></path>
				</svg>
			{/if}
		</button>
	</div>
{/if}
