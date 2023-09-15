<!-- Checkbox Demo -->
<script>
	import { CheckboxGroup, Checkbox, Divider, Button } from 'stdf';
	import { onMount } from 'svelte';
	import { quintOut } from 'svelte/easing';
	import { crossfade } from 'svelte/transition';
	import { flip } from 'svelte/animate';

	const dota = [
		{ label: 'Jugg', name: 'Juggernaut', desc: 'The master is a melee agile hero, and he can quickly cut into the battle.' },
		{ label: 'SB', name: 'Spirit Breaker', desc: 'Barlason, the soul -cracked man is a powerful Gank -type melee hero.' },
		{ label: 'Kotl', name: 'Keeper of the Light', desc: 'Izalo, Guardian of Light, he is a famous auxiliary intellectual hero.' },
		{ label: 'Mag', name: 'Magnus', desc: 'Mighty? Why not BAN mighty? Why not BAN mighty?' },
	];
	let checkeds = [];
	const dotaFun = e => {
		checkeds = e.detail;
	};

	const dotaImgs = ['Lina', 'ES', 'Mor', 'Sni', 'SV'];
	const dotaForImgs = ['火女', '小牛', '水人', '火枪', '斯温'];
	let imgCheckeds = ['Lina'];
	const dotaImgsFun = e => {
		imgCheckeds = e.detail;
	};

	const dotaVoices = [
		{ label: 'karl', name: 'karl', voices: ['"From the great mystery."'] },
		{ label: 'Storm', name: 'Storm', voices: ['"Hey ~ Quickly wake up, drink coffee, we are attacked on the tower."'] },
		{
			label: 'Bat',
			name: 'Bat',
			voices: [
				'"Oh, Lina, what about Mrs. My Village?"',
				"'Oh, popular, you don't have to run when you see me.'",
				'"Crystal room woman, you are like a tall cup full of ice water."',
			],
		},
		{ label: 'Tide', name: 'Tide', voices: ['"I can still eat a seaweed."'] },
	];
	let voiceCheckeds = [];
	const dotaVoicesFun = e => {
		voiceCheckeds = e.detail;
	};

	const dotaInlines = ['Lina', 'ES', 'Mor', 'Sni', 'SV', 'karl', 'Tide', 'Bat', 'Mag'];
	let checkInlines = ['ES', 'Mor'];
	const dotaInlineFun = e => {
		checkInlines = e.detail;
	};

	const dotaAll = ['Lina', 'ES', 'Mor', 'Sni', 'SV', 'karl', 'Tide', 'Bat', 'Mag'];
	let checkDotas = ['Sni', 'SV'];
	$: noCheckDotas = dotaAll.filter(a => !checkDotas.some(b => b === a));
	let outControl = true;
	// Click the single item
	const dotaAllFun = e => {
		outControl = false;
		checkDotas = e.detail;
	};
	// select all
	const checkAllFun = () => {
		outControl = true;
		checkDotas = dotaAll;
	};
	// unselect all
	const checkNoneFun = () => {
		outControl = true;
		checkDotas = [];
	};
	// Counter -selection
	const checkReverseFun = () => {
		outControl = true;
		checkDotas = dotaAll.filter(a => !checkDotas.some(b => b === a));
	};

	const animates = ['Lina', 'ES', 'Mor', 'Sni', 'SV', 'karl', 'Tide', 'Bat', 'Mag'];
	let animateNos = ['Lina', 'ES', 'Mor', 'Sni', 'SV', 'karl'];
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
	// Set the height to avoid changes in page height and affect the click experience.
	let heights = 0;
	let animateHeight = 0;
	onMount(() => {
		animateHeight = (heights / 6) * 9 + 32;
	});
</script>

