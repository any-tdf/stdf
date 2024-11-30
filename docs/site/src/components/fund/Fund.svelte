<script>
	import { fly, fade } from 'svelte/transition';
	import { isShowFundStore } from '../../store';

	const isZh = localStorage.getItem('lang') === 'zh_CN';

	let showWeChatPay = false;
	let showAlipayPay = false;

	// 判断是否是桌面设备
	const isDeskDeviceFunc = () => {
		return window.innerWidth >= 768;
	};
	const isDeskDevice = isDeskDeviceFunc();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	transition:fade
	class="fixed top-0 left-0 w-screen h-screen backdrop-blur bg-black/20 flex flex-col justify-center"
	style="z-index: 1000"
	on:click={() => {
		isShowFundStore.set(false);
	}}
>
	<div
		in:fly={{ y: -400 }}
		class="bg-white dark:bg-gray-950 shadow-lg rounded-xl mx-auto w-full md:w-[800px] p-4 md:p-8"
		on:click|stopPropagation
	>
		<div class="flex justify-between">
			<div class="text-xl font-bold">{isZh ? '支持' : 'Support'}</div>
			<div class="h-8">
				<a href="https://github.com/any-tdf/stdf" target="_blank">
					<img src="https://img.shields.io/github/stars/any-tdf/stdf?logo=github&label=stars&color=000" alt="GitHub" />
				</a>
			</div>
		</div>
		{#if isDeskDevice || (!showWeChatPay && !showAlipayPay)}
			<div class="mt-2 md:mt-8 text-xs text-gray-500">
				<p>
					{isZh
						? 'STDF 是一个免费开源、使用简单但很用心的组件库，在组件设计与开发、配套工具的提供、文档站点运营等方面投入了大量的时间、物力和精力。如果 STDF 确实给您带去了方便，希望您不吝啬您的喜爱之情支持 STDF 的工作，给一个 star 或打赏，非常感谢！'
						: 'STDF is a free and open source, easy to use but very attentive component library, which has invested a lot of time, material and energy in component design and development, supporting tool provision, document site operation, etc. If STDF does bring you convenience, I hope you will not hesitate to support STDF work with your love, give a star or reward, thank you very much!'}
				</p>
				<p class="mt-2 text-md font-bold">
					{isZh ? '无论如何，STDF 都会出于热爱并继续努力！' : 'In any case, STDF will continue to work hard out of love!'}
				</p>
			</div>
		{/if}
		<div class="grid {showWeChatPay || showAlipayPay ? 'grid-cols-1' : 'grid-cols-2'}  md:grid-cols-4 gap-2 mt-4 md:mt-10 text-center">
			<!-- coffee -->
			{#if isDeskDevice || (!showWeChatPay && !showAlipayPay)}
				<div
					class="border border-black/10 dark:border-white/10 rounded-lg w-full md:w-40 flex flex-col justify-center py-1 md:py-12 group md:relative"
				>
					<div class="h-8 w-6 mx-auto">
						<img class="w-full h-full object-cover" src="/assets/fund/coffee.svg" alt="coffee" />
					</div>
					<a class="block md:hidden mx-2" href="https://www.buymeacoffee.com/dufu1991" target="_blank">
						<div class="text-center font-bold after:content-['_↗']">Buy Me a Coffee</div>
						<div class="mt-1 text-xs text-gray-500">
							{isZh ? '推荐非中国地区使用' : 'Recommended for Non-China Regions'}
						</div>
					</a>
					<a
						class="hidden md:block absolute inset-1 bg-white dark:bg-gray-950 w-[95%] h-[95%] px-1 py-12 transition-all duration-500 opacity-0 group-hover:opacity-95"
						href="https://www.buymeacoffee.com/dufu1991"
						target="_blank"
					>
						<div class="text-center font-bold after:content-['_↗']">Buy Me a Coffee</div>
						<div class="mt-1 text-xs text-gray-500">
							{isZh ? '推荐非中国地区使用' : 'Recommended for Non-China Regions'}
						</div>
					</a>
				</div>
			{/if}
			<!-- paypal -->
			{#if isDeskDevice || (!showWeChatPay && !showAlipayPay)}
				<div
					class="border border-black/10 dark:border-white/10 rounded-lg w-full md:w-40 flex flex-col justify-center py-1 md:py-12 group md:relative"
				>
					<div class="h-8 w-8 mx-auto">
						<img class="w-full h-full object-cover" src="/assets/fund/paypal.svg" alt="paypal" />
					</div>
					<a class="block md:hidden mx-2" href="https://paypal.me/dufu1991" target="_blank">
						<div class="text-center font-bold after:content-['_↗']">PayPal</div>
						<div class="mt-1 text-xs text-gray-500">
							{isZh ? '推荐非中国地区使用' : 'Recommended for Non-China Regions'}
						</div>
					</a>
					<a
						class="hidden md:block absolute inset-1 bg-white dark:bg-gray-950 w-[95%] h-[95%] px-1 py-12 transition-all duration-500 opacity-0 group-hover:opacity-95"
						href="https://paypal.me/dufu1991"
						target="_blank"
					>
						<div class="text-center font-bold after:content-['_↗']">PayPal</div>
						<div class="mt-1 text-xs text-gray-500">
							{isZh ? '推荐非中国地区使用' : 'Recommended for Non-China Regions'}
						</div>
					</a>
				</div>
			{/if}
			<!-- wechat -->
			{#if isDeskDevice || !showAlipayPay}
				<div
					class="border border-black/10 dark:border-white/10 rounded-lg w-full md:w-40 flex flex-col justify-center py-1 md:py-12 group md:relative"
				>
					<div class="h-8 w-10 mx-auto" class:hidden={showWeChatPay}>
						<img class="w-full h-full object-cover" src="/assets/fund/wechat_pay.svg" alt="wechat" />
					</div>
					<div
						class="block md:hidden mx-2"
						on:click={() => {
							showWeChatPay = !showWeChatPay;
						}}
					>
						{#if showWeChatPay}
							<div class="mt-1">
								<img class="w-3/5 mx-auto object-cover" src="/assets/fund/wp_code.png" alt="wechat" />
							</div>
							<div class="text-xs text-gray-500 mt-1">
								{isZh ? '微信扫一扫' : 'WeChat Scan'}
							</div>
						{:else}
							<div class="text-center font-bold after:content-['_↗']">{isZh ? '微信赞赏' : 'WeChat Reward'}</div>
							<div class="mt-1 text-xs text-gray-500">
								{isZh ? '推荐中国地区使用' : 'Recommended for China Regions'}
							</div>
						{/if}
					</div>
					<button
						on:click={() => {
							showWeChatPay = !showWeChatPay;
						}}
						class="hidden md:block absolute cursor-pointer inset-1 bg-white dark:bg-gray-950 w-[95%] h-[95%] px-1 transition-all duration-500 opacity-0 group-hover:opacity-95"
						class:opacity-95={showWeChatPay}
					>
						{#if showWeChatPay}
							<div class="mt-0.5">
								<img class="w-[70%] mx-auto object-cover" src="/assets/fund/wp_code.png" alt="wechat" />
							</div>
							<div class="text-xs text-gray-500 mt-0.5">
								{isZh ? '微信扫一扫' : 'WeChat Scan'}
							</div>
						{:else}
							<div class="text-center font-bold after:content-['_↗'] mt-12">{isZh ? '微信赞赏' : 'WeChat Reward'}</div>
							<div class="mt-1 text-xs text-gray-500">
								{isZh ? '推荐中国地区使用' : 'Recommended for China Regions'}
							</div>
						{/if}
					</button>
				</div>
			{/if}
			<!-- alipay -->
			{#if isDeskDevice || !showWeChatPay}
				<div
					class="border border-black/10 dark:border-white/10 rounded-lg w-full mx-auto md:w-40 flex flex-col justify-center py-1 md:py-12 group md:relative"
				>
					<div class="h-8 w-8 mx-auto" class:hidden={showAlipayPay}>
						<img class="w-full h-full object-cover" src="/assets/fund/alipay.svg" alt="alipay" />
					</div>
					<div
						class="block md:hidden mx-2"
						on:click={() => {
							showAlipayPay = !showAlipayPay;
						}}
					>
						{#if showAlipayPay}
							<div class="m-1">
								<img class="w-3/5 mx-auto object-cover" src="/assets/fund/ap_code.png" alt="alipay" />
							</div>
							<div class="text-xs text-gray-500 mt-1">
								{isZh ? '支付宝扫一扫' : 'Alipay Scan'}
							</div>
						{:else}
							<div class="text-center font-bold after:content-['_↗']">{isZh ? '支付宝收款' : 'Alipay Payment'}</div>
							<div class="mt-1 text-xs text-gray-500">
								{isZh ? '推荐中国地区使用' : 'Recommended for China Regions'}
							</div>
						{/if}
					</div>
					<button
						on:click={() => {
							showAlipayPay = !showAlipayPay;
						}}
						class="hidden md:block absolute cursor-pointer inset-1 bg-white dark:bg-gray-950 w-[95%] h-[95%] px-1 transition-all duration-500 opacity-0 group-hover:opacity-95"
						class:opacity-95={showAlipayPay}
					>
						{#if showAlipayPay}
							<div class="mt-0.5">
								<img class="w-[70%] mx-auto object-cover" src="/assets/fund/ap_code.png" alt="wechat" />
							</div>
							<div class="text-xs text-gray-500 mt-0.5">
								{isZh ? '支付宝扫一扫' : 'Alipay Scan'}
							</div>
						{:else}
							<div class="text-center font-bold after:content-['_↗'] mt-12">{isZh ? '支付宝收款' : 'Alipay Payment'}</div>
							<div class="mt-1 text-xs text-gray-500">
								{isZh ? '推荐中国地区使用' : 'Recommended for China Regions'}
							</div>
						{/if}
					</button>
				</div>
			{/if}
		</div>
		<div class="mt-4 md:mt-8 text-xs text-gray-500">
			{isZh
				? '如果愿意的话，捐赠留言请注明 GitHub 或其他社交账号或相关链接地址，STDF 将在仓库与站点展示并感谢您们！'
				: 'If you are willing, please leave a message for donation with your GitHub or other social account or related link address. STDF will display and thank you in the warehouse and website!'}
		</div>
	</div>
</div>
