import type { SwiperImgProps, SwiperProps } from 'stdf/types';

// 主题名称中文翻译映射
export const themeLabels: Record<string, string> = {
	STDF: 'STDF',
	Nintendo: '红蓝天堂',
	Ocean: '海蓝金沙',
	Forest: '翠林暖棕',
	Sunset: '橙霞蓝天',
	Cherry: '粉樱翠影',
	Twilight: '暮紫粉霞',
	Amber: '琥珀紫韵',
	Mint: '薄荷玫红',
	Coral: '珊瑚碧蓝',
	Slate: '石墨暖棕',
	Emerald: '翡翠丹霞',
	Crimson: '绯红碧波',
	Navy: '藏蓝珊瑚',
	Olive: '橄榄紫烟',
	Plum: '梅紫青翠',
	Cyan: '青碧暖橙',
	Tangerine: '蜜橘深蓝',
	Sage: '草绿粉紫',
	Berry: '浆紫嫩绿',
	Wine: '酒红翠青',
	IKEA: '宜家蓝黄',
	Ferrari: '法拉红金',
	Tiffany: '蒂芙蓝白',
	Pepsi: '百事蓝红',
	Spotify: '声田绿米',
	Netflix: '奈飞红白',
	Hermes: '爱马橙棕',
	CocaCola: '可乐红白',
	Starbucks: '星巴绿棕',
	McDonalds: '金拱红黄',
	Gucci: '古驰绿红',
	Chanel: '香奈黑米',
	Rolex: '劳力绿金',
	LouisVuitton: '路威棕金',
	Mastercard: '万事红橙',
	Sepia: '泛黄记忆',
	GoldWood: '金色森林',
	CyberNeon: '赛博霓虹',
	Aurora: '极光幻夜',
	Terracotta: '陶青梦境',
	Sakura: '靛蓝樱花'
};

// Swiper 图片数据
export const swiperData: SwiperImgProps[] = [
	{ type: 'img', url: '/assets/images/home/wall_1.jpg' },
	{ type: 'img', url: '/assets/images/home/wall_2.jpg' },
	{ type: 'img', url: '/assets/images/home/wall_3.jpg' },
	{ type: 'img', url: '/assets/images/home/wall_4.jpg' }
];

