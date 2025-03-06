<!-- Toast Demo -->
<script lang="ts">
	import { Toast, Cell, Button, Loading } from '$lib/index.js';

	let visible1 = $state(false);
	let visible2 = $state(false);
	let visible3 = $state(false);
	let visible4 = $state(false);
	let visible5 = $state(false);
	let visible6 = $state(false);
	let visible7 = $state(false);
	let visible8 = $state(false);
	let visible9 = $state(false);
	let visible10 = $state(false);
	let visible11 = $state(false);
	let visible12 = $state(false);
	let visible13 = $state(false);
	let visible14 = $state(false);
	let visible15 = $state(false);
	let visible16 = $state(false);
	let visible17 = $state(false);
	let visible18 = $state(false);
	let visible19 = $state(false);
	let visible20 = $state(false);
	let visible21 = $state(false);
	let visible22 = $state(false);
	let visible23 = $state(false);
	let visible24 = $state(false);
	let visible25 = $state(false);
	let visible26 = $state(false);
	let visible27 = $state(false);
	let visible28 = $state(false);
	let visible29 = $state(false);
	let visible30 = $state(false);
	let visible31 = $state(false);
	let visible32 = $state(false);

	let time = $state(4);
	let timer: number | null = null;
	const useSnippetFun = () => {
		visible25 = true;
		timer = setInterval(() => {
			time--;
			if (time <= 0) {
				clearInterval(timer!);
				visible25 = false;
				time = 3;
			}
		}, 1000);
	};
</script>

<div class="py-4">
	<Cell title="基础用法" onclick={() => (visible1 = true)} />
	<Toast bind:visible={visible1} message="轻提示" />

	<Cell title="长文本提示" onclick={() => (visible2 = true)} />
	<Toast bind:visible={visible2} message="当字符数过长时换行，一般不建议在这里显示太多的内容！" />

	<Cell title="不阻止点击" onclick={() => (visible3 = true)} />
	<Toast bind:visible={visible3} clickable message="遮罩下层内容还可以点击" />

	<Cell title="固定显示时间" onclick={() => (visible4 = true)} />
	<Toast bind:visible={visible4} duration={6000} message="6 秒后自动关闭" />

	<Cell title="不自动关闭" onclick={() => (visible5 = true)} />
	<Toast bind:visible={visible5} duration={0} clickable message="此提示不会自动关闭，请点击按钮关闭" />

	<Cell title="成功提示" onclick={() => (visible6 = true)} />
	<Toast bind:visible={visible6} type="success" message="成功提示" />

	<Cell title="失败提示" onclick={() => (visible7 = true)} />
	<Toast bind:visible={visible7} type="error" message="失败提示" />

	<Cell title="警告提示" onclick={() => (visible8 = true)} />
	<Toast bind:visible={visible8} type="warning" message="警告提示" />

	<Cell title="信息提示" onclick={() => (visible9 = true)} />
	<Toast bind:visible={visible9} type="info" message="信息提示" />

	<Cell title="加载提示" onclick={() => (visible30 = true)} />
	<Toast bind:visible={visible30} type="loading" message="加载中..." />

	<Cell title="主题色加载提示" onclick={() => (visible31 = true)} />
	<Toast bind:visible={visible31} type="loading" loading={{ theme: true }} message="加载中..." />

	<Cell title="1_3 号加载提示" onclick={() => (visible32 = true)} />
	<Toast bind:visible={visible32} type="loading" loading={{ type: '1_3' }} message="加载中..." />

	<Cell title="自定义类型" onclick={() => (visible27 = true)} />
	<Toast bind:visible={visible27} type="icon" icon={{ name: 'ri-thumb-up-fill' }} message="你真棒！" />

	<Cell title="遮罩不透明" onclick={() => (visible10 = true)} />
	<Toast bind:visible={visible10} mask={{ opacity: '0.3' }} message="遮罩透明度为 0.3" />

	<Cell title="反色遮罩" onclick={() => (visible11 = true)} />
	<Toast bind:visible={visible11} mask={{ inverse: true, opacity: '0.5' }} message="反色遮罩" />

	<Cell title="遮罩模糊" onclick={() => (visible12 = true)} />
	<Toast bind:visible={visible12} mask={{ opacity: '0', backdropBlur: 'sm' }} message="遮罩下层内容模糊" />

	<Cell title="过渡较快" onclick={() => (visible13 = true)} />
	<Toast bind:visible={visible13} transitionParams={{ duration: 150 }} message="过渡时间为 150ms" />

	<Cell title="过渡较慢" onclick={() => (visible14 = true)} />
	<Toast bind:visible={visible14} transitionParams={{ duration: 1000 }} message="过渡时间为 1s" />

	<Cell title="淡入" onclick={() => (visible15 = true)} />
	<Toast bind:visible={visible15} transitionType="fade" message="淡入呈现" />

	<Cell title="向下移入" onclick={() => (visible16 = true)} />
	<Toast bind:visible={visible16} transitionType="fly" transitionParams={{ y: -150 }} message="向下移入呈现" />

	<Cell title="向右移入" onclick={() => (visible17 = true)} />
	<Toast bind:visible={visible17} transitionType="fly" transitionParams={{ x: -150 }} message="向右移入呈现" />

	<Cell title="展开" onclick={() => (visible18 = true)} />
	<Toast bind:visible={visible18} transitionType="slide" message="展开呈现" />

	<Cell title="模糊" onclick={() => (visible19 = true)} />
	<Toast bind:visible={visible19} transitionType="blur" transitionParams={{ duration: 1000 }} message="模糊呈现" />

	<Cell title="无过渡" onclick={() => (visible20 = true)} />
	<Toast bind:visible={visible20} transitionType={null} message="无过渡直接呈现" />

	<Cell title="退出缩放动画" onclick={() => (visible28 = true)} />
	<Toast bind:visible={visible28} outDuration={300} message="退出时缩放动画时间为 300ms" />

	<Cell title="退出移出动画" onclick={() => (visible29 = true)} />
	<Toast
		bind:visible={visible29}
		outDuration={300}
		transitionType="fly"
		transitionParams={{ y: -150 }}
		message="退出时移出动画时间为 300ms"
	/>

	<Cell title="延时出现" onclick={() => (visible21 = true)} />
	<Toast bind:visible={visible21} transitionParams={{ delay: 1000 }} message="点击 1s 之后呈现" />

	<Cell title="顶部" onclick={() => (visible22 = true)} />
	<Toast bind:visible={visible22} position="top" message="提示位于顶部" />

	<Cell title="底部" onclick={() => (visible23 = true)} />
	<Toast bind:visible={visible23} position="bottom" message="提示位于底部" />

	<Cell title="顶部增加距离" onclick={() => (visible24 = true)} />
	<Toast bind:visible={visible24} position="top" py="40" message="提示位于顶部且增加了距离" />

	<Cell title="使用 Snippet" onclick={useSnippetFun} />
	<Toast bind:visible={visible25} duration={0}>
		<div class="flex flex-col space-y-4">
			<div>自定义提示内容</div>
			<Loading inverse />
			<div>{time} 秒后关闭</div>
		</div>
	</Toast>

	<Cell title="不同圆角风格" onclick={() => (visible26 = true)} />
	<Toast bind:visible={visible26} radius="xl" message="加大了圆角" />
</div>

<div class="sticky bottom-0 z-10 flex bg-white/50 backdrop-blur-sm dark:bg-black/50">
	<div class="flex-1">
		<Button fill="lineTheme" onclick={() => (visible5 = false)}>手动关闭</Button>
	</div>
</div>
