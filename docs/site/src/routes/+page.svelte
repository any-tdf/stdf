<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { fade } from 'svelte/transition';
	import { Confetti } from 'svelte-confetti';
	import { currentThemeStore, currentColorStore } from '../store';
	// @ts-ignore
	import { encodeData, rendererLine } from 'beautify-qrcode';
	import { Tab, Loading, Switch, Avatar, Pagination, Input, Rate, Icon, NoticeBar, Slider, Swiper, Button } from 'stdf';
	import type { SwiperImgProps, SwiperProps } from 'stdf/types';
	import { menuList, type MenuList } from '../data/menuList';
	import themes from '../data/themes/index.js';
	import { switchTheme } from 'stdf/theme';

	const isZh = localStorage.getItem('lang') === 'zh_CN';

	// 随机生成 1_0 到 1_53 这种字符串
	const randomNum = Math.floor(Math.random() * 53) + 1;
	const randomNumStr = `1_${randomNum}`;
	const swiperData: SwiperImgProps[] = [
		{ type: 'img', url: '/assets/images/home/wall_1.jpg' },
		{ type: 'img', url: '/assets/images/home/wall_2.jpg' },
		{ type: 'img', url: '/assets/images/home/wall_3.jpg' },
		{ type: 'img', url: '/assets/images/home/wall_4.jpg' }
	];
	const swiperOptions: SwiperProps[] = [
		{
			data: swiperData,
			containerWidth: 390,
			px: '6',
			py: '6',
			indicateInjClass: 'bg-none',
			indicateColor: 'bg-black/5 dark:bg-white/10',
			indicateActiveColor: 'bg-primary dark:bg-dark',
			radius: 'xl',
			indicateStyle: 'longLine'
		},
		{
			data: swiperData,
			containerWidth: 390,
			px: '16',
			py: '6',
			indicateInjClass: 'bg-none',
			indicateColor: 'bg-primary dark:bg-dark',
			indicateActiveColor: 'bg-primary dark:bg-dark',
			radius: 'xl',
			aspectRatio: [3, 1],
			innerInjClass: 'shadow-md shadow-black/20 dark:shadow-white/20',
			translateX: 100
		},
		{
			data: swiperData,
			containerWidth: 390,
			px: '4',
			py: '8',
			indicateInjClass: 'bg-none',
			indicateColor: 'bg-primary dark:bg-dark',
			indicateActiveColor: 'bg-primary dark:bg-dark',
			radius: 'xl',
			rotateY: 90,
			innerInjClass: 'shadow-md shadow-black/20 dark:shadow-white/20'
		},
		{
			data: swiperData,
			containerWidth: 390,
			px: '24',
			py: '8',
			indicateInjClass: 'bg-none',
			indicateColor: 'bg-primary dark:bg-dark',
			indicateActiveColor: 'bg-primary dark:bg-dark',
			innerInjClass: 'shadow-md shadow-black/20 dark:shadow-white/20',
			radius: 'xl',
			aspectRatio: [3, 1],
			translateX: 160,
			notActiveInjClass: 'grayscale'
		},
		{
			data: swiperData,
			indicateStyle: 'longLine',
			containerWidth: 390,
			px: '12',
			py: '8',
			indicateInjClass: 'bg-none',
			indicateColor: 'bg-black/5 dark:bg-white/10',
			indicateActiveColor: 'bg-primary dark:bg-dark',
			radius: 'xl',
			translateZ: 600,
			innerInjClass: 'shadow-md shadow-black/20 dark:shadow-white/20'
		}
	];
	const swiperOption = swiperOptions[Math.floor(Math.random() * swiperOptions.length)];
	//数组二级组成新数组
	const ArrChildFun = (arr: MenuList[]) => {
		const newArr = [];
		for (let e = 0; e < arr.length; e++) {
			newArr.push(...arr[e].childs);
		}
		return newArr;
	};
	const menuChildList = ArrChildFun(menuList);
	// 从 menuChildList 中随机取 3 个
	const randomMenuChildList = menuChildList.sort(() => Math.random() - 0.5).slice(0, 3);
	const textList = randomMenuChildList.map((item, index) => {
		return `${index + 1}. ${isZh ? item.tip : item.tip_en}`;
	});
	const labels = randomMenuChildList.map((item) => {
		return { text: isZh ? item.title_zh : item.title_en };
	});
	// Avatar radius 随机 'none'|'sm'|'xl'|'2xl'|'3xl'|'full'
	const avatarRadiusList = ['none', 'sm', 'xl', '2xl', '3xl', 'full'] as const;
	const avatarRadius = avatarRadiusList[Math.floor(Math.random() * avatarRadiusList.length)];
	const avatarImgs = ['/assets/images/home/wall_3.jpg', '/assets/images/home/avatar_1.jpg', null];
	const avatar = avatarImgs[Math.floor(Math.random() * avatarImgs.length)];
	// Switch radius 随机 'none'|'middle'|'full' ，inside 随机 'state'|'loading'|null
	const switchRadiusList = ['none', 'middle', 'full'];
	const switchRadius = switchRadiusList[Math.floor(Math.random() * switchRadiusList.length)] as 'none' | 'middle' | 'full';
	const switchInsideList = ['state', 'loading', null];
	const switchInside = switchInsideList[Math.floor(Math.random() * switchInsideList.length)] as 'state' | 'loading' | null;
	// Slider 随机 0-100
	const sliderValue = Math.floor(Math.random() * 100);
	// slider radius 随机 'none'|'full'|'sm'|'xl'
	const sliderRadiusList = ['none', 'full', 'sm', 'xl'];
	const sliderRadius = sliderRadiusList[Math.floor(Math.random() * sliderRadiusList.length)] as 'none' | 'full' | 'sm' | 'xl';
	// 列举 20 个与评分相关的 emoji 表情
	const emojiList1 = ['love', 'default'];
	const emojiList2 = ['👍', '👋', '👏', '🌺', '🏆', '🎯', '💯', '🎳', '🎖️'];
	// 随机出一个 emoji，emojiList1 的概率为 0.5，emojiList2 的概率为 0.5
	const emoji =
		Math.random() > 0.5
			? emojiList1[Math.floor(Math.random() * emojiList1.length)]
			: emojiList2[Math.floor(Math.random() * emojiList2.length)];
	// Tab radius 随机 'none'|'full'|'sm'|'xl'
	const tabRadiusList = ['none', 'full', 'sm', 'xl'];
	const tabRadius = tabRadiusList[Math.floor(Math.random() * tabRadiusList.length)] as 'none' | 'full' | 'sm' | 'xl';
	// lineType 随机 true 或 false
	const lineType = Math.random() > 0.5;
	// Pagination 随机总条数 50 - 200 和当前页，保证当前页在 1 - 总条数/10 之间
	const paginationTotal = Math.floor(Math.random() * 150) + 50;
	const paginationCurrent = Math.floor(Math.random() * (paginationTotal / 10)) + 1;
	// paginationType 随机 'block'|'bold'|'border'
	const paginationTypeList = ['block', 'bold', 'border'];
	const paginationType = paginationTypeList[Math.floor(Math.random() * paginationTypeList.length)] as 'block' | 'bold' | 'border';
	const paginationRadiusList = ['none', 'sm', 'md', 'lg', 'xl', 'full'];
	const paginationRadius = paginationRadiusList[Math.floor(Math.random() * paginationRadiusList.length)] as
		| 'none'
		| 'sm'
		| 'md'
		| 'lg'
		| 'xl'
		| 'full';
	const injPaginationRadiusList = {
		none: 'rounded-none',
		sm: 'rounded-sm',
		md: 'rounded-md',
		lg: 'rounded-lg',
		xl: 'rounded-xl',
		full: 'rounded-full'
	};
	const injPaginationRadius = injPaginationRadiusList[paginationRadius];
	// 随机主题
	const randomThemeFunc = () => {
		const item = themes[Math.floor(Math.random() * themes.length)];
		currentColorStore.set(item.name);
		localStorage.setItem('theme_color', item.name);
		const theme = item.theme;

		switchTheme(theme);
		// 修改 HTML 的 meta name="theme-color" 属性，适配 Safari 的 tab 背景色，需要设置 light 和 dark 两种颜色
		const safariLight = theme.color.primaryWhite;
		const safariDark = theme.color.darkBlack;
		// 查找 meta 标签，name="theme-color" 且 media="(prefers-color-scheme: light)"
		const lightMeta = document.querySelector('meta[name="theme-color"][media="(prefers-color-scheme: light)"]');
		// 查找 meta 标签，name="theme-color" 且 media="(prefers-color-scheme: dark)"
		const darkMeta = document.querySelector('meta[name="theme-color"][media="(prefers-color-scheme: dark)"]');
		// 如果找到了，就修改它的 content 属性
		if (lightMeta) {
			lightMeta.setAttribute('content', safariLight);
		}
		if (darkMeta) {
			darkMeta.setAttribute('content', safariDark);
		}
	};
	// randomMenuChildList 随机出一个
	const inputList = randomMenuChildList[Math.floor(Math.random() * randomMenuChildList.length)];
	const inputTitle = isZh ? inputList.title_zh : inputList.title_en;
	let inputValue = $state(isZh ? inputList.tip : inputList.tip_en);
	const inputRadiusList = ['none', 'full', 'sm', 'xl'];
	const inputRadius = inputRadiusList[Math.floor(Math.random() * inputRadiusList.length)] as 'none' | 'full' | 'sm' | 'xl';
	const inputStyleList = ['line', 'block'];
	const inputStyle = inputStyleList[Math.floor(Math.random() * inputStyleList.length)] as 'line' | 'block';
	let showInputConfetti = $derived(inputValue === inputTitle);
	// 当 inputValue === inputTitle 时，显示 confetti
	const inputFun = (v: string) => {
		inputValue = v;
	};

	const descList = [
		{
			title: 'Simple',
			titleZh: '简单',
			desc: '代码清晰，文档完善，易于使用。',
			descEn: 'Clear code, complete docs, easy to use.',
			icon: '/assets/images/home/s.jpeg',
			shwTip: false
		},
		{
			title: 'Thin',
			titleZh: '轻量',
			desc: '体积小，无依赖，适合移动端。',
			descEn: 'Small size, no deps, for mobile.',
			icon: '/assets/images/home/t.jpeg',
			shwTip: true
		},
		{
			title: 'Design',
			titleZh: '设计',
			desc: '优化移动端设计交互，支持主题配置。',
			descEn: 'Better mobile design & themes.',
			icon: '/assets/images/home/d.jpeg',
			shwTip: false
		},
		{
			title: 'Fast',
			titleZh: '快速',
			desc: '配套脚手架，无虚拟 DOM，性能卓越。',
			descEn: 'With CLI, no vDOM, high performance.',
			icon: '/assets/images/home/f.jpeg',
			shwTip: false
		}
	];
	const dominant = {
		title: '优势 & 目标',
		title_en: 'Advantages & Goals',
		data: [
			{
				icon: 'svelte',
				p: '丰富 Svelte 生态，助力开发者更高效地构建优质应用。',
				p_en: 'Enrich the Svelte ecosystem to help developers build quality applications more efficiently.'
			},
			{
				icon: 'css3-line',
				p: '简化 CSS 开发，让开发者专注业务逻辑，提升开发效率。',
				p_en: 'Simplify CSS development so developers can focus on business logic and improve productivity.'
			},
			{
				icon: 'contrast-2-line',
				p: '内置暗黑模式与主题配置，轻松打造现代化应用界面。',
				p_en: 'Built-in dark mode and theme configuration for easily creating modern application interfaces.'
			},
			{
				icon: 'paint-brush-line',
				p: '高度通用性。作为面向 C 端的移动组件库，特别注重 UI 的灵活性。',
				p_en: 'Highly versatile. As a C-end mobile component library, it particularly emphasizes UI flexibility.'
			},
			{
				icon: 'clockwise-line',
				p: '精心设计的交互体验。合理的动画过渡与交互设计，带来出色的用户体验。',
				p_en: 'Carefully designed interactions. Thoughtful animations and interaction design for excellent user experience.'
			},
			{
				icon: 'article-line',
				p: '完整的中英双语支持。文档、示例和源码注释清晰分离，一目了然。',
				p_en: 'Complete bilingual support. Documentation, examples and code comments are clearly separated in both languages.'
			},
			{
				icon: 'file-copy-2-line',
				p: '丰富的示例代码与开发工具，包含脚手架和插件，助力快速开发。',
				p_en: 'Rich example code and development tools, including scaffolding and plugins, to aid rapid development.'
			},
			{
				icon: 'planet-line',
				p: '强大的国际化能力，支持 60+ 种语言，轻松实现多语言应用。',
				p_en: 'Powerful internationalization with 60+ languages support for easily creating multilingual applications.'
			}
		]
	};
	const ugly = {
		title: '提前警告',
		title_en: 'Early Warning',
		data: [
			{
				icon: 'medal-line',
				p: 'STDF 不追求高大上的概念，只专注于为您提供简单实用的开发工具。',
				p_en: 'STDF focuses solely on providing practical development tools, without any fancy concepts.'
			},
			{
				icon: 'service-line',
				p: 'Svelte 生态仍在发展中，欢迎您加入我们一起建设更好的 Svelte 社区。',
				p_en: 'The Svelte ecosystem is still growing. We welcome you to join us in building a better Svelte community.'
			},
			{
				icon: 'bard-line',
				p: 'STDF 可能使用到 Vite、SvelteKit 等生态，建议先了解这些项目的核心概念。',
				p_en: 'STDF may use Vite, SvelteKit, etc. We recommend understanding their core concepts first.'
			},
			{
				icon: 'git-close-pull-request-line',
				p: 'STDF 支持 UnoCSS 等 Tailwind CSS 类库，使用前请先掌握相关基础知识。',
				p_en: 'STDF supports Tailwind CSS-like libraries such as UnoCSS. Please master the basics before using them.'
			}
		]
	};

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
				{ title: 'create-stdf', title_en: 'create-stdf', link: 'https://www.npmjs.com/package/create-stdf', _blank: true },
				{
					title: 'rollup-plugin-stdf-icon',
					title_en: 'rollup-plugin-stdf-icon',
					link: 'https://www.npmjs.com/package/rollup-plugin-stdf-icon',
					_blank: true
				},
				{
					title: 'rollup-plugin-md-ts',
					title_en: 'rollup-plugin-md-ts',
					link: 'https://www.npmjs.com/package/rollup-plugin-md-ts',
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
				{ title: '开源许可', title_en: 'License', link: 'https://github.com/any-tdf/stdf/blob/main/LICENSE', _blank: true }
			]
		},
		{
			title: '社区',
			title_en: 'Community',
			list: [
				{
					title: 'QQ 群',
					title_en: 'QQ Group',
					link: 'https://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=U8ZlXJ3KVpTI9oZzs1jBnyWc3gVA0h6Y&authKey=ScWu0nU9g8BqNsC7o2eYkESwgVDVz9vzGNZEb17MrEAay9%2F7bTkXDiLJRIzo2vrg&noverify=0&group_code=581073686',
					_blank: true
				},
				{ title: 'Discord', title_en: 'Discord', link: 'https://discord.gg/DMkHu8GGre', _blank: true },
				{ title: 'QQ 频道', title_en: 'QQ Discord', link: 'https://pd.qq.com/s/fdd8incyr', _blank: true },
				{ title: 'Discussions', title_en: 'Discussions', link: 'https://github.com/any-tdf/stdf/discussions', _blank: true }
			]
		}
	];
	let showQr = $state(false);

	const io = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
		for (const item of entries) {
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
		}
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
			text: `https://demo.stdf.design?lang=${isZh ? 'zh_CN' : 'en_US'}`,
			isSpace: false
		});
		const color = $currentThemeStore === 'dark' ? 'var(--color-dark)' : 'var(--color-primary)';
		A_a1Svg = rendererLine(qrcode, { posType: 2, otherColor: color, posColor: color });
		showQr = true;
	};

	onMount(() => {
		const intersectionList = document.querySelectorAll('.intersection');
		for (const item of intersectionList) {
			// 开始时 opacity 为 0，不可见，transform 为 translateY(200px)
			const target = item as HTMLElement;
			target.style.opacity = '0';
			target.style.transform = 'translateY(200px)';
			target.style.transitionDuration = '1s';
			io.observe(item);
		}
	});
