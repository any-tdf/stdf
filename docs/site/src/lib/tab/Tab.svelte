<script lang="ts">
	import { fade } from 'svelte/transition';
	import { currentThemeStore } from '../../store';
	// @ts-expect-error - beautify-qrcode 缺少类型定义
	import { encodeData, rendererLine } from 'beautify-qrcode';
	import { page } from '$app/stores';

	let { currentTab = 0, onclickTab } = $props();

	const tabList = [
		{ zh: '示例', en: 'Demo' },
		{ zh: 'API', en: 'API' },
		{ zh: '指南', en: 'Guide' },
		{ zh: 'FAQ', en: 'FAQ' },
		{ zh: '版本', en: 'Version' }
	];
	const changeIndexFun = (i: number) => {
		currentTab = i;
		onclickTab?.(i);
	};
	const isZh = localStorage.getItem('lang') === 'zh_CN';
	let showQr = $state(false);
	let QRValue = $state('');
	let A_a1Svg = $state('');

	const mouseenterFun = () => {
		const params = new URLSearchParams('?' + $page.url.searchParams);
		QRValue =
			(import.meta.env.DEV ? location.protocol + '//' + location.hostname + ':8888/' : 'https://demo.stdf.design/') +
			params.get('nav') +
			(isZh ? '/zh_CN' : '/en_US');
		showQr = true;
		/**
		 * A_a1
		 * @param {Object} qrcode
		 * @param {Object} options
		 * @param {String} [options.type]  连线方向 0=>左右 1=>上下 2=>纵横 3=>回环 4=>左上—右下 5=>右上—左下 6=>交叉"
		 * @param {String} [options.size] 连线粗细
		 * @param {String} [options.opacity] 连线不透明度
		 * @param {String} [options.posType] 定位点样式  0=>矩形 1=>圆形 2=>行星 3=>圆角矩形
		 * @param {String} [options.otherColor] 连线颜色
		 * @param {String} [options.posColor] 定位点颜色
		 */
		const qrcode = encodeData({
			text: QRValue,
			isSpace: false
		});
		const color = $currentThemeStore === 'dark' ? 'var(--color-dark)' : 'var(--color-primary)';
		A_a1Svg = rendererLine(qrcode, {
			posType: 2,
			otherColor: color,
			posColor: color
		});
	};

	let showStackblitz = $state(false);
	let stackblitzValue = $state('');
	const showStackblitzFunc = () => {
		const nav = $page.url.searchParams.get('nav');
		stackblitzValue = `https://stackblitz.com/github/any-tdf/demo-stdf?file=src%2Froutes%2F${
			isZh ? 'zh_CN' : 'en_US'
		}%2F${nav}%2F%2Bpage.svelte&startScript=${nav}${isZh ? '' : '_en'}`;
		showStackblitz = true;
	};

	let showCode = $state(false);
	let codeValue = $state('');
	const showCodeFunc = () => {
		const nav = $page.url.searchParams.get('nav');
		// 将 nav 首字母大写
		const navFirst = nav ? nav.slice(0, 1).toUpperCase() + nav.slice(1) : '';
		codeValue = `https://github.com/any-tdf/stdf/blob/main/packages/stdf/src/lib/components/${nav}/${navFirst}.svelte`;
		showCode = true;
	};
</script>

