<script>
	import { NavBar } from 'stdf';

	const lang = sessionStorage.getItem('lang') === 'en_US' ? 'en_US' : 'zh_CN';
	$: isZh = lang === 'zh_CN';
</script>

<svelte:head>
	<title>About</title>
	<meta name="description" content="About this app" />
</svelte:head>

<div class="sticky z-10 top-0">
	<NavBar title={isZh ? '关于' : 'ABOUT'} on:clickleft={() => window.history.back()} />
</div>

<div class="px-2 py-20 text-center space-y-10">
	<div class="text-3xl text-primary dark:text-dark">{isZh ? '这是一个关于页面' : 'This is a about page'}</div>
	<div class="text-sm">{isZh ? '仅用于演示 SvelteKit 的路由功能' : "Only for demonstration of SvelteKit's routing functionality"}</div>
</div>
