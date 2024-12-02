<script>
    // @ts-nocheck
    import { onMount, onDestroy } from 'svelte';
    import { link } from 'svelte-spa-router';
    import { fade } from 'svelte/transition';
    import { Confetti } from 'svelte-confetti';
    import { currentThemeStore, currentColorStore } from '../store';
    import { encodeData, rendererLine } from 'beautify-qrcode';

    const descList = [
        {
            title: 'Simple',
            titleZh: '简 单',
            desc: '使用 Svelte 语法编码简洁迅速。组件源码逻辑清晰、简单易懂、中英注释详细，查看源码、修改逻辑也可以得心应手。',
            descEn: 'Coding with Svelte syntax is simple and fast. The component source code logic is clear, simple and easy to understand, and the English and Chinese comments are detailed. You can also get used to it by viewing the source code and modifying the logic yourself.',
            icon: '/assets/images/3D-simple.png',
            iconDark: '/assets/images/3D-simple-dark.png',
            shwTip: false,
        },
        {
            title: 'Thin',
            titleZh: '轻 量',
            desc: '源码体积小巧，无三方依赖。基于 Svelte 与 Tailwind 编译出的代码在体积上也优势明显，这在移动端显得尤为重要。',
            descEn: 'The source code is small and has no third-party dependencies. The code compiled based on Svelte and Tailwind also has obvious advantages in terms of volume, which is particularly important in mobile terminals.',
            icon: '/assets/images/3D-thin.png',
            iconDark: '/assets/images/3D-thin-dark.png',
            shwTip: true,
        },
        {
            title: 'Design',
            titleZh: '设 计',
            desc: '针对移动设备优化设计与交互，使用友好、高效、灵活。支持通过简单配置定制颜色系统、圆角风格、亮暗模式等。',
            descEn: 'Optimized design and interaction for mobile devices, user-friendly, efficient, and flexible. Support customizing color system, corner style, light and dark mode, etc. through simple configuration.',
            icon: '/assets/images/3D-design.png',
            iconDark: '/assets/images/3D-design-dark.png',
            shwTip: false,
        },
        {
            title: 'Fast',
            titleZh: '快 速',
            desc: '无运行时，无虚拟 DOM，无烦杂的 CSS 代码，状态管理简单轻快。编码过程、编译处理、线上运行全都快起来了。',
            descEn: 'No runtime, no virtual DOM, no cumbersome CSS code, simple and fast state management. The coding process, compilation processing, and online running are all faster.',
            icon: '/assets/images/3D-fast.png',
            iconDark: '/assets/images/3D-fast-dark.png',
            shwTip: false,
        },
    ];
    const dominant = {
        title: '💪 优势 & 目标',
        title_en: '💪 Advantages & Goals',
        data: [
            {
                icon: 'svelte',
                p: '补充 Svelte 生态，让开发者可以更快速更舒服地开发出高质量的应用。',
                p_en: 'Supplement the Svelte ecosystem so that developers can develop high-quality applications faster and more comfortably.',
            },
            {
                icon: 'css3-line',
                p: '避免写繁琐的 CSS 代码，让开发者专注于业务逻辑，提高开发效率。',
                p_en: 'Avoid writing tedious CSS code, allowing developers to focus on business logic and improve development efficiency.',
            },
            {
                icon: 'contrast-2-line',
                p: '支持暗黑模式与主题配置，方便开发者直接适配，让应用更加现代化。',
                p_en: 'Supports dark mode and theme configuration, making it easy for developers to adapt directly and make applications more modern.',
            },
            {
                icon: 'paint-brush-line',
                p: '普适性较强。移动端组件库多用于 C 端，对比 B 端更加需要注重 UI 的灵活性。',
                p_en: 'It has strong versatility. Mobile component libraries are mostly used in C-end scenarios where UI flexibility is more important than B-end.',
            },
            {
                icon: 'clockwise-line',
                p: '注重交互与体验。适当的过渡动画与合理的交互设计，希望给你更好的用户体验。',
                p_en: 'Emphasis on interaction and experience. Appropriate transition animations and reasonable interaction design hope to give you a better user experience.',
            },
            {
                icon: 'article-line',
                p: '站点文档、示例、源码注释都支持中英双语，且不再中英混杂，一目了然。',
                p_en: 'Site documentation, examples, and source code comments all support bilingual Chinese and English, making it clear at a glance.',
            },
            {
                icon: 'file-copy-2-line',
                p: '示例代码丰富，方便直接复制使用，配备脚手架、插件等工具，对开发者友好。',
                p_en: 'The example code is extensive and convenient for direct copying and usage. It is equipped with scaffolding, plugins, etc. making it developer-friendly.',
            },
            {
                icon: 'planet-line',
                p: '组件支持国际化（目前 60+ 语言），让应用轻松实现多语言支持。',
                p_en: 'Component supports internationalization (currently 60+ languages), making it easy for applications to achieve multilingual support.',
            },
        ],
    };
    const ugly = {
        title: '🔔 提前警告',
        title_en: '🔔 Early Warning',
        data: [
            {
                icon: 'medal-line',
                p: 'STDF 不体现任何「价值观」，更加不能为您「赋能」，只希望能给您更好的开发体验，很简单很朴实。',
                p_en: 'STDF does not reflect any "values", and cannot "empower" you. We only hope to provide you with a better development experience, which is simple and straightforward.',
            },
            {
                icon: 'service-line',
                p: 'Svelte 生态相对 Vue 和 React 还很薄弱，如果您有兴趣，请积极参与和丰富 Svelte 生态。',
                p_en: 'The Svelte ecosystem is still relatively weak compared to Vue and React. If you are interested, please actively participate in and enrich the Svelte ecosystem.',
            },
            {
                icon: 'bard-line',
                p: 'STDF 也适用于 Svelte 生态的其他工程，比如 SvelteKit 等，使用前请确保知晓它们的基础原理。',
                p_en: 'STDF also applies to other projects in the Svelte ecosystem, such as SvelteKit, etc. When using them, please ensure that you understand their basic principles.',
            },
            {
                icon: 'git-close-pull-request-line',
                p: 'STDF 也适用于 Tailwind CSS 的类库，如 UnoCSS 等，使用它们请确保您知晓它们的基础原理。',
                p_en: 'STDF also applies to class libraries of Tailwind CSS, such as UnoCSS, etc. When using them, please ensure that you understand their basic principles.',
            },
        ],
    };
    const isZh = localStorage.getItem('lang') === 'zh_CN';

    // 赞助人员
    const thinkGithub = [{ name: 'yuedanlabs', amount: 10 }];

    const bottomInfo = [
        {
            title: '相关',
            title_en: 'Related',
            list: [
                {
                    title: 'Svelte',
                    title_en: 'Svelte',
                    link: 'https://svelte.dev',
                    _blank: true,
                },
                {
                    title: 'Tailwind',
                    title_en: 'Tailwind',
                    link: 'https://tailwindcss.com',
                    _blank: true,
                },
                { title: 'Remix Icon', title_en: 'Remix Icon', link: 'https://remixicon.com', _blank: true },
                // { title: 'RTDF(计划中)', title_en: 'RTDF(intend)', link: '', _blank: false },
                // { title: 'VTDF(计划中)', title_en: 'VTDF(intend)', link: '', _blank: false },
            ],
        },
        {
            title: '工具',
            title_en: 'Tools',
            list: [
                {
                    title: 'create-stdf',
                    title_en: 'create-stdf',
                    link: 'https://www.npmjs.com/package/create-stdf',
                    _blank: true,
                },
                {
                    title: 'rollup-plugin-stdf-icon',
                    title_en: 'rollup-plugin-stdf-icon',
                    link: 'https://www.npmjs.com/package/rollup-plugin-stdf-icon',
                    _blank: true,
                },
                {
                    title: 'STDF for VS Code',
                    title_en: 'STDF for VS Code',
                    link: 'https://marketplace.visualstudio.com/items?itemName=STDF.stdf-vscode-extension',
                    _blank: true,
                },
            ],
        },
        {
            title: '帮助',
            title_en: 'Help',
            list: [
                { title: '关于', title_en: 'About', link: '#/guide/about', _blank: false },
                { title: '常见问题', title_en: 'FAQ', link: '#/guide/faq', _blank: false },
                { title: '更新日志', title_en: 'Changelog', link: '#/guide/changelog', _blank: false },
                { title: '开源许可', title_en: 'License', link: 'https://github.com/any-tdf/stdf/blob/main/LICENSE', _blank: true },
            ],
        },
        {
            title: '社区',
            title_en: 'Community',
            list: [
                // { title: 'GitHub', title_en: 'GitHub', link: 'https://github.com/any-tdf/stdf' },
                {
                    title: 'QQ 群',
                    title_en: 'QQ Group',
                    link: 'https://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=U8ZlXJ3KVpTI9oZzs1jBnyWc3gVA0h6Y&authKey=ScWu0nU9g8BqNsC7o2eYkESwgVDVz9vzGNZEb17MrEAay9%2F7bTkXDiLJRIzo2vrg&noverify=0&group_code=581073686',
                    _blank: true,
                },
                // { title: '钉钉群', title_en: 'DingTalk Group', link: '', _blank: true },
                { title: 'Discord', title_en: 'Discord', link: 'https://discord.gg/DMkHu8GGre', _blank: true },
                { title: 'QQ 频道', title_en: 'QQ Discord', link: 'https://pd.qq.com/s/fdd8incyr', _blank: true },
                { title: 'Discussions', title_en: 'Discussions', link: 'https://github.com/any-tdf/stdf/discussions', _blank: true },
            ],
        },
    ];
    let showQr = false;
    let show3D = !(localStorage.getItem('show3D') === '0');

    const change3DFunc = () => {
        show3D = !show3D;
        localStorage.setItem('show3D', show3D ? '1' : '0');
    };

    const io = new IntersectionObserver(entries => {
        entries.forEach(item => {
            // isIntersecting是一个Boolean值，判断目标元素当前是否可见
            if (item.isIntersecting) {
                item.target.style.opacity = 1;
                item.target.style.transform = 'translateY(0)';
                setTimeout(() => {
                    item.target.style.transitionDuration = '300ms';
                }, 1000);
            } else {
                // item.target.style.opacity = 0;
                // item.target.style.transform = 'translateY(200px)';
            }
        });
    });
    let A_a1Svg;
    const mouseenterFun = () => {
        /**
         * A_a1
         * @param {Object} qrcode
         * @param {Object} options
         * @param {String} [options.type]  连线方向 0=>左右 1=>上下 2=>纵横 3=>回环 4=>左上—右下 5=>右上—左下 6=>交叉"
         * @param {String} [options.size] 连线粗细
         * @param {String} [options.opacity] 连线不透明度
         * @param {String} [options.posType] 定位点样式  0=>矩形 1=>圆形 2=>行星 3=>圆角矩形
         * @param {String} [options.otherColor] 连线颜色
         * @param {String} [options.posColor] 定位点颜色
         */
        const qrcode = encodeData({
            // main -> next
            text: 'https://next-demo.stdf.design?lang=' + (isZh ? 'zh_CN' : 'en_US'),
            isSpace: false,
        });
        const color = $currentThemeStore === 'dark' ? 'rgb(var(--theme-color-dark))' : 'rgb(var(--theme-color-primary))';
        A_a1Svg = rendererLine(qrcode, { posType: 2, otherColor: color, posColor: color });
        showQr = true;
    };
    onMount(() => {
        const intersectionList = document.querySelectorAll('.intersection');
        intersectionList.forEach(item => {
            // 开始时 opacity 为 0，不可见， transform 为 translateY(200px)
            item.style.opacity = 0;
            item.style.transform = 'translateY(200px)';
            item.style.transitionDuration = '1s';
            io.observe(item);
        });
    });
    const unsubscribe = currentColorStore.subscribe(value => {
        show3D = false;
        setTimeout(() => {
            show3D = localStorage.getItem('show3D') === '1';
        }, 0);
    });
    onDestroy(() => {
        unsubscribe();
    });
