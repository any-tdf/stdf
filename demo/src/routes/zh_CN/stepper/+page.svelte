<!-- Stepper Demo -->
<script>
	import { Stepper, Toast } from '../../../../../packages/stdf/components';

	let asyncValue1 = 1;
	let loading1 = false;
	let asyncValue2 = 1;
	let loading2 = false;
	let asyncValue3 = 1;
	let loading3 = false;
	const handleChange1 = type => {
		loading1 = true;
		setTimeout(() => {
			asyncValue1 += type === 'increase' ? 1 : -1;
			loading1 = false;
		}, 2000);
	};
	const handleChange2 = type => {
		loading2 = true;
		setTimeout(() => {
			asyncValue2 += type === 'increase' ? 1 : -1;
			loading2 = false;
		}, 3000);
	};
	const handleChange3 = type => {
		loading3 = true;
		setTimeout(() => {
			asyncValue3 += type === 'increase' ? 1 : -1;
			loading3 = false;
		}, 4000);
	};
</script>

<div class="mx-4 mt-8 font-bold text-lg">基础用法</div>
<div class="px-4 py-4">
	<Stepper />
</div>

<div class="mx-4 mt-8 font-bold text-lg">设置最大值/最小值/初始值</div>
<div class="px-4 py-4">
	<Stepper min={2} max={10} value={5} />
</div>

<div class="mx-4 mt-8 font-bold text-lg">设置步长</div>
<div class="px-4 py-4">
	<Stepper step={5} />
</div>

<div class="mx-4 mt-8 font-bold text-lg">强调数字区域</div>
<div class="px-4 py-4">
	<Stepper numberHighlight />
</div>

<div class="mx-4 mt-8 font-bold text-lg">强调区域不用主题色</div>
<div class="px-4 py-4 flex gap-2">
	<Stepper theme={false} />
	<Stepper theme={false} numberHighlight />
</div>

<div class="mx-4 mt-8 font-bold text-lg">不同圆角</div>
<div class="px-4 py-4 flex flex-wrap gap-2">
	<div><Stepper radius="none" /></div>
	<div><Stepper radius="base" /></div>
	<div><Stepper radius="xl" /></div>
	<div><Stepper radius="full" /></div>
	<div><Stepper radius="full" numberHighlight /></div>
	<div><Stepper radius="full" theme={false} /></div>
</div>

<div class="mx-4 mt-8 font-bold text-lg">竖向</div>
<div class="px-2 py-4 flex justify-around">
	<Stepper vertical />
	<Stepper vertical numberHighlight />
	<Stepper vertical theme={false} />
	<Stepper vertical radius="none" />
	<Stepper radius="xl" vertical />
</div>

<div class="mx-4 mt-8 font-bold text-lg">格式化显示数字</div>
<div class="px-4 py-4">
	<div class="mb-2 text-sm">保留一位小数</div>
	<Stepper decimal={1} step={0.1} max={1} min={0.1} value={0.5} />
</div>
<div class="px-4 py-4">
	<div class="mb-2 text-sm">保留四位小数</div>
	<Stepper decimal={4} step={0.0001} max={1} min={0.0001} value={0.5} />
</div>

<div class="mx-4 mt-8 font-bold text-lg">异步显示数字</div>
<div class="px-4 py-4">
	<div class="mb-2 text-sm">Toast 显示异步状态</div>
	<Stepper
		async={loading1}
		value={asyncValue1}
		on:increase={() => handleChange1('increase')}
		on:decrease={() => handleChange1('decrease')}
	/>
</div>
<Toast bind:visible={loading1} type="loading" message="保存中..." />
<div class="px-4 mb-2 text-sm">内部显示异步状态</div>
<div class="px-4 py-4 flex gap-2">
	<Stepper
		async={loading2}
		value={asyncValue2}
		asyncLoading
		on:increase={() => handleChange2('increase')}
		on:decrease={() => handleChange2('decrease')}
	/>
	<Stepper
		async={loading3}
		value={asyncValue3}
		asyncLoading
		loading={{ type: '1_51' }}
		on:increase={() => handleChange3('increase')}
		on:decrease={() => handleChange3('decrease')}
	/>
</div>

<div class="mx-4 mt-8 font-bold text-lg">外部无 padding</div>
<div class="px-4 py-2">
	<Stepper padding={false} />
</div>
<div class="px-4 py-2">
	<Stepper padding={false} numberHighlight />
</div>
<div class="px-4 py-2">
	<Stepper padding={false} theme={false} />
</div>

<div class="mx-4 mt-8 font-bold text-lg">不同位置注入 Class</div>
<div class="px-4 py-2">
	<Stepper theme={false} injClassOut="bg-gradient-to-r from-[#CE9FFC] to-[#7367F0]" />
</div>
<div class="px-4 py-2">
	<Stepper injClassNum="text-primary dark:text-dark" />
</div>
<div class="px-4 py-2">
	<Stepper injClassBtn="rounded-full" />
</div>
