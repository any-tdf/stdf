<!-- Checkbox Demo -->
<script>
	import { CheckboxGroup, Checkbox, Divider, Button } from '../../../../../packages/stdf/components';
	import { onMount } from 'svelte';
	import { quintOut } from 'svelte/easing';
	import { crossfade } from 'svelte/transition';
	import { flip } from 'svelte/animate';

	const dota = [
		{ label: '主宰', name: '奶棒人', desc: '主宰是一个近战敏捷英雄，他能够迅速切入战斗。' },
		{ label: '白牛', name: '令狐冲', desc: '巴拉森，裂魂人是一个强大的 Gank 型的力量型近战英雄。' },
		{ label: '光法', name: '光之守卫', desc: '伊扎洛，光之守卫，他是一个著名的辅助性智力英雄。' },
		{ label: '猛犸', name: '马格纳斯', desc: '猛犸？为什么不 BAN 猛犸？为什么不 BAN 猛犸？' },
	];
	let checkeds = [];
	const dotaFun = e => {
		checkeds = e.detail;
	};

	const dotaImgs = ['火女', '小牛', '水人', '火枪', '斯温'];
	let imgCheckeds = ['火女'];
	const dotaImgsFun = e => {
		imgCheckeds = e.detail;
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
	let voiceCheckeds = [];
	const dotaVoicesFun = e => {
		voiceCheckeds = e.detail;
	};

	const dotaInlines = ['火女', '小牛', '水人', '火枪', '斯温', '祈求者', '潮汐', '蝙蝠', '猛犸'];
	let checkInlines = ['小牛', '水人'];
	const dotaInlineFun = e => {
		checkInlines = e.detail;
	};

	const dotaAll = ['火女', '小牛', '水人', '火枪', '斯温', '祈求者', '潮汐', '蝙蝠', '猛犸'];
	let checkDotas = ['火枪', '斯温'];
	$: noCheckDotas = dotaAll.filter(a => !checkDotas.some(b => b === a));
	let outControl = true;
	// 点击单项
	const dotaAllFun = e => {
		outControl = false;
		checkDotas = e.detail;
	};
	// 全选
	const checkAllFun = () => {
		outControl = true;
		checkDotas = dotaAll;
	};
	// 全不选
	const checkNoneFun = () => {
		outControl = true;
		checkDotas = [];
	};
	// 反选
	const checkReverseFun = () => {
		outControl = true;
		checkDotas = dotaAll.filter(a => !checkDotas.some(b => b === a));
	};

	const animates = ['火女', '小牛', '水人', '火枪', '斯温', '祈求者', '潮汐', '蝙蝠', '猛犸'];
	let animateNos = ['火女', '小牛', '水人', '火枪', '斯温', '祈求者'];
	$: animateYess = animates.filter(a => !animateNos.some(b => b === a));
	const checkAnimateNoFun = e => {
		animateNos = animateNos.filter(a => !e.detail.some(b => b === a));
	};
	const checkAnimaYesFun = e => {
		animateNos = animates.filter(a => !e.detail.some(b => b === a));
	};
	const [send, receive] = crossfade({
		duration: d => Math.sqrt(d * 150),
		fallback(node) {
			const style = getComputedStyle(node);
			const transform = style.transform === 'none' ? '' : style.transform;
			return {
				duration: 600,
				easing: quintOut,
				css: t => `
					transform: ${transform} scale(${t});
					opacity: ${t}
				`,
			};
		},
	});
	// 设定高度，避免页面高度变化影响点击体验。
	let heights = 0;
	let animateHeight = 0;
	onMount(() => {
		animateHeight = (heights / 6) * 9 + 32;
	});
</script>

<div class="px-4">
	<div class="mt-8 mb-4 font-bold text-2xl">横向排列</div>
	<div class="mt-6 mb-4 font-bold text-lg">简单用法</div>
	<CheckboxGroup layout="h">
		{#each dota as item}
			<Checkbox {checkeds} name={item.name}>{item.label}</Checkbox>
		{/each}
	</CheckboxGroup>

	<div class="mt-8 mb-4 font-bold text-lg">文字在不同位置</div>
	<CheckboxGroup layout="h">
		{#each dota as item}
			<Checkbox {checkeds} name={item.name} textPosition="l">{item.label}</Checkbox>
		{/each}
	</CheckboxGroup>
	<Divider />
	<CheckboxGroup layout="h">
		{#each dota as item}
			<Checkbox {checkeds} name={item.name} textPosition="b">{item.label}</Checkbox>
		{/each}
	</CheckboxGroup>
	<Divider />
	<CheckboxGroup layout="h">
		{#each dota as item}
			<Checkbox {checkeds} name={item.name} textPosition="t">{item.label}</Checkbox>
		{/each}
	</CheckboxGroup>

	<div class="mt-8 mb-4 font-bold text-lg">自定义图标</div>
	<CheckboxGroup layout="h">
		<Checkbox checkeds={[]} icon={{ name: 'ri-checkbox-blank-circle-line' }} iconChecked={{ name: 'ri-radio-button-fill' }} name="奶棒人"
			>主宰</Checkbox
		>
		<Checkbox checkeds={[]} icon={{ name: 'ri-checkbox-circle-line' }} iconChecked={{ name: 'ri-checkbox-circle-fill' }} name="令狐冲"
			>白牛</Checkbox
		>
		<Checkbox checkeds={[]} icon={{ name: 'ri-checkbox-multiple-line' }} iconChecked={{ name: 'ri-checkbox-multiple-fill' }} name="光之守卫"
			>光法</Checkbox
		>
		<Checkbox checkeds={[]} icon={{ name: 'ri-check-line' }} iconChecked={{ name: 'ri-check-fill' }} name="马格纳斯">猛犸</Checkbox>
	</CheckboxGroup>

	<div class="mt-8 mb-4 font-bold text-lg">图片选项</div>
	<CheckboxGroup layout="h" on:change={dotaImgsFun}>
		{#each dotaImgs as dota}
			<Checkbox
				name={dota}
				textPosition="t"
				icon={{ name: 'ri-arrow-up-s-line' }}
				iconChecked={{ name: 'ri-arrow-up-s-fill' }}
				outControl
				checkeds={imgCheckeds}
			>
				<div class={`w-12 h-12 mb-1 rounded overflow-hidden ${imgCheckeds.includes(dota) ? 'ring-2 ring-primary dark:ring-dark' : ''}`}>
					<img class="w-full h-full object-cover" src={`/assets/images/dota_${dota}.png`} alt="" />
				</div>
			</Checkbox>
		{/each}
	</CheckboxGroup>
	<div class="text-sm">
		{imgCheckeds.length > 0 ? '已选' : '未选择任何英雄。'}
		<span class="text-[red]">{imgCheckeds.join(' + ')}</span>{imgCheckeds.length > 0 ? '。' : ''}
	</div>

	<div class="mt-8 mb-4 font-bold text-lg">不用图标 && 使用 Button</div>
	<CheckboxGroup layout="h" on:change={dotaFun}>
		{#each dota as item}
			<Checkbox {checkeds} name={item.name} icon="none" iconChecked="none">
				<Button fill={checkeds.includes(item.name) ? 'base' : 'lineLight'} size="auto" injClass="px-4">{item.label}</Button>
			</Checkbox>
		{/each}
	</CheckboxGroup>

	<div class="mt-8 mb-4 font-bold text-lg">不用图标 && 自定义选中效果</div>
	<CheckboxGroup layout="h" on:change={dotaFun}>
		{#each dota as item}
			<Checkbox {checkeds} name={item.name} icon="none" iconChecked="none">
				<div
					class={`border py-0.5 px-5 text-sm rounded ${
						checkeds.includes(item.name)
							? 'text-primary dark:text-dark bg-primary/10 dark:bg-dark/10'
							: 'bg-gray-100 dark:bg-gray-600 border-gray-200 dark:border-gray-500'
					}`}
				>
					{item.label}
				</div>
			</Checkbox>
		{/each}
	</CheckboxGroup>
</div>
<Divider />

<div class="px-4">
	<div class="mb-4 font-bold text-2xl">行内元素排列</div>
	<div class="mt-8 mb-4 font-bold text-lg">不用图标 && 行内元素排列111</div>
	<CheckboxGroup layout="inline" on:change={dotaInlineFun}>
		{#each dotaInlines as item}
			<Checkbox name={item} checkeds={checkInlines} icon="none" iconChecked="none">
				<div
					class={`border py-0.5 px-1 m-1 text-sm rounded ${
						checkInlines.includes(item)
							? 'text-primary dark:text-dark bg-primary/10 dark:bg-dark/10'
							: 'bg-gray-100 dark:bg-gray-600 border-gray-200 dark:border-gray-500'
					}`}
				>
					{item}
				</div>
			</Checkbox>
		{/each}
	</CheckboxGroup>
	<div class="text-xs mt-2">已选：{checkInlines.join('-')}</div>
</div>
<Divider />

<div class="px-4 pb-8">
	<div class="mb-4 font-bold text-2xl">纵向排列</div>
	<div class="mt-8 mb-4 font-bold text-lg">基础用法</div>
	<CheckboxGroup>
		{#each dota as item}
			<Checkbox {checkeds} name={item.name}>{item.label}</Checkbox>
		{/each}
	</CheckboxGroup>

	<div class="mt-8 mb-4 font-bold text-lg">长文字选项</div>
	<CheckboxGroup>
		{#each dota as item}
			<Checkbox {checkeds} name={item.name}>{item.desc}</Checkbox>
		{/each}
	</CheckboxGroup>

	<div class="mt-8 mb-4 font-bold text-lg">文字靠左</div>
	<CheckboxGroup>
		{#each dota as item, i}
			<Checkbox {checkeds} name={item.name} textPosition="l">
				{item.label}
				{#if i !== dota.length - 1}
					<div class="h-px mt-1 bg-gray-200 dark:bg-gray-800" />
				{/if}
			</Checkbox>
		{/each}
	</CheckboxGroup>

	<div class="mt-8 mb-4 font-bold text-lg">复杂选项 && 自定义选中效果</div>
	<CheckboxGroup on:change={dotaVoicesFun}>
		{#each dotaVoices as item, i}
			<Checkbox checkeds={voiceCheckeds} name={item.name}>
				<div class={`ml-2 ${voiceCheckeds.includes(item.name) ? 'text-primary dark:text-dark' : ''}`}>
					{item.label}
					{#each item.voices as voice}
						<div class="text-xs">{voice}</div>
					{/each}
					{#if i !== dotaVoices.length - 1}
						<div class="h-px mt-1 bg-gray-200 dark:bg-gray-800" />
					{/if}
				</div>
			</Checkbox>
		{/each}
	</CheckboxGroup>

	<div class="mt-8 mb-4 font-bold text-lg">批量操作</div>
	<CheckboxGroup on:change={dotaAllFun}>
		{#each dotaAll as item}
			<Checkbox checkeds={checkDotas} name={item} {outControl}>{item}</Checkbox>
		{/each}
	</CheckboxGroup>
	<div class="text-xs mt-2">已选：{checkDotas.join('-')}</div>
	<div class="text-xs mt-2">未选：{noCheckDotas.join('-')}</div>
	<div class="flex mt-2">
		<div class="flex-1">
			<Button fill="lineTheme" heightIn="1" on:click={checkAllFun}>全选</Button>
		</div>
		<div class="flex-1">
			<Button fill="lineTheme" heightIn="1" on:click={checkNoneFun}>全不选</Button>
		</div>
		<div class="flex-1">
			<Button fill="lineTheme" heightIn="1" on:click={checkReverseFun}>反选</Button>
		</div>
	</div>

	<div class="mt-8 mb-4 font-bold text-lg">带动画</div>
	<div class="flex" style="height: {animateHeight}px;">
		<div class="flex-1">
			<div class="pb-2">未选</div>
			<div bind:clientHeight={heights}>
				<CheckboxGroup on:change={checkAnimateNoFun}>
					{#each animateNos as item (item)}
						<div in:receive={{ key: item }} out:send={{ key: item }} animate:flip={{ duration: 600 }}>
							<Checkbox name={item} outControl checkeds={[]}>{item}</Checkbox>
						</div>
					{/each}
				</CheckboxGroup>
			</div>
		</div>
		<div class="flex-1">
			<div class="pb-2">已选</div>
			<CheckboxGroup on:change={checkAnimaYesFun}>
				{#each animateYess as item (item)}
					<div in:receive={{ key: item }} out:send={{ key: item }} animate:flip={{ duration: 600 }}>
						<Checkbox outControl checkeds={animateYess} name={item}>
							{item}
						</Checkbox>
					</div>
				{/each}
			</CheckboxGroup>
		</div>
	</div>
</div>
