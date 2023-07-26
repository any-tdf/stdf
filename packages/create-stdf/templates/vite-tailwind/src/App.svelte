<script>
    import { setContext } from 'svelte';
    import { Button, Cell } from 'stdf';
    import Counter from './lib/Counter.svelte';

    import viteLogo from './assets/vite.svg';
    import svelteLogo from './assets/svelte.svg';
    import tailwindLogo from './assets/tailwindcss.svg';

    //切换亮暗模式(toggle light or dark mode)
    let theme = 'light';
    const toggleModeFun = () => {
        if (theme === 'dark') {
            // 切换到(light switch to light)
            theme = 'light';
            document.documentElement.classList.remove('dark');
        } else {
            // 切换到(dark switch to dark)
            theme = 'dark';
            document.documentElement.classList.add('dark');
        }
    };

    // 设置语言(setting language)
    let lang = 'zh_CN';
    $: isZh = lang === 'zh_CN';
    const toggleLangFun = () => {
        lang = isZh ? 'en_US' : 'zh_CN';
        setContext('STDF_lang', lang);
    };

    // 进度条(percent)
    let percent = 20;
    const reduceFunc = () => {
        percent > 0 && (percent -= 10);
    };
    const increaseFunc = () => {
        percent < 100 && (percent += 10);
    };
</script>

<main>
    <div class="flex justify-center items-center text-center gap-4 pt-20">
        <a class="flex flex-col items-center w-10" href="https://vitejs.dev" target="_blank" rel="noreferrer">
            <img src={viteLogo} alt="Vite Logo" />
        </a>+
        <a class="flex flex-col items-center w-10" href="https://svelte.dev" target="_blank" rel="noreferrer">
            <img src={svelteLogo} alt="Svelte Logo" />
        </a>+
        <a class="flex flex-col items-center w-10" href="https://tailwindcss.com" target="_blank" rel="noreferrer">
            <img src={tailwindLogo} alt="Tailwind Logo" />
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
            <p>这是一个使用 Vite + Svelte + Tailwind + STDF 构建的模板。</p>
            <p class="mt-2">点击上方 LOGO 了解更多。</p>
        {:else}
            <p>This is a template using Vite + Svelte + TailwindCSS + STDF.</p>
            <p class="mt-2">Click the logo above to learn more.</p>
        {/if}
    </div>
    <div class="my-8">
        <Cell title={isZh ? '英文' : 'English'} right={{ type: 'switch' }} on:click={toggleLangFun} />
    </div>
    <div class="my-8">
        <Counter bind:percent />
    </div>
    <div class="my-8">
        <Button heightIn="0" group fill="lineTheme">
            <div class="flex divide-x">
                <div class="flex-1 py-2 active:opacity-80" on:click={reduceFunc}>-10</div>
                <div class="flex-1 py-2 active:opacity-80" on:click={increaseFunc}>+10</div>
                <div class="flex-1 py-2 active:opacity-80" on:click={() => (percent = 20)}>{isZh ? '重置' : 'Reset'}</div>
            </div>
        </Button>
    </div>
    <div class="my-8">
        <Button on:click={toggleModeFun}>{isZh ? '亮暗模式' : 'Light or dark mode'}</Button>
    </div>
</main>
