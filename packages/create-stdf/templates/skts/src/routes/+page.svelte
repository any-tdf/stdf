<script>
	import { setContext } from 'svelte';
	import { Button, Cell, Icon, Calendar } from 'stdf';
	import { STDFTheme, switchTheme, darkMode } from 'stdf/theme';
	import NintendoTheme from '../data/nintendo';
	import { en_US, zh_CN } from 'stdf/lang';
	import Counter from './Counter.svelte';

	import { browser } from '$app/environment';

	if (browser) {
		//解决 ios 不支持按钮:active 伪类
		// Solve the problem that ios does not support the button: active pseudo class
		document.body.addEventListener('touchstart', function () {
			//...空函数即可
			// ... Empty function is OK
		});
	}

	//切换亮暗模式 (toggle light or dark mode)
	let mode = $state(sessionStorage.getItem('mode') === 'dark' ? 'dark' : 'light');

	$effect(() => {
		if (mode === 'dark') {
			darkMode(true);
		} else {
			darkMode(false);
		}
	});
	const toggleModeFun = () => {
		if (mode === 'dark') {
			// 切换到 (light switch to light)
			mode = 'light';
			darkMode(false);
			sessionStorage.setItem('mode', 'light');
		} else {
			// 切换到 (dark switch to dark)
			mode = 'dark';
			darkMode(true);
			sessionStorage.setItem('mode', 'dark');
		}
	};

	// 设置语言 (setting language)
	let lang = $state(localStorage.getItem('lang') === 'en_US' ? 'en_US' : 'zh_CN');
	setContext('STDF_lang', localStorage.getItem('lang') === 'en_US' ? en_US : zh_CN);
	const toggleLangFun = () => {
		lang = lang === 'zh_CN' ? 'en_US' : 'zh_CN';
		localStorage.setItem('lang', lang);
		window.location.reload();
	};

	// 进度条 (percent)
	let percent = $state(20);
	const reduceFunc = () => {
		if (percent > 0) {
			percent -= 10;
		}
	};
	const increaseFunc = () => {
		if (percent < 100) {
			percent += 10;
		}
	};

	// 日历(calendar)
	let visible = $state(false);

	// 主题(theme)
	let theme = $state('STDF');
	const toggleThemeFun = () => {
		if (theme === 'STDF') {
			theme = 'Nintendo';
			switchTheme(NintendoTheme);
		} else {
			theme = 'STDF';
			switchTheme(STDFTheme);
		}
	};
</script>

<div class="flex items-center justify-center gap-2 pt-10 text-center">
	<a class="flex w-10 flex-col items-center" href="https://kit.svelte.dev" target="_blank" rel="noreferrer">
		<img src="/svelte.svg" alt="Svelte Logo" />
	</a>+
	<a class="flex w-10 flex-col items-center" href="https://tailwindcss.com" target="_blank" rel="noreferrer">
		<img src="/tailwindcss.svg" alt="Tailwind Logo" />
	</a>+
	<a class="flex w-8 flex-col items-center" href="https://stdf.design" target="_blank" rel="noreferrer" aria-label="STDF Logo">
		<svg viewBox="0 0 90 80" fill="currentColor">
			<path
				class="text-primary dark:text-dark"
				d="M0 0H20H40H50C64.8056 0 77.7325 8.04398 84.6487 20H50H40V22.6757V30H50C55.5229 30 60 34.4771 60 40C60 45.5229 55.5229 50 50 50H40V57.3243V78.7398V80H20V66.4583V20H15.3513H0V0ZM50 80C72.0914 80 90 62.0914 90 40C90 36.547 89.5625 33.1962 88.7398 30H67.3244C69.0261 32.9417 70 36.3571 70 40C70 51.0457 61.0457 60 50 60V80Z"
			/>
			<path class="text-dark dark:text-primary" d="M20 30V0L0 50H20V80L40 30H20Z" />
		</svg>
	</a>
</div>
<div class="my-6 text-center text-xs">
	{#if lang === 'zh_CN'}
		<p>这是 SvelteKit + Tailwind + STDF 构建的模板</p>
		<p class="mt-2">点击上方 LOGO 了解更多</p>
	{:else}
		<p>This is a template using SvelteKit + TailwindCSS + STDF</p>
		<p class="mt-2">Click the logo above to learn more</p>
	{/if}
</div>
<div class="my-6">
	<a href="about">
		<Cell title={lang === 'zh_CN' ? '跳转 ABOUT' : 'Go to ABOUT'} />
	</a>
</div>
<div class="my-6">
	<Cell
		title={lang === 'zh_CN' ? '暗模式' : 'Dark mode'}
		right={{ type: 'switch', switch: { active: mode === 'dark' } }}
		onclick={toggleModeFun}
	/>
</div>
<div class="mt-8">
	<Counter bind:percent />
</div>
<div class="mb-8">
	<Button heightIn="0" group fill="lineTheme">
		<div class="flex w-full">
			<button class="border-primary dark:border-dark flex-1 border-r py-2 active:opacity-80" onclick={reduceFunc}>-10</button>
			<button class="border-primary dark:border-dark flex-1 border-r py-2 active:opacity-80" onclick={increaseFunc}>+10</button>
			<button class="flex-1 py-2 active:opacity-80" onclick={() => (percent = 20)}>
				{lang === 'zh_CN' ? '重置' : 'Reset'}
			</button>
		</div>
	</Button>
</div>
<div class="my-6">
	<Button fill="lineTheme" onclick={() => (visible = true)}>{lang === 'zh_CN' ? '日历' : 'Calendar'}</Button>
</div>
<Calendar bind:visible />
<div class="my-6 flex justify-between px-8">
	<Icon name="cake" theme path="symbols/Heroicons.svg" />
	<Icon name="riding-line" path="symbols/Remix.svg" />
	<Icon name="spy-line" theme path="symbols/Remix.svg" />
	<Icon name="javascript-fill" injClass="text-[red] dark:text-green" path="symbols/Remix.svg" />
	<Icon name="cup" theme path="symbols/IconPark.svg" />
</div>
<div class="px-4 text-xs">
	{#if lang === 'zh_CN'}
		<p>
			以上图标通过 <a class="underline" href="https://www.npmjs.com/package/rollup-plugin-stdf-icon" target="_blank">
				rollup-plugin-stdf-icon
			</a> 使用 SVG Sprites 方式：
		</p>
		<p class="mt-2">
			第一个来自
			<a class="underline" href="https://heroicons.com" target="_blank">Heroicons</a>，最后一个来自
			<a class="underline" href="https://iconpark.oceanengine.com" target="_blank">IconPark</a>，其余来自
			<a class="underline" href="https://remixicon.com" target="_blank">Remix Icon</a>。
		</p>
	{:else}
		<p>
			The above icons use <a class="underline" href="https://www.npmjs.com/package/rollup-plugin-stdf-icon" target="_blank">
				rollup-plugin-stdf-icon
			</a> way:
		</p>
		<p class="mt-2">
			The first one comes from
			<a class="underline" href="https://heroicons.com" target="_blank">Heroicons</a>，the last one comes from
			<a class="underline" href="https://iconpark.oceanengine.com" target="_blank">IconPark</a>，the rest come from
			<a class="underline" href="https://remixicon.com" target="_blank">Remix Icon</a>.
		</p>
	{/if}
</div>
<div class="my-6">
	<Button onclick={toggleLangFun}>{lang === 'zh_CN' ? '切换语言' : 'Toggle language'}</Button>
	<Button fill="lineTheme" onclick={toggleThemeFun}>{lang === 'zh_CN' ? '切换主题' : 'Toggle theme'}</Button>
</div>