</script>

<div class="max-w-[2000px] mx-auto">
    <div class="lg:flex flex-row-reverse justify-center">
        {#if show3D}
            <div class="basis-1/2 mt-10 md:mt-0 overflow-hidden relative group">
                <spline-viewer
                    class="aspect-[4/3] md:aspect-auto scale-110 md:scale-100"
                    url="/assets/3d/scene.splinecode"
                    background={$currentThemeStore === 'dark'
                        ? `rgb(${getComputedStyle(document.documentElement).getPropertyValue('--theme-color-darkBlack')})`
                        : `rgb(${getComputedStyle(document.documentElement).getPropertyValue('--theme-color-primaryWhite')})`}
                />
                <!-- background="rgb(242, 242, 243)" -->
                <!-- background={backgroundColor} -->
                <!-- background="rgb(255, 0, 0)" -->
                <button
                    on:click={() => {
                        show3D = false;
                        localStorage.setItem('show3D', '0');
                    }}
                    class="absolute hidden md:block scale-0 group-hover:scale-100 transition-all duration-500 bg-black/5 dark:bg-white/10 px-2 py-1 cursor-pointer rounded text-black/80 dark:text-white/90 text-xs top-10 left-10"
                >
                    {isZh ? '隐藏 3D LOGO' : 'Hidden 3D LOGO'}
                </button>
            </div>
        {:else}
            <!-- 图片 -->
            <div class="basis-1/2 mt-10 md:mt-0 overflow-hidden flex flex-col justify-center relative group">
                <img src="/assets/3d/dark.png" alt="" class="w-full object-cover hidden dark:block" />
                <img src="/assets/3d/light.png" alt="" class="w-full object-cover block dark:hidden" />
                <button
                    on:click={() => {
                        show3D = true;
                        localStorage.setItem('show3D', '1');
                    }}
                    class="absolute hidden md:block scale-0 group-hover:scale-100 transition-all duration-300 bg-black/5 dark:bg-white/10 px-2 py-1 cursor-pointer rounded text-black/80 dark:text-white/90 text-xs top-10 left-10"
                >
                    {isZh ? '显示 3D LOGO' : 'Show 3D LOGO'}
                </button>
            </div>
        {/if}
        <div class="flex flex-col justify-center basis-2/5 text-center py-16 md:py-20">
            <div class="hidden md:flex h-20 md:h-28 mt-16 mb-20 flex-col justify-center items-center relative">
                <div class="absolute rounded-full opacity-50 md:opacity-100 animate-dynamicsBg blur-xl md:blur-3xl">
                    <svg viewBox="0 0 100 100">
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M50 0V100C22.3858 100 0 77.6142 0 50C0 22.3858 22.3858 0 50 0Z"
                            class="fill-dark"
                        />
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M50 100V0C77.6142 0 100 22.3858 100 50C100 77.6142 77.6142 100 50 100Z"
                            class="fill-primary"
                        />
                        <circle cx="50" cy="25" r="25" class="fill-primary" />
                        <circle cx="50" cy="75" r="25" class="fill-dark" />
                        <circle cx="50.25" cy="25.25" r="6.25" class="fill-dark" />
                        <circle cx="50.25" cy="75.25" r="6.25" class="fill-primary" />
                    </svg>
                </div>
                <div
                    class="absolute w-28 md:w-36 h-full"
                    style="filter: drop-shadow(0 10px 8px rgb(0 0 0 / 0.05)) drop-shadow(0 4px 3px rgb(0 0 0 / 0.1));"
                >
                    <svg viewBox="0 0 90 80" class="group">
                        <path
                            class="fill-primary dark:fill-dark"
                            d="M0 0H20H40H50C64.8056 0 77.7325 8.04398 84.6487 20H50H40V22.6757V30H50C55.5229 30 60 34.4771 60 40C60 45.5229 55.5229 50 50 50H40V57.3243V78.7398V80H20V66.4583V20H15.3513H0V0ZM50 80C72.0914 80 90 62.0914 90 40C90 36.547 89.5625 33.1962 88.7398 30H67.3244C69.0261 32.9417 70 36.3571 70 40C70 51.0457 61.0457 60 50 60V80Z"
                        />
                        <path
                            style="stroke-dasharray: 400;stroke-dashoffset: 400;"
                            class="fill-dark dark:fill-primary stroke-dark dark:stroke-primary text-dark dark:text-primary stroke-1 group-hover:animate-path"
                            d="M20 30V0L0 50H20V80L40 30H20Z"
                        />
                    </svg>
                </div>
            </div>
            <div class="text-5xl md:text-8xl font-medium">S T D F</div>
            <div class="mt-4 md:text-xl px-4">
                {#if isZh}
                    基于
                    <a
                        href="https://svelte.dev"
                        class="transition-all underline underline-offset-2 decoration-svelte hover:text-svelte"
                        target="_blank"
                        title={isZh ? '打开 Svelte 官方站点' : 'Open Svelte official website'}
                    >
                        Svelte
                    </a>
                    与
                    <a
                        href="https://tailwindcss.com/"
                        class="transition-all underline underline-offset-2 decoration-tailwind hover:text-tailwind"
                        target="_blank"
                        title={isZh ? '打开 Tailwind CSS 官方站点' : 'Open Tailwind CSS official website'}
                    >
                        Tailwind
                    </a>
                    的移动 web 组件库
                {:else}
                    Mobile web component
                    <br class="md:hidden" />
                    library based on
                    <a
                        href="https://svelte.dev"
                        class="transition-all underline underline-offset-2 decoration-svelte hover:text-svelte"
                        target="_blank"
                    >
                        Svelte
                    </a>
                    and
                    <a
                        href="https://tailwindcss.com/"
                        class="transition-all underline underline-offset-2 decoration-tailwind hover:text-tailwind"
                        target="_blank"
                    >
                        Tailwind
                    </a>
                {/if}
            </div>
            <div class="flex justify-center gap-4 mt-8 mb-8 md:mt-16 md:mb-10 space-x-8">
                <a
                    href="#/guide"
                    class="relative bg-primary dark:bg-dark py-2 px-6 text-white dark:text-black rounded hover:bg-primary/80 hover:dark:bg-dark/80 transition-all group"
                >
                    {isZh ? '开始使用' : 'Get Started'}
                    <span class="absolute left-1/2 top-0 hidden group-hover:block">
                        <Confetti infinite rounded />
                    </span>
                </a>
                <a
                    href="/"
                    use:link
                    on:mouseleave={() => (showQr = false)}
                    on:mouseenter={mouseenterFun}
                    class="border-solid border border-primary dark:border-dark py-2 px-6 rounded transition-all hidden md:block relative"
                >
                    {isZh ? '扫码示例' : 'QR Demo'}
                    {#if showQr}
                        <div
                            class="w-52 rounded-lg absolute z-10 top-0 left-full -translate-y-1/3 border border-black/5 translate-x-2 p-2 shadow-lg block dark:hidden"
                            in:fade={{ duration: 300 }}
                            out:fade={{ duration: 0 }}
                        >
                            <span>{@html A_a1Svg}</span>
                            <!-- <QrCode value="https://demo.stdf.design/#/" size={200} color="#fff" background="#23262B" /> -->
                        </div>
                        <div
                            class="w-52 rounded-lg absolute z-10 top-0 left-full bg-black -translate-y-1/3 border border-white/5 translate-x-2 p-2 shadow-lg hidden dark:block"
                            in:fade={{ duration: 300 }}
                            out:fade={{ duration: 0 }}
                        >
                            <span>{@html A_a1Svg}</span>
                            <!-- <QrCode value="https://demo.stdf.design/#/" size={200} color="#fff" background="#24262b" /> -->
                        </div>
                    {/if}
                </a>
                <!-- main -> next -->
                <a
                    href={'https://next-demo.stdf.design?lang=' + (isZh ? 'zh_CN' : 'en_US')}
                    target="_blank"
                    class="border-solid border border-primary dark:border-dark py-2 px-6 rounded transition-all block md:hidden"
                >
                    {isZh ? '查看示例' : 'Examples'}
                </a>
            </div>
        </div>
    </div>
    <div class="flex flex-wrap xl:flex-nowrap justify-around gap-8 px-8">
        {#each descList as desc}
            <div
                class="intersection ease-out group flex flex-col space-y-5 overflow-hidden items-center w-full pb-8 sm:w-2/3 md:w-80 lg:w-96 border-black/5 dark:border-white/5 rounded-xl dark:hover:shadow-white/5 transition-all duration-300"
            >
                <div class="overflow-hidden">
                    <img
                        class="block dark:hidden object-cover scale-100 group-hover:scale-[1.6] transition-all duration-500"
                        src={desc.icon}
                        alt=""
                    />
                    <img
                        class="hidden dark:block object-cover scale-100 group-hover:scale-[1.6] transition-all duration-500"
                        src={desc.iconDark}
                        alt=""
                    />
                </div>
                {#if isZh}
                    <div class="text-3xl font-medium py-4">{isZh ? desc.titleZh : desc.title}</div>
                {/if}
                <div class={`text-black/70 dark:text-white/60 text-sm ${isZh ? 'text-justify' : 'text-left pt-10'}`}>
                    {isZh ? desc.desc : desc.descEn}
                </div>
            </div>
        {/each}
    </div>

    <div class="px-4 md:px-12 pb-10 md:pb-20" class:text-left={!isZh}>
        <div class="mt-40">
            <div class="intersection transition-all ease-out my-10 md:my-20 font-bold text-2xl md:text-4xl text-center">
                {isZh ? dominant.title : dominant.title_en}
            </div>
            <div class="grid grid-cols-1 md:grid-cols-4 gap-10">
                {#each dominant.data as item}
                    <div
                        class="intersection p-0.5 rounded-lg border border-px dark:border-white/5 border-black/5 overflow-hidden transition-all ease-out group relative"
                    >
                        <div
                            class="hidden group-hover:block absolute -left-1/2 top-1/3 w-[200%] h-1/2 bg-primary {$currentThemeStore ===
                            'dark'
                                ? 'animate-spin-line-dark'
                                : 'animate-spin-line'}"
                        ></div>
                        <div class="px-8 py-10 h-full w-full rounded-lg relative bg-primaryWhite dark:bg-darkBlack">
                            <div class="w-8 h-8 flex-none text-primary dark:text-dark transition-all ease-out group-hover:scale-90">
                                <svg style="fill: currentColor;display: inline;" viewBox="0 0 24 24">
                                    <use xlink:href="/assets/fonts/home.symbol.svg#{item.icon}" />
                                </svg>
                            </div>
                            <p class="text-sm opacity-90 mt-6">{isZh ? item.p : item.p_en}</p>
                        </div>
                    </div>
                {/each}
            </div>
        </div>
        <div class="mt-32 md:mt-48">
            <div class="intersection transition-all ease-out my-10 md:my-20 font-bold text-2xl md:text-4xl text-center">
                {isZh ? ugly.title : ugly.title_en}
            </div>
            <div class="grid grid-cols-1 md:grid-cols-4 gap-10">
                {#each ugly.data as item}
                    <div
                        class="intersection p-0.5 rounded-lg border border-px dark:border-white/5 border-black/5 overflow-hidden transition-all ease-out group relative"
                    >
                        <div
                            class="hidden group-hover:block absolute -left-1/2 top-1/3 w-[200%] h-1/2 bg-primary {$currentThemeStore ===
                            'dark'
                                ? 'animate-spin-line-dark'
                                : 'animate-spin-line'}"
                        ></div>
                        <div class="px-8 py-10 h-full w-full rounded-lg relative bg-primaryWhite dark:bg-darkBlack">
                            <div class="w-8 h-8 flex-none text-primary dark:text-dark transition-all ease-out group-hover:scale-90">
                                <svg style="fill: currentColor;display: inline;" viewBox="0 0 24 24">
                                    <use xlink:href="/assets/fonts/home.symbol.svg#{item.icon}" />
                                </svg>
                            </div>
                            <p class="text-sm opacity-90 mt-6">{isZh ? item.p : item.p_en}</p>
                        </div>
                    </div>
                {/each}
            </div>

            <!-- <div class="space-y-10">
            {#each isZh ? ugly.p : ugly.p_en as item, i}
                <p>{item}</p>
            {/each}
        </div> -->
        </div>
    </div>

    <!-- <div class="hidden md:flex justify-center mb-20">
    <article class={`prose dark:prose-invert max-w-none text-xs overflow-auto`} style="height:{500}px">
        <pre><code class="hljs">{@html highlightedCode}</code></pre>
    </article>
    <div class=" ml-2 border border-black/10 dark:border-gray-400 w-[392px] grow-0 shrink-0 overflow-auto" style="height:{500}px">
        <img src="/assets/images/home/zh/9.png" alt="" class='w-full' />
    </div>
</div> -->

    <div class="text-center px-4 md:px-12 pb-10 md:pb-20">
        <div class="intersection transition-all ease-out my-5 md:my-10 font-bold text-2xl md:text-4xl">
            🎖 {isZh ? '贡献者' : 'Contributors'}
        </div>
        <div class="intersection flex justify-center">
            <a href="https://github.com/any-tdf/stdf/graphs/contributors" target="_blank">
                <img src="https://contrib.rocks/image?repo=any-tdf/stdf" title={isZh ? '贡献者' : 'Contributors'} alt="" />
            </a>
        </div>
    </div>

    <!-- 赞助者 -->
    <div class="text-center px-4 md:px-12 pb-20 md:pb-40">
        <div class="intersection transition-all ease-out my-5 md:my-10 font-bold text-2xl md:text-4xl">
            🙏 {isZh ? '赞助者' : 'Sponsors'}
        </div>
        <div class="">
            <div class="intersection mb-4">GitHub</div>
            <div class="flex justify-center gap-4 flex-wrap">
                {#each thinkGithub as item}
                    <a class="intersection" href={'https://github.com/' + item.name} target="_blank">
                        <img
                            class="w-16 h-16 rounded-full overflow-hidden"
                            src={'https://avatars.githubusercontent.com/' + item.name}
                            title={(isZh ? '感谢 ' : 'Thanks ') + item.name}
                            alt=""
                        />
                    </a>
                {/each}
            </div>
        </div>
    </div>

    <!-- <div class="pb-4">
		<p class="flex justify-center gap-4">
			<a href="https://www.npmjs.com/package/stdf" rel="nofollow">
				<img
					src="https://camo.githubusercontent.com/13967f6092f0e143b32d68749e50fab68dc6442cb5dc82713dee33f462d73bb8/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f762f737464663f6c6f676f3d6e706d266c6162656c3d73746466267374796c653d666c61742d737175617265"
					alt="npm"
				/>
			</a>
			<a href="https://www.npmjs.com/package/stdf" rel="nofollow">
				<img
					src="https://camo.githubusercontent.com/1657ded382705222b8310d638f8dadec731094d53a2e28e30f73a741c7ab6a83/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f64742f737464663f6c6f676f3d6e706d266c6162656c3d696e7374616c6c73267374796c653d666c61742d737175617265"
					alt="npm"
					data-canonical-src="https://img.shields.io/npm/dt/stdf?logo=npm&amp;label=installs&amp;style=flat-square"
					style="max-width: 100%;"
				/>
			</a>
			<a href="https://www.npmjs.com/package/stdf" rel="nofollow">
				<img
					src="https://camo.githubusercontent.com/5ad203b3cf7281ba18010c465b4a434ce95f24b3273772db67737b21c7d92491/68747470733a2f2f696d672e736869656c64732e696f2f62756e646c6570686f6269612f6d696e7a69702f737464663f6c6f676f3d6e706d266c6162656c3d6d696e7a6970267374796c653d666c61742d737175617265"
					alt="npm bundle size"
					data-canonical-src="https://img.shields.io/bundlephobia/minzip/stdf?logo=npm&amp;label=minzip&amp;style=flat-square"
					style="max-width: 100%;"
				/>
			</a>
			<a href="https://github.com/any-tdf/stdf">
				<img
					src="https://camo.githubusercontent.com/d9bb38904bee18db8ce348502fa0037c2767d01b2c0650834842b5eb4683b6fd/68747470733a2f2f696d672e736869656c64732e696f2f6769746875622f73746172732f64756675313939312f737464663f6c6f676f3d676974687562266c6162656c3d7374617273267374796c653d666c61742d737175617265"
					alt="GitHub stars"
					data-canonical-src="https://img.shields.io/github/stars/any-tdf/stdf?logo=github&amp;label=stars&amp;style=flat-square"
					style="max-width: 100%;"
				/>
			</a>
			<a href="https://github.com/any-tdf/stdf">
				<img
					src="https://camo.githubusercontent.com/911de612402842a474a987a4a8d68531db71eeb2755d741cac46566770da5dc6/68747470733a2f2f696d672e736869656c64732e696f2f6769746875622f6c6963656e73652f64756675313939312f737464663f6c6f676f3d676974687562267374796c653d666c61742d737175617265"
					alt="GitHub license"
					data-canonical-src="https://img.shields.io/github/license/any-tdf/stdf?logo=github&amp;style=flat-square"
					style="max-width: 100%;"
				/>
			</a>
			<a href="https://www.npmjs.com/package/create-stdf" rel="nofollow">
				<img
					src="https://camo.githubusercontent.com/063c8aa873c7143e4fd491532ef29e8cf435ef967218993041ec49d3ebfdd403/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f762f6372656174652d737464663f6c6f676f3d6e706d266c6162656c3d637265617465267374796c653d666c61742d737175617265"
					alt="npm"
					data-canonical-src="https://img.shields.io/npm/v/create-stdf?logo=npm&amp;label=create&amp;style=flat-square"
					style="max-width: 100%;"
				/>
			</a>
			<a href="https://www.npmjs.com/package/rollup-plugin-stdf-icon" rel="nofollow">
				<img
					src="https://camo.githubusercontent.com/4e7b90519654646d3fb30a5bac83b04374a3abd05a837688bae5e05dc256a2a4/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f762f726f6c6c75702d706c7567696e2d737464662d69636f6e3f6c6f676f3d6e706d266c6162656c3d69636f6e267374796c653d666c61742d737175617265"
					alt="npm"
					data-canonical-src="https://img.shields.io/npm/v/rollup-plugin-stdf-icon?logo=npm&amp;label=icon&amp;style=flat-square"
					style="max-width: 100%;"
				/>
			</a>
			<a href="https://marketplace.visualstudio.com/items?itemName=STDF.stdf-vscode-extension" rel="nofollow">
				<img
					src="https://camo.githubusercontent.com/e83b95d19002c3dec1e38d3994342e23b735977bc386199e75892a99a6bffbe0/68747470733a2f2f696d672e736869656c64732e696f2f76697375616c2d73747564696f2d6d61726b6574706c6163652f762f535444462e737464662d7673636f64652d657874656e73696f6e3f6c6f676f3d76697375616c73747564696f636f6465266c6162656c3d657874656e73696f6e267374796c653d666c61742d737175617265"
					alt="Visual Studio Marketplace Version (including pre-releases)"
					data-canonical-src="https://img.shields.io/visual-studio-marketplace/v/STDF.stdf-vscode-extension?logo=visualstudiocode&amp;label=extension&amp;style=flat-square"
					style="max-width: 100%;"
				/>
			</a>
		</p>
	</div> -->
</div>
<div class="bg-white dark:bg-black grid grid-cols-2 md:grid-cols-4 gap-10 pt-20 pb-16 px-4 md:px-10 text-center">
    {#each bottomInfo as item}
        <div>
            <div class="text-lg font-bold mb-2">{isZh ? item.title : item.title_en}</div>
            <div class="flex flex-col gap-1">
                {#each item.list as i}
                    <a href={i.link} target={i._blank ? '_blank' : '_self'} title={i.link} class="text-sm">{isZh ? i.title : i.title_en}</a>
                {/each}
            </div>
        </div>
    {/each}
</div>

<div class="bg-white dark:bg-black text-xs text-center py-4 border-t border-black/10 dark:border-white/10">
    <div class="text-sm mb-3" title={isZh ? '如果页面卡顿，请关闭 3D 模型。' : 'If the page is stuck, please turn off the 3D model.'}>
        <button class="cursor-pointer text-primary dark:text-dark" on:click={change3DFunc}>
            {show3D ? (isZh ? '隐藏' : 'Hidden') : isZh ? '显示' : 'Show'}
            3D LOGO
        </button>
    </div>
    <div class="flex justify-center gap-1">
        <div>STDF DESIGN • MADE BY DUFU</div>
        <div>
            {#if isZh}
                • <a href="https://beian.miit.gov.cn" target="_blank">滇ICP备17004037号-4</a>
            {/if}
        </div>
    </div>
</div>

<style>
    @keyframes spin-line {
        to {
            transform: rotate(360deg);
        }
    }
    .animate-spin-line {
        animation: spin-line 6s linear infinite;
        background: conic-gradient(transparent 50deg, rgba(var(--theme-color-primary), 0.4) 80deg, transparent 90deg);
    }
    .animate-spin-line-dark {
        animation: spin-line 6s linear infinite;
        background: conic-gradient(transparent 50deg, rgba(var(--theme-color-dark), 0.6) 80deg, transparent 90deg);
    }
</style>
