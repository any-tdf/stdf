<!-- Checkbox Demo -->
<script>
	import { quintOut } from 'svelte/easing';
	import { crossfade } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import { Checkbox, CheckboxItem, Divider, Button, Icon } from '../../../../../packages/stdf/components';

	const dota = [
		{ label: 'Jugg', name: 'Juggernaut' },
		{ label: 'SB', name: 'Spirit Breaker' },
		{ label: 'KOTL', name: 'Keeper of the Light' },
		{ label: 'Mag', name: 'Magnus' },
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
		{ label: 'Lina', name: 'Lina' },
		{ label: 'SB', name: 'Spirit Breaker' },
		{ label: 'Morph', name: 'Morphling' },
		{ label: 'Sniper', name: 'Sniper' },
		{ label: 'Sven', name: 'Sven' },
		{ label: 'Invoker', name: 'Invoker' },
		{ label: 'Tide', name: 'Tidehunter' },
		{ label: 'Bat', name: 'Batrider' },
		{ label: 'Mag', name: 'Magnus' },
	];
	let checkInlines = $state(['Spirit Breaker', 'Morphling']);
	const dotaInlineFun = name => {
		checkInlines = checkInlines.includes(name) ? checkInlines.filter(v => v !== name) : [name, ...checkInlines];
	};

	const dotaImgs = [
		{ label: 'Lina', name: 'Lina', imgName: '火女' },
		{ label: 'SB', name: 'Spirit Breaker', imgName: '小牛' },
		{ label: 'Morph', name: 'Morphling', imgName: '水人' },
		{ label: 'Sniper', name: 'Sniper', imgName: '火枪' },
		{ label: 'Sven', name: 'Sven', imgName: '斯温' },
	];
	let imgCheckeds = $state(['Lina']);
	const dotaImgsFun = name => {
		imgCheckeds = imgCheckeds.includes(name) ? imgCheckeds.filter(v => v !== name) : [name, ...imgCheckeds];
	};

	const dotaLong = [
		{ name: 'Jugg', label: 'Juggernaut is a melee agility hero who can quickly engage in combat.' },
		{ name: 'SB', label: 'Barathrum, Spirit Breaker is a powerful ganking strength melee hero.' },
		{ name: 'KOTL', label: 'Ezalor, Keeper of the Light, is a famous support intelligence hero.' },
		{ name: 'Mag', label: 'Magnus? Why not ban Magnus? Why not ban Magnus?' },
	];

	const dotaVoices = [
		{ name: 'Invoker', label: 'Invoker', voices: ['"From the first point was begat a line."'] },
		{ name: 'Storm', label: 'Storm', voices: ['"Hey, wake up! Get some coffee, our tower is under attack."'] },
		{
			name: 'Batrider',
			label: 'Batrider',
			voices: [
				'"Oh Lina, wanna be my queen?"',
				'"Oh Windrunner, no need to run from me."',
				'"Crystal Maiden, you\'re like a tall glass of water."',
			],
		},
		{ name: 'Tidehunter', label: 'Tidehunter', voices: ['"I could eat a sea cucumber."'] },
	];
	let voiceCheckeds = $state([]);
	const dotaVoicesFun = name => {
		voiceCheckeds = voiceCheckeds.includes(name) ? voiceCheckeds.filter(v => v !== name) : [name, ...voiceCheckeds];
	};

	const dotaAll = [
		{ name: 'Lina', label: 'Lina' },
		{ name: 'SB', label: 'Spirit Breaker' },
		{ name: 'Morph', label: 'Morphling' },
		{ name: 'Sniper', label: 'Sniper' },
		{ name: 'Sven', label: 'Sven' },
		{ name: 'Invoker', label: 'Invoker' },
		{ name: 'Tide', label: 'Tidehunter' },
		{ name: 'Bat', label: 'Batrider' },
		{ name: 'Mag', label: 'Magnus' },
	];
	let checkDotas = $state(['Sniper', 'Sven']);
	let noCheckDotas = $derived(dotaAll.filter(a => !checkDotas.some(b => b === a.name)).map(a => a.name));
	// Select All
	const checkAllFun = () => {
		checkDotas = dotaAll.map(a => a.name);
	};
	// Select None
	const checkNoneFun = () => {
		checkDotas = [];
	};
	// Reverse Selection
	const checkReverseFun = () => {
		checkDotas = dotaAll.filter(a => !checkDotas.some(b => b === a.name)).map(a => a.name);
	};

	const animates = ['Lina', 'SB', 'Morph', 'Sniper', 'Sven', 'Invoker', 'Tide', 'Bat', 'Mag'];
	let animateNos = $state(['Lina', 'SB', 'Morph', 'Sniper', 'Sven', 'Invoker']);
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

	// Set height to avoid page height changes affecting click experience
	let heights = $state(0);
	let animateHeight = $derived(heights * animates.length + 50);
