<!-- IndexBar Demo -->
<script lang="ts">
	import { IndexBar, Button, Toast } from '$lib/index.js';
	import type { IndexBarItemProps } from '$lib/types/index.js';

	const addressList: IndexBarItemProps[] = [
		{ index: 'A', title: 'A', child: ['澳门', '安宁', '安庆', '鞍山'] },
		{ index: 'B', title: 'B', child: ['北京', '保定', '包头', '宝鸡'] },
		{ index: 'C', title: 'C', child: ['承德', '沧州', '赤峰'] },
		{ index: 'D', title: 'D', child: ['大同', '大连', '大理'] },
		{ index: 'E', title: 'E', child: ['恩施', '鄂尔多斯', '峨眉山'] },
		{ index: 'F', title: 'F', child: ['抚顺', '佛山', '福泉'] },
		{ index: 'G', title: 'G', child: ['个旧', '桂林', '赣州'] },
		{ index: 'H', title: 'H', child: ['邯郸', '呼和浩特', '呼伦贝尔'] },
		{ index: 'J', title: 'J', child: ['吉林', '酒泉', '晋江'] },
		{ index: 'K', title: 'K', child: ['昆明', '昆山', '开封'] },
		{ index: 'L', title: 'L', child: ['拉萨', '兰州', '泸州'] },
		{ index: 'M', title: 'M', child: ['绵阳', '马鞍山', '牡丹江'] },
		{ index: 'N', title: 'N', child: ['南昌', '南京', '宁波'] },
		{ index: 'P', title: 'P', child: ['莆田', '攀枝花', '平顶山'] },
		{ index: 'Q', title: 'Q', child: ['曲靖', '青岛', '齐齐哈尔'] },
		{ index: 'R', title: 'R', child: ['瑞丽', '瑞安', '瑞金'] },
		{ index: 'S', title: 'S', child: ['三亚', '上海', '深圳'] },
		{ index: 'T', title: 'T', child: ['台州', '太原', '天津'] },
		{ index: 'W', title: 'W', child: ['武汉', '无锡', '芜湖'] },
		{ index: 'X', title: 'X', child: ['西安', '厦门', '宣威'] },
		{ index: 'Y', title: 'Y', child: ['义乌', '银川', '玉溪'] },
		{ index: 'Z', title: 'Z', child: ['昭通', '遵义', '张家界'] }
	];
	const emojiList: IndexBarItemProps[] = [
		{ index: '😀', title: '表情与情感', child: ['😂', '🥰', '🥱', '🧐'] },
		{ index: '👋', title: '人物与身体', child: ['👌', '🤝', '👨‍💻', '💪'] },
		{ index: '🐵', title: '动物与自然', child: ['🦄', '🌱', '🦁', '🐶'] },
		{ index: '🍎', title: '食物与饮料', child: ['🍑', '🍞', '🍽️', '🍩'] },
		{ index: '🌍', title: '旅行与地理', child: ['🏔️', '🚆', '✈️', '🛵'] },
		{ index: '🏆', title: '活动', child: ['⚽', '🎨', '🏀', '🧨'] },
		{ index: '📱', title: '物品', child: ['🎩', '💻', '🎒', '📖'] },
		{ index: '⚠️', title: '符号标志', child: ['🚫', '⚛️', '🛄', '🔱'] },
		{ index: '🏁', title: '旗帜', child: ['🇨🇳', '🇺🇸', '🇧🇻', '🇦🇹'] }
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
	message={`点击了第 ${toastObj.index + 1} 组（${toastObj.group.title}）中的第 ${toastObj.childIndex + 1} 项（${toastObj.child}）`}
/>

<div class="sticky bottom-0 z-10 flex justify-between bg-white/90 px-2 dark:bg-black/90">
	<Button fill="lineTheme" size="auto" injClass="text-xs px-2" onclick={changeListFun}>切换数据</Button>
	<Button fill="lineTheme" size="auto" injClass="text-xs px-2" onclick={changeScrollAlignFun}>
		{scrollAlign ? '关闭' : '开启'}滚动对齐
	</Button>
	<Button fill="lineTheme" size="auto" injClass="text-xs px-2" onclick={changeRadiusFun}>切换圆角</Button>
	<Button fill="lineTheme" size="auto" injClass="text-xs px-2" onclick={changeClassFun}>切换样式</Button>
</div>
