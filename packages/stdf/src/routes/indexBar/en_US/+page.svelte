<!-- IndexBar Demo -->
<script lang="ts">
	import { IndexBar, Button, Toast } from '$lib/index.js';
	import type { IndexBarItemProps } from '$lib/types/index.js';

	const addressList: IndexBarItemProps[] = [
		{ index: 'A', title: 'A', child: ['Macau', 'Anning', 'Anqing', 'Anshan'] },
		{ index: 'B', title: 'B', child: ['Beijing', 'Baoding', 'Baotou', 'Baoji'] },
		{ index: 'C', title: 'C', child: ['Chengde', 'Cangzhou', 'Chifeng'] },
		{ index: 'D', title: 'D', child: ['Datong', 'Dalian', 'Dali'] },
		{ index: 'E', title: 'E', child: ['Enshi', 'Ordos', 'Emeishan'] },
		{ index: 'F', title: 'F', child: ['Fushun', 'Foshan', 'Fuquan'] },
		{ index: 'G', title: 'G', child: ['Gejiu', 'Guilin', 'Ganzhou'] },
		{ index: 'H', title: 'H', child: ['Handan', 'Hohhot', 'Hulunbuir'] },
		{ index: 'J', title: 'J', child: ['Jilin', 'Jiuquan', 'Jinjiang'] },
		{ index: 'K', title: 'K', child: ['Kunming', 'Kunshan', 'Kaifeng'] },
		{ index: 'L', title: 'L', child: ['Lhasa', 'Lanzhou', 'Luzhou'] },
		{ index: 'M', title: 'M', child: ['Mianyang', 'Maans', 'Mudanjiang'] },
		{ index: 'N', title: 'N', child: ['Nanchang', 'Nanjing', 'Ningbo'] },
		{ index: 'P', title: 'P', child: ['Putian', 'Panzhihua', 'Pingdingshan'] },
		{ index: 'Q', title: 'Q', child: ['Qujing', 'Qingdao', 'Qiqihar'] },
		{ index: 'R', title: 'R', child: ['Ruili', 'Ruian', 'Ruijin'] },
		{ index: 'S', title: 'S', child: ['Sanya', 'Shanghai', 'Shenzhen'] },
		{ index: 'T', title: 'T', child: ['Taizhou', 'Taiyuan', 'Tianjin'] },
		{ index: 'W', title: 'W', child: ['Wuhan', 'Wuxi', 'Wuhu'] },
		{ index: 'X', title: 'X', child: ['Xi an', 'Xiamen', 'Xuanwei'] },
		{ index: 'Y', title: 'Y', child: ['Yiwu', 'Yinchuan', 'Yuxi'] },
		{ index: 'Z', title: 'Z', child: ['Zhaotong', 'Zunyi', 'Zhangjiajie'] }
	];

	const emojiList: IndexBarItemProps[] = [
		{ index: '😀', title: 'Smileys & Emotion', child: ['😂', '🥰', '🥱', '🧐'] },
		{ index: '👋', title: 'People & Body', child: ['👌', '🤝', '👨‍💻', '💪'] },
		{ index: '🐵', title: 'Animals & Nature', child: ['🦄', '🌱', '🦁', '🐶'] },
		{ index: '🍎', title: 'Food & Drink', child: ['🍑', '🍞', '🍽️', '🍩'] },
		{ index: '🌍', title: 'Travel & Places', child: ['🏔️', '🚆', '✈️', '🛵'] },
		{ index: '🏆', title: 'Activities', child: ['⚽', '🎨', '🏀', '🧨'] },
		{ index: '📱', title: 'Objects', child: ['🎩', '💻', '🎒', '📖'] },
		{ index: '⚠️', title: 'Symbols', child: ['🚫', '⚛️', '🛄', '🔱'] },
		{ index: '🏁', title: 'Flags', child: ['🇨🇳', '🇺🇸', '🇧🇻', '🇦🇹'] }
	];
	const movieTVList: IndexBarItemProps[] = [
		{
			index: '三',
			title: '三体',
			child: [
				'地球往事',
				'黑暗森林',
				'死神永生',
				'科学边界',
				'射手和农场主',
				'寂静的春天',
				'宇宙闪烁',
				'地球叛军',
				'古筝行动',
				'智子',
				'面壁者',
				'咒语',
				'黑暗森林',
				'危机纪元',
				'威慑纪元',
				'广播纪元',
				'掩体纪元',
				'银河纪元',
				'时间开始',
				'时间之外，我们的宇宙'
			]
		},
		{
			index: '流',
			title: '流浪地球',
			child: [
				'人类的勇气和坚毅必将被镌刻在星空之下。',
				'希望是像钻石一样珍贵的东西！',
				'希望，希望是我们唯一回家的方向。',
				'让人类永远保持理智，是一种奢求。',
				'道路千万条，安全第一条；行车不规范，亲人两行泪！',
				'那时候人们还没注意到太阳，人们更喜欢叫做钱的东西。',
				'为了我们的孩子，没有什么不能失去的了',
				'moss 没有叛逃！',
				'火石没了，我老婆孩子全他妈白死了！'
			]
		},
		{
			index: '仙',
			title: '仙剑奇侠传',
			child: [
				'既不回头，何必不忘。既然无缘，何必誓言。',
				'没有值得不值得，只有愿意不愿意。',
				'不曾得到，谈何放下。既已得到，又如何放下。',
				'轮回的是故人，不变的是初心！',
				'明夕何夕，君已陌路。',
				'我曾经也拥有过爱，只是，我放弃了。',
				'你以为每天看到的东西，就会抓得住吗？',
				'世有无情人，却有痴情妖。',
				'君子，小人，皆在一念思量。',
				'到家了，一定要叫醒我，我怕我醒不过来。',
				'如果得道就是牺牲所有人来成全自己，我宁愿执迷不悟。',
				'我们今日一别，让我们十年后再相见，不见不散！',
				'一杯愁绪，几段情缘，莫过，与君对酒当歌。'
			]
		}
	];
	const navHeight = 48;
	const bottomHeight = 50;
	const height = window.innerHeight - navHeight - bottomHeight;
	/**
	 * @type {'base' | 'full' | 'none'}
	 */
	let radius: 'middle' | 'full' | 'none' = $state('middle');
	let dataFlag = $state(0);
	let scrollAlign = $state(true);
	let injClassList: string[] = $state([]);
	const changeRadiusFun = () => {
		radius = radius === 'middle' ? 'full' : radius === 'full' ? 'none' : 'middle';
	};
	const changeListFun = () => {
		dataFlag = dataFlag === 0 ? 1 : dataFlag === 1 ? 2 : 0;
	};
	const changeScrollAlignFun = () => {
		scrollAlign = !scrollAlign;
	};
	const changeClassFun = () => {
		injClassList = !injClassList.length ? ['!text-3xl text-center', 'text-xs text-center !py-1'] : [];
	};
	let visible = $state(false);
	let toastObj = $state({ index: 0, group: { title: '' }, childIndex: 0, child: '' });