<div class="w-82 md:w-102 relative top-14">
	<div class="relative rounded-sm bg-gray-100 p-1 dark:bg-gray-700">
		<!--滑块-->
		<div
			class="absolute top-1 h-10 w-16 rounded-sm bg-white shadow-md transition-all duration-300 md:w-20 dark:bg-black dark:shadow-white/10"
			class:left-1={currentTab === 0}
			class:left-17={currentTab === 1}
			class:md:left-21={currentTab === 1}
			class:left-33={currentTab === 2}
			class:md:left-41={currentTab === 2}
			class:left-49={currentTab === 3}
			class:md:left-61={currentTab === 3}
			class:left-65={currentTab === 4}
			class:md:left-81={currentTab === 4}
		></div>
		<!--二维码-->
		<a href={QRValue} target="_blank">
			<button
				onmouseleave={() => (showQr = false)}
				onmouseenter={mouseenterFun}
				class="left-106 absolute top-0 hidden h-12 w-12 rounded-sm bg-gray-100 p-3 md:block dark:bg-gray-700"
			>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" style="fill: currentColor">
					<path fill="none" d="M0 0h24v24H0z" />
					<path
						d="M16 17v-1h-3v-3h3v2h2v2h-1v2h-2v2h-2v-3h2v-1h1zm5 4h-4v-2h2v-2h2v4zM3 3h8v8H3V3zm2 2v4h4V5H5zm8-2h8v8h-8V3zm2 2v4h4V5h-4zM3 13h8v8H3v-8zm2 2v4h4v-4H5zm13-2h3v2h-3v-2zM6 6h2v2H6V6zm0 10h2v2H6v-2zM16 6h2v2h-2V6z"
					/>
				</svg>
				{#if showQr}
					<div
						class="absolute left-0 top-14 z-50 hidden w-60 rounded-sm bg-black p-6 shadow-lg dark:block"
						transition:fade={{ duration: 200 }}
					>
						<!-- eslint-disable-next-line svelte/no-at-html-tags -->
						<span>{@html A_a1Svg}</span>
					</div>
				{/if}
				{#if showQr}
					<div
						class="absolute left-0 top-14 z-50 block w-60 rounded-sm bg-white p-6 shadow-lg dark:hidden"
						transition:fade={{ duration: 200 }}
					>
						<!-- eslint-disable-next-line svelte/no-at-html-tags -->
						<span>{@html A_a1Svg}</span>
					</div>
				{/if}
			</button>
		</a>
		<!--StackBlitz-->
		<a href={stackblitzValue} target="_blank">
			<button
				onmouseleave={() => (showStackblitz = false)}
				onmouseenter={showStackblitzFunc}
				class="absolute left-[34.5rem] top-0 hidden h-12 w-12 rounded-sm bg-gray-100 p-3 md:block dark:bg-gray-700"
			>
				<svg viewBox="0 0 28 28" height="24">
					<path fill="#3275e7" d="M12.747 16.273h-7.46L18.925 1.5l-3.671 10.227h7.46L9.075 26.5l3.671-10.227z" />
				</svg>
				{#if showStackblitz}
					<div
						class="absolute left-0 top-14 z-50 h-12 w-44 rounded-sm bg-gray-700 py-3 text-center leading-[1.5rem] text-white shadow-lg"
						transition:fade={{ duration: 200 }}
					>
						{isZh ? '在 StackBlitz 中打开' : 'Open in StackBlitz'}
					</div>
				{/if}
			</button>
		</a>
		<!--组件源码-->
		<a href={codeValue} target="_blank">
			<button
				onmouseleave={() => (showCode = false)}
				onmouseenter={showCodeFunc}
				class="absolute left-[30.5rem] top-0 hidden h-12 w-12 rounded-sm bg-gray-100 p-3 md:block dark:bg-gray-700"
			>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" style="fill: currentColor">
					<path
						d="M3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM4 5V19H20V5H4ZM20 12L16.4645 15.5355L15.0503 14.1213L17.1716 12L15.0503 9.87868L16.4645 8.46447L20 12ZM6.82843 12L8.94975 14.1213L7.53553 15.5355L4 12L7.53553 8.46447L8.94975 9.87868L6.82843 12ZM11.2443 17H9.11597L12.7557 7H14.884L11.2443 17Z"
					/>
				</svg>
				{#if showCode}
					<div
						class="{isZh
							? 'w-28'
							: 'w-52'} absolute left-0 top-14 z-50 h-12 rounded-sm bg-gray-700 py-3 text-center leading-[1.5rem] text-white shadow-lg"
						transition:fade={{ duration: 200 }}
					>
						{isZh ? '组件源码' : 'Component source code'}
					</div>
				{/if}
			</button>
		</a>
		<div class="relative flex">
			{#each tabList as item, index}
				<button onclick={() => changeIndexFun(index)} class="w-16 cursor-pointer rounded-sm py-2 text-center md:w-20">
					{isZh ? item.zh : item.en}
				</button>
			{/each}
		</div>
	</div>
</div>
