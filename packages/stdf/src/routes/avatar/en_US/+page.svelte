<!-- Avatar Demo -->
<script lang="ts">
	import { Avatar, Avatars, Divider, Icon } from '$lib/index.js';

	const icons = [
		{ name: 'ri-aliens-fill', theme: true, top: -1, size: 16 },
		{ name: 'ri-user-smile-line', top: -1 },
		{ name: 'ri-shield-user-line', theme: true, top: 0, size: 32 },
		{ name: 'ri-emotion-line', theme: true, top: -1, size: 46 }
	];

	const imgNames = [
		'dota_火女.png',
		'dota_火枪.png',
		'dota_小牛.png',
		'wall_1.jpg',
		'dota_斯温.png',
		'dota_水人.png',
		'wall_2.jpg',
		'wall_3.jpg',
		'wall_4.jpg',
		'avatar_1.jpg',
		'dota_火枪.png',
		'dota_小牛.png',
		'dota_斯温.png'
	];
	const data = imgNames.map((name) => ({ image: `/assets/images/${name}` }));
</script>

<div class="px-4 py-8">
	<div class="font-bold">Different rounded corners</div>
	<div class="mb-8 mt-4 flex justify-between">
		<Avatar radius="none" />
		<Avatar />
		<Avatar radius="xl" />
		<Avatar radius="2xl" />
		<Avatar radius="full" />
	</div>

	<div class="font-bold">Different picture types and size</div>
	<div class="mb-8 mt-4 flex justify-between">
		<Avatar image="/assets/images/avatar_2.png" imgSize="s" />
		<Avatar image="/assets/images/avatar_2.png" imgSize="m" />
		<Avatar image="/assets/images/avatar_2.png" />
		<Avatar image="/assets/images/avatar_1.jpg" />
	</div>

	<div class="font-bold">Custom background color</div>
	<div class="mb-8 mt-4 flex justify-between">
		<Avatar image="/assets/images/avatar_2.png" imgSize="m" injClass="!bg-success" />
		<Avatar image="/assets/images/avatar_2.png" imgSize="m" injClass="!bg-[#D65786]" />
		<Avatar image="/assets/images/avatar_2.png" imgSize="m" injClass="bg-gradient-to-r from-[#CE9FFC] to-[#7367F0] !text-white" />
		<Avatar image="/assets/images/avatar_2.png" imgSize="m" injClass="!bg-[rgba(0,0,0,0)]" />
	</div>

	<div class="font-bold">Different border</div>
	<div class="mb-8 mt-4 flex justify-between">
		<Avatar image="/assets/images/avatar_2.png" imgSize="m" line="solid" />
		<Avatar image="/assets/images/avatar_2.png" imgSize="m" line="dashed" />
		<Avatar image="/assets/images/avatar_2.png" imgSize="m" line="dotted" />
		<Avatar image="/assets/images/avatar_2.png" imgSize="m" line="solid" injClass="border-[red] dark:border-extend1" />
	</div>

	<div class="font-bold">Replace text</div>
	<div class="mb-8 mt-4 flex justify-between">
		<Avatar alt="A" altSize="xs" />
		<Avatar alt="A" altSize="sm" />
		<Avatar alt="A" />
		<Avatar alt="A" altSize="lg" />
	</div>

	<div class="font-bold">Replace Icon</div>
	<div class="mb-8 mt-4 flex justify-between">
		{#each icons as icon}
			<Avatar {icon} />
		{/each}
	</div>

	<div class="font-bold">Different size</div>
	<div class="flex justify-between">
		<div class="mb-8 mt-4 flex flex-col items-center space-y-4">
			<Avatar size="xs" icon={{ name: 'ri-bear-smile-line', size: 16, theme: true }} />
			<Avatar size="sm" image="/assets/images/avatar_1.jpg" />
			<Avatar line="solid" />
			<Avatar size="lg" image="/assets/images/avatar_2.png" imgSize="m" />
			<Avatar size="xl" alt="A" altSize="xl" />
		</div>
		<div class="mb-8 mt-4 flex flex-col items-center space-y-4">
			<Avatar radius="full" size="xs" icon={{ name: 'ri-bear-smile-line', size: 16, theme: true }} />
			<Avatar radius="full" size="sm" image="/assets/images/avatar_1.jpg" />
			<Avatar radius="full" line="solid" />
			<Avatar radius="full" size="lg" image="/assets/images/avatar_2.png" imgSize="m" />
			<Avatar radius="full" size="xl" alt="A" altSize="xl" />
		</div>
	</div>

	<Divider />

	<div class="my-4 text-2xl font-bold">Avatar group</div>
	<div class="mb-2 mt-6 font-bold">Default</div>
	<Avatars {data} />

	<div class="mb-2 mt-6 font-bold">smaller</div>
	<Avatars {data} size="sm" lineWidth="1" />

	<div class="mb-2 mt-6 font-bold">loose</div>
	<Avatars {data} compact={4} />

	<div class="mb-2 mt-6 font-bold">Border thick point</div>
	<Avatars {data} lineWidth="8" />

	<div class="mb-2 mt-6 font-bold">Make the corners smaller</div>
	<Avatars {data} radius="2xl" />

	<div class="mb-2 mt-6 font-bold">Reverse</div>
	<Avatars {data} reverse />

	<div class="mb-2 mt-6 font-bold">A maximum of 6 are displayed</div>
	<Avatars {data} max={6} />

	<div class="mb-2 mt-6 font-bold">Top layer display increase</div>
	<Avatars {data} top="add" />

	<div class="mb-2 mt-6 font-bold">Do not show top layer</div>
	<Avatars {data} top={null} />

	<div class="mb-2 mt-6 font-bold">Custom top layer</div>
	<Avatars {data}>
		{#snippet top()}
			<button class="relative flex h-12 w-12 justify-center overflow-hidden rounded-full bg-primary-200 dark:bg-dark-200">
				<div class="flex h-full w-full items-center justify-center text-primary-950 dark:text-dark-950">
					<Icon name="ri-svelte-line" />
				</div>
			</button>
		{/snippet}
	</Avatars>
</div>