</script>

{#if dataFlag === 0}
	<IndexBar
		data={addressList}
		{radius}
		{height}
		{scrollAlign}
		titleInjClass={injClassList[0]}
		textInjClass={injClassList[1]}
		top={navHeight}
		onclickChild={(index, group, childIndex, child) => {
			toastObj = { index, group, childIndex, child };
			visible = true;
		}}
	/>
{:else if dataFlag === 1}
	<IndexBar
		data={emojiList}
		{radius}
		{height}
		{scrollAlign}
		titleInjClass={injClassList[0]}
		textInjClass={injClassList[1]}
		top={navHeight}
		onclickChild={(index, group, childIndex, child) => {
			toastObj = { index, group, childIndex, child };
			visible = true;
		}}
	/>
{:else}
	<IndexBar
		data={movieTVList}
		{radius}
		{height}
		{scrollAlign}
		titleInjClass={injClassList[0]}
		textInjClass={injClassList[1]}
		top={navHeight}
		onclickChild={(index, group, childIndex, child) => {
			toastObj = { index, group, childIndex, child };
			visible = true;
		}}
	/>
{/if}
<Toast
	bind:visible
	message={`Clicked ${toastObj.index + 1} group(${toastObj.group.title}) ${toastObj.childIndex + 1} item(${toastObj.child})`}
/>

<div class="sticky bottom-0 z-10 flex justify-between bg-white/90 px-2 dark:bg-black/90">
	<Button fill="lineTheme" size="auto" injClass="text-xs px-2" onclick={changeListFun}>Switch data</Button>
	<Button fill="lineTheme" size="auto" injClass="text-xs px-2" onclick={changeScrollAlignFun}>
		{scrollAlign ? 'open' : 'close'} Align
	</Button>
	<Button fill="lineTheme" size="auto" injClass="text-xs px-2" onclick={changeRadiusFun}>Switch rounded</Button>
	<Button fill="lineTheme" size="auto" injClass="text-xs px-2" onclick={changeClassFun}>Switch style</Button>
</div>
