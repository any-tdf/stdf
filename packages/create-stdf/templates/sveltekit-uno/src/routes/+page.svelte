<script>
	import { setContext } from 'svelte';
	import { Button, Cell, Icon, Calendar } from 'stdf';
	import en_US from 'stdf/lang/en_US';
	import zh_CN from 'stdf/lang/zh_CN';
	import Counter from './Counter.svelte';

	import { browser } from '$app/environment';

	if (browser) {
		//解决ios不支持按钮:active伪类
		// Solve the problem that ios does not support the button: active pseudo class
		document.body.addEventListener('touchstart', function () {
			//...空函数即可
			// ... Empty function is OK
		});
	}

	//切换亮暗模式(toggle light or dark mode)
	let theme = sessionStorage.getItem('theme') === 'dark' ? 'dark' : 'light';
	if (theme === 'dark') {
		document.documentElement.classList.add('dark');
	}
	const toggleModeFun = () => {
		if (theme === 'dark') {
			// 切换到(light switch to light)
			theme = 'light';
			document.documentElement.classList.remove('dark');
			sessionStorage.setItem('theme', 'light');
		} else {
			// 切换到(dark switch to dark)
			theme = 'dark';
			document.documentElement.classList.add('dark');
			sessionStorage.setItem('theme', 'dark');
		}
	};

	// 设置语言(setting language)
	let lang = sessionStorage.getItem('lang') === 'en_US' ? 'en_US' : 'zh_CN';
	$: isZh = lang === 'zh_CN';
	setContext('STDF_lang', sessionStorage.getItem('lang') === 'en_US' ? en_US : zh_CN);
	const toggleLangFun = () => {
		lang = isZh ? 'en_US' : 'zh_CN';
		sessionStorage.setItem('lang', isZh ? 'en_US' : 'zh_CN');
		// 刷新(refresh)
		location.reload();
	};

	// 进度条(percent)
	let percent = 20;
	const reduceFunc = () => {
		percent > 0 && (percent -= 10);
	};
	const increaseFunc = () => {
		percent < 100 && (percent += 10);
	};

	// 日历(calendar)
	let visible = false;
</script>

<div class="flex justify-center items-center text-center gap-4 pt-10">
	<a class="flex flex-col items-center w-10" href="https://kit.svelte.dev" target="_blank" rel="noreferrer">
		<img src="/svelte.svg" alt="Svelte Logo" />
	</a>+
	<a class="flex flex-col items-center w-8" href="https://unocss.dev" target="_blank" rel="noreferrer">
		<img src="/uno.svg" alt="UnoCSS Logo" />
	</a>+
	<a class="flex flex-col items-center w-8" href="https://stdf.design" target="_blank" rel="noreferrer">
		<svg viewBox="0 0 90 80" fill="currentColor">
			<path
				class="text-primary dark:text-dark"
				d="M0 0H20H40H50C64.8056 0 77.7325 8.04398 84.6487 20H50H40V22.6757V30H50C55.5229 30 60 34.4771 60 40C60 45.5229 55.5229 50 50 50H40V57.3243V78.7398V80H20V66.4583V20H15.3513H0V0ZM50 80C72.0914 80 90 62.0914 90 40C90 36.547 89.5625 33.1962 88.7398 30H67.3244C69.0261 32.9417 70 36.3571 70 40C70 51.0457 61.0457 60 50 60V80Z"
			/>
			<path class="text-dark dark:text-primary" d="M20 30V0L0 50H20V80L40 30H20Z" />
		</svg>
	</a>
</div>
<div class="text-center my-8 text-xs">
	{#if isZh}
		<p>这是一个使用 SvelteKit + UnoCSS + STDF 构建的模板。</p>
		<p class="mt-2">点击上方 LOGO 了解更多。</p>
	{:else}
		<p>This is a template using SvelteKit + TailwindCSS + STDF.</p>
		<p class="mt-2">Click the logo above to learn more.</p>
	{/if}
</div>
<div class="my-8">
	<a href="about">
		<Cell title={isZh ? '跳转 ABOUT' : 'Go to ABOUT'} />
	</a>
</div>
<div class="my-8">
	<Cell title={isZh ? '暗模式' : 'Dark mode'} right={{ type: 'switch', switch: { check: theme === 'dark' } }} on:click={toggleModeFun} />
</div>
<div class="mt-8">
	<Counter bind:percent />
</div>
<div class="mb-8">
	<Button heightIn="0" group fill="lineTheme">
		<div class="flex divide-x">
			<div class="flex-1 py-2 active:opacity-80" on:click={reduceFunc}>-10</div>
			<div class="flex-1 py-2 active:opacity-80" on:click={increaseFunc}>+10</div>
			<div class="flex-1 py-2 active:opacity-80" on:click={() => (percent = 20)}>{isZh ? '重置' : 'Reset'}</div>
		</div>
	</Button>
</div>
<div class="my-8">
	<Button fill="lineTheme" on:click={() => (visible = true)}>{isZh ? '日历' : 'Calendar'}</Button>
</div>
<Calendar bind:visible />
<div class="my-8 px-8 flex justify-between">
	<Icon name="cake" theme path="symbols/Heroicons.svg" />
	<Icon name="riding-line" path="symbols/Remix.svg" />
	<Icon name="spy-line" theme path="symbols/Remix.svg" />
	<Icon name="javascript-fill" injClass="text-[red] dark:text-green" path="symbols/Remix.svg" />
	<Icon name="cup" theme path="symbols/IconPark.svg" />
</div>
<div class="px-4 text-xs">
	{isZh ? '图标：第一个来自' : 'Icons: The first one comes from'} <a class="underline" href="https://heroicons.com">Heroicons</a>
	，{isZh ? '最后一个来自' : 'the last one comes from'} <a class="underline" href="https://iconpark.oceanengine.com">IconPark</a>
	，{isZh ? '其余来自' : 'the rest come from'} <a class="underline" href="https://remixicon.com">Remix Icon</a> 。
</div>
<div class="my-8">
	<Button on:click={toggleLangFun}>{isZh ? '切换语言' : 'Toggle language'}</Button>
</div>
