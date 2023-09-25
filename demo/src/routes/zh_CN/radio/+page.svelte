<!-- Radio Demo -->
<script>
	import { RadioGroup, Radio, Divider, Button } from '../../../../../packages/stdf/components';

	const dota = [
		{ label: '主宰', name: '奶棒人', desc: '主宰是一个近战敏捷英雄，他能够迅速切入战斗。' },
		{ label: '白牛', name: '令狐冲', desc: '巴拉森，裂魂人是一个强大的 Gank 型的力量型近战英雄。' },
		{ label: '光法', name: '光之守卫', desc: '伊扎洛，光之守卫，他是一个著名的辅助性智力英雄。' },
		{ label: '猛犸', name: '马格纳斯', desc: '猛犸？为什么不 BAN 猛犸？为什么不 BAN 猛犸？' },
	];
	let value = dota[0].name;
	const dotaFun = e => {
		value = e.detail;
	};
	const dotaImgs = ['火女', '小牛', '水人', '火枪', '斯温'];
	let imgValue = dotaImgs[3];
	const dotaImgsFun = e => {
		imgValue = e.detail;
	};
	const dotaVoices = [
		{ label: '祈求者', name: '祈求者', voices: ['“来自于伟大的奥秘。”'] },
		{ label: '风暴之灵', name: '风暴之灵', voices: ['“喂~快醒醒，快喝点咖啡，我方上塔正遭受攻击。”'] },
		{
			label: '蝙蝠骑士',
			name: '蝙蝠骑士',
			voices: ['“哦，莉娜，当我的压寨夫人怎么样？”', '“哦，风行者，见着我你不用跑。”', '“水晶室女，你就像一个装满冰水的高脚杯。”'],
		},
		{ label: '潮汐猎人', name: '潮汐猎人', voices: ['“我还能吃下一根海藻。”'] },
	];
	let voiceValue = dotaVoices[0].name;
	const dotaVoicesFun = e => {
		voiceValue = e.detail;
	};
</script>

<div class="px-4">
	<div class="mt-8 mb-4 font-bold text-2xl">横向排列</div>
	<div class="mt-6 mb-4 font-bold text-lg">简单用法</div>
	<RadioGroup {value} horizontal>
		{#each dota as item}
			<Radio name={item.name}>{item.label}</Radio>
		{/each}
	</RadioGroup>

	<div class="mt-8 mb-4 font-bold text-lg">文字在不同位置</div>
	<RadioGroup {value} horizontal>
		{#each dota as item}
			<Radio name={item.name} textPosition="l">{item.label}</Radio>
		{/each}
	</RadioGroup>
	<Divider />
	<RadioGroup {value} horizontal>
		{#each dota as item}
			<Radio name={item.name} textPosition="b">{item.label}</Radio>
		{/each}
	</RadioGroup>
	<Divider />
	<RadioGroup {value} horizontal>
		{#each dota as item}
			<Radio name={item.name} textPosition="t">{item.label}</Radio>
		{/each}
	</RadioGroup>

	<div class="mt-8 mb-4 font-bold text-lg">自定义图标</div>
	<RadioGroup value="奶棒人" horizontal>
		<Radio icon={{ name: 'ri-checkbox-line' }} iconChecked={{ name: 'ri-checkbox-fill' }} name="奶棒人">主宰</Radio>
		<Radio icon={{ name: 'ri-checkbox-circle-line' }} iconChecked={{ name: 'ri-checkbox-circle-fill' }} name="令狐冲">白牛</Radio>
		<Radio icon={{ name: 'ri-checkbox-multiple-line' }} iconChecked={{ name: 'ri-checkbox-multiple-fill' }} name="光之守卫">光法</Radio>
		<Radio icon={{ name: 'ri-check-line' }} iconChecked={{ name: 'ri-check-fill' }} name="马格纳斯">猛犸</Radio>
	</RadioGroup>

	<div class="mt-8 mb-4 font-bold text-lg">图片选项</div>
	<RadioGroup value={imgValue} horizontal on:change={dotaImgsFun}>
		{#each dotaImgs as dota}
			<Radio name={dota} textPosition="t" icon={{ name: 'ri-arrow-up-s-line' }} iconChecked={{ name: 'ri-arrow-up-s-fill', size: 30 }}>
				<div class={`w-12 h-12 mb-1 rounded overflow-hidden ${imgValue === dota && 'ring-2 ring-primary dark:ring-dark'}`}>
					<img class="w-full h-full object-cover" src={`/assets/images/dota_${dota}.png`} alt="" />
				</div>
			</Radio>
		{/each}
	</RadioGroup>
	<div class="text-sm">什么，你又要选 <span class="text-[red] font-bold text-lg">{imgValue}！！</span></div>

	<div class="mt-8 mb-4 font-bold text-lg">不用图标 && 使用 Button</div>
	<RadioGroup {value} horizontal on:change={dotaFun}>
		{#each dota as item}
			<Radio name={item.name} icon="none" iconChecked="none">
				<Button fill={value === item.name ? 'base' : 'lineLight'} heightIn="0">{item.label}</Button>
			</Radio>
		{/each}
	</RadioGroup>

	<div class="mt-8 mb-4 font-bold text-lg">不用图标 && 自定义选中效果</div>
	<RadioGroup {value} horizontal on:change={dotaFun}>
		{#each dota as item}
			<Radio name={item.name} icon="none" iconChecked="none">
				<div
					class={`border py-0.5 px-5 text-sm rounded ${
						value === item.name
							? 'text-primary dark:text-dark bg-primary/10 dark:bg-dark/10'
							: 'bg-gray9 dark:bg-gray4 border-gray8 dark:border-gray5 text-gray6'
					}`}
				>
					{item.label}
				</div>
			</Radio>
		{/each}
	</RadioGroup>
</div>
<Divider />
<div class="px-4 pb-8">
	<div class="mb-4 font-bold text-2xl">纵向排列</div>
	<div class="mt-8 mb-4 font-bold text-lg">基础用法</div>
	<RadioGroup {value}>
		{#each dota as item}
			<Radio name={item.name}>{item.label}</Radio>
		{/each}
	</RadioGroup>

	<div class="mt-8 mb-4 font-bold text-lg">长文字选项</div>
	<RadioGroup {value}>
		{#each dota as item}
			<Radio name={item.name}>{item.desc}</Radio>
		{/each}
	</RadioGroup>

	<div class="mt-8 mb-4 font-bold text-lg">文字靠左</div>
	<RadioGroup {value}>
		{#each dota as item, i}
			<Radio name={item.name} textPosition="l">
				{item.label}
				{#if i !== dota.length - 1}
					<div class="h-px mt-1 bg-gray8 dark:bg-gray5" />
				{/if}
			</Radio>
		{/each}
	</RadioGroup>

	<div class="mt-8 mb-4 font-bold text-lg">复杂选项 && 自定义选中效果</div>
	<RadioGroup value={voiceValue} on:change={dotaVoicesFun}>
		{#each dotaVoices as item, i}
			<Radio name={item.name}>
				<div class={`ml-2 ${voiceValue === item.name ? 'text-primary dark:text-dark' : ''}`}>
					{item.label}
					{#each item.voices as voice}
						<div class="text-xs">{voice}</div>
					{/each}
					{#if i !== dotaVoices.length - 1}
						<div class="h-px mt-1 bg-gray8 dark:bg-gray5" />
					{/if}
				</div>
			</Radio>
		{/each}
	</RadioGroup>
</div>
