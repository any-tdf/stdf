<!-- Avatar Demo -->
<script>
	import { Avatar, Avatars, Divider } from '../../../../../packages/stdf/components';

	const icons = [
		{ name: 'ri-aliens-fill', theme: true, top: -1, size: 16 },
		{ name: 'ri-user-smile-line', top: -1 },
		{ name: 'ri-shield-user-line', theme: true, top: 0, size: 32 },
		{ name: 'ri-emotion-line', theme: true, top: -1, size: 46 },
	];

	const data = [
		{ image: '/assets/images/dota_火女.png' },
		{ image: '/assets/images/dota_火枪.png' },
		{ image: '/assets/images/dota_小牛.png' },
		{ image: '/assets/images/wall_1.jpg' },
		{ image: '/assets/images/dota_斯温.png' },
		{ image: '/assets/images/dota_水人.png' },
		{ image: '/assets/images/wall_2.jpg' },
		{ image: '/assets/images/wall_3.jpg' },
		{ image: '/assets/images/wall_4.jpg' },
		{ image: '/assets/images/avatar_1.jpg' },
		{ image: '/assets/images/dota_火枪.png' },
		{ image: '/assets/images/dota_小牛.png' },
		{ image: '/assets/images/dota_斯温.png' },
	];
</script>

<div class="py-8 px-4">
	<div class="font-bold">不同圆角</div>
	<div class="flex justify-between mt-4 mb-8">
		<Avatar radius="none" />
		<Avatar />
		<Avatar radius="xl" />
		<Avatar radius="2xl" />
		<Avatar radius="full" />
	</div>

	<div class="font-bold">不同图片类型与大小</div>
	<div class="flex justify-between mt-4 mb-8">
		<Avatar image="/assets/images/avatar_2.png" imgSize="s" />
		<Avatar image="/assets/images/avatar_2.png" imgSize="m" />
		<Avatar image="/assets/images/avatar_2.png" />
		<Avatar image="/assets/images/avatar_1.jpg" />
	</div>

	<div class="font-bold">自定义背景色</div>
	<div class="flex justify-between mt-4 mb-8">
		<Avatar image="/assets/images/avatar_2.png" imgSize="m" injClass="!bg-success" />
		<Avatar image="/assets/images/avatar_2.png" imgSize="m" injClass="!bg-[#D65786]" />
		<Avatar image="/assets/images/avatar_2.png" imgSize="m" injClass="bg-gradient-to-r from-[#CE9FFC] to-[#7367F0] !text-white" />
		<Avatar image="/assets/images/avatar_2.png" imgSize="m" injClass="!bg-[rgba(0,0,0,0)]" />
	</div>

	<div class="font-bold">不同边框</div>
	<div class="flex justify-between mt-4 mb-8">
		<Avatar image="/assets/images/avatar_2.png" imgSize="m" line="solid" />
		<Avatar image="/assets/images/avatar_2.png" imgSize="m" line="dashed" />
		<Avatar image="/assets/images/avatar_2.png" imgSize="m" line="dotted" />
		<Avatar image="/assets/images/avatar_2.png" imgSize="m" line="solid" injClass="border-[red] dark:border-extend1" />
	</div>

	<div class="font-bold">替换文本</div>
	<div class="flex justify-between mt-4 mb-8">
		<Avatar alt="张" altSize="xs" />
		<Avatar alt="张" altSize="sm" />
		<Avatar alt="张" />
		<Avatar alt="张" altSize="lg" />
	</div>

	<div class="font-bold">替换 Icon</div>
	<div class="flex justify-between mt-4 mb-8">
		{#each icons as icon}
			<Avatar {icon} />
		{/each}
	</div>

	<div class="font-bold">不同大小</div>
	<div class="flex justify-between">
		<div class="flex flex-col items-center space-y-4 mt-4 mb-8">
			<Avatar size="xs" icon={{ name: 'ri-bear-smile-line', theme: true }} />
			<Avatar size="sm" image="/assets/images/avatar_1.jpg" />
			<Avatar line="solid" />
			<Avatar size="lg" image="/assets/images/avatar_2.png" imgSize="m" />
			<Avatar size="xl" alt="张" altSize="xl" />
		</div>
		<div class="flex flex-col items-center space-y-4 mt-4 mb-8">
			<Avatar radius="full" size="xs" icon={{ name: 'ri-bear-smile-line', theme: true }} />
			<Avatar radius="full" size="sm" image="/assets/images/avatar_1.jpg" />
			<Avatar radius="full" line="solid" />
			<Avatar radius="full" size="lg" image="/assets/images/avatar_2.png" imgSize="m" />
			<Avatar radius="full" size="xl" alt="张" altSize="xl" />
		</div>
	</div>

	<Divider />

	<div class="font-bold text-2xl my-4">头像组</div>
	<div class="font-bold mt-6 mb-2">默认</div>
	<Avatars {data} />

	<div class="font-bold mt-6 mb-2">小点</div>
	<Avatars {data} size="sm" lineWidth="1" />

	<div class="font-bold mt-6 mb-2">宽松一点</div>
	<Avatars {data} compact={4} />

	<div class="font-bold mt-6 mb-2">边框粗点</div>
	<Avatars {data} lineWidth="8" />

	<div class="font-bold mt-6 mb-2">圆角小点</div>
	<Avatars {data} radius="2xl" />

	<div class="font-bold mt-6 mb-2">反向</div>
	<Avatars {data} reverse />

	<div class="font-bold mt-6 mb-2">最多显示 6 个</div>
	<Avatars {data} max={6} />

	<div class="font-bold mt-6 mb-2">顶层显示增加</div>
	<Avatars {data} top="add" />

	<div class="font-bold mt-6 mb-2">不显示顶层</div>
	<Avatars {data} top="none" />
</div>
