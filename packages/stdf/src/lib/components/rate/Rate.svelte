<script lang="ts">
	import { getContext } from 'svelte';
	import Icon from '../icon/Icon.svelte';
	import type { RateProps } from '../../types/index.js';
	import { zh_CN, type LangProps } from '../../lang/index.js';

	// 当前语言
	// current language
	const currentLang = (getContext('STDF_lang') || zh_CN) as LangProps;
	const rateLang: LangProps['rate'] = currentLang.rate;

	let {
		value = $bindable(4),
		total = 5,
		height = 24,
		width = 24,
		opacity = '0.2',
		space = '3',
		half = false,
		zero = false,
		vertical = false,
		disabled = false,
		readonly = false,
		animation = 'current',
		children,
		onclick
	}: RateProps = $props();

	// 对传入数据进行一些报错或警告处理
	// some error or warning processing for the incoming data
	if (value > total) {
		console.error(rateLang.error1);
	}
	if (total % 1 !== 0) {
		console.error(rateLang.error2);
	}
	if (!half && value % 1 !== 0) {
		console.error(rateLang.error3);
	}
	if (half && value % 0.5 !== 0) {
		console.error(rateLang.error4);
	}
	if (width < 20 || height < 20) {
		console.error(rateLang.error5);
	}

	// 间距样式
	// space style
	const spaceObj = { '0': ' gap-0', '1': ' gap-1', '2': ' gap-2', '3': ' gap-3', '4': ' gap-4', '8': ' gap-8' };

	// 透明度样式
	// opacity style
	const opacityObj = {
		'0.05': ' opacity-5',
		'0.1': ' opacity-10',
		'0.2': ' opacity-20',
		'0.3': ' opacity-30',
		'0.4': ' opacity-40',
		'0.5': ' opacity-50',
		'0.6': ' opacity-60',
		'0.7': ' opacity-70',
		'0.8': ' opacity-80',
		'0.9': ' opacity-90',
		'1': ' opacity-100'
	};

	// 是否缩放
	// whether to scale
	let isScale = $state(false);

	// 点击索引
	// click index
	let clickIndex = $state(0);

	// 点击事件
	// click event
	const clickFun = (index: number) => {
		if (disabled || readonly) {
			return;
		}
		isScale = true;
		clickIndex = index;
		setTimeout(() => {
			isScale = false;
		}, 80);
		if (half) {
			if (index === 0) {
				if (zero) {
					if (value === 0 || value > 1) {
						value = 0.5;
					} else if (value === 0.5) {
						value = 1;
					} else {
						value = 0;
					}
				} else {
					if (value === 0 || value >= 1) {
						value = 0.5;
					} else {
						value = 1;
					}
				}
			} else {
				value = value === index + 0.5 ? index + 1 : index + 0.5;
			}
		} else {
			if (zero && index === 0) {
				value = value !== 1 ? 1 : 0;
			} else {
				value = index + 1;
			}
		}
		// 派发事件
		// dispatch event
		onclick?.(value);
	};

	// 处理允许半选情况时的样式
	// handle the style when half selection is allowed
	const isActiveFun = (index: number, value: number, half: boolean, vertical: boolean, i: number) => {
		if (half) {
			if (vertical) {
				if (i === 0) {
					return index + 0.5 < value;
				}
				if (i === 1) {
					return index + 0.5 < value;
				}
				if (i === 2) {
					return index + 0.5 <= value;
				}
				if (i === 3) {
					return index + 0.5 <= value;
				}
			} else {
				if (i === 0) {
					return index + 0.5 <= value;
				}
				if (i === 1) {
					return index + 0.5 < value;
				}
				if (i === 2) {
					return index + 0.5 <= value;
				}
				if (i === 3) {
					return index + 0.5 < value;
				}
			}
		} else {
			return index + 1 <= value;
		}
	};
</script>

<div class="inset-0 inline-flex flex-wrap{spaceObj[space] || spaceObj['4']}{disabled ? ' opacity-50' : ''}">
	<!-- eslint-disable-next-line @typescript-eslint/no-unused-vars -->
	{#each new Array(Math.floor(total)) as _, index}
		<button
			class="flex flex-wrap transition-all{disabled ? ' cursor-not-allowed' : ' cursor-pointer'}{animation === 'active'
				? clickIndex >= index && isScale
					? ' scale-75'
					: ''
				: animation === 'current'
					? clickIndex === index && isScale
						? ' scale-75'
						: ''
					: ''}"
			style="height:{height}px;width:{width}px;"
			onclick={() => clickFun(index)}
		>
			{#each [0, 1, 2, 3] as i}
				<div
					class="overflow-hidden{isActiveFun(index, value, half, vertical, i) ? '' : ` grayscale${opacityObj[opacity] || ' opacity-30'}`}"
					style="height:{height / 2}px;width:{width / 2}px;"
				>
					<div style="transform:translateX({i === 0 || i === 2 ? 0 : -(width / 2)}px) translateY({i < 2 ? 0 : -(height / 2)}px)">
						{#if children}
							{@render children?.()}
						{:else}
							<Icon name="ri-star-fill" theme size={height} top={height < 24 ? height - 24 : 0} />
						{/if}
					</div>
				</div>
			{/each}
		</button>
	{/each}
</div>
