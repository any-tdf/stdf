<!-- NoticeBar Demo -->
<script>
	import { NoticeBar, Toast } from 'stdf';

	let textList = ['1. This is the first announcement!', '2. This is the second notice!'];
	let textLongList = [
		'1. This message long, long, long, long, long, long, long, long, long, long, long, long, long!',
		'2. This is the second notice!',
	];

	let visible = false;
</script>

<div class="m-4 mt-8 font-bold text-lg">Basic usage</div>
<NoticeBar {textList}></NoticeBar>

<div class="m-4 mt-8 font-bold text-lg">The announcements are short and do not scroll</div>
<NoticeBar textList={['1. Short notice!', '2. Short notice!']}></NoticeBar>

<div class="m-4 mt-8 font-bold text-lg">Set notification spacing</div>
<NoticeBar space={200} {textList}></NoticeBar>

<div class="m-4 mt-8 font-bold text-lg">Set rolling speed</div>
<NoticeBar speed={100} {textList}></NoticeBar>

<div class="m-4 mt-8 font-bold text-lg">Right arrow (listen for click events)</div>
<NoticeBar rightIcon="arrow" {textList} on:clickright={() => (visible = true)}></NoticeBar>
<Toast bind:visible message="Click the right arrow!"></Toast>

<div class="m-4 mt-8 font-bold text-lg">No content on the right</div>
<NoticeBar rightIcon="none" {textList}></NoticeBar>

<div class="m-4 mt-8 font-bold text-lg">Nothing on the left</div>
<NoticeBar leftIcon="none" {textList}></NoticeBar>

<div class="m-4 mt-8 font-bold text-lg">Set text size</div>
<NoticeBar fontSize="lg" {textList}></NoticeBar>

<div class="m-4 mt-8 font-bold text-lg">Custom left</div>
<NoticeBar leftIcon={{ name: 'ri-notification-2-line', size: 16, top: -1 }} {textList}></NoticeBar>
<NoticeBar leftIcon={{ name: 'ri-wireless-charging-line', size: 16, top: -1 }} {textList}></NoticeBar>
<NoticeBar leftIcon="slot" {textList}>🥳</NoticeBar>

<div class="m-4 mt-8 font-bold text-lg">Vertical rolling</div>
<NoticeBar vertical {textList}></NoticeBar>

<div class="m-4 mt-8 font-bold text-lg">Scroll transition to 1 second</div>
<NoticeBar vertical duration="1000" {textList}></NoticeBar>

<div class="m-4 mt-8 font-bold text-lg">The scrolling interval is 8 seconds</div>
<NoticeBar vertical interval="8" {textList}></NoticeBar>

<div class="m-4 mt-8 font-bold text-lg">Excessively long text</div>
<NoticeBar vertical textList={textLongList}></NoticeBar>

<div class="m-4 mt-8 font-bold text-lg">Single bar does not roll</div>
<NoticeBar vertical textList={[textLongList[0]]}></NoticeBar>

<div class="m-4 mt-8 font-bold text-lg">Custom style</div>
<NoticeBar injClass="!text-error !bg-error/10" {textList}></NoticeBar>
<NoticeBar leftIcon={{ name: 'ri-check-line', size: 16, top: -1 }} injClass="!text-success !bg-success/10" {textList}></NoticeBar>
<NoticeBar injClass="!text-purple !bg-purple/10" {textList}></NoticeBar>
<div class="pb-8"></div>
