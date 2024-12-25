<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	// import { link } from 'svelte-spa-router';
	import { fade } from 'svelte/transition';
	import { Confetti } from 'svelte-confetti';
	import { currentThemeStore, currentColorStore } from '../store';
	import { encodeData, rendererLine } from 'beautify-qrcode';

	const descList = [
		{
			title: 'Simple',
			titleZh: '简 单',
			desc: '使用 Svelte 语法编码简洁迅速。组件源码逻辑清晰、简单易懂、中英注释详细，查看源码、修改逻辑也可以得心应手。',
			descEn:
				'Coding with Svelte syntax is simple and fast. The component source code logic is clear, simple and easy to understand, and the English and Chinese comments are detailed. You can also get used to it by viewing the source code and modifying the logic yourself.',
			icon: '/assets/images/3D-simple.png',
			iconDark: '/assets/images/3D-simple-dark.png',
			shwTip: false
		},
		{
			title: 'Thin',
			titleZh: '轻 量',
			desc: '源码体积小巧，无三方依赖。基于 Svelte 与 Tailwind 编译出的代码在体积上也优势明显，这在移动端显得尤为重要。',
			descEn:
				'The source code is small and has no third-party dependencies. The code compiled based on Svelte and Tailwind also has obvious advantages in terms of volume, which is particularly important in mobile terminals.',
			icon: '/assets/images/3D-thin.png',
			iconDark: '/assets/images/3D-thin-dark.png',
			shwTip: true
		},
		{
			title: 'Design',
			titleZh: '设 计',
			desc: '针对移动设备优化设计与交互，使用友好、高效、灵活。支持通过简单配置定制颜色系统、圆角风格、亮暗模式等。',
			descEn:
				'Optimized design and interaction for mobile devices, user-friendly, efficient, and flexible. Support customizing color system, corner style, light and dark mode, etc. through simple configuration.',
			icon: '/assets/images/3D-design.png',
			iconDark: '/assets/images/3D-design-dark.png',
			shwTip: false
		},
		{
			title: 'Fast',
			titleZh: '快 速',
			desc: '无运行时，无虚拟 DOM，无烦杂的 CSS 代码，状态管理简单轻快。编码过程、编译处理、线上运行全都快起来了。',
			descEn:
				'No runtime, no virtual DOM, no cumbersome CSS code, simple and fast state management. The coding process, compilation processing, and online running are all faster.',
			icon: '/assets/images/3D-fast.png',
			iconDark: '/assets/images/3D-fast-dark.png',
			shwTip: false
		}
	];
	const dominant = {
		title: '💪 优势 & 目标',
		title_en: '💪 Advantages & Goals',
		data: [
			{
				icon: 'svelte',
				p: '补充 Svelte 生态，让开发者可以更快速更舒服地开发出高质量的应用。',
				p_en: 'Supplement the Svelte ecosystem so that developers can develop high-quality applications faster and more comfortably.'
			},
			{
				icon: 'css3-line',
				p: '避免写繁琐的 CSS 代码，让开发者专注于业务逻辑，提高开发效率。',
				p_en: 'Avoid writing tedious CSS code, allowing developers to focus on business logic and improve development efficiency.'
			},
			{
				icon: 'contrast-2-line',
				p: '支持暗黑模式与主题配置，方便开发者直接适配，让应用更加现代化。',
				p_en: 'Supports dark mode and theme configuration, making it easy for developers to adapt directly and make applications more modern.'
			},
			{
				icon: 'paint-brush-line',
				p: '普适性较强。移动端组件库多用于 C 端，对比 B 端更加需要注重 UI 的灵活性。',
				p_en: 'It has strong versatility. Mobile component libraries are mostly used in C-end scenarios where UI flexibility is more important than B-end.'
			},
			{
				icon: 'clockwise-line',
				p: '注重交互与体验。适当的过渡动画与合理的交互设计，希望给你更好的用户体验。',
				p_en: 'Emphasis on interaction and experience. Appropriate transition animations and reasonable interaction design hope to give you a better user experience.'
			},
			{
				icon: 'article-line',
				p: '站点文档、示例、源码注释都支持中英双语，且不再中英混杂，一目了然。',
				p_en: 'Site documentation, examples, and source code comments all support bilingual Chinese and English, making it clear at a glance.'
			},
			{
				icon: 'file-copy-2-line',
				p: '示例代码丰富，方便直接复制使用，配备脚手架、插件等工具，对开发者友好。',
				p_en: 'The example code is extensive and convenient for direct copying and usage. It is equipped with scaffolding, plugins, etc. making it developer-friendly.'
			},
			{
				icon: 'planet-line',
				p: '组件支持国际化（目前 60+ 语言），让应用轻松实现多语言支持。',
				p_en: 'Component supports internationalization (currently 60+ languages), making it easy for applications to achieve multilingual support.'
			}
		]
	};
	const ugly = {
		title: '🔔 提前警告',
		title_en: '🔔 Early Warning',
		data: [
			{
				icon: 'medal-line',
				p: 'STDF 不体现任何「价值观」，更加不能为您「赋能」，只希望能给您更好的开发体验，很简单很朴实。',
				p_en: 'STDF does not reflect any "values", and cannot "empower" you. We only hope to provide you with a better development experience, which is simple and straightforward.'
			},
			{
				icon: 'service-line',
				p: 'Svelte 生态相对 Vue 和 React 还很薄弱，如果您有兴趣，请积极参与和丰富 Svelte 生态。',
				p_en: 'The Svelte ecosystem is still relatively weak compared to Vue and React. If you are interested, please actively participate in and enrich the Svelte ecosystem.'
			},
			{
				icon: 'bard-line',
				p: 'STDF 也适用于 Svelte 生态的其他工程，比如 SvelteKit 等，使用前请确保知晓它们的基础原理。',
				p_en: 'STDF also applies to other projects in the Svelte ecosystem, such as SvelteKit, etc. When using them, please ensure that you understand their basic principles.'
			},
			{
				icon: 'git-close-pull-request-line',
				p: 'STDF 也适用于 Tailwind CSS 的类库，如 UnoCSS 等，使用它们请确保您知晓它们的基础原理。',
				p_en: 'STDF also applies to class libraries of Tailwind CSS, such as UnoCSS, etc. When using them, please ensure that you understand their basic principles.'
			}
		]
	};
	const isZh = localStorage.getItem('lang') === 'zh_CN';

	// 赞助人员
	const thinkGithub = [
		{ name: 'yuedanlabs', amount: 10 },
		{ name: 'sbscan', amount: 100 }
	];

	const bottomInfo = [
		{
			title: '相关',
			title_en: 'Related',
			list: [
				{ title: 'Svelte', title_en: 'Svelte', link: 'https://svelte.dev', _blank: true },
				{ title: 'Tailwind', title_en: 'Tailwind', link: 'https://tailwindcss.com', _blank: true },
				{ title: 'Remix Icon', title_en: 'Remix Icon', link: 'https://remixicon.com', _blank: true }
				// { title: 'RTDF(计划中)', title_en: 'RTDF(intend)', link: '', _blank: false },
				// { title: 'VTDF(计划中)', title_en: 'VTDF(intend)', link: '', _blank: false },
			]
		},
		{
			title: '工具',
			title_en: 'Tools',
			list: [
				{
					title: 'create-stdf',
					title_en: 'create-stdf',
					link: 'https://www.npmjs.com/package/create-stdf',
					_blank: true
				},
				{
					title: 'rollup-plugin-stdf-icon',
					title_en: 'rollup-plugin-stdf-icon',
					link: 'https://www.npmjs.com/package/rollup-plugin-stdf-icon',
					_blank: true
				},
				{
					title: 'STDF for VS Code',
					title_en: 'STDF for VS Code',
					link: 'https://marketplace.visualstudio.com/items?itemName=STDF.stdf-vscode-extension',
					_blank: true
				}
			]
		},
		{
			title: '帮助',
			title_en: 'Help',
			list: [
				{ title: '关于', title_en: 'About', link: '/guide/about', _blank: false },
				{ title: '常见问题', title_en: 'FAQ', link: '/guide/faq', _blank: false },
				{ title: '更新日志', title_en: 'Changelog', link: '/guide/changelog', _blank: false },
				{
					title: '开源许可',
					title_en: 'License',
					link: 'https://github.com/any-tdf/stdf/blob/main/LICENSE',
					_blank: true
				}
			]
		},
		{
			title: '社区',
			title_en: 'Community',
			list: [
				// { title: 'GitHub', title_en: 'GitHub', link: 'https://github.com/any-tdf/stdf' },
				{
					title: 'QQ 群',
					title_en: 'QQ Group',
					link: 'https://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=U8ZlXJ3KVpTI9oZzs1jBnyWc3gVA0h6Y&authKey=ScWu0nU9g8BqNsC7o2eYkESwgVDVz9vzGNZEb17MrEAay9%2F7bTkXDiLJRIzo2vrg&noverify=0&group_code=581073686',
					_blank: true
				},
				// { title: '钉钉群', title_en: 'DingTalk Group', link: '', _blank: true },
				{
					title: 'Discord',
					title_en: 'Discord',
					link: 'https://discord.gg/DMkHu8GGre',
					_blank: true
				},
				{
					title: 'QQ 频道',
					title_en: 'QQ Discord',
					link: 'https://pd.qq.com/s/fdd8incyr',
					_blank: true
				},
				{
					title: 'Discussions',
					title_en: 'Discussions',
					link: 'https://github.com/any-tdf/stdf/discussions',
					_blank: true
				}
			]
		}
	];
	let showQr = $state(false);
	let show3D = $state(!(localStorage.getItem('show3D') === '0'));

	const change3DFunc = () => {
		show3D = !show3D;
		localStorage.setItem('show3D', show3D ? '1' : '0');
	};

	const io = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
		entries.forEach((item) => {
			// isIntersecting 是一个 Boolean 值，判断目标元素当前是否可见
			if (item.isIntersecting) {
				const target = item.target as HTMLElement;
				target.style.opacity = '1';
				target.style.transform = 'translateY(0)';
				setTimeout(() => {
					target.style.transitionDuration = '300ms';
				}, 1000);
			} else {
				// item.target.style.opacity = 0;
				// item.target.style.transform = 'translateY(200px)';
			}
		});
	});
	let A_a1Svg = $state();
	const mouseenterFun = () => {
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
			// main -> next
			text: 'https://next-demo.stdf.design?lang=' + (isZh ? 'zh_CN' : 'en_US'),
			isSpace: false
		});
		const color = $currentThemeStore === 'dark' ? 'rgb(var(--theme-color-dark))' : 'rgb(var(--theme-color-primary))';
		A_a1Svg = rendererLine(qrcode, { posType: 2, otherColor: color, posColor: color });
		showQr = true;
	};
	onMount(() => {
		const intersectionList = document.querySelectorAll('.intersection');
		intersectionList.forEach((item) => {
			// 开始时 opacity 为 0，不可见，transform 为 translateY(200px)
			const target = item as HTMLElement;
			target.style.opacity = '0';
			target.style.transform = 'translateY(200px)';
			target.style.transitionDuration = '1s';
			io.observe(item);
		});
	});
	const unsubscribe = currentColorStore.subscribe(() => {
		show3D = false;
		setTimeout(() => {
			show3D = localStorage.getItem('show3D') === '1';
		}, 0);
	});
	onDestroy(() => {
		unsubscribe();
	});
