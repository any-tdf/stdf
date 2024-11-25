<!-- Checkbox Demo -->
<script>
	import { quintOut } from 'svelte/easing';
	import { crossfade } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import { Checkbox, CheckboxItem, Divider, Button, Icon } from '../../../../../packages/stdf/components';

	const dota = [
		{ label: '主宰', name: '奶棒人' },
		{ label: '白牛', name: '令狐冲' },
		{ label: '光法', name: '光之守卫' },
		{ label: '猛犸', name: '马格纳斯' },
	];
	let checkeds = $state([]);
	const clickItemFn = name => {
		checkeds = checkeds.includes(name) ? checkeds.filter(v => v !== name) : [name, ...checkeds];
	};
	let checkedsCustom = $state([]);
	const clickCustomFn = name => {
		checkedsCustom = checkedsCustom.includes(name) ? checkedsCustom.filter(v => v !== name) : [name, ...checkedsCustom];
	};

	const dotaInlines = [
		{ label: '火女', name: '火女' },
		{ label: '小牛', name: '小牛' },
		{ label: '水人', name: '水人' },
		{ label: '火枪', name: '火枪' },
		{ label: '斯温', name: '斯温' },
		{ label: '祈求者', name: '祈求者' },
		{ label: '潮汐', name: '潮汐' },
		{ label: '蝙蝠', name: '蝙蝠' },
		{ label: '猛犸', name: '猛犸' },
	];
	let checkInlines = $state(['小牛', '水人']);
	const dotaInlineFun = name => {
		checkInlines = checkInlines.includes(name) ? checkInlines.filter(v => v !== name) : [name, ...checkInlines];
	};

	const dotaImgs = [
		{ label: '火女', name: '火女' },
		{ label: '小牛', name: '小牛' },
		{ label: '水人', name: '水人' },
		{ label: '火枪', name: '火枪' },
		{ label: '斯温', name: '斯温' },
	];
	let imgCheckeds = $state(['火女']);
	const dotaImgsFun = name => {
		imgCheckeds = imgCheckeds.includes(name) ? imgCheckeds.filter(v => v !== name) : [name, ...imgCheckeds];
	};

	const dotaLong = [
		{ name: '主宰', label: '主宰是一个近战敏捷英雄，他能够迅速切入战斗。' },
		{ name: '白牛', label: '巴拉森，裂魂人是一个强大的 Gank 型的力量型近战英雄。' },
		{ name: '光法', label: '伊扎洛，光之守卫，他是一个著名的辅助性智力英雄。' },
		{ name: '猛犸', label: '猛犸？为什么不 BAN 猛犸？为什么不 BAN 猛犸？' },
	];

	const dotaVoices = [
		{ name: '祈求者', label: '祈求者', voices: ['“来自于伟大的奥秘。”'] },
		{ name: '风暴之灵', label: '风暴之灵', voices: ['“喂~快醒醒，快喝点咖啡，我方上塔正遭受攻击。”'] },
		{
			name: '蝙蝠骑士',
			label: '蝙蝠骑士',
			voices: ['“哦，莉娜，当我的压寨夫人怎么样？”', '“哦，风行者，见着我你不用跑。”', '“水晶室女，你就像一个装满冰水的高脚杯。”'],
		},
		{ name: '潮汐猎人', label: '潮汐猎人', voices: ['“我还能吃下一根海藻。”'] },
	];
	let voiceCheckeds = $state([]);
	const dotaVoicesFun = name => {
		voiceCheckeds = voiceCheckeds.includes(name) ? voiceCheckeds.filter(v => v !== name) : [name, ...voiceCheckeds];
	};

	const dotaAll = [
		{ name: '火女', label: '火女' },
		{ name: '小牛', label: '小牛' },
		{ name: '水人', label: '水人' },
		{ name: '火枪', label: '火枪' },
		{ name: '斯温', label: '斯温' },
		{ name: '祈求者', label: '祈求者' },
		{ name: '潮汐', label: '潮汐' },
		{ name: '蝙蝠', label: '蝙蝠' },
		{ name: '猛犸', label: '猛犸' },
	];
	let checkDotas = $state(['火枪', '斯温']);
	let noCheckDotas = $derived(dotaAll.filter(a => !checkDotas.some(b => b === a.name)).map(a => a.name));
	// 全选
	const checkAllFun = () => {
		checkDotas = dotaAll.map(a => a.name);
	};
	// 全不选
	const checkNoneFun = () => {
		checkDotas = [];
	};
	// 反选
	const checkReverseFun = () => {
		checkDotas = dotaAll.filter(a => !checkDotas.some(b => b === a.name)).map(a => a.name);
	};

	const animates = ['火女', '小牛', '水人', '火枪', '斯温', '祈求者', '潮汐', '蝙蝠', '猛犸'];
	let animateNos = $state(['火女', '小牛', '水人', '火枪', '斯温', '祈求者']);
	let animateYess = $derived(animates.filter(a => !animateNos.some(b => b === a)));
	const checkAnimateNoFun = name => {
		animateNos = animateNos.filter(a => a !== name);
	};
	const checkAnimaYesFun = name => {
		animateNos = [name, ...animateNos];
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
	let heights = $state(0);
	let animateHeight = $derived(heights * animates.length + 50);
</script>

<div class="px-4">
	<div class="mt-8 mb-4 font-bold text-2xl">横向排列</div>
	<div class="mt-6 mb-4 font-bold text-lg">简单用法</div>
	<Checkbox layout="h" data={dota} />
	<Divider />

	<div class="mt-8 mb-4 font-bold text-lg">文字在不同位置</div>
	<Checkbox layout="h" data={dota} textPosition="l" />
	<Divider />
	<Checkbox layout="h" data={dota} textPosition="b" />
	<Divider />
	<Checkbox layout="h" data={dota} textPosition="t" />
	<Divider />

	<div class="mt-8 mb-4 font-bold text-lg">自定义图标</div>
	<Checkbox layout="h" data={dota} icon={{ name: 'ri-checkbox-blank-circle-line' }} iconChecked={{ name: 'ri-radio-button-fill' }} />
	<Divider />
	<Checkbox layout="h" data={dota} icon={{ name: 'ri-checkbox-circle-line' }} iconChecked={{ name: 'ri-checkbox-circle-fill' }} />
	<Divider />
	<Checkbox layout="h" data={dota} icon={{ name: 'ri-checkbox-multiple-line' }} iconChecked={{ name: 'ri-checkbox-multiple-fill' }} />
	<Divider />
	<Checkbox layout="h" data={dota} icon={{ name: 'ri-check-line' }} iconChecked={{ name: 'ri-check-fill' }} />
	<Divider />
	<Checkbox layout="h" data={dota} icon={{ name: 'ri-check-double-line' }} iconChecked={{ name: 'ri-check-double-line' }} />
	<Divider />

	<div class="mt-8 mb-4 font-bold text-lg">Snippet 为 Button 组件</div>
	<Checkbox layout="h" data={dota}>
		{#snippet checkboxChild({ item })}
			<Button
				fill={checkeds.includes(item.name) ? 'base' : 'lineLight'}
				injClass="px-2 !py-1"
				onclick={() => {
					clickItemFn(item.name);
				}}
			>
				{item.label}
			</Button>
		{/snippet}
	</Checkbox>
	<Divider />

	<div class="mt-8 mb-4 font-bold text-lg">Snippet 为自定义元素</div>
	<Checkbox layout="h" data={dota}>
		{#snippet checkboxChild({ item })}
			<button
				class="border py-0.5 px-5 text-sm rounded {checkedsCustom.includes(item.name)
					? 'text-primary dark:text-dark bg-primary/10 dark:bg-dark/10'
					: 'bg-gray-100 dark:bg-gray-600 border-gray-200 dark:border-gray-500'}"
				onclick={() => {
					clickCustomFn(item.name);
				}}
			>
				{item.label}
			</button>
		{/snippet}
	</Checkbox>
	<Divider />

	<div class="mt-8 mb-4 font-bold text-lg">图片选项</div>
	<Checkbox layout="h" data={dotaImgs}>
		{#snippet checkboxChild({ item })}
			<div class="flex flex-col items-center">
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<div
					class="w-12 h-12 mb-1 rounded overflow-hidden {imgCheckeds.includes(item.name) ? 'ring-2 ring-primary dark:ring-dark' : ''}"
					onclick={() => {
						dotaImgsFun(item.name);
					}}
				>
					<img class="w-full h-full object-cover" src={`/assets/images/dota_${item.name}.png`} alt="" />
				</div>
				<div>
					<Icon
						name={imgCheckeds.includes(item.name) ? 'ri-arrow-up-s-fill' : 'ri-arrow-up-s-line'}
						theme={imgCheckeds.includes(item.name)}
						alpha={imgCheckeds.includes(item.name) ? 1 : 0.2}
					/>
				</div>
			</div>
		{/snippet}
	</Checkbox>
	<div class="text-sm">
		{imgCheckeds.length > 0 ? '已选' : '未选择任何英雄'}
		<span class="text-[red]">{imgCheckeds.join(' + ')}</span>
	</div>
	<Divider />
</div>

<div class="px-4">
	<div class="mb-4 font-bold text-2xl">行内元素排列</div>
	<div class="mt-8 mb-4 font-bold text-lg">Snippet 行内元素排列</div>
	<Checkbox layout="inline" data={dotaInlines}>
		{#snippet checkboxChild({ item })}
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div
				class="border py-0.5 px-2 m-1 text-sm rounded {checkInlines.includes(item.name)
					? 'text-primary dark:text-dark bg-primary/10 dark:bg-dark/10'
					: 'bg-gray-100 dark:bg-gray-600 border-gray-200 dark:border-gray-500'}"
				onclick={() => {
					dotaInlineFun(item.name);
				}}
			>
				{item.label}
			</div>
		{/snippet}
	</Checkbox>
	<div class="text-xs mt-2">已选：{checkInlines.join('-')}</div>
</div>
<Divider />

<div class="px-4 pb-8">
	<div class="mb-4 font-bold text-2xl">纵向排列</div>
	<div class="mt-8 mb-4 font-bold text-lg">基础用法</div>
	<Checkbox data={dota} />
	<Divider />

	<div class="mt-8 mb-4 font-bold text-lg">长文字选项</div>
	<Checkbox data={dotaLong} />
	<Divider />

	<div class="mt-8 mb-4 font-bold text-lg">文字靠左</div>
	<Checkbox data={dota} textPosition="l" />

	<div class="mt-8 mb-4 font-bold text-lg">复杂选项 && 自定义选中效果</div>
	<Checkbox data={dotaVoices}>
		{#snippet checkboxChild({ item })}
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div class="flex items-center cursor-pointer" onclick={() => dotaVoicesFun(item.name)}>
				<div>
					<Icon
						name={voiceCheckeds.includes(item.name) ? 'ri-checkbox-fill' : 'ri-checkbox-line'}
						theme={voiceCheckeds.includes(item.name)}
						alpha={voiceCheckeds.includes(item.name) ? 1 : 0.2}
					/>
				</div>
				<div class="ml-2 grow {voiceCheckeds.includes(item.name) ? 'text-primary dark:text-dark' : ''}">
					{item.label}
					{#each item.voices as voice}
						<div class="text-xs">{voice}</div>
					{/each}
					<div class="h-px mt-1 bg-black/10 dark:bg-white/10"></div>
				</div>
			</div>
		{/snippet}
	</Checkbox>

	<div class="mt-8 mb-4 font-bold text-lg">批量操作</div>
	<Checkbox data={dotaAll} bind:checkeds={checkDotas} />
	<div class="text-xs mt-2">已选：{checkDotas.map(a => dotaAll.find(b => b.name === a).label).join('-')}</div>
	<div class="text-xs mt-2">未选：{noCheckDotas.map(a => dotaAll.find(b => b.name === a).label).join('-')}</div>
	<div class="flex mt-2">
		<div class="flex-1">
			<Button fill="lineTheme" heightIn="1" onclick={checkAllFun}>全选</Button>
		</div>
		<div class="flex-1">
			<Button fill="lineTheme" heightIn="1" onclick={checkNoneFun}>全不选</Button>
		</div>
		<div class="flex-1">
			<Button fill="lineTheme" heightIn="1" onclick={checkReverseFun}>反选</Button>
		</div>
	</div>
	<Divider />

	<div class="mt-8 mb-4 font-bold text-lg">带动画</div>
	<div class="flex justify-center" style="height: {animateHeight}px;">
		<div class="flex-1">
			<div class="pb-2">未选</div>
			{#each animateNos as item (item)}
				<div in:receive={{ key: item }} out:send={{ key: item }} animate:flip={{ duration: 600 }} bind:clientHeight={heights}>
					<CheckboxItem name={item} checked={!animateNos.includes(item)} onclick={checkAnimateNoFun}>{item}</CheckboxItem>
				</div>
			{/each}
		</div>
		<div class="flex-1">
			<div class="pb-2">已选</div>
			{#each animateYess as item (item)}
				<div in:receive={{ key: item }} out:send={{ key: item }} animate:flip={{ duration: 600 }}>
					<CheckboxItem name={item} checked={animateYess.includes(item)} onclick={checkAnimaYesFun}>{item}</CheckboxItem>
				</div>
			{/each}
		</div>
	</div>
</div>
