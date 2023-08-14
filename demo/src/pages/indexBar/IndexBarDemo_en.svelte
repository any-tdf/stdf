<!-- IndexBar Demo -->
<script>
    import { IndexBar, Button, Toast } from '../../../../packages/stdf/components';

    const addressList = [
        { index: 'A', title: 'A', child: [{ text: 'Macau' }, { text: 'Anning' }, { text: 'Anqing' }, { text: 'Anshan' }] },
        { index: 'B', title: 'B', child: [{ text: 'Beijing' }, { text: 'Baoding' }, { text: 'Baotou' }, { text: 'Baoji' }] },
        { index: 'C', title: 'C', child: [{ text: 'Chengde' }, { text: 'Cangzhou' }, { text: 'Chifeng' }] },
        { index: 'D', title: 'D', child: [{ text: 'Datong' }, { text: 'Dalian' }, { text: 'Dali' }] },
        { index: 'E', title: 'E', child: [{ text: 'Enshi' }, { text: 'Ordos' }, { text: 'Emeishan' }] },
        { index: 'F', title: 'F', child: [{ text: 'Fushun' }, { text: 'Foshan' }, { text: 'Fuquan' }] },
        { index: 'G', title: 'G', child: [{ text: 'Gejiu' }, { text: 'Guilin' }, { text: 'Ganzhou' }] },
        { index: 'H', title: 'H', child: [{ text: 'Handan' }, { text: 'Hohhot' }, { text: 'Hulunbuir' }] },
        { index: 'J', title: 'J', child: [{ text: 'Jilin' }, { text: 'Jiuquan' }, { text: 'Jinjiang' }] },
        { index: 'K', title: 'K', child: [{ text: 'Kunming' }, { text: 'Kunshan' }, { text: 'Kaifeng' }] },
        { index: 'L', title: 'L', child: [{ text: 'Lhasa' }, { text: 'Lanzhou' }, { text: 'Luzhou' }] },
        { index: 'M', title: 'M', child: [{ text: 'Mianyang' }, { text: 'Maans' }, { text: 'Mudanjiang' }] },
        { index: 'N', title: 'N', child: [{ text: 'Nanchang' }, { text: 'Nanjing' }, { text: 'Ningbo' }] },
        { index: 'P', title: 'P', child: [{ text: 'Putian' }, { text: 'Panzhihua' }, { text: 'Pingdingshan' }] },
        { index: 'Q', title: 'Q', child: [{ text: 'Qujing' }, { text: 'Qingdao' }, { text: 'Qiqihar' }] },
        { index: 'R', title: 'R', child: [{ text: 'Ruili' }, { text: 'Ruian' }, { text: 'Ruijin' }] },
        { index: 'S', title: 'S', child: [{ text: 'Sanya' }, { text: 'Shanghai' }, { text: 'Shenzhen' }] },
        { index: 'T', title: 'T', child: [{ text: 'Taizhou' }, { text: 'Taiyuan' }, { text: 'Tianjin' }] },
        { index: 'W', title: 'W', child: [{ text: 'Wuhan' }, { text: 'Wuxi' }, { text: 'Wuhu' }] },
        { index: 'X', title: 'X', child: [{ text: 'Xi an' }, { text: 'Xiamen' }, { text: 'Xuanwei' }] },
        { index: 'Y', title: 'Y', child: [{ text: 'Yiwu' }, { text: 'Yinchuan' }, { text: 'Yuxi' }] },
        { index: 'Z', title: 'Z', child: [{ text: 'Zhaotong' }, { text: 'Zunyi' }, { text: 'Zhangjiajie' }] },
    ];

    const emojiList = [
        { index: '😀', title: 'Smileys & Emotion', child: [{ text: '😂' }, { text: '🥰' }, { text: '🥱' }, { text: '🧐' }] },
        { index: '👋', title: 'People & Body', child: [{ text: '👌' }, { text: '🤝' }, { text: '👨‍💻' }, { text: '💪' }] },
        { index: '🐵', title: 'Animals & Nature', child: [{ text: '🦄' }, { text: '🌱' }, { text: '🦁' }, { text: '🐶' }] },
        { index: '🍎', title: 'Food & Drink', child: [{ text: '🍑' }, { text: '🍞' }, { text: '🍽️' }, { text: '🍩' }] },
        { index: '🌍', title: 'Travel & Places', child: [{ text: '🏔️' }, { text: '🚆' }, { text: '✈️' }, { text: '🛵' }] },
        { index: '🏆', title: 'Activities', child: [{ text: '⚽' }, { text: '🎨' }, { text: '🏀' }, { text: '🧨' }] },
        { index: '📱', title: 'Objects', child: [{ text: '🎩' }, { text: '💻' }, { text: '🎒' }, { text: '📖' }] },
        { index: '⚠️', title: 'Symbols', child: [{ text: '🚫' }, { text: '⚛️' }, { text: '🛄' }, { text: '🔱' }] },
        { index: '🏁', title: 'Flags', child: [{ text: '🇨🇳' }, { text: '🇺🇸' }, { text: '🇧🇻' }, { text: '🇦🇹' }] },
    ];
    const movieTVList = [
        {
            index: '三',
            title: '三体',
            child: [
                { text: '地球往事' },
                { text: '黑暗森林' },
                { text: '死神永生' },
                { text: '科学边界' },
                { text: '射手和农场主' },
                { text: '寂静的春天' },
                { text: '宇宙闪烁' },
                { text: '地球叛军' },
                { text: '古筝行动' },
                { text: '智子' },
                { text: '面壁者' },
                { text: '咒语' },
                { text: '黑暗森林' },
                { text: '危机纪元' },
                { text: '威慑纪元' },
                { text: '广播纪元' },
                { text: '掩体纪元' },
                { text: '银河纪元' },
                { text: '时间开始' },
                { text: '时间之外，我们的宇宙' },
            ],
        },
        {
            index: '流',
            title: '流浪地球',
            child: [
                { text: '人类的勇气和坚毅必将被镌刻在星空之下。' },
                { text: '希望是像钻石一样珍贵的东西！' },
                { text: '希望，希望是我们唯一回家的方向。' },
                { text: '让人类永远保持理智，是一种奢求。' },
                { text: '道路千万条，安全第一条；行车不规范，亲人两行泪！' },
                { text: '那时候人们还没注意到太阳，人们更喜欢叫做钱的东西。' },
                { text: '为了我们的孩子，没有什么不能失去的了' },
                { text: 'moss没有叛逃!' },
                { text: '火石没了，我老婆孩子全他妈白死了！' },
            ],
        },
        {
            index: '仙',
            title: '仙剑奇侠传',
            child: [
                { text: '既不回头，何必不忘。既然无缘，何必誓言。' },
                { text: '没有值得不值得，只有愿意不愿意。' },
                { text: '不曾得到，谈何放下。既已得到，又如何放下。' },
                { text: '轮回的是故人，不变的是初心！' },
                { text: '明夕何夕，君已陌路。' },
                { text: '我曾经也拥有过爱，只是，我放弃了。' },
                { text: '你以为每天看到的东西，就会抓得住吗？' },
                { text: '世有无情人，却有痴情妖。' },
                { text: '君子，小人，皆在一念思量。' },
                { text: '到家了，一定要叫醒我，我怕我醒不过来。' },
                { text: '如果得道就是牺牲所有人来成全自己，我宁愿执迷不悟。' },
                { text: '我们今日一别，让我们十年后再相见，不见不散！' },
                { text: '一杯愁绪，几段情缘，莫过，与君对酒当歌。' },
            ],
        },
    ];
    const navHeight = 48;
    const bottomHeight = 50;
    const height = window.innerHeight - navHeight - bottomHeight;
    let radius = 'base';
    let dataFlag = 0;
    let scrollAlign = true;
    let injClassList = [];
    const changeRadiusFun = () => {
        radius = radius === 'base' ? 'full' : radius === 'full' ? 'none' : 'base';
    };
    const changeListFun = () => {
        dataFlag = dataFlag === 0 ? 1 : dataFlag === 1 ? 2 : 0;
    };
    const changeScrollAlignFun = () => {
        scrollAlign = !scrollAlign;
    };
    const changeClassFun = () => {
        injClassList = !injClassList.length ? ['!text-3xl text-center', 'text-xs text-center !py-1'] : [];
    };
    let visible = false;
    let toastObj = { index: 0, group: {}, childIndex: 0, child: {} };
