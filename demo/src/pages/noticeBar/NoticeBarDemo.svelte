<!-- NoticeBar Demo -->
<script>
    import {NoticeBar, Toast} from '../../../../packages/stdf/components';

    let textList = ['1. 这是第一条通告内容！', '2. 这是第二条通告内容！'];
    let textLongList = ['1. 这条通告超长长长长长长长长长长长长长长长长长长长长长！', '2. 这是第二条通告内容！'];

    let visible = false;
</script>

<div class="m-4 mt-8 font-bold text-lg">基础用法</div>
<NoticeBar {textList}></NoticeBar>

<div class="m-4 mt-8 font-bold text-lg">通告内容较短不滚动</div>
<NoticeBar textList={['1. 短通告！','2. 短通告！']}></NoticeBar>

<div class="m-4 mt-8 font-bold text-lg">设定通告间距</div>
<NoticeBar space={200} {textList}></NoticeBar>

<div class="m-4 mt-8 font-bold text-lg">设定滚动速度</div>
<NoticeBar speed={100} {textList}></NoticeBar>

<div class="m-4 mt-8 font-bold text-lg">右侧箭头（监听点击事件）</div>
<NoticeBar rightIcon="arrow" {textList} on:clickright={()=>visible=true}></NoticeBar>
<Toast bind:visible message='点击了右侧箭头！'></Toast>

<div class="m-4 mt-8 font-bold text-lg">右侧无内容</div>
<NoticeBar rightIcon="none" {textList}></NoticeBar>

<div class="m-4 mt-8 font-bold text-lg">左侧无内容</div>
<NoticeBar leftIcon="none" {textList}></NoticeBar>

<div class="m-4 mt-8 font-bold text-lg">设定文字大小</div>
<NoticeBar fontSize='lg' {textList}></NoticeBar>

<div class="m-4 mt-8 font-bold text-lg">自定义左侧</div>
<NoticeBar leftIcon={{name:'ri-notification-2-line',size: 16, top:-1}} {textList}></NoticeBar>
<NoticeBar leftIcon={{name:'ri-wireless-charging-line',size: 16, top:-1}} {textList}></NoticeBar>
<NoticeBar leftIcon='slot' {textList}>🥳</NoticeBar>

<div class="m-4 mt-8 font-bold text-lg">垂直滚动</div>
<NoticeBar vertical {textList}></NoticeBar>

<div class="m-4 mt-8 font-bold text-lg">滚动过渡为 1 秒</div>
<NoticeBar vertical duration="1000" {textList}></NoticeBar>

<div class="m-4 mt-8 font-bold text-lg">滚动间隔为 8 秒</div>
<NoticeBar vertical interval="8" {textList}></NoticeBar>

<div class="m-4 mt-8 font-bold text-lg">文字过长</div>
<NoticeBar vertical textList={textLongList}></NoticeBar>

<div class="m-4 mt-8 font-bold text-lg">单条不滚动</div>
<NoticeBar vertical textList={[textLongList[0]]}></NoticeBar>

<div class="m-4 mt-8 font-bold text-lg">自定义样式</div>
<NoticeBar injClass="!text-error !bg-error/10" {textList}></NoticeBar>
<NoticeBar leftIcon={{name:'ri-check-line',size: 16, top:-1}} injClass="!text-success !bg-success/10" {textList}></NoticeBar>
<NoticeBar injClass="!text-purple !bg-purple/10" {textList}></NoticeBar>
<div class="pb-8"></div>