// Swiper 配置选项
export const swiperOptions: SwiperProps[] = [
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

// STDF 四大特性
export const descList = [
	{
		title: 'Simple',
		titleZh: '简单',
		desc: '代码清晰，文档完善，易于使用。',
		descEn: 'Clear code, complete docs, easy to use.',
		icon: '/assets/images/home/s.jpeg',
		icon_d: '/assets/images/home/s-d.png',
		shwTip: false
	},
	{
		title: 'Tiny',
		titleZh: '轻量',
		desc: '体积小，无依赖，适合移动端。',
		descEn: 'Small size, no deps, for mobile.',
		icon: '/assets/images/home/t.jpeg',
		icon_d: '/assets/images/home/t-d.png',
		shwTip: true
	},
	{
		title: 'Design',
		titleZh: '设计',
		desc: '优化移动端设计交互，支持主题配置。',
		descEn: 'Better mobile design & themes.',
		icon: '/assets/images/home/d.jpeg',
		icon_d: '/assets/images/home/d-d.png',
		shwTip: false
	},
	{
		title: 'Fast',
		titleZh: '快速',
		desc: '配套脚手架，无虚拟 DOM，性能卓越。',
		descEn: 'With CLI, no vDOM, high performance.',
		icon: '/assets/images/home/f.jpeg',
		icon_d: '/assets/images/home/f.jpeg',
		shwTip: false
	}
];

// 优势 & 目标
export const dominant = {
	title: '优势 & 目标',
	title_en: 'Advantages & Goals',
	data: [
		{
			icon: 'svelte',
			p: '丰富 Svelte 生态，为开发者提供高效、优质的组件库。',
			p_en: 'Enrich the Svelte ecosystem by providing efficient, high-quality component library.'
		},
		{
			icon: 'css3-line',
			p: '简化 CSS 开发流程，让开发者专注业务逻辑实现。',
			p_en: 'Streamline CSS development so developers can focus on business logic implementation.'
		},
		{
			icon: 'contrast-2-line',
			p: '内置暗黑模式与主题系统，轻松构建现代化界面。',
			p_en: 'Built-in dark mode and theming system for easily creating modern interfaces.'
		},
		{
			icon: 'paint-brush-line',
			p: '面向移动端的通用组件库，提供灵活的 UI 定制能力。',
			p_en: 'A versatile mobile component library with flexible UI customization capabilities.'
		},
		{
			icon: 'clockwise-line',
			p: '精心设计的交互体验，流畅的动画过渡，带来极致用户体验。',
			p_en: 'Carefully crafted interactions with smooth animations for ultimate user experience.'
		},
		{
			icon: 'article-line',
			p: '完整的中英文支持，文档、示例和注释清晰完整。',
			p_en: 'Full Chinese and English support with clear documentation, examples and comments.'
		},
		{
			icon: 'file-copy-2-line',
			p: '提供完善的脚手架和插件，助力开发者高效开发。',
			p_en: 'Provides comprehensive scaffolding and plugins for efficient development.'
		},
		{
			icon: 'planet-line',
			p: '强大的国际化支持，内置 60+ 语言包，快速实现多语言应用。',
			p_en: 'Powerful i18n with 60+ built-in language packs for quick multilingual implementation.'
		}
	]
};

// 提前警告
export const ugly = {
	title: '提前警告',
	title_en: 'Early Warning',
	data: [
		{
			icon: 'hammer-line',
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
			icon: 'css3-line',
			p: 'STDF 支持 UnoCSS 等 Tailwind CSS 类库，使用前请先掌握相关基础知识。',
			p_en: 'STDF supports Tailwind CSS-like libraries such as UnoCSS. Please master the basics before using them.'
		}
	]
};

// 赞助人员
export const thinkGithub = [
	{ name: 'sbscan', amount: 100 },
	{ name: 'MuGuiLin', amount: 50 },
	{ name: 'yuedanlabs', amount: 10 }
];

// 底部链接信息
export const bottomInfo = [
	{
		title: '相关',
		title_en: 'Related',
		list: [
			{ title: 'Svelte', title_en: 'Svelte', link: 'https://svelte.dev', _blank: true },
			{ title: 'Tailwind', title_en: 'Tailwind', link: 'https://tailwindcss.com', _blank: true },
			{ title: 'Remix Icon', title_en: 'Remix Icon', link: 'https://remixicon.com', _blank: true }
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

// Avatar 圆角配置
export const avatarRadiusList = ['none', 'sm', 'xl', '2xl', '3xl', 'full'] as const;
export type AvatarRadius = (typeof avatarRadiusList)[number];

// Avatar 图片配置
export const avatarImgs = ['/assets/images/home/wall_3.jpg', '/assets/images/home/avatar_1.jpg', null];

// Switch 圆角配置
export const switchRadiusList = ['none', 'middle', 'full'] as const;
export type SwitchRadius = (typeof switchRadiusList)[number];

// Switch inside 配置
export const switchInsideList = ['state', 'loading', null] as const;
export type SwitchInside = (typeof switchInsideList)[number];

// Slider 圆角配置
export const sliderRadiusList = ['none', 'full', 'sm', 'xl'] as const;
export type SliderRadius = (typeof sliderRadiusList)[number];

// Slider showTip 配置
export const sliderShowTipList = ['always', 'never', 'touch'] as const;
export type SliderShowTip = (typeof sliderShowTipList)[number];

// Rate emoji 配置
export const emojiList1 = ['love', 'default'];
export const emojiList2 = ['👍', '👋', '👏', '🌺', '🏆', '🎯', '💯', '🎳', '🎖️'];

// Tab 圆角配置
export const tabRadiusList = ['none', 'full', 'sm', 'xl'] as const;
export type TabRadius = (typeof tabRadiusList)[number];

// Pagination type 配置
export const paginationTypeList = ['block', 'bold', 'border'] as const;
export type PaginationType = (typeof paginationTypeList)[number];

// Pagination radius 配置
export const paginationRadiusList = ['none', 'sm', 'md', 'lg', 'xl', 'full'] as const;
export type PaginationRadius = (typeof paginationRadiusList)[number];

// Pagination 圆角 class 映射
export const injPaginationRadiusMap: Record<PaginationRadius, string> = {
	none: 'rounded-none',
	sm: 'rounded-sm',
	md: 'rounded-md',
	lg: 'rounded-lg',
	xl: 'rounded-xl',
	full: 'rounded-full'
};

// Input 圆角配置
export const inputRadiusList = ['none', 'full', 'sm', 'xl'] as const;
export type InputRadius = (typeof inputRadiusList)[number];

// Input style 配置
export const inputStyleList = ['line', 'block'] as const;
export type InputStyle = (typeof inputStyleList)[number];

// 随机选择工具函数
export const randomPick = <T>(arr: readonly T[] | T[]): T => {
	return arr[Math.floor(Math.random() * arr.length)];
};

// 随机范围数字
export const randomRange = (min: number, max: number): number => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

// 随机布尔值
export const randomBool = (probability = 0.5): boolean => {
	return Math.random() > probability;
};

// 获取随机 Swiper 配置
export const getRandomSwiperOption = (): SwiperProps => {
	return randomPick(swiperOptions);
};

// 获取随机 emoji
export const getRandomEmoji = (): string => {
	return randomBool() ? randomPick(emojiList1) : randomPick(emojiList2);
};