<div class="px-4 text-left">
	<div class="mt-8 mb-4 font-bold text-2xl">Horizontal arrangement</div>
	<div class="mt-6 mb-4 font-bold text-lg">Simple usage</div>
	<CheckboxGroup layout="h">
		{#each dota as item}
			<Checkbox {checkeds} name={item.name}>{item.label}</Checkbox>
		{/each}
	</CheckboxGroup>

	<div class="mt-8 mb-4 font-bold text-lg">Text is in different positions</div>
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

	<div class="mt-8 mb-4 font-bold text-lg">Custom icon</div>
	<CheckboxGroup layout="h">
		<Checkbox checkeds={[]} icon={{ name: 'ri-checkbox-blank-circle-line' }} iconChecked={{ name: 'ri-radio-button-fill' }} name="Daemon"
			>Jugg</Checkbox
		>
		<Checkbox checkeds={[]} icon={{ name: 'ri-checkbox-circle-line' }} iconChecked={{ name: 'ri-checkbox-circle-fill' }} name="Linghuchong"
			>Mor</Checkbox
		>
		<Checkbox
			checkeds={[]}
			icon={{ name: 'ri-checkbox-multiple-line' }}
			iconChecked={{ name: 'ri-checkbox-multiple-fill' }}
			name="Light Light methodard">Kotl</Checkbox
		>
		<Checkbox checkeds={[]} icon={{ name: 'ri-check-line' }} iconChecked={{ name: 'ri-check-fill' }} name="Magnas">Mag</Checkbox>
	</CheckboxGroup>

	<div class="mt-8 mb-4 font-bold text-lg">Picture option</div>
	<CheckboxGroup layout="h" on:change={dotaImgsFun}>
		{#each dotaImgs as dota, i}
			<Checkbox
				name={dota}
				textPosition="t"
				icon={{ name: 'ri-arrow-up-s-line' }}
				iconChecked={{ name: 'ri-arrow-up-s-fill' }}
				outControl
				checkeds={imgCheckeds}
			>
				<div class={`w-12 h-12 mb-1 rounded overflow-hidden ${imgCheckeds.includes(dota) ? 'ring-2 ring-primary dark:ring-dark' : ''}`}>
					<img class="w-full h-full object-cover" src={`/assets/images/dota_${dotaForImgs[i]}.png`} alt="" />
				</div>
			</Checkbox>
		{/each}
	</CheckboxGroup>
	<div class="text-sm">
		{imgCheckeds.length > 0 ? 'selected' : 'No hero is selected.'}
		<span class="text-[red]">{imgCheckeds.join(' + ')}</span>{imgCheckeds.length > 0 ? '。' : ''}
	</div>

	<div class="mt-8 mb-4 font-bold text-lg">No icon && use Button</div>
	<CheckboxGroup layout="h" on:change={dotaFun}>
		{#each dota as item}
			<Checkbox {checkeds} name={item.name} icon="none" iconChecked="none">
				<Button fill={checkeds.includes(item.name) ? 'base' : 'lineLight'} size="auto" injClass="px-4">{item.label}</Button>
			</Checkbox>
		{/each}
	</CheckboxGroup>

	<div class="mt-8 mb-4 font-bold text-lg">No icon && Customized selection effect</div>
	<CheckboxGroup layout="h" on:change={dotaFun}>
		{#each dota as item}
			<Checkbox {checkeds} name={item.name} icon="none" iconChecked="none">
				<div
					class={`border py-0.5 px-5 text-sm rounded ${
						checkeds.includes(item.name)
							? 'text-primary dark:text-dark bg-primary/10 dark:bg-dark/10'
							: 'bg-gray9 dark:bg-gray4 border-gray8 dark:border-gray5 text-gray6'
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
	<div class="mb-4 font-bold">Elemental element arrangementtal element arrangement</div>
	<div class="mt-8 mb-4 font-bold">No icon && Elemental element arrangement</div>
	<CheckboxGroup layout="inline" wrap on:change={dotaInlineFun}>
		{#each dotaInlines as item}
			<Checkbox name={item} checkeds={checkInlines} icon="none" iconChecked="none">
				<div
					class={`border py-0.5 px-1 m-1 text-sm rounded ${
						checkInlines.includes(item)
							? 'text-primary dark:text-dark bg-primary/10 dark:bg-dark/10'
							: 'bg-gray9 dark:bg-gray4 border-gray8 dark:border-gray5 text-gray6'
					}`}
				>
					{item}
				</div>
			</Checkbox>
		{/each}
	</CheckboxGroup>
	<div class="text-xs mt-2">selected:{checkInlines.join('-')}</div>
</div>
<Divider />

<div class="px-4 pb-8">
	<div class="mb-4 font-bold text-2xl">Vertical arrangement</div>
	<div class="mt-8 mb-4 font-bold text-lg">Basic usage</div>
	<CheckboxGroup>
		{#each dota as item}
			<Checkbox {checkeds} name={item.name}>{item.label}</Checkbox>
		{/each}
	</CheckboxGroup>

	<div class="mt-8 mb-4 font-bold text-lg">Long text option</div>
	<CheckboxGroup>
		{#each dota as item}
			<Checkbox {checkeds} name={item.name}>{item.desc}</Checkbox>
		{/each}
	</CheckboxGroup>

	<div class="mt-8 mb-4 font-bold text-lg">Text to left</div>
	<CheckboxGroup>
		{#each dota as item, i}
			<Checkbox {checkeds} name={item.name} textPosition="l">
				{item.label}
				{#if i !== dota.length - 1}
					<div class="h-px mt-1 bg-gray9 dark:bg-gray5" />
				{/if}
			</Checkbox>
		{/each}
	</CheckboxGroup>

	<div class="mt-8 mb-4 font-bold text-lg">Complicated option && Customized selection effect</div>
	<CheckboxGroup on:change={dotaVoicesFun}>
		{#each dotaVoices as item, i}
			<Checkbox checkeds={voiceCheckeds} name={item.name}>
				<div class={`ml-2 ${voiceCheckeds.includes(item.name) ? 'text-primary dark:text-dark' : ''}`}>
					{item.label}
					{#each item.voices as voice}
						<div class="text-xs">{voice}</div>
					{/each}
					{#if i !== dotaVoices.length - 1}
						<div class="h-px mt-1 bg-gray9 dark:bg-gray5" />
					{/if}
				</div>
			</Checkbox>
		{/each}
	</CheckboxGroup>

	<div class="mt-8 mb-4 font-bold text-lg">Batch operation</div>
	<CheckboxGroup on:change={dotaAllFun}>
		{#each dotaAll as item}
			<Checkbox checkeds={checkDotas} name={item} {outControl}>{item}</Checkbox>
		{/each}
	</CheckboxGroup>
	<div class="text-xs mt-2">selected:{checkDotas.join('-')}</div>
	<div class="text-xs mt-2">Une selected:{noCheckDotas.join('-')}</div>
	<div class="flex mt-2">
		<div class="flex-1">
			<Button fill="lineTheme" heightIn="1" on:click={checkAllFun}>select all</Button>
		</div>
		<div class="flex-1">
			<Button fill="lineTheme" heightIn="1" on:click={checkNoneFun}>unselect all</Button>
		</div>
		<div class="flex-1">
			<Button fill="lineTheme" heightIn="1" on:click={checkReverseFun}>Counter -selection</Button>
		</div>
	</div>

	<div class="mt-8 mb-4 font-bold text-lg">Animation</div>
	<div class="flex" style="height: {animateHeight}px;">
		<div class="flex-1">
			<div class="pb-2">Unsteady</div>
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
			<div class="pb-2">selected</div>
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
