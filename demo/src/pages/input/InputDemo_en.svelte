<!-- Input Demo -->
<script>
	import { getContext } from 'svelte';
	import { Input, Button, Icon, Toast } from 'stdf';

	let value = 'Init text';
	let visible = false;

	let IdCard = '';

	const isIframe = getContext('iframe') === '1'; //判断是否是iframe

	$: placeholderIdCard = IdCard === '' ? 'Please enter identification number' : '';
	const clickLabel4Fun = () => {
		placeholderIdCard = 'After two seconds, the recognition is complete......';
		setTimeout(() => {
			IdCard = '1234567890XXX-XX';
		}, 2000);
	};
	let mobileLength = 0;
	const changeStateFun = e => {
		mobileLength = e.detail.length;
	};
	$: mobileState = mobileLength === 11 ? 'success' : mobileLength === 0 ? 'theme' : 'error';
</script>

<div class="px-4 pt-8 font-bold text-xl">Basic usage</div>
<Input title="text" />

<div class="px-4 pt-8 font-bold text-xl">Without the title</div>
<Input placeholder="Please enter the text" />

<div class="px-4 pt-8 font-bold text-xl">customize placeholder</div>
<Input title="text" placeholder="customize placeholder" />

<div class="px-4 pt-8 font-bold text-xl">
	Different input types
	{#if isIframe}
		<span class="text-xs opacity-50 ml-2">Please check the keyboard type on your mobile device.</span>
	{/if}
</div>
<Input title="Any text (conventional keyboard)" />
<Input title="password" type="password" />
<Input title="Number (arbitrarily)" type="number" />
<Input title="Number (integer)" type="numeric" />
<Input title="Number (allowing decimal points)" type="decimal" />
<Input title="Mail" type="email" />
<Input title="telephone number" type="tel" />
<Input title="Url" type="url" />
<Input title="Search" type="search" />
<Input title="Text (not using virtual keyboard)" type="none" />

<div class="px-4 pt-8 font-bold text-xl">Linear style</div>
<Input title="text" inputStyle="line" />
<Input title="Text (the line of the line is in the middle of the line)" inputStyle="line" lineTransition="center" />
<Input title="Text (transition from the left side of the line)" inputStyle="line" lineTransition="left" />

<div class="px-4 pt-8 font-bold text-xl">Different transition time</div>
<Input title="quick" duration="fast" />
<Input title="normal" />
<Input title="Slower" duration="slower" />
<Input title="line normally" inputStyle="line" lineTransition="center" />
<Input title="line slower" inputStyle="line" lineTransition="center" duration="slower" />

<div class="px-4 pt-8 font-bold text-xl">Different title positions</div>
<Input title="Title (outside)" />
<Input title="Title (inside)" titlePosition="in" />
<Input title="Title (none)" titlePosition="none" />

<div class="px-4 pt-8 font-bold text-xl">Different input text position</div>
<Input title="text" />
<Input title="text" inputPosition="right" />

<div class="px-4 pt-8 font-bold text-xl">Different rounded style</div>
<Input title="text" />
<Input title="text" radius="xl" />
<Input title="text" radius="full" />
<Input title="text" radius="none" />
<Input title="Linear style rounded corners are invalid" radius="full" inputStyle="line" />

<div class="px-4 pt-8 font-bold text-xl">Different vertical spacing</div>
<Input placeholder="Spacing 0" py="0" inputStyle="line" />
<Input placeholder="Spacing 0" py="0" inputStyle="line" />
<Input placeholder="Spacing 0" py="0" inputStyle="line" />
<Input placeholder="Spacing 4" py="4" inputStyle="line" />
<Input placeholder="Spacing 4" py="4" inputStyle="line" />
<Input placeholder="Spacing 4" py="4" inputStyle="line" />

<div class="px-4 pt-8 font-bold text-xl">Removal</div>
<Input title="text" clear />

<div class="px-4 pt-8 font-bold text-xl">Disable</div>
<Input title="text" disabled value="Disabled" />

<div class="px-4 pt-8 font-bold text-xl">Different states</div>
<Input title="success" state="success" />
<Input title="warning" state="warning" />
<Input title="error" state="error" />
<Input title="info" state="info" />
<Input title="warning & line" inputStyle="line" state="error" />
<Input title="warning & line & Animation" inputStyle="line" state="error" lineTransition="center" />
<Input
	title="Dynamic change status color"
	type="tel"
	placeholder="Please enter the 11 -digit mobile phone number"
	maxlength={11}
	state={mobileState}
	on:change={changeStateFun}
/>

<div class="px-4 pt-8 font-bold text-xl">Left with icon</div>
<Input title="password" type="password" label1={{ name: 'ri-lock-line', size: 16, alpha: 0.5 }} />
<Input
	title="username"
	label1={{ name: 'ri-arrow-down-s-line', size: 16, alpha: 0.5 }}
	label3={{ name: 'ri-shield-user-line', size: 16, alpha: 0.5 }}
/>

<div class="px-4 pt-8 font-bold text-xl">Left with text</div>
<Input title="account" label2="account" />

<div class="px-4 pt-8 font-bold text-xl">The left with icon and text</div>
<Input title="password" type="password" label1={{ name: 'ri-lock-line', size: 16, alpha: 0.5 }} label2="password" />

<div class="px-4 pt-8 font-bold text-xl">The left with text and icon</div>
<Input title="password" type="password" label2="password" label3={{ name: 'ri-lock-line', size: 16, alpha: 0.5 }} />

<div class="px-4 pt-8 font-bold text-xl">left with icon & text & icon</div>
<Input
	title="password"
	type="password"
	label1={{ name: 'ri-bank-line', size: 16, alpha: 0.5 }}
	label2="password"
	label3={{ name: 'ri-lock-line', size: 16, alpha: 0.5 }}
/>

<div class="px-4 pt-8 font-bold text-xl">left with icon</div>
<Input title="ID number" label4={{ name: 'ri-qr-scan-line', size: 16, alpha: 0.5 }} />
<Input
	title="User"
	label4={{ name: 'ri-arrow-down-s-line', size: 16, alpha: 0.5 }}
	label6={{ name: 'ri-shield-user-line', size: 16, alpha: 0.5 }}
/>

<div class="px-4 pt-8 font-bold text-xl">right with text</div>
<Input title="Amount" type="number" label5="$" />

<div class="px-4 pt-8 font-bold text-xl">right with iocn and text</div>
<Input title="password" type="password" label4={{ name: 'ri-lock-line', size: 16, alpha: 0.5 }} label5="password" />

<div class="px-4 pt-8 font-bold text-xl">right with text and icon</div>
<Input title="password" type="password" label5="password" label6={{ name: 'ri-lock-line', size: 16, alpha: 0.5 }} />

<div class="px-4 pt-8 font-bold text-xl">right with icon & text & icon</div>
<Input
	title="password"
	type="password"
	label4={{ name: 'ri-bank-line', size: 16, alpha: 0.5 }}
	label5="password"
	label6={{ name: 'ri-lock-line', size: 16, alpha: 0.5 }}
/>

<div class="px-4 pt-8 font-bold text-xl">left with text, right with icon</div>
<Input label2="身份证号" label6={{ name: 'ri-qr-scan-line', size: 16, alpha: 0.5 }} placeholder="请输入身份证号" />

<div class="px-4 pt-8 font-bold text-xl">Six left and right all band</div>
<Input
	title="password"
	type="password"
	label1={{ name: 'ri-bank-line', size: 16, alpha: 0.5 }}
	label2="password"
	label3={{ name: 'ri-lock-line', size: 16, alpha: 0.5 }}
	label4={{ name: 'ri-bank-line', size: 16, alpha: 0.5 }}
	label5="password"
	label6={{ name: 'ri-lock-line', size: 16, alpha: 0.5 }}
/>

<div class="px-4 pt-8 font-bold text-xl">Prompt information and data item combination</div>
<Input title="text" tip="Prompt information" />
<Input title="text" data1="data1" />
<Input title="text" data1="data1" data2="data2" />
<Input title="text" data3="data3" />
<Input title="text" data1="data1" tip="information" />
<Input title="text" data3="data3" tip="information" />

<div class="px-4 pt-8 font-bold text-xl">Show all configuration items</div>
<Input
	title="title"
	placeholder="Please enter the text"
	label1={{ name: 'ri-bank-line', size: 16, alpha: 0.5 }}
	label2="label2"
	label3={{ name: 'ri-lock-line', size: 16, alpha: 0.5 }}
	label4={{ name: 'ri-bank-line', size: 16, alpha: 0.5 }}
	label5="label5"
	label6={{ name: 'ri-qr-scan-line', size: 16, alpha: 0.5 }}
	data1="data1"
	data2="data2"
	data3="data3"
	tip="tip"
	clear
/>

<div class="px-4 pt-8 font-bold text-xl">label1 and label4 use slot</div>
<Input title="Verification code" label1="slot" label4="slot">
	<div slot="label1">
		<svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
			<path
				d="M511.198384 637.07798c-17.170101 0-31.08202 13.911919-31.08202 31.08202v124.302222c0 17.157172 13.924848 31.08202 31.08202 31.08202s31.069091-13.924848 31.069091-31.08202v-124.302222c0-17.170101-13.911919-31.08202-31.069091-31.08202z m0 0"
				fill="#515151"
			/>
			<path
				d="M759.815758 513.331717V264.145455C759.815758 126.823434 648.520404 15.515152 511.198384 15.515152c-137.309091 0-248.630303 111.308283-248.630303 248.630303v249.186262C223.702626 565.20404 200.40404 629.423838 200.40404 699.229091c0 171.649293 139.145051 310.794343 310.794344 310.794343s310.794343-139.145051 310.794343-310.794343c0-69.805253-23.311515-134.025051-62.176969-185.897374zM324.719192 264.145455c0-102.994747 83.497374-186.479192 186.479192-186.479192 102.981818 0 186.466263 83.484444 186.466262 186.479192v186.88c-51.975758-39.111111-116.402424-62.577778-186.466262-62.577778s-134.490505 23.453737-186.479192 62.577778V264.145455z m186.479192 683.726868c-137.309091 0-248.630303-111.321212-248.630303-248.643232 0-137.309091 111.308283-248.617374 248.630303-248.617374 132.628687 0 248.617374 115.988687 248.617374 248.617374 0 137.32202-111.295354 248.643232-248.617374 248.643232z m0 0"
				fill="#515151"
			/>
		</svg>
	</div>
	<div slot="label4">
		<Button size="auto" heightOut="0" heightIn="1" fill="lineTheme">
			<div class="px-2">Get code</div>
		</Button>
	</div>
</Input>

<div class="px-4 pt-8 font-bold text-xl">Dynamic display</div>
<Input
	title="Dynamic display label5"
	type="tel"
	placeholder="Please enter the 11 -digit mobile phone number"
	maxlength={11}
	state={mobileState}
	on:change={changeStateFun}
	label5="slot"
>
	<div slot="label5">
		{#if mobileLength === 11}
			<Icon name="ri-check-fill" injClass="text-[green]" size={14} />
		{:else if mobileLength === 0}
			<!-- none -->
		{:else}
			<Icon name="ri-close-fill" injClass="text-[red]" size={14} />
		{/if}
	</div>
</Input>

<div class="px-4 pt-8 font-bold text-xl">bind value</div>
<Input title="text" bind:value />
<Button on:click={() => (visible = true)}>Display the current value</Button>
<Toast bind:visible message={`Currently entering text:${value}`} />

<div class="px-4 pt-8 font-bold text-xl">click label4 trigger event</div>
<Input
	title="ID number"
	placeholder={placeholderIdCard}
	bind:value={IdCard}
	label4={{ name: 'ri-qr-scan-line', size: 16, alpha: 0.5 }}
	on:clicklabel4={clickLabel4Fun}
	clear
/>

<div class="px-4 pt-8 font-bold text-xl">textarea</div>
<Input placeholder="Please enter the content" type="textarea" />

<div class="px-4 pt-8 font-bold text-xl">textarea automatic height</div>
<Input placeholder="Please enter the content" type="textarea" autosize />
