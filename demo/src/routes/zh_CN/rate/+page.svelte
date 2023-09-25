<!-- Rate Demo -->
<script>
	import { Rate, Icon } from '../../../../../packages/stdf/components';

	let value = 2.5;
	const getValueFun = e => {
		value = e.detail;
	};
</script>

<div class="mx-4 mt-8 font-bold text-lg">基础用法</div>
<div class="p-4">
	<Rate />
</div>
<div class="mx-4 mt-8 font-bold text-lg">设置初始分数</div>
<div class="p-4">
	<Rate value={1} />
</div>
<div class="mx-4 mt-8 font-bold text-lg">允许零分</div>
<div class="p-4">
	<Rate zero />
</div>
<div class="mx-4 mt-8 font-bold text-lg">自定义总分</div>
<div class="p-4">
	<Rate total={8} />
</div>
<div class="mx-4 mt-8 font-bold text-lg">设置未选中透明度</div>
<div class="p-4">
	<Rate opacity={0.8} />
</div>
<div class="mx-4 mt-8 font-bold text-lg">允许半选</div>
<div class="p-4">
	<Rate half />
</div>
<div class="mx-4 mt-8 font-bold text-lg">竖向半选</div>
<div class="p-4">
	<Rate half vertical />
</div>
<div class="mx-4 mt-8 font-bold text-lg">半选允许零分</div>
<div class="p-4">
	<Rate half zero />
</div>
<div class="mx-4 mt-8 font-bold text-lg">加大间距</div>
<div class="p-4">
	<Rate space="8" />
</div>
<div class="mx-4 mt-8 font-bold text-lg">禁用</div>
<div class="p-4">
	<Rate disabled />
</div>
<div class="mx-4 mt-8 font-bold text-lg">只读</div>
<div class="p-4">
	<Rate readonly />
</div>
<div class="mx-4 mt-8 font-bold text-lg">不同大小</div>
<div class="p-4">
	<Rate width={20} height={20} />
</div>
<div class="p-4">
	<Rate width={28} height={28} />
</div>
<div class="p-4">
	<Rate width={36} height={36} />
</div>
<div class="mx-4 mt-8 font-bold text-lg">自定义</div>
<div class="p-4">
	<Rate custom opacity={0.6}>
		<Icon name="ri-star-fill" injClass="text-[#f5b53f]" />
	</Rate>
</div>
<div class="p-4">
	<Rate custom>
		<Icon name="ri-heart-3-fill" injClass="text-[red]" />
	</Rate>
</div>
<div class="p-4">
	<Rate half custom>
		<Icon name="ri-heart-3-fill" injClass="text-[red]" />
	</Rate>
</div>
<div class="p-4">
	<Rate half opacity={0.5} width={30} height={36} custom>
		<div class="text-3xl">👍</div>
	</Rate>
</div>
<div class="p-4">
	<Rate half opacity={0.5} width={30} height={36} vertical custom>
		<div class="text-3xl">🍺</div>
	</Rate>
</div>
<div class="p-4">
	<Rate half opacity={0.5} width={30} height={36} custom>
		<div class="text-3xl text-primary dark:text-dark">富</div>
	</Rate>
</div>
<div class="mx-4 mt-8 font-bold text-lg">监听事件</div>
<div class="p-4">
	<Rate half {value} on:click={getValueFun} />
	<p class="mt-2">评分：{value} 星</p>
</div>

<div class="mx-4 mt-8 font-bold text-lg">所有激活图标都有点击动画</div>
<div class="p-4">
	<Rate animation="active" />
</div>

<div class="mx-4 mt-8 font-bold text-lg">关闭点击动画</div>
<div class="p-4">
	<Rate animation="none" />
</div>