</script>

<div class="px-4">
	<div class="mt-8 mb-4 font-bold text-2xl">Horizontal Layout</div>
	<div class="mt-6 mb-4 font-bold text-lg">Basic Usage</div>
	<Checkbox layout="h" data={dota} />
	<Divider />

	<div class="mt-8 mb-4 font-bold text-lg">Text Position</div>
	<Checkbox layout="h" data={dota} textPosition="l" />
	<Divider />
	<Checkbox layout="h" data={dota} textPosition="b" />
	<Divider />
	<Checkbox layout="h" data={dota} textPosition="t" />
	<Divider />

	<div class="mt-8 mb-4 font-bold text-lg">Custom Icons</div>
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

	<div class="mt-8 mb-4 font-bold text-lg">Snippet as Button Component</div>
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

	<div class="mt-8 mb-4 font-bold text-lg">Snippet as Custom Element</div>
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

	<div class="mt-8 mb-4 font-bold text-lg">Image Options</div>
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
					<img class="w-full h-full object-cover" src={`/assets/images/dota_${item.imgName}.png`} alt="" />
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
		{imgCheckeds.length > 0 ? 'Selected' : 'No heroes selected'}
		<span class="text-[red]">{imgCheckeds.join(' + ')}</span>
	</div>
	<Divider />
</div>

<div class="px-4">
	<div class="mb-4 font-bold text-2xl">Inline Layout</div>
	<div class="mt-8 mb-4 font-bold text-lg">Snippet Inline Layout</div>
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
	<div class="text-xs mt-2">Selected: {checkInlines.join('-')}</div>
</div>
<Divider />

<div class="px-4 pb-8">
	<div class="mb-4 font-bold text-2xl">Vertical Layout</div>
	<div class="mt-8 mb-4 font-bold text-lg">Basic Usage</div>
	<Checkbox data={dota} />
	<Divider />

	<div class="mt-8 mb-4 font-bold text-lg">Long Text Options</div>
	<Checkbox data={dotaLong} />
	<Divider />

	<div class="mt-8 mb-4 font-bold text-lg">Left Aligned Text</div>
	<Checkbox data={dota} textPosition="l" />

	<div class="mt-8 mb-4 font-bold text-lg">Complex Options && Custom Selection Effect</div>
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

	<div class="mt-8 mb-4 font-bold text-lg">Batch Operations</div>
	<Checkbox data={dotaAll} bind:checkeds={checkDotas} />
	<div class="text-xs mt-2">Selected: {checkDotas.map(a => dotaAll.find(b => b.name === a).label).join('-')}</div>
	<div class="text-xs mt-2">Unselected: {noCheckDotas.map(a => dotaAll.find(b => b.name === a).label).join('-')}</div>
	<div class="flex mt-2">
		<div class="flex-1">
			<Button fill="lineTheme" heightIn="1" onclick={checkAllFun}>All</Button>
		</div>
		<div class="flex-1">
			<Button fill="lineTheme" heightIn="1" onclick={checkNoneFun}>None</Button>
		</div>
		<div class="flex-1">
			<Button fill="lineTheme" heightIn="1" onclick={checkReverseFun}>Reverse</Button>
		</div>
	</div>
	<Divider />

	<div class="mt-8 mb-4 font-bold text-lg">With Animation</div>
	<div class="flex justify-center" style="height: {animateHeight}px;">
		<div class="flex-1">
			<div class="pb-2">Unselected</div>
			{#each animateNos as item (item)}
				<div in:receive={{ key: item }} out:send={{ key: item }} animate:flip={{ duration: 600 }} bind:clientHeight={heights}>
					<CheckboxItem name={item} checked={!animateNos.includes(item)} onclick={checkAnimateNoFun}>{item}</CheckboxItem>
				</div>
			{/each}
		</div>
		<div class="flex-1">
			<div class="pb-2">Selected</div>
			{#each animateYess as item (item)}
				<div in:receive={{ key: item }} out:send={{ key: item }} animate:flip={{ duration: 600 }}>
					<CheckboxItem name={item} checked={animateYess.includes(item)} onclick={checkAnimaYesFun}>{item}</CheckboxItem>
				</div>
			{/each}
		</div>
	</div>
</div>
