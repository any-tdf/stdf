<!-- NavBar Demo -->
<script>
    import { NavBar, Icon, Toast } from '../../../../packages/stdf';

    const icons1 = [{ name: 'ri-paint-brush-line', theme: true }, { name: 'ri-share-line' }];
    const icons2 = [{ name: 'ri-command-line' }, { name: 'ri-drag-move-line' }];
    const icons3 = [{ name: 'ri-indent-decrease' }, { name: 'ri-service-line' }];
    const icons4 = [{ name: 'ri-hand-heart-line', theme: true }, { name: 'ri-parent-line' }];

    let visible1 = false;
    let visible2 = false;
    let rightIndex = 0;
    let visible3 = false;
</script>

<div class="flex flex-col space-y-8 py-8">
    <!-- 基础用法 -->
    <NavBar title="基础用法" />
    <!-- 右侧使用 Remix Icon -->
    <NavBar title="右侧使用 Icon" rights={icons1} />
    <!-- 点击左侧 -->
    <NavBar title="点击左侧" on:clickleft={() => (visible1 = true)} />
    <Toast bind:visible={visible1} message="点击了左侧！" />
    <!-- 点击右侧 -->
    <NavBar
        title="点击右侧"
        rights={icons2}
        on:clickright={e => {
            visible2 = true;
            rightIndex = e.detail;
        }}
    />
    <Toast bind:visible={visible2} message={`点击的右侧图标索引值是 ${rightIndex}。`} />
    <!-- 无底部分割线，文字过长 -->
    <NavBar title="无左侧与底分割线，文字过长长长长长长长" left="" line={false} rights={icons3} />
    <!-- 自定义背景颜色 -->
    <NavBar title="自定义背景颜色 by injClass" injClass="bg-[wheat] dark:bg-[purple]" />
    <!-- 自定义文字颜色 -->
    <NavBar titleSlot>
        <div slot="title" class="text-[red] dark:text-[green]">自定义文字颜色 by slot</div>
    </NavBar>
    <!-- 插槽渲染标题区域 -->
    <NavBar titleSlot rightSlot>
        <div slot="title" class="flex flex-col justify-around text-xs h-12">
            <div class="text-sm">title 插槽渲染标题区域</div>
            <div>right 插槽渲染右侧且可点击</div>
        </div>
        <div slot="right">
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div class="h-12 w-12 text-center text-primary dark:text-dark cursor-pointer" on:click={() => (visible3 = true)}>Hello</div>
        </div>
    </NavBar>
    <Toast bind:visible={visible3} message="点击了右侧插槽内容！" />
    <!-- 关爱版 -->
    <NavBar title="关爱版导航栏" love rights={icons4} />
    <!-- 灵活的自定义 -->
    <NavBar titleSlot injClass="!bg-transparent" leftSlot line={false} rightSlot>
        <div slot="left" class="h-8 w-8 m-2 leading-8 text-center bg-white dark:bg-black/50 rounded-full">
            <Icon name="ri-home-7-line" size={18} top={-2} />
        </div>
        <div slot="title" class="px-3 h-8 my-2 leading-8 text-sm bg-white dark:bg-black/50 rounded-full">
            injClass 与 slot 结合自定义样式
        </div>
        <div slot="right" class="h-8 w-8 m-2 leading-8 text-center bg-white dark:bg-black/50 rounded-full">
            <Icon name="ri-customer-service-2-line" size={18} top={-2} />
        </div>
    </NavBar>
</div>
