<!-- Avatar Demo -->
<script>
	import { Avatar, Avatars, Divider, Icon } from '../../../../../packages/stdf/components';

	const icons = [
		{ name: 'ri-aliens-fill', theme: true, top: -1, size: 16 },
		{ name: 'ri-user-smile-line', top: -1 },
		{ name: 'ri-shield-user-line', theme: true, top: 0, size: 32 },
		{ name: 'ri-emotion-line', theme: true, top: -1, size: 46 },
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
		'dota_斯温.png',
	];
	const data = imgNames.map(name => ({ image: `/assets/images/${name}` }));
</script>

<div class="py-8 px-4">
	<div class="font-bold">Different rounded corners</div>
	<div class="flex justify-between mt-4 mb-8">
		<Avatar radius="none" />
		<Avatar />
		<Avatar radius="xl" />
		<Avatar radius="2xl" />
		<Avatar radius="full" />
	</div>

	<div class="font-bold">Different picture types and size</div>
	<div class="flex justify-between mt-4 mb-8">
		<Avatar image="/assets/images/avatar_2.png" imgSize="s" />
		<Avatar image="/assets/images/avatar_2.png" imgSize="m" />
		<Avatar image="/assets/images/avatar_2.png" />
		<Avatar image="/assets/images/avatar_1.jpg" />
	</div>

	<div class="font-bold">Custom background color</div>
	<div class="flex justify-between mt-4 mb-8">
		<Avatar image="/assets/images/avatar_2.png" imgSize="m" injClass="!bg-success" />
		<Avatar image="/assets/images/avatar_2.png" imgSize="m" injClass="!bg-[#D65786]" />
		<Avatar image="/assets/images/avatar_2.png" imgSize="m" injClass="bg-gradient-to-r from-[#CE9FFC] to-[#7367F0] !text-white" />
		<Avatar image="/assets/images/avatar_2.png" imgSize="m" injClass="!bg-[rgba(0,0,0,0)]" />
	</div>

	<div class="font-bold">Different border</div>
	<div class="flex justify-between mt-4 mb-8">
		<Avatar image="/assets/images/avatar_2.png" imgSize="m" line="solid" />
		<Avatar image="/assets/images/avatar_2.png" imgSize="m" line="dashed" />
		<Avatar image="/assets/images/avatar_2.png" imgSize="m" line="dotted" />
		<Avatar image="/assets/images/avatar_2.png" imgSize="m" line="solid" injClass="border-[red] dark:border-extend1" />
	</div>

	<div class="font-bold">Replace text</div>
	<div class="flex justify-between mt-4 mb-8">
		<Avatar alt="A" altSize="xs" />
		<Avatar alt="A" altSize="sm" />
		<Avatar alt="A" />
		<Avatar alt="A" altSize="lg" />
	</div>

	<div class="font-bold">Replace Icon</div>
	<div class="flex justify-between mt-4 mb-8">
		{#each icons as icon}
			<Avatar {icon} />
		{/each}
	</div>

	<div class="font-bold">Different size</div>
	<div class="flex justify-between">
		<div class="flex flex-col items-center space-y-4 mt-4 mb-8">
			<Avatar size="xs" icon={{ name: 'ri-bear-smile-line', size: 16, theme: true }} />
			<Avatar size="sm" image="/assets/images/avatar_1.jpg" />
			<Avatar line="solid" />
			<Avatar size="lg" image="/assets/images/avatar_2.png" imgSize="m" />
			<Avatar size="xl" alt="A" altSize="xl" />
		</div>
		<div class="flex flex-col items-center space-y-4 mt-4 mb-8">
			<Avatar radius="full" size="xs" icon={{ name: 'ri-bear-smile-line', size: 16, theme: true }} />
			<Avatar radius="full" size="sm" image="/assets/images/avatar_1.jpg" />
			<Avatar radius="full" line="solid" />
			<Avatar radius="full" size="lg" image="/assets/images/avatar_2.png" imgSize="m" />
			<Avatar radius="full" size="xl" alt="A" altSize="xl" />
		</div>
	</div>

	<Divider />

	<div class="font-bold text-2xl my-4">Avatar group</div>
	<div class="font-bold mt-6 mb-2">Default</div>
	<Avatars {data} />

	<div class="font-bold mt-6 mb-2">smaller</div>
	<Avatars {data} size="sm" lineWidth="1" />

	<div class="font-bold mt-6 mb-2">loose</div>
	<Avatars {data} compact={4} />

	<div class="font-bold mt-6 mb-2">Border thick point</div>
	<Avatars {data} lineWidth="8" />

	<div class="font-bold mt-6 mb-2">Make the corners smaller</div>
	<Avatars {data} radius="2xl" />

	<div class="font-bold mt-6 mb-2">Reverse</div>
	<Avatars {data} reverse />

	<div class="font-bold mt-6 mb-2">A maximum of 6 are displayed</div>
	<Avatars {data} max={6} />

	<div class="font-bold mt-6 mb-2">Top layer display increase</div>
	<Avatars {data} top="add" />

	<div class="font-bold mt-6 mb-2">Do not show top layer</div>
	<Avatars {data} top={null} />

	<div class="font-bold mt-6 mb-2">Custom top layer</div>
	<Avatars {data}>
		{#snippet top()}
			<button class="bg-primary-200 dark:bg-dark-200 flex justify-center overflow-hidden relative w-12 h-12 rounded-full">
				<div class="flex justify-center items-center w-full h-full text-primary-950 dark:text-dark-950">
					<Icon name="ri-svelte-line" />
				</div>
			</button>
		{/snippet}
	</Avatars>
</div>