</script>

<!-- <div style="width: 100%; height: 100vh; background: #f0f0f0"> -->
<!-- </div> -->

<div class="mx-auto max-w-[1536px]">
	<div class="justify-center lg:flex">
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
			<div class="text-6xl md:text-8xl">STDF</div>
			<div class="md:text-md mb-10 mt-4 px-4 text-gray-700 md:mb-0 dark:text-gray-300">
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
					class="bg-primary hover:bg-primary/80 dark:bg-dark hover:dark:bg-dark/80 group relative rounded-sm px-6 py-2 text-white transition-all dark:text-black"
				>
					<div class="group flex items-center gap-1">
						{isZh ? '开始使用' : 'Get Started'}
						<div class="size-3 translate-y-px">
							<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
								<rect
									x="6"
									y="14"
									width="10"
									height="2"
									fill="currentColor"
									class="group-hover:scale-x-135 transition-all duration-500 group-hover:-translate-x-2 group-hover:-translate-y-2"
								/>
								<path
									d="M8.48535 7.07129L1.41406 14.1426L0 12.7275L5.65625 7.07031L0 1.41406L1.41406 0L8.48535 7.07129Z"
									fill="currentColor"
									class="transition-all duration-500 group-hover:translate-x-2"
								/>
							</svg>
						</div>
						<span class="absolute left-1/2 top-0 hidden group-hover:block">
							<Confetti infinite rounded />
						</span>
					</div>
				</a>
				<!-- use:link -->
				<a
					href="/"
					onmouseleave={() => (showQr = false)}
					onmouseenter={mouseenterFun}
					class="border-primary dark:border-dark relative hidden rounded-sm border border-solid px-6 py-2 transition-all md:block"
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
				<a
					href={'https://demo.stdf.design?lang=' + (isZh ? 'zh_CN' : 'en_US')}
					target="_blank"
					class="border-primary dark:border-dark block rounded-sm border border-solid px-6 py-2 transition-all md:hidden"
				>
					{isZh ? '查看示例' : 'Examples'}
				</a>
			</div>
		</div>
		<div class="relative mt-10 hidden basis-3/5 xl:mt-0 xl:block">
			<div class="animate-elementUpDownMove1 -translate-x-18 absolute inset-1/2 size-20 -translate-y-12">
				{#if avatar}
					<Avatar size="md" radius={avatarRadius} image={avatar} injClass="shadow-lg dark:shadow-white/10" />
				{:else}
					<Avatar size="md" radius={avatarRadius} injClass="shadow-lg dark:shadow-white/10" />
				{/if}
			</div>
			<div class="animate-elementUpDownMove1 absolute inset-1/2 -translate-x-96 -translate-y-40">
				<Loading type={randomNumStr} theme />
			</div>
			<div class="animate-elementUpDownMove3 absolute inset-1/2 -translate-y-48 translate-x-52">
				<Switch radius={switchRadius} inside={switchInside} active />
			</div>
			<div class="animate-elementUpDownMove6 -translate-y-42 absolute inset-1/2 w-96 -translate-x-72">
				<Tab {labels} radius={tabRadius} {lineType} />
			</div>
			<div
				class="animate-elementUpDownMove5 w-84 absolute inset-1/2 h-24 translate-x-20 translate-y-6 rounded-lg bg-white px-2 shadow-lg dark:bg-black/80 dark:shadow-white/10"
			>
				<Input
					title={inputTitle}
					value={inputValue}
					{inputStyle}
					placeholder={isZh ? `请输入${inputTitle}` : `Input ${inputTitle}`}
					radius={inputRadius}
					lineTransition="left"
					clear
					onchange={inputFun}
				/>
				<span class="absolute left-0 top-1/2 {showInputConfetti ? 'block' : 'hidden'}">
					<Confetti infinite rounded x={[-0.5, 0.5]} y={[-0.5, 0.5]} />
				</span>
			</div>
			<div class="animate-elementUpDownMove6 absolute inset-1/2 w-96 translate-x-2 translate-y-48">
				<Pagination
					total={paginationTotal}
					type={paginationType}
					current={paginationCurrent}
					radius={paginationRadius}
					injClass="{injPaginationRadius} shadow-lg dark:shadow-white/10"
				/>
			</div>
			<div class="animate-elementUpDownMove4 absolute inset-1/2 w-64 -translate-x-80 -translate-y-8">
				{#if emoji === 'default'}
					<Rate />
				{:else}
					<Rate half opacity="0.2" value={3.5}>
						{#if emoji === 'love'}
							<Icon name="ri-heart-3-fill" injClass="text-[red]" />
						{:else}
							<div class="text-xl">{emoji}</div>
						{/if}
					</Rate>
				{/if}
			</div>
			<div
				class="animate-elementUpDownMove3 h-15 absolute inset-1/2 w-96 -translate-x-96 -translate-y-72 rounded-lg bg-white p-3 shadow-lg dark:bg-black/80 dark:shadow-white/10"
			>
				<NoticeBar vertical {textList}></NoticeBar>
			</div>
			<div class="animate-elementUpDownMove1 absolute inset-1/2 w-64 -translate-y-20 translate-x-32">
				<Slider value={sliderValue} showTip="always" radius={sliderRadius} />
			</div>
			<div class="animate-elementUpDownMove5 h-54 -translate-x-110 absolute inset-1/2 w-[390px] translate-y-16 overflow-hidden">
				<Swiper {...swiperOption} />
			</div>
			<div class="animate-elementUpDownMove1 -translate-y-74 group absolute inset-1/2 w-64 translate-x-32">
				<Button heightIn="2" onclick={randomThemeFunc}>
					<span class="transition-all duration-500 group-hover:translate-x-1">
						{themes.find((item) => item.name === $currentColorStore)?.[isZh ? 'name_CN' : 'name']}
					</span>
					<span
						class="ml-1 size-4 -translate-x-4 text-white opacity-0 transition-all delay-100 duration-500 group-hover:translate-x-0 group-hover:opacity-100 dark:text-black"
					>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
							<path
								d="M1.99974 13.0001L1.9996 11.0002L18.1715 11.0002L14.2218 7.05044L15.636 5.63623L22 12.0002L15.636 18.3642L14.2218 16.9499L18.1716 13.0002L1.99974 13.0001Z"
							></path>
						</svg>
					</span>
				</Button>
			</div>
		</div>
	</div>
	<div class="mt-16 flex flex-wrap justify-around gap-12 px-8 xl:flex-nowrap">
		{#each descList as desc}
			<div
				class="intersection shadow-primary/10 dark:shadow-dark/20 group flex w-full flex-col space-y-5 overflow-hidden rounded-2xl shadow-xl transition-all duration-300 sm:w-2/3 md:w-80 lg:w-96"
			>
				<div class="relative w-full">
					<img class="aspect-5/3 h-full w-full object-cover transition-all duration-500 group-hover:scale-125" src={desc.icon} alt="" />
					<div
						class="text-shadow-lg bg-primary/10 dark:bg-dark/10 absolute bottom-1.5 left-0 right-0 mx-1.5 flex flex-col justify-center rounded-2xl border border-white/20 px-3 py-1.5 text-white backdrop-blur-sm"
					>
						<div class="mb-0.5 text-3xl font-bold transition-all duration-500 group-hover:translate-x-4">{desc.title}</div>
						<div class="text-xs font-bold transition-all duration-500">
							{isZh ? desc.desc : desc.descEn}
						</div>
					</div>
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
						class="intersection shadow-primary/10 dark:shadow-dark/10 border-primary/10 dark:border-dark/20 group relative overflow-hidden rounded-xl border p-0.5 shadow-lg"
					>
						<div
							class="bg-primary absolute -left-1/2 top-1/3 hidden h-1/2 w-[200%] group-hover:block {$currentThemeStore === 'dark'
								? 'animate-spin-line-dark'
								: 'animate-spin-line'}"
						></div>
						<div class="bg-primaryWhite dark:bg-darkBlack relative rounded-lg p-4">
							<div class="text-primary dark:text-dark size-6 flex-none transition-all ease-out group-hover:scale-110">
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
						class="intersection shadow-primary/10 dark:shadow-dark/10 border-primary/10 dark:border-dark/20 group relative overflow-hidden rounded-xl border p-0.5 shadow-lg"
					>
						<div
							class="bg-primary absolute -left-1/2 top-1/3 hidden h-1/2 w-[200%] group-hover:block {$currentThemeStore === 'dark'
								? 'animate-spin-line-dark'
								: 'animate-spin-line'}"
						></div>
						<div class="bg-primaryWhite dark:bg-darkBlack relative rounded-lg p-4">
							<div class="text-primary dark:text-dark size-6 flex-none transition-all ease-out group-hover:scale-110">
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
<div class="bg-gray-100 dark:bg-gray-950">
	<div class="mx-auto grid max-w-[1536px] grid-cols-2 gap-10 px-6 py-10 md:grid-cols-4 md:px-20">
		{#each bottomInfo as item}
			<div>
				<div class="mb-2 text-lg font-bold">{isZh ? item.title : item.title_en}</div>
				<div class="flex flex-col gap-2">
					{#each item.list as i}
						<a href={i.link} target={i._blank ? '_blank' : '_self'} title={i.link} class="text-sm hover:underline">
							{isZh ? i.title : i.title_en}
						</a>
					{/each}
				</div>
			</div>
		{/each}
	</div>
</div>

<div class="py-4 text-center text-xs">
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
		background: conic-gradient(transparent 50deg, rgba(var(--color-primary), 0.4) 80deg, transparent 90deg);
	}
	.animate-spin-line-dark {
		animation: spin-line 6s linear infinite;
		background: conic-gradient(transparent 50deg, rgba(var(--color-dark), 0.6) 80deg, transparent 90deg);
	}
</style>
