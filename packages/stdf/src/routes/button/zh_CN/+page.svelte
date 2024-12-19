<!-- Button Demo -->
<script lang="ts">
	import { Button, Icon, Toast, Loading } from '$lib/index.js';

	let visible = $state(false);
</script>

<div class="flex flex-col space-y-8 py-8">
	<div>
		<div class="p-4 font-bold">不同状态色</div>
		<Button>默认</Button>
		<Button state="success">成功</Button>
		<Button state="warning">警告</Button>
		<Button state="error">错误</Button>
		<Button state="info">信息</Button>
	</div>
	<div>
		<div class="p-4 font-bold">不同圆角风格</div>
		<Button>默认</Button>
		<Button radius="none">无圆角</Button>
		<Button radius="xl">大圆角</Button>
		<Button radius="2xl">更大圆角</Button>
		<Button radius="full">全圆角</Button>
	</div>
	<div>
		<div class="p-4 font-bold">不同填充模式</div>
		<Button>默认</Button>
		<Button fill="line">无色线性</Button>
		<Button fill="lineLight">浅色线性</Button>
		<Button fill="lineTheme">主题色线性</Button>
		<Button fill="text">无色纯文本</Button>
		<Button fill="textTheme">主题色纯文本</Button>
		<Button fill="colorLight">浅色填充</Button>
	</div>
	<div>
		<div class="p-4 font-bold">不同边框风格</div>
		<Button fill="lineTheme">实线</Button>
		<Button fill="lineTheme" line="dashed">虚线</Button>
		<Button fill="lineTheme" line="dotted">点线</Button>
	</div>
	<div>
		<div class="p-4 font-bold">不同大小</div>
		<Button size="full" radius="none">通栏且无圆角</Button>
		<Button>默认</Button>
		<Button size="md">中号</Button>
		<Button size="sm">小号</Button>
		<Button size="auto">AUTO</Button>
		<Button size="auto">
			<div class="px-1">
				<Icon name="ri-plane-fill" size={20} top={-2} />
			</div>
		</Button>
	</div>
	<div>
		<div class="p-4 font-bold">不同高度</div>
		<Button heightOut="0">外部高度为 0</Button>
		<Button heightIn="0">内部高度为 0</Button>
	</div>
	<div>
		<div class="p-4 font-bold">固定大小</div>
		<div class="flex items-center justify-around">
			<Button customSize customWidth={40} customHeight={40} radius="full">宽</Button>
			<Button customSize customWidth={40} customHeight={40} radius="xl">高</Button>
			<Button customSize customWidth={40} customHeight={40}>一</Button>
			<Button customSize customWidth={40} customHeight={40} radius="none">致</Button>
			<Button fill="lineTheme" customSize customWidth={40} customHeight={40}>
				<Icon name="ri-plane-fill" size={20} top={-2} />
			</Button>
			<Button radius="full" fill="lineTheme" customSize customWidth={40} customHeight={40}>
				<Icon name="ri-plane-fill" size={20} top={-2} />
			</Button>
			<Button radius="full" line="dashed" fill="lineTheme" customSize customWidth={40} customHeight={40}>
				<Icon name="ri-plane-fill" size={20} top={-2} />
			</Button>
			<Button radius="full" customSize customWidth={24} customHeight={24} heightIn="0">
				<Icon name="ri-plane-fill" size={12} top={-2} />
			</Button>
		</div>
	</div>
	<div>
		<div class="p-4 font-bold">禁用</div>
		<Button disabled>禁用</Button>
		<Button fill="lineTheme" disabled>禁用</Button>
	</div>
	<div>
		<div class="p-4 font-bold">带图标</div>
		<Button icon={{ name: 'ri-share-forward-2-fill', size: 18, top: -2 }}>投掷二向箔</Button>
		<Button fill="lineTheme" icon={{ name: 'ri-mic-off-fill', size: 16, top: -2 }}>启动面壁计划</Button>
	</div>
	<div>
		<div class="p-4 font-bold">带加载（默认禁用）</div>
		<Button loading={{ inverse: true, height: '6', width: '6' }}>加载中</Button>
		<Button loading={{ inverse: true, height: '6', width: '6', type: '1_28' }}>加载中</Button>
		<Button loading={{ inverse: true, height: '6', width: '6' }} disabledLoading={false}>加载中</Button>
	</div>
	<div>
		<div class="p-4 font-bold">带图标（通过 Snippet 传入）</div>
		<Button>
			<Icon name="ri-share-forward-2-fill" size={18} top={-2} />
			投掷二向箔
		</Button>
		<Button fill="lineTheme">
			<Icon name="ri-mic-off-fill" size={16} top={-2} />
			启动面壁计划
		</Button>
	</div>
	<div>
		<div class="p-4 font-bold">加载（通过 Snippet 传入）</div>
		<Button>
			<Loading inverse height="6" width="6" />
		</Button>
		<Button>
			<Loading inverse width="16" height="6" type="1_17" />
		</Button>
	</div>
	<div>
		<div class="p-4 font-bold">关爱版</div>
		<Button love>关爱版按钮</Button>
		<Button love fill="lineTheme">
			<Icon name="ri-hand-heart-line" size={22} top={-2} />
			关爱版按钮
		</Button>
	</div>
	<div>
		<div class="p-4 font-bold">自定义</div>
		<Button injClass="bg-[#C84031] dark:bg-[#77B941]">纯色填充</Button>
		<Button injClass="bg-gradient-to-r from-[#CE9FFC] to-[#7367F0] !text-white">渐变填充</Button>
		<Button fill="line" injClass="border-[#C84031] dark:border-[#77B941] !text-[#C84031] dark:!text-[#77B941]">线性</Button>
		<Button injClass="shadow-md shadow-black/30 dark:shadow-white/30">阴影</Button>
		<Button radius="full" injClass="shadow-lg shadow-primary/40 dark:shadow-dark/40">颜色阴影</Button>
	</div>
	<div>
		<div class="p-4 font-bold">按钮组</div>
		<Button fill="lineTheme" heightIn="0" group>
			<div class="flex w-full">
				<button class="flex-1 border-r border-primary py-2 active:opacity-80 dark:border-dark">
					<Icon name="ri-apps-2-line" size={18} top={-2} />
					应用
				</button>
				<button class="flex-1 border-r border-primary py-2 active:opacity-80 dark:border-dark">
					<Icon name="ri-star-line" size={18} top={-2} />
					收藏
				</button>
				<button class="flex-1 py-2 active:opacity-80" onclick={() => (visible = true)}>
					<Icon name="ri-share-forward-line" size={18} top={-2} />
					分享
				</button>
			</div>
		</Button>
		<Button radius="full" heightIn="0" group>
			<div class="flex w-full">
				<button class="flex-1 border-r border-white py-2 active:opacity-80 dark:border-black">
					<Icon name="ri-apps-2-line" size={18} top={-2} />
					应用
				</button>
				<button class="flex-1 border-r border-white py-2 active:opacity-80 dark:border-black">
					<Icon name="ri-star-line" size={18} top={-2} />
					收藏
				</button>
				<button class="flex-1 py-2 active:opacity-80" onclick={() => (visible = true)}>
					<Icon name="ri-share-forward-line" size={18} top={-2} />
					分享
				</button>
			</div>
		</Button>
	</div>
</div>
<Toast bind:visible message="点击了按钮组中的分享！" />
