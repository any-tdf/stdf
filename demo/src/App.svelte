<script>
    import { setContext } from 'svelte';
    import Router, { querystring, location, push } from 'svelte-spa-router';
    import { routes, routes_en } from './route';
    import { NavBar, Icon } from '../../components';
    import zh_CN from 'stdf/lang/zh_CN';
    import en_US from 'stdf/lang/en_US';
    import menuList from './data/menuList';

    // 循环 menuList，将所有元素的 childs 组成一个数组
    const menuListArr = menuList.reduce((acc, cur) => {
        if (cur.childs) {
            acc.push(...cur.childs);
        }
        return acc;
    }, []);

    const params = new URLSearchParams('?' + $querystring); //获取参数
    const isIframe = params.get('channel') && params.get('channel') === 'iframe' ? '1' : '0'; //判断是否是iframe
    setContext('iframe', isIframe); //设置iframe
    let theme = localStorage.getItem('theme') === 'dark' ? 'dark' : 'light';
    //截取字符?后面的所有字符
    let urlLang = window.location.href.split('?')[1];
    let urlParams = new URLSearchParams(urlLang);
    // 设置语言
    const isZh = sessionStorage.getItem('lang') === 'zh_CN';
    setContext('STDF_lang', isZh ? zh_CN : en_US);
    $: showLeft = isIframe === '1' ? false : $location !== '/';
    //手动切换主题
    const toggleFun = () => {
        if (theme === 'dark') {
            // 切换到light
            theme = 'light';
            localStorage.setItem('theme', 'light');
            document.documentElement.classList.remove('dark');
        } else {
            // 切换到dark
            theme = 'dark';
            localStorage.setItem('theme', 'dark');
            document.documentElement.classList.add('dark');
        }
    };
    const toHomeFun = () => {
        push(`/`);
    };
</script>

<main class="bg-gray9 dark:bg-gray5 text-black dark:text-white/90 relative min-h-screen text-justify w-screen antialiased">
    <div class="sticky z-10 top-0">
        <NavBar
            left={showLeft ? 'back' : ''}
            title={$location === '/'
                ? isZh
                    ? 'STDF 示例'
                    : 'STDF Demo'
                : menuListArr.filter(item => item.nav === $location.substring(1))[0][isZh ? 'title_zh' : 'title_en'] +
                  (isZh ? '示例' : ' Demo')}
            rightSlot
            on:clickleft={toHomeFun}
            injClass="bg-white/60 dark:bg-gray1/60 backdrop-blur"
        >
            <div slot="right" class="flex text-center">
                {#if isIframe === '0'}
                    <div class="h-12 w-10 leading-10">
                        <a href="https://github.com/dufu1991/stdf" target="_blank" rel="noreferrer">
                            <Icon name="ri-github-fill" />
                        </a>
                    </div>
                    <div class="h-12 w-10 leading-10">
                        <a
                            href={`https://stdf.design${$location === '/' ? '' : `/#/components?nav=${$location.substring(1)}&tab=0`}`}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <Icon name="ri-compass-line" />
                        </a>
                    </div>
                {/if}
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <div class="h-12 w-10 leading-10" on:click={toggleFun}>
                    <Icon name={theme === 'dark' ? 'ri-moon-fill' : 'ri-sun-line'} theme={true} />
                </div>
            </div>
        </NavBar>
    </div>
    <Router routes={isZh ? routes : routes_en} />
</main>
