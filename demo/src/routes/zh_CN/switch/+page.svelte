<!-- Switch Demo -->
<script>
	import { Switch, Icon, Cell, Dialog } from '../../../../../packages/stdf/components';

	let checkAsync = false;
	const switchClickFun = () => {
		setTimeout(() => {
			checkAsync = !checkAsync;
		}, 2000);
	};
	let cellCheck = false;
	const cellAsyncFun = () => {
		setTimeout(() => {
			cellCheck = !cellCheck;
		}, 2000);
	};
	let loading = false;
	let loadingCheck = false;
	const loadingFun = () => {
		loading = true;
		setTimeout(() => {
			loadingCheck = !loadingCheck;
			loading = false;
		}, 3000);
	};
	let cellLoading = false;
	let cellLoadingCheck = false;
	const cellLoadingFun = () => {
		cellLoading = true;
		setTimeout(() => {
			cellLoadingCheck = !cellLoadingCheck;
			cellLoading = false;
		}, 3000);
	};
	let visible = false;
	let confirmSwitcheck = false;
	const confirmFunc = () => {
		visible = false;
		confirmSwitcheck = !confirmSwitcheck;
	};
	const showDialogFunc = () => {
		visible = true;
	};
</script>

<div class="pb-8">
	<div class="flex flex-col space-y-8 py-8 px-4">
		<div>
			<div class="mb-4 font-bold">不同圆角</div>
			<div class="flex justify-between">
				<Switch />
				<Switch radius="none" />
				<Switch radius="full" />
			</div>
		</div>
		<div>
			<div class="mb-4 font-bold">不同颜色</div>
			<div class="flex justify-between">
				<Switch check injClass="bg-success dark:bg-success" />
				<Switch check injClass="bg-error dark:bg-error" />
				<Switch check injClass="bg-warning dark:bg-warning" />
				<Switch check injClass="bg-[#DC88F5] dark:bg-[#FFCA28]" />
			</div>
		</div>
		<div>
			<div class="mb-4 font-bold">带文字 / 状态 / 图标</div>
			<div class="flex justify-between">
				<Switch inside={['关', '开']} />
				<Switch inside={['😭', '😄']} />
				<Switch inside="state" />
				<!-- <Switch inside="state" radius="none" /> -->
				<Switch inside="slot">
					<div slot="false">
						<Icon name="ri-moon-line" size={16} top={-1} />
					</div>
					<div slot="true">
						<Icon name="ri-sun-line" size={16} top={-1} />
					</div>
				</Switch>
			</div>
		</div>
		<div>
			<div class="mb-4 font-bold">禁用</div>
			<div class="flex justify-between">
				<Switch disabled />
				<Switch disabled check />
			</div>
		</div>
		<div>
			<div class="mb-4 font-bold">异步控制</div>
			<div class="flex justify-between">
				<div class="flex flex-col space-y-2 items-center">
					<Switch async check={checkAsync} on:click={switchClickFun} />
					<div class="text-sm">点击 2 秒后触发</div>
				</div>
				<div class="flex flex-col space-y-2 items-center">
					<Switch async check={loadingCheck} loading={{ theme: true }} on:click={loadingFun} inside={loading ? 'loading' : ''} />
					<div class="text-sm">点击 3 秒后触发</div>
				</div>
			</div>
		</div>
	</div>
	<!--    <div>-->
	<div class="mb-4 font-bold px-4">Cell 中使用</div>
	<Cell title="开关" detail="点击整行皆可触发开关" right={{ type: 'switch' }} />
	<Cell title="开关带文字" right={{ type: 'switch', switch: { inside: ['😭', '😄'] } }} switcheck />
	<Cell title="开关全圆角" right={{ type: 'switch', switch: { radius: 'full' } }} />
	<Cell
		title="异步控制"
		detail="点击 2 秒后触发开关"
		right={{ type: 'switch', switch: { async: true } }}
		switcheck={cellCheck}
		on:click={cellAsyncFun}
	/>
	<Cell
		title="异步加载"
		detail="点击 3 秒后触发开关"
		right={{ type: 'switch', switch: { async: true, inside: cellLoading ? 'loading' : '' } }}
		switcheck={cellLoadingCheck}
		on:click={cellLoadingFun}
	/>
	<Cell title="禁用开关" right={{ type: 'switch', switch: { disabled: true } }} switcheck />

	<Cell title="二次确认" right={{ type: 'switch', switch: { async: true } }} bind:switcheck={confirmSwitcheck} on:click={showDialogFunc} />
	<Dialog bind:visible content={`确定${confirmSwitcheck ? '关闭' : '开启'}此开关吗？`} on:primary={confirmFunc} />
</div>
