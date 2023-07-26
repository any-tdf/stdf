<!-- Grids Demo -->
<script>
    import { Grids, Grid, Placeholder, Switch, Icon, Button } from '../../../../packages/stdf';

    let devices = ['iOS', 'Android', 'Windows', 'macOS', 'Ubuntu'];
    let curentIndex = 0;
    $: currentDevice = devices[curentIndex];
    const changeDeviceFun = () => {
        curentIndex === devices.length - 1 ? (curentIndex = 0) : curentIndex++;
    };
    let color = false;
    $: colorCss = `${color ? ' bg-gradient-to-tr from-purple/70 to-orange/70' : ' bg-gray8 dark:bg-gray4'}`;
    const changeColorFun = e => {
        color = e.detail;
    };
    //Get the current time
    const date = new Date();
    //Get the current month and turn into Chinese characters
    const monthArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthIndex = date.getMonth();
    $: month = monthArr[monthIndex];
    const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    const hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
    const minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    $: time = `${hour}:${minute}`;
    //Get Chinese week
    const week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    $: weekDay = week[date.getDay()];
</script>

<div class="font-bold px-4 mt-8 text-left">Example of using a placeholder 3﹡4</div>
<Grids cols={4}>
    <Grid row="3">
        <Placeholder>3﹡1</Placeholder>
    </Grid>
    <Grid col="3">
        <Placeholder>1﹡3</Placeholder>
    </Grid>
    <Grid row="2">
        <Placeholder>2﹡1</Placeholder>
    </Grid>
    <Grid col="2">
        <Placeholder>1﹡2</Placeholder>
    </Grid>
    <Grid>
        <Placeholder>1﹡1</Placeholder>
    </Grid>
    <Grid>
        <Placeholder>1﹡1</Placeholder>
    </Grid>
</Grids>

<div class="font-bold px-4 mt-8">Example of using a placeholder 4﹡6</div>
<Grids>
    <Grid row={3} col={2}>
        <Placeholder>3﹡2</Placeholder>
    </Grid>
    <Grid col={3}>
        <Placeholder>1﹡3</Placeholder>
    </Grid>
    <Grid row={4}>
        <Placeholder>4﹡1</Placeholder>
    </Grid>
    <Grid row={2}>
        <Placeholder>2﹡1</Placeholder>
    </Grid>
    <Grid>
        <Placeholder>1﹡1</Placeholder>
    </Grid>
    <Grid>
        <Placeholder>1﹡1</Placeholder>
    </Grid>
    <Grid>
        <Placeholder>1﹡1</Placeholder>
    </Grid>
    <Grid>
        <Placeholder>1﹡1</Placeholder>
    </Grid>
    <Grid>
        <Placeholder>1﹡1</Placeholder>
    </Grid>
    <Grid col={4}>
        <Placeholder>1﹡4</Placeholder>
    </Grid>
</Grids>

<div class="font-bold px-4 mt-8">Increase the outer marginal and unit grid spacing</div>
<Grids cols={4} gap="4" mx="8" my="8">
    <Grid row={3}>
        <Placeholder>3﹡1</Placeholder>
    </Grid>
    <Grid col={3}>
        <Placeholder>1﹡3</Placeholder>
    </Grid>
    <Grid row={2}>
        <Placeholder>2﹡1</Placeholder>
    </Grid>
    <Grid col={2}>
        <Placeholder>1﹡2</Placeholder>
    </Grid>
    <Grid>
        <Placeholder>1﹡1</Placeholder>
    </Grid>
    <Grid>
        <Placeholder>1﹡1</Placeholder>
    </Grid>
</Grids>

