<!-- Switch Demo -->
<script>
	import { Switch, Icon, Cell, Dialog } from 'stdf';

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
			<div class="mb-4 font-bold">Different fillet</div>
			<div class="flex justify-between">
				<Switch />
				<Switch radius="none" />
				<Switch radius="full" />
			</div>
		</div>
		<div>
			<div class="mb-4 font-bold">Different colors</div>
			<div class="flex justify-between">
				<Switch check injClass="bg-success dark:bg-success" />
				<Switch check injClass="bg-error dark:bg-error" />
				<Switch check injClass="bg-warning dark:bg-warning" />
				<Switch check injClass="bg-[#DC88F5] dark:bg-[#FFCA28]" />
			</div>
		</div>
		<div>
			<div class="mb-4 font-bold">With text/status/icon</div>
			<div class="flex justify-between">
				<Switch inside={['OF', 'ON']} />
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
			<div class="mb-4 font-bold">disable</div>
			<div class="flex justify-between">
				<Switch disabled />
				<Switch disabled check />
			</div>
		</div>
		<div>
			<div class="mb-4 font-bold">Asynchronous control</div>
			<div class="flex justify-between">
				<div class="flex flex-col space-y-2 items-center">
					<Switch async check={checkAsync} on:click={switchClickFun} />
					<div class="text-sm">Trigger after 2 seconds of clicking</div>
				</div>
				<div class="flex flex-col space-y-2 items-center">
					<Switch async check={loadingCheck} loading={{ theme: true }} on:click={loadingFun} inside={loading ? 'loading' : ''} />
					<div class="text-sm">Trigger after 3 seconds of clicking</div>
				</div>
			</div>
		</div>
	</div>
	<!--    <div>-->
	<div class="mb-4 font-bold px-4">Use in Cell</div>
	<Cell title="switch" detail="Click on the whole row to trigger the switch" right={{ type: 'switch' }} />
	<Cell title="Switch tape text" right={{ type: 'switch', switch: { inside: ['😭', '😄'] } }} switcheck />
	<Cell title="Switch with full rounded corners" right={{ type: 'switch', switch: { radius: 'full' } }} />
	<Cell
		title="Asynchronous control"
		detail="Click 2 seconds to trigger the switch"
		right={{ type: 'switch', switch: { async: true } }}
		switcheck={cellCheck}
		on:click={cellAsyncFun}
	/>
	<Cell
		title="Asynchronous loading"
		detail="Click 3 seconds to trigger the switch"
		right={{ type: 'switch', switch: { async: true, inside: cellLoading ? 'loading' : '' } }}
		switcheck={cellLoadingCheck}
		on:click={cellLoadingFun}
	/>
	<Cell title="Disable switch" right={{ type: 'switch', switch: { disabled: true } }} switcheck />

	<Cell
		title="Secondary confirmation"
		right={{ type: 'switch', switch: { async: true } }}
		bind:switcheck={confirmSwitcheck}
		on:click={showDialogFunc}
	/>
	<Dialog bind:visible content={`determine ${confirmSwitcheck ? 'Shut down' : 'open'} this switch?`} on:primary={confirmFunc} />
</div>