</script>

{#if dataFlag === 0}
    <IndexBar
        data={addressList}
        {radius}
        {height}
        {scrollAlign}
        titleInjClass={injClassList[0]}
        textInjClass={injClassList[1]}
        top={navHeight}
        on:clickchild={e => {
            toastObj = e.detail;
            visible = true;
        }}
    />
{:else if dataFlag === 1}
    <IndexBar
        data={emojiList}
        {radius}
        {height}
        {scrollAlign}
        titleInjClass={injClassList[0]}
        textInjClass={injClassList[1]}
        top={navHeight}
        on:clickchild={e => {
            toastObj = e.detail;
            visible = true;
        }}
    />
{:else}
    <IndexBar
        data={movieTVList}
        {radius}
        {height}
        {scrollAlign}
        titleInjClass={injClassList[0]}
        textInjClass={injClassList[1]}
        top={navHeight}
        on:clickchild={e => {
            toastObj = e.detail;
            visible = true;
        }}
    />
{/if}
<Toast
    bind:visible
    message={`Clicked ${toastObj.index + 1} group(${toastObj.group.title}) ${toastObj.childIndex + 1} item(${toastObj.child.text})`}
/>

<div class="sticky flex justify-between bottom-0 px-2 z-10 bg-white/90 dark:bg-black/90">
    <Button fill="lineTheme" size="auto" injClass="text-xs px-2" on:click={changeListFun}>Switch data</Button>
    <Button fill="lineTheme" size="auto" injClass="text-xs px-2" on:click={changeScrollAlignFun}>
        {scrollAlign ? 'open' : 'close'} Align
    </Button>
    <Button fill="lineTheme" size="auto" injClass="text-xs px-2" on:click={changeRadiusFun}>Switch rounded</Button>
    <Button fill="lineTheme" size="auto" injClass="text-xs px-2" on:click={changeClassFun}>Switch style</Button>
</div>