<div class="font-bold px-4 mt-8">Scene example 6﹡5</div>
<div class="pb-8 pt-2">
    <div class={`mx-2 rounded-xl p-2 shadow transition duration-300${colorCss}`}>
        <Grids cols={5} mx="0" my="0">
            <Grid row={3}>
                <div
                    class="flex flex-col justify-between bg-white/50 dark:bg-gray2/50 p-1 h-full rounded-lg text-xs text-center shadow dark:shadow-white/10"
                >
                    <div>{weekDay}</div>
                    <div class="text-4xl">{day}</div>
                    <div class="text-gray6">{month}</div>
                </div>
            </Grid>
            <Grid row={2}>
                <div
                    class="bg-white/50 dark:bg-gray2/50 p-1 h-full rounded-lg text-xl font-bold text-center flex flex-col justify-center shadow dark:shadow-white/10"
                >
                    {time}
                </div>
            </Grid>
            <Grid row={2}>
                <div
                    class="bg-white/50 dark:bg-gray2/50 p-1 h-full rounded-lg text-xs text-center flex flex-col justify-around shadow dark:shadow-white/10"
                >
                    <div class="flex justify-center">
                        <Switch inside="slot" radius="full" on:change={changeColorFun}>
                            <div slot="false">
                                <Icon name="ri-paint-brush-line" size={12} />
                            </div>
                            <div slot="true">
                                <Icon name="ri-paint-brush-fill" size={12} theme />
                            </div>
                        </Switch>
                    </div>
                    <div>Colorful</div>
                </div>
            </Grid>

            <Grid row={2} col={2}>
                <div
                    class="bg-white/50 dark:bg-gray2/50 h-full rounded-lg text-xs text-center flex flex-col justify-center shadow dark:shadow-white/10"
                >
                    <Button fill="lineTheme" radius="full" on:click={changeDeviceFun}>Switching</Button>
                </div>
            </Grid>
            <Grid row={2} col={2}>
                <div
                    class="bg-white/50 dark:bg-gray2/50 p-1 h-full rounded-lg text-xs text-center flex justify-around shadow dark:shadow-white/10 py-1"
                >
                    <div class="flex flex-col justify-center">
                        {#if currentDevice === 'iOS'}
                            <Icon name="ri-apple-fill" size={30} />
                        {:else if currentDevice === 'Android'}
                            <Icon name="ri-android-fill" size={30} />
                        {:else if currentDevice === 'Windows'}
                            <Icon name="ri-windows-fill" size={30} />
                        {:else if currentDevice === 'macOS'}
                            <Icon name="ri-command-fill" size={30} />
                        {:else}
                            <Icon name="ri-ubuntu-fill" size={30} />
                        {/if}
                    </div>
                    <div class="flex flex-col justify-around">
                        <div class="text-sm">
                            {#if currentDevice === 'iOS'}
                                A15 Bionic
                            {:else if currentDevice === 'Android'}
                                Snapdragon 8 Gen1
                            {:else if currentDevice === 'Windows'}
                                AMD YES
                            {:else if currentDevice === 'macOS'}
                                M1 Ultra
                            {:else}
                                Intel
                            {/if}
                        </div>
                        <div>
                            {#if currentDevice === 'iOS'}
                                iPhone
                            {:else if currentDevice === 'Android'}
                                Android
                            {:else if currentDevice === 'Windows'}
                                Windows
                            {:else if currentDevice === 'macOS'}
                                MacBook Pro
                            {:else}
                                Ubuntu
                            {/if}
                        </div>
                    </div>
                </div>
            </Grid>
            <Grid row={2}>
                <div
                    class="bg-white/50 dark:bg-gray2/50 p-1 h-full rounded-lg text-xs text-center flex flex-col justify-around shadow dark:shadow-white/10"
                >
                    <div class="flex justify-center">
                        <Switch inside="slot" radius="full">
                            <div slot="false">
                                <Icon name="ri-bluetooth-line" size={12} top={-1} />
                            </div>
                            <div slot="true">
                                <Icon name="ri-bluetooth-connect-line" size={12} theme top={-1} />
                            </div>
                        </Switch>
                    </div>
                    <div>Bluetooth</div>
                </div>
            </Grid>
            <Grid row={4}>
                <div
                    class="bg-white/50 dark:bg-gray2/50 h-full rounded-lg text-xs text-center flex flex-col justify-around items-center shadow dark:shadow-white/10"
                >
                    <div class="w-1/2 overflow-hidden">
                        <img class="block dark:hidden" src="./assets/stdf_512px.png" alt="" />
                        <img class="hidden dark:block" src="./assets/stdf_dark_512px.png" alt="" />
                    </div>
                    <div>STDF</div>
                </div>
            </Grid>
            <Grid row={3}>
                <div
                    class="bg-white/50 dark:bg-gray2/50 h-full rounded-lg text-xs text-center flex flex-col justify-around shadow dark:shadow-white/10"
                >
                    <div>92%</div>
                    <div class="animate-pulse">
                        <Icon name="ri-battery-2-charge-line" size={30} injClass="text-[green]" />
                    </div>
                    <div>charging</div>
                </div>
            </Grid>
            <Grid row={2}>
                <div
                    class="bg-white/50 dark:bg-gray2/50 h-full rounded-lg text-xs text-center flex flex-col justify-center shadow dark:shadow-white/10"
                >
                    {#if currentDevice === 'iOS'}
                        <Icon name="ri-smartphone-line" size={30} />
                    {:else if currentDevice === 'Android'}
                        <Icon name="ri-tablet-line" size={30} />
                    {:else if currentDevice === 'Windows'}
                        <Icon name="ri-computer-line" size={30} />
                    {:else if currentDevice === 'macOS'}
                        <Icon name="ri-macbook-fill" size={30} />
                    {:else}
                        <Icon name="ri-ubuntu-line" size={30} />
                    {/if}
                </div>
            </Grid>
            <Grid row={2}>
                <div
                    class="bg-white/50 dark:bg-gray2/50 h-full rounded-lg text-xs text-center flex flex-col justify-around items-center shadow dark:shadow-white/10 py-1"
                >
                    <div>
                        <Icon name="ri-sun-line" size={20} />
                    </div>
                    <div>
                        <div>68%</div>
                    </div>
                </div>
            </Grid>
            <Grid row={2}>
                <div
                    class="bg-white/50 dark:bg-gray2/50 p-1 h-full rounded-lg text-xs text-center flex flex-col justify-around shadow dark:shadow-white/10"
                >
                    <div class="flex justify-center">
                        <Switch inside="slot" radius="full">
                            <div slot="false">
                                <Icon name="ri-wifi-off-line" size={12} />
                            </div>
                            <div slot="true">
                                <Icon name="ri-wifi-line" size={12} theme />
                            </div>
                        </Switch>
                    </div>
                    <div>Wi-Fi</div>
                </div>
            </Grid>
        </Grids>
    </div>
</div>