</script>

<div class="mx-auto max-w-[2000px]">
	<div class="flex-row-reverse justify-center lg:flex">
		{#if show3D}
			<div class="group relative mt-10 basis-1/2 overflow-hidden md:mt-0">
				<spline-viewer
					class="aspect-[4/3] scale-110 md:aspect-auto md:scale-100"
					url="/assets/3d/scene.splinecode"
					background={$currentThemeStore === 'dark'
						? `rgb(${getComputedStyle(document.documentElement).getPropertyValue('--theme-color-darkBlack')})`
						: `rgb(${getComputedStyle(document.documentElement).getPropertyValue('--theme-color-primaryWhite')})`}
				></spline-viewer>
				<!-- background="rgb(242, 242, 243)" -->
				<!-- background={backgroundColor} -->
				<!-- background="rgb(255, 0, 0)" -->
				<button
					onclick={() => {
						show3D = false;
						localStorage.setItem('show3D', '0');
					}}
					class="absolute left-10 top-10 hidden scale-0 cursor-pointer rounded bg-black/5 px-2 py-1 text-xs text-black/80 transition-all duration-500 group-hover:scale-100 md:block dark:bg-white/10 dark:text-white/90"
				>
					{isZh ? '隐藏 3D LOGO' : 'Hidden 3D LOGO'}
				</button>
			</div>
		{:else}
			<!-- 图片 -->
			<div class="group relative mt-10 flex basis-1/2 flex-col justify-center overflow-hidden md:mt-0">
				<img src="/assets/3d/dark.png" alt="" class="hidden w-full object-cover dark:block" />
				<img src="/assets/3d/light.png" alt="" class="block w-full object-cover dark:hidden" />
				<button
					onclick={() => {
						show3D = true;
						localStorage.setItem('show3D', '1');
					}}
					class="absolute left-10 top-10 hidden scale-0 cursor-pointer rounded bg-black/5 px-2 py-1 text-xs text-black/80 transition-all duration-300 group-hover:scale-100 md:block dark:bg-white/10 dark:text-white/90"
				>
					{isZh ? '显示 3D LOGO' : 'Show 3D LOGO'}
				</button>
			</div>
		{/if}
		<div class="flex basis-2/5 flex-col justify-center py-16 text-center md:py-20">
			<div class="relative mb-20 mt-16 hidden h-20 flex-col items-center justify-center md:flex md:h-28">
				<div class="animate-dynamicsBg absolute rounded-full opacity-50 blur-xl md:opacity-100 md:blur-3xl">
					<svg viewBox="0 0 100 100">
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M50 0V100C22.3858 100 0 77.6142 0 50C0 22.3858 22.3858 0 50 0Z"
							class="fill-dark"
						/>
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M50 100V0C77.6142 0 100 22.3858 100 50C100 77.6142 77.6142 100 50 100Z"
							class="fill-primary"
						/>
						<circle cx="50" cy="25" r="25" class="fill-primary" />
						<circle cx="50" cy="75" r="25" class="fill-dark" />
						<circle cx="50.25" cy="25.25" r="6.25" class="fill-dark" />
						<circle cx="50.25" cy="75.25" r="6.25" class="fill-primary" />
					</svg>
				</div>
				<div
					class="absolute h-full w-28 md:w-36"
					style="filter: drop-shadow(0 10px 8px rgb(0 0 0 / 0.05)) drop-shadow(0 4px 3px rgb(0 0 0 / 0.1));"
				>
					<svg viewBox="0 0 90 80" class="group">
						<path
							class="fill-primary dark:fill-dark"
							d="M0 0H20H40H50C64.8056 0 77.7325 8.04398 84.6487 20H50H40V22.6757V30H50C55.5229 30 60 34.4771 60 40C60 45.5229 55.5229 50 50 50H40V57.3243V78.7398V80H20V66.4583V20H15.3513H0V0ZM50 80C72.0914 80 90 62.0914 90 40C90 36.547 89.5625 33.1962 88.7398 30H67.3244C69.0261 32.9417 70 36.3571 70 40C70 51.0457 61.0457 60 50 60V80Z"
						/>
						<path
							style="stroke-dasharray: 400;stroke-dashoffset: 400;"
							class="fill-dark stroke-dark text-dark group-hover:animate-path dark:fill-primary dark:stroke-primary dark:text-primary stroke-1"
							d="M20 30V0L0 50H20V80L40 30H20Z"
						/>
					</svg>
				</div>
			</div>
			<div class="text-5xl font-medium md:text-8xl">S T D F</div>
			<div class="mt-4 px-4 md:text-xl">
				{#if isZh}
					基于
					<a
						href="https://svelte.dev"
						class="decoration-svelte hover:text-svelte underline underline-offset-2 transition-all"
						target="_blank"
						title={isZh ? '打开 Svelte 官方站点' : 'Open Svelte official website'}
					>
						Svelte
					</a>
					与
					<a
						href="https://tailwindcss.com/"
						class="decoration-tailwind hover:text-tailwind underline underline-offset-2 transition-all"
						target="_blank"
						title={isZh ? '打开 Tailwind CSS 官方站点' : 'Open Tailwind CSS official website'}
					>
						Tailwind
					</a>
					的移动 web 组件库
				{:else}
					Mobile web component
					<br class="md:hidden" />
					library based on
					<a
						href="https://svelte.dev"
						class="decoration-svelte hover:text-svelte underline underline-offset-2 transition-all"
						target="_blank"
					>
						Svelte
					</a>
					and
					<a
						href="https://tailwindcss.com/"
						class="decoration-tailwind hover:text-tailwind underline underline-offset-2 transition-all"
						target="_blank"
					>
						Tailwind
					</a>
				{/if}
			</div>
			<div class="mb-8 mt-8 flex justify-center gap-4 space-x-8 md:mb-10 md:mt-16">
				<a
					href="/guide"
					class="bg-primary hover:bg-primary/80 dark:bg-dark hover:dark:bg-dark/80 group relative rounded px-6 py-2 text-white transition-all dark:text-black"
				>
					{isZh ? '开始使用' : 'Get Started'}
					<span class="absolute left-1/2 top-0 hidden group-hover:block">
						<Confetti infinite rounded />
					</span>
				</a>
				<!-- use:link -->
				<a
					href="/"
					onmouseleave={() => (showQr = false)}
					onmouseenter={mouseenterFun}
					class="border-primary dark:border-dark relative hidden rounded border border-solid px-6 py-2 transition-all md:block"
				>
					{isZh ? '扫码示例' : 'QR Demo'}
					{#if showQr}
						<div
							class="absolute left-full top-0 z-10 block w-52 -translate-y-1/3 translate-x-2 rounded-lg border border-black/5 p-2 shadow-lg dark:hidden"
							in:fade={{ duration: 300 }}
							out:fade={{ duration: 0 }}
						>
							<!-- eslint-disable-next-line svelte/no-at-html-tags -->
							<span>{@html A_a1Svg}</span>
							<!-- <QrCode value="https://demo.stdf.design/#/" size={200} color="#fff" background="#23262B" /> -->
						</div>
						<div
							class="absolute left-full top-0 z-10 hidden w-52 -translate-y-1/3 translate-x-2 rounded-lg border border-white/5 bg-black p-2 shadow-lg dark:block"
							in:fade={{ duration: 300 }}
							out:fade={{ duration: 0 }}
						>
							<!-- eslint-disable-next-line svelte/no-at-html-tags -->
							<span>{@html A_a1Svg}</span>
							<!-- <QrCode value="https://demo.stdf.design/#/" size={200} color="#fff" background="#24262b" /> -->
						</div>
					{/if}
				</a>
				<!-- main -> next -->
				<a
					href={'https://next-demo.stdf.design?lang=' + (isZh ? 'zh_CN' : 'en_US')}
					target="_blank"
					class="border-primary dark:border-dark block rounded border border-solid px-6 py-2 transition-all md:hidden"
				>
					{isZh ? '查看示例' : 'Examples'}
				</a>
			</div>
		</div>
	</div>
	<div class="flex flex-wrap justify-around gap-8 px-8 xl:flex-nowrap">
		{#each descList as desc}
			<div
				class="intersection group flex w-full flex-col items-center space-y-5 overflow-hidden rounded-xl border-black/5 pb-8 transition-all duration-300 ease-out sm:w-2/3 md:w-80 lg:w-96 dark:border-white/5 dark:hover:shadow-white/5"
			>
				<div class="overflow-hidden">
					<img
						class="block scale-100 object-cover transition-all duration-500 group-hover:scale-[1.6] dark:hidden"
						src={desc.icon}
						alt=""
					/>
					<img
						class="hidden scale-100 object-cover transition-all duration-500 group-hover:scale-[1.6] dark:block"
						src={desc.iconDark}
						alt=""
					/>
				</div>
				{#if isZh}
					<div class="py-4 text-3xl font-medium">{isZh ? desc.titleZh : desc.title}</div>
				{/if}
				<div class="text-sm text-black/70 dark:text-white/60 {isZh ? 'text-justify' : 'pt-10 text-left'}">
					{isZh ? desc.desc : desc.descEn}
				</div>
			</div>
		{/each}
	</div>

	<div class="px-4 pb-10 md:px-12 md:pb-20" class:text-left={!isZh}>
		<div class="mt-40">
			<div class="intersection my-10 text-center text-2xl font-bold transition-all ease-out md:my-20 md:text-4xl">
				{isZh ? dominant.title : dominant.title_en}
			</div>
			<div class="grid grid-cols-1 gap-10 md:grid-cols-4">
				{#each dominant.data as item}
					<div
						class="intersection border-px group relative overflow-hidden rounded-lg border border-black/5 p-0.5 transition-all ease-out dark:border-white/5"
					>
						<div
							class="bg-primary absolute -left-1/2 top-1/3 hidden h-1/2 w-[200%] group-hover:block {$currentThemeStore === 'dark'
								? 'animate-spin-line-dark'
								: 'animate-spin-line'}"
						></div>
						<div class="bg-primaryWhite dark:bg-darkBlack relative h-full w-full rounded-lg px-8 py-10">
							<div class="text-primary dark:text-dark h-8 w-8 flex-none transition-all ease-out group-hover:scale-90">
								<svg style="fill: currentColor;display: inline;" viewBox="0 0 24 24">
									<use xlink:href="/assets/fonts/home.symbol.svg#{item.icon}" />
								</svg>
							</div>
							<p class="mt-6 text-sm opacity-90">{isZh ? item.p : item.p_en}</p>
						</div>
					</div>
				{/each}
			</div>
		</div>
		<div class="mt-32 md:mt-48">
			<div class="intersection my-10 text-center text-2xl font-bold transition-all ease-out md:my-20 md:text-4xl">
				{isZh ? ugly.title : ugly.title_en}
			</div>
			<div class="grid grid-cols-1 gap-10 md:grid-cols-4">
				{#each ugly.data as item}
					<div
						class="intersection border-px group relative overflow-hidden rounded-lg border border-black/5 p-0.5 transition-all ease-out dark:border-white/5"
					>
						<div
							class="bg-primary absolute -left-1/2 top-1/3 hidden h-1/2 w-[200%] group-hover:block {$currentThemeStore === 'dark'
								? 'animate-spin-line-dark'
								: 'animate-spin-line'}"
						></div>
						<div class="bg-primaryWhite dark:bg-darkBlack relative h-full w-full rounded-lg px-8 py-10">
							<div class="text-primary dark:text-dark h-8 w-8 flex-none transition-all ease-out group-hover:scale-90">
								<svg style="fill: currentColor;display: inline;" viewBox="0 0 24 24">
									<use xlink:href="/assets/fonts/home.symbol.svg#{item.icon}" />
								</svg>
							</div>
							<p class="mt-6 text-sm opacity-90">{isZh ? item.p : item.p_en}</p>
						</div>
					</div>
				{/each}
			</div>

			<!-- <div class="space-y-10">
            {#each isZh ? ugly.p : ugly.p_en as item, i}
                <p>{item}</p>
            {/each}
        </div> -->
		</div>
	</div>

	<!-- <div class="hidden md:flex justify-center mb-20">
    <article class={`prose dark:prose-invert max-w-none text-xs overflow-auto`} style="height:{500}px">
        <pre><code class="hljs">{@html highlightedCode}</code></pre>
    </article>
    <div class=" ml-2 border border-black/10 dark:border-gray-400 w-[392px] grow-0 shrink-0 overflow-auto" style="height:{500}px">
        <img src="/assets/images/home/zh/9.png" alt="" class='w-full' />
    </div>
</div> -->

	<div class="px-4 pb-10 text-center md:px-12 md:pb-20">
		<div class="intersection my-5 text-2xl font-bold transition-all ease-out md:my-10 md:text-4xl">
			🎖 {isZh ? '贡献者' : 'Contributors'}
		</div>
		<div class="intersection flex justify-center">
			<a href="https://github.com/any-tdf/stdf/graphs/contributors" target="_blank">
				<img src="https://contrib.rocks/image?repo=any-tdf/stdf" title={isZh ? '贡献者' : 'Contributors'} alt="" />
			</a>
		</div>
	</div>

	<!-- 赞助者 -->
	<div class="px-4 pb-20 text-center md:px-12 md:pb-40">
		<div class="intersection my-5 text-2xl font-bold transition-all ease-out md:my-10 md:text-4xl">
			🙏 {isZh ? '赞助者' : 'Sponsors'}
		</div>
		<div class="">
			<div class="intersection mb-4">GitHub</div>
			<div class="flex flex-wrap justify-center gap-4">
				{#each thinkGithub as item}
					<a class="intersection" href={'https://github.com/' + item.name} target="_blank">
						<img
							class="h-16 w-16 overflow-hidden rounded-full"
							src={'https://avatars.githubusercontent.com/' + item.name}
							title={(isZh ? '感谢 ' : 'Thanks ') + item.name}
							alt=""
						/>
					</a>
				{/each}
			</div>
		</div>
	</div>
</div>
<div class="grid grid-cols-2 gap-10 bg-white px-4 pb-16 pt-20 text-center md:grid-cols-4 md:px-10 dark:bg-black">
	{#each bottomInfo as item}
		<div>
			<div class="mb-2 text-lg font-bold">{isZh ? item.title : item.title_en}</div>
			<div class="flex flex-col gap-1">
				{#each item.list as i}
					<a href={i.link} target={i._blank ? '_blank' : '_self'} title={i.link} class="text-sm">{isZh ? i.title : i.title_en}</a>
				{/each}
			</div>
		</div>
	{/each}
</div>

<div class="border-t border-black/10 bg-white py-4 text-center text-xs dark:border-white/10 dark:bg-black">
	<div class="mb-3 text-sm" title={isZh ? '如果页面卡顿，请关闭 3D 模型。' : 'If the page is stuck, please turn off the 3D model.'}>
		<button class="text-primary dark:text-dark cursor-pointer" onclick={change3DFunc}>
			{show3D ? (isZh ? '隐藏' : 'Hidden') : isZh ? '显示' : 'Show'}
			3D LOGO
		</button>
	</div>
	<div class="flex justify-center gap-1">
		<div>STDF DESIGN • MADE BY DUFU</div>
		<div>
			{#if isZh}
				• <a href="https://beian.miit.gov.cn" target="_blank">滇 ICP 备 17004037 号 -4</a>
			{/if}
		</div>
	</div>
</div>

<style>
	@keyframes spin-line {
		to {
			transform: rotate(360deg);
		}
	}
	.animate-spin-line {
		animation: spin-line 6s linear infinite;
		background: conic-gradient(transparent 50deg, rgba(var(--theme-color-primary), 0.4) 80deg, transparent 90deg);
	}
	.animate-spin-line-dark {
		animation: spin-line 6s linear infinite;
		background: conic-gradient(transparent 50deg, rgba(var(--theme-color-dark), 0.6) 80deg, transparent 90deg);
	}
</style>
