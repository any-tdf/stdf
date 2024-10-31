import type { Snippet } from 'svelte';

type Action = {
	content: string;
	style?: 'normal' | 'theme' | 'danger' | 'disabled';
	desc?: string;
	showImg?: boolean;
	imgRadius?: 'none' | 'base' | 'full' | 'lg';
	imgSrc?: string;
};
export type ActionSheet = {
	visible?: boolean;
	title?: string;
	titleAlign?: 'left' | 'center' | 'right';
	actions?: Action[];
	popup?: Popup;
	showCancel?: boolean;
	cancelText?: string;
	actionClosable?: boolean;
	align?: 'left' | 'center' | 'right';
	oncancel?: () => void;
	onclickAction?: (index: number, action: Action) => void;
	onopen?: () => void;
	onclose?: () => void;
};

export type AsyncPicker = {
	visible?: boolean;
	data: any[];
	lastLevel?: boolean;
	firstLevel?: boolean;
	showRow?: 3 | 5 | 7;
	labelKey?: string;
	align?: 'left' | 'center' | 'right';
	cancelText?: string;
	confirmText?: string;
	title?: string;
	nextText?: string;
	prevText?: string;
	showSelected?: boolean;
	selectedText?: string;
	popup?: Popup;
	loading?: Loading;
	oncancel?: () => void;
	onprev?: () => void;
	onconfirm?: (items: any[], indexs: number[]) => void;
	onnext?: (index: number) => void;
	onopen?: () => void;
	onclose?: () => void;
};

export type Avatar = {
	image?: string;
	alt?: string;
	icon?: Icon;
	altSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
	radius?: 'none' | 'base' | 'xl' | '2xl' | '3xl' | 'full';
	size?: 'xs' | 'sm' | 'base' | 'md' | 'lg' | 'xl' | '2xl';
	imgSize?: 's' | 'm' | 'l';
	line?: 'none' | 'solid' | 'dashed' | 'dotted';
	injClass?: string;
	onclick?: () => void;
};
export type Avatars = {
	data: Avatar[];
	radius?: 'none' | 'base' | 'xl' | '2xl' | '3xl' | 'full';
	size?: 'xs' | 'sm' | 'base' | 'md' | 'lg' | 'xl' | '2xl';
	compact?: number;
	lineWidth?: '0' | '1' | '2' | '3' | '4' | '8';
	reverse?: boolean;
	max?: number;
	top?: 'totle' | 'add' | 'none' | Snippet;
	injClass?: string;
	onclickGroup?: () => void;
};

export type Badge = {
	text?: string;
	radius?: 'full' | 'base' | 'none' | 'leaf';
	isLeft?: boolean;
	isShow?: boolean;
	offsetY?: number;
	offsetX?: number;
	isInner?: boolean;
	injClass?: string;
	children?: Snippet;
};

export type BottomSheet = {
	visible?: boolean;
	title?: string;
	titleAlign?: 'left' | 'center' | 'right';
	showBackIcon?: boolean;
	closeContent?: 'downIcon' | 'closeIcon' | '' | string;
	showDivider?: boolean;
	duration?: number;
	outDuration?: number;
	mask?: Mask;
	maskClosable?: boolean;
	zIndex?: number;
	stayHeightList?: number[];
	stayHeightIndex?: number;
	closeHeight?: number;
	radius?: 'none' | 'base' | 'full';
	children?: Snippet;
	onheightChange?: (height: number) => void;
	onclickMask?: () => void;
	onclose?: () => void;
	onback?: () => void;
};

export type Button = {
	fill?: 'base' | 'line' | 'lineLight' | 'lineTheme' | 'text' | 'textTheme' | 'colorLight';
	state?: 'theme' | 'success' | 'warning' | 'error' | 'info';
	radius?: 'none' | 'base' | 'xl' | '2xl' | 'full';
	size?: 'full' | 'big' | 'md' | 'sm' | 'auto';
	line?: 'solid' | 'dashed' | 'dotted';
	injClass?: string;
	love?: boolean;
	heightOut?: '0' | '1' | '2' | '3' | '4';
	heightIn?: '0' | '1' | '2' | '3' | '4';
	group?: boolean;
	disabled?: boolean;
	customSize?: boolean;
	customWidth?: number;
	customHeight?: number;
	icon?: Icon;
	loading?: Loading;
	disabledLoading?: boolean;
	children?: Snippet;
	onclick?: () => void;
};

export type Calendar = {
	visible?: boolean;
	startMonth?: string;
	endMonth?: string;
	initMonth?: string;
	mode?: 'single' | 'multiple' | 'range';
	startSunday?: boolean;
	weekendRed?: boolean;
	monthCard?: boolean;
	monthMark?: boolean;
	monthMarkSize?: '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | '8xl' | '9xl';
	height?: number;
	infoDates?: { date: string; info: string }[];
	disabledDates?: string[];
	radius?: 'none' | 'base' | 'xl' | '2xl';
	showSelectedDay?: boolean;
	confirmText?: string;
	selectedText?: string;
	dayText?: string;
	quickSelects?: ('week' | 'month' | 'quarter' | number)[];
	includeToday?: boolean;
	useAnimation?: boolean;
	highlightToday?: boolean;
	outFormat?: string;
	popup?: Popup;
	button?: Button;
	onconfirm?: (dates: string[]) => void;
	onopen?: () => void;
	onclose?: () => void;
};

type CellRightSnippet = {
	type: 'switch' | 'icon';
	switch?: Switch;
	icon?: Icon;
};
export type Cell = {
	title?: string;
	detail?: string;
	right?: 'none' | 'arrow' | CellRightSnippet | 'child';
	left?: 'child' | '' | Icon;
	subTitle?: string;
	info?: string;
	line?: boolean;
	my?: '0' | '1' | '2' | '3' | '4' | '6' | '8';
	mx?: '0' | '1' | '2' | '3' | '4' | '6' | '8';
	radius?: 'none' | 'base' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
	switchActive?: boolean;
	shadow?: 'none' | 'sm' | 'base' | 'md' | 'lg' | 'xl' | '2xl';
	injClass?: string;
	love?: boolean;
	clickAll?: boolean;
	leftChild?: Snippet;
	rightChild?: Snippet;
	detailChild?: Snippet;
	onclick?: () => void;
};
export type CellGroup = {
	radius?: 'none' | 'base' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
	shadow?: 'none' | 'sm' | 'base' | 'md' | 'lg' | 'xl' | '2xl';
	my?: '0' | '1' | '2' | '3' | '4' | '6' | '8';
	mx?: '0' | '1' | '2' | '3' | '4' | '6' | '8';
	children?: Snippet;
};

export type Checkbox = {
	name: string;
	checkeds?: string[];
	outControl?: boolean;
	textPosition?: 'l' | 'r' | 't' | 'b';
	icon?: 'none' | 'default' | Icon;
	iconChecked?: 'none' | 'default' | Icon;
	children?: Snippet;
};
export type CheckboxGroup = {
	layout?: 'h' | 'v' | 'inline';
	children?: Snippet;
	onchange?: (checkeds: string[]) => void;
};

export type Dialog = {
	visible?: boolean;
	title?: string;
	titleAlign?: 'left' | 'center' | 'right';
	content?: string;
	isContentChild?: boolean;
	popup?: Popup;
	showIcon?: boolean;
	icon?: Icon;
	btnStyle?: 'button' | 'text' | 'textLine';
	primaryText?: string;
	isPrimaryChild?: boolean;
	primaryButton?: Button;
	secondaryText?: string;
	secondaryButton?: Button;
	btnRatio?: [number, number];
	btnReverse?: boolean;
	secondaryClose?: boolean;
	btnGap?: '0' | '1' | '2' | '4' | '8' | '12' | '16';
	onsecondary?: () => void;
	onprimary?: () => void;
	onclose?: () => void;
	onopen?: () => void;
	contentChild?: Snippet;
	primaryChild?: Snippet;
};

export type Divider = {
	layout?: 'h' | 'v';
	px?: '0' | '4' | '8' | '16' | '36';
	py?: '0' | '4' | '8';
	text?: string;
	align?: 'left' | 'center' | 'right';
	line?: 'solid' | 'dashed' | 'dotted';
	mx?: '1' | '2' | '4';
	weight?: '1' | '2' | '4';
	injClass?: string;
};

export type Grid = {
	col?: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12';
	row?: '1' | '2' | '3' | '4' | '5' | '6';
	children?: Snippet;
};
export type Grids = {
	cols?: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12';
	gap?: '0' | '1' | '2' | '4' | '8';
	mx?: '0' | '1' | '2' | '4' | '8';
	my?: '0' | '1' | '2' | '4' | '8';
	children?: Snippet;
};

export type Icon = {
	name: string;
	size?: number | 'full';
	theme?: boolean;
	alpha?: number;
	path?: string;
	top?: number;
	injClass?: string;
	children?: Snippet;
};

type IndexBarItem = {
	index: string;
	title: string;
	child: { text: string }[];
	height?: number;
};
export type IndexBar = {
	data: IndexBarItem[];
	current?: number;
	top?: number;
	height?: number;
	radius?: 'none' | 'base' | 'full';
	scrollAlign?: boolean;
	titleInjClass?: string;
	textInjClass?: string;
	onclickChild?: (index: number, group: IndexBarItem, childIndex: number, child: { text: string }) => void;
};

export type Input = {
	title?: string;
	titlePosition?: 'in' | 'out';
	inputPosition?: 'left' | 'right';
	placeholder?: string;
	radius?: 'none' | 'base' | 'md' | 'lg' | 'xl' | '2xl';
	label1?: '' | Icon;
	label2?: '' | string;
	label3?: '' | Icon;
	label4?: '' | Icon;
	label5?: '' | string;
	label6?: '' | Icon;
	tip?: string;
	data1?: '' | string;
	data2?: '' | string;
	data3?: '' | string;
	value?: string;
	clear?: boolean;
	inputStyle?: 'block' | 'line';
	lineTransition?: 'none' | 'center' | 'left';
	duration?: 'fast' | 'base' | 'slow' | 'slower';
	autocomplete?: boolean;
	py?: '0' | '0.5' | '1' | '2' | '3' | '4' | '6';
	disabled?: boolean;
	state?: 'theme' | 'success' | 'warning' | 'error' | 'info';
	type?: 'text' | 'decimal' | 'email' | 'none' | 'numeric' | 'search' | 'tel' | 'url' | 'password' | 'number' | 'textarea';
	inputmode?: 'text' | 'decimal' | 'email' | 'none' | 'numeric' | 'search' | 'tel' | 'url' | '';
	maxlength?: number;
	textareaMaxlength?: number;
	rows?: number;
	autosize?: boolean;
	onfocus?: (value: string) => void;
	onblur?: (value: string) => void;
	onchange?: (value: string) => void;
	onclear?: () => void;
	onclicklabel1?: () => void;
	onclicklabel2?: () => void;
	onclicklabel3?: () => void;
	onclicklabel4?: () => void;
	onclicklabel5?: () => void;
	onclicklabel6?: () => void;
	onkeydown?: (key: string) => void;
	titleChild?: Snippet;
	data1Child?: Snippet;
	data2Child?: Snippet;
	data3Child?: Snippet;
	label1Child?: Snippet;
	label2Child?: Snippet;
	label3Child?: Snippet;
	label4Child?: Snippet;
	label5Child?: Snippet;
	label6Child?: Snippet;
	tipChild?: Snippet;
};

export type Loading = {
	type?: string;
	height?: '2' | '4' | '6' | '8' | '12' | '16' | '20' | '28' | '36' | '48' | '56' | '64' | '72' | '80' | '96' | 'full';
	width?: '2' | '4' | '6' | '8' | '12' | '16' | '20' | '28' | '36' | '48' | '56' | '64' | '72' | '80' | '96' | 'full';
	theme?: boolean;
	inverse?: boolean;
	customColor?: string[];
	lazyAnimation?: boolean;
	speed?: number;
};

export type Mask = {
	visible?: boolean;
	opacity?: number;
	clickable?: boolean;
	inverse?: boolean;
	backdropBlur?: 'none' | 'sm' | 'base' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
	duration?: number;
	outDuration?: number;
	zIndex?: number;
	children?: Snippet;
	onclickMask?: () => void;
};

export type Modal = {
	visible?: boolean;
	title?: string;
	titleAlign?: 'left' | 'center' | 'right';
	content?: string;
	popup?: Popup;
	showIcon?: boolean;
	icon?: Icon;
	showBtn?: boolean;
	btnText?: string;
	button?: Button;
	contentChild?: Snippet;
	onopen?: () => void;
	onclose?: () => void;
};

export type NavBar = {
	title?: string;
	left?: 'back' | 'none' | Icon;
	rights?: Icon[];
	line?: boolean;
	injClass?: string;
	love?: boolean;
	onclickLeft?: () => void;
	onclickRight?: (i: number) => void;
	titleChild?: Snippet;
	leftChild?: Snippet;
	rightChild?: Snippet;
};

export type NoticeBar = {
	textList: string[];
	leftIcon?: Icon | null;
	rightIcon?: 'close' | 'arrow' | null;
	fontSize?: 'xs' | 'sm' | 'base' | 'lg';
	space?: number;
	speed?: number;
	vertical?: boolean;
	duration?: 100 | 300 | 500 | 700 | 1000;
	interval?: number;
	injClass?: string;
	leftChild?: Snippet;
	onclickRight?: () => void;
};

export type NumKeyboard = {
	type?: 'button' | 'block';
	visible?: boolean;
	height?: '8' | '10' | '12' | '14' | '16' | '20';
	space?: '0' | '1' | '2' | '3' | '4';
	p?: '0' | '1' | '2' | '3' | '4';
	reverse?: boolean;
	done?: boolean;
	dot?: boolean;
	close?: boolean;
	doneText?: string;
	doneDisabled?: boolean;
	radius?: 'none' | 'base' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';
	panelClass?: string;
	keyClass?: string;
	doneClass?: string;
	popup?: Popup;
	onclick?: (numStr: string, key: string) => void;
	onopen?: (keyboardHeight: number) => void;
	onclose?: () => void;
};

export type Pagination = {
	total: number;
	pageSize: number;
	current: number;
	maxShowPage?: 5 | 7 | 9 | 11;
	radius?: 'none' | 'base' | 'md' | 'lg' | 'xl' | 'full';
	type?: 'border' | 'block' | 'bold';
	pageCol?: number;
	showNextOmitPage?: boolean;
	showPreOmitPage?: boolean;
	injClass?: string;
	noDataText?: string;
	onePageText?: string;
	continuous?: boolean;
	onchange?: (current: number) => void;
	onnext?: (current: number) => void;
	onpre?: (current: number) => void;
};

type LabelKey = string;
export type PickerDatas = {
	data: { LabelKey: string }[];
	showRow?: 3 | 5 | 7;
	initIndex?: number;
	useAnimation?: boolean;
	labelKey?: LabelKey;
	flex?: number;
	align?: 'left' | 'center' | 'right';
};
export type Picker = {
	visible?: boolean;
	datas?: { data: PickerDatas[] }[];
	autoScrollToLast?: boolean;
	cancelText?: string;
	confirmText?: string;
	title?: string;
	isLinkage?: boolean;
	linkageInitIndexs?: number[];
	linkageShowRows?: number[];
	linkageFlexs?: number[];
	linkageAligns?: ('left' | 'center' | 'right')[];
	linkageLabelKeys?: LabelKey[];
	linkageChildrenKey?: string;
	popup?: Popup;
	onopen?: () => void;
	onclose?: () => void;
	onconfirm?: (items: { LabelKey: string }[], indexs: number[]) => void;
	oncancel?: () => void;
};

export type Placeholder = {
	py?: '0' | '1' | '2' | '3' | '4';
	height?: 'full' | '1' | '2' | '4' | '8' | '16' | '24' | '32' | '48' | '64' | '96';
	radius?: 'none' | 'base' | 'md' | 'xl' | '2xl' | '3xl' | 'full';
	shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
	injClass?: string;
	children?: Snippet;
};

export type Popup = {
	visible?: boolean;
	size?: number;
	position?: 'center' | 'top' | 'bottom' | 'left' | 'right';
	duration?: number;
	outDuration?: number;
	easeType?: SvelteEasing;
	easeOutType?: SvelteEasing;
	px?: '0' | '1' | '2' | '3' | '4' | '5' | '6' | '8' | '10' | '12' | '16' | '20';
	py?: '0' | '1' | '2' | '3' | '4' | '5' | '6' | '8' | '10' | '12' | '16' | '24' | '32' | '48' | '64';
	mask?: Mask;
	maskClosable?: boolean;
	radiusPosition?: 'all' | 'top' | 'bottom' | 'left' | 'right';
	radius?: 'none' | 'base' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';
	transitionDistance?: number;
	transparent?: boolean;
	allowBodyScroll?: boolean;
	zIndex?: number;
	dynamicFixed?: boolean;
	hideScrollbar?: boolean;
	children?: Snippet;
	onopen?: () => void;
	onclose?: () => void;
	onclickMask?: () => void;
};

export type Progress = {
	percent?: number;
	percentPosition?: 'inner' | 'right' | 'block' | 'none';
	height?: '1' | '2' | '3' | '4';
	radius?: 'full' | 'base' | 'none';
	inactive?: boolean;
	overflowPercent?: number;
	injClass?: string;
	trackInjClass?: string;
	duration?: '150' | '300' | '500' | '700' | '1000';
	children?: Snippet;
};

export type ProgressLoop = {
	percent?: number;
	strokeWidth?: number;
	butt?: boolean;
	reverse?: boolean;
	duration?: '150' | '300' | '500' | '700' | '1000';
	gradient?: [string, string] | null;
	injClass?: string;
	trackInjClass?: string;
	children?: Snippet;
};

export type Radio = {
	name: string;
	textPosition?: 'l' | 'r' | 't' | 'b';
	icon?: 'default' | 'none' | Icon;
	iconChecked?: 'default' | 'none' | Icon;
	children?: Snippet;
};
export type RadioGroup = {
	value: string;
	horizontal?: boolean;
	children?: Snippet;
	onchange?: (value: string) => void;
};

export type Rate = {
	value?: number;
	total?: number;
	height?: number;
	width?: number;
	opacity?: '0.05' | '0.1' | '0.2' | '0.3' | '0.4' | '0.5' | '0.6' | '0.7' | '0.8' | '0.9' | '1';
	space?: '0' | '1' | '2' | '3' | '4' | '8';
	half?: boolean;
	zero?: boolean;
	vertical?: boolean;
	disabled?: boolean;
	readonly?: boolean;
	animation?: 'current' | 'active' | 'none';
	children?: Snippet;
	onclick?: (value: number) => void;
};

export type Skeleton = {
	type?: 'div' | 'p' | 'img' | 'video' | 'code' | 'qrcode' | 'barcode';
	width?: 'full' | '2' | '4' | '6' | '8' | '12' | '16' | '24' | '32' | '48' | '64' | '96';
	height?: '1' | '2' | '4' | '6' | '8' | '12' | '16' | '24' | '32' | '48' | '64' | '96';
	radius?: 'none' | 'base' | 'md' | 'xl' | '2xl' | '3xl' | 'full';
	space?: '0.5' | '1' | '2' | '4' | '8';
	lines?: number;
	iconRatio?: number;
};

export type Slider = {
	value?: number;
	step?: number;
	minRange?: number;
	maxRange?: number;
	isRange?: boolean;
	startValue?: number;
	endValue?: number;
	showTip?: 'always' | 'touch' | 'never';
	radius?: 'none' | 'base' | 'xl' | 'full';
	lineBlock?: boolean;
	disabled?: boolean;
	readonly?: boolean;
	children?: Snippet;
	onchange?: (values: [number, number?]) => void;
};

export type Stepper = {
	value?: number;
	min?: number;
	max?: number;
	step?: number;
	vertical?: boolean;
	numberHighlight?: boolean;
	theme?: boolean;
	radius?: 'none' | 'base' | 'xl' | 'full';
	decimal?: number;
	async?: boolean;
	asyncLoading?: boolean;
	loading?: Loading;
	padding?: boolean;
	injClassOut?: string;
	injClassBtn?: string;
	injClassNum?: string;
	onchange?: (value: number) => void;
	ondecrease?: () => void;
	onincrease?: () => void;
};

type StepsStepBarIcon = { type: 'icon'; icon: Icon };
type StepsStepBarImage = { type: 'image'; image: string };
type StepsStepBarStr = { type: 'string'; string: string };
type StepsStep = { title?: string; desc?: string; bar?: StepsStepBarIcon | StepsStepBarImage | StepsStepBarStr; injComponent?: Snippet };
type StepsFinishStep = {
	title?: string;
	desc?: string;
	bar?: StepsStepBarIcon | StepsStepBarImage | StepsStepBarStr;
	injComponent?: Snippet;
};
type StepsItem = { step: StepsStep; finishStep?: StepsFinishStep; height?: number };
export type Steps = {
	steps: StepsItem[];
	current?: number;
	radius?: 'none' | 'base' | 'xl' | 'full';
	barBorder?: boolean;
	vertical?: boolean;
};

type SwiperItem = { type: 'img'; url: string } | { type: 'component'; component: Snippet };
export type Swiper = {
	data: SwiperItem[];
	interval?: number;
	duration?: number;
	autoplay?: boolean;
	lazyplay?: boolean;
	initActive?: number;
	indicatePosition?: 'inner' | 'out' | 'none';
	indicateAlign?: 'center' | 'right' | 'left';
	indicateStyle?: 'point' | 'line' | 'pointLine' | 'longLine';
	indicateRadius?: boolean;
	indicateInjClass?: string;
	indicateColor?: string;
	indicateActiveColor?: string;
	aspectRatio?: [number, number];
	containerWidth?: number;
	px?: '0' | '1' | '2' | '4' | '6' | '8' | '12' | '16' | '24';
	py?: '0' | '1' | '2' | '4' | '6' | '8' | '12';
	translateX?: number;
	translateZ?: number;
	rotateX?: number;
	rotateY?: number;
	rotateZ?: number;
	activeInjClass?: string;
	notActiveInjClass?: string;
	radius?: 'none' | 'base' | 'xl' | '2xl' | 'full';
	innerInjClass?: string;
	triggerLong?: number;
	notTriggerLong?: number;
	triggerSpeed?: number;
	onchange?: (current: number) => void;
	onclickImg?: (current: number) => void;
};

export type Switch = {
	active?: boolean;
	radius?: 'none' | 'base' | 'full';
	inside?: 'state' | 'loading' | 'child' | [string, string] | '';
	injClass?: string;
	disabled?: boolean;
	async?: boolean;
	loading?: Loading;
	trueChild?: Snippet;
	falseChild?: Snippet;
	onchange?: (active: boolean) => void;
	onclick?: () => void;
};

type TabBarLabel = { text?: string; icon?: Icon; activeIcon?: Icon };
export type TabBar = {
	labels: TabBarLabel[];
	active: number;
	line: boolean;
	lineW: number;
	love: boolean;
	injClass?: string;
	tabInjClass?: string;
	activeTabInjClass?: string;
	activeInjClass?: string;
	onchange?: (active: number) => void;
};

export type TabContent = { show?: boolean; children?: Snippet };
type TabLabel = { text?: string; icon?: Icon };
export type Tab = {
	labels?: TabLabel[];
	active?: number;
	lineType?: boolean;
	radius?: 'none' | 'base' | 'xl' | 'full';
	duration?: 'fast' | 'base' | 'slow' | 'slower';
	layout?: 'h' | 'v';
	love?: boolean;
	injClass?: string;
	tabInjClass?: string;
	activeTabInjClass?: string;
	activeInjClass?: string;
	mx?: '0' | '1' | '2' | '3' | '4' | '6' | '8' | '12' | '16' | '20';
	overflow?: boolean;
	showNum?: number;
	autoScroll?: boolean;
	onclickTab?: (active: number) => void;
};
export type Tabs = {
	tab: Tab;
	duration?: 'fast' | 'base' | 'slow' | 'slower';
	position?: 't' | 'b' | 'l' | 'r';
	transition?: boolean;
	active?: number;
	onchange?: (active: number) => void;
	children?: Snippet;
};

type TimePickerItem = {
	showRow?: 3 | 5 | 7;
	flex?: number;
	align?: 'left' | 'center' | 'right';
};
export type TimePicker = {
	visible?: boolean;
	type?: 'Y' | 'M' | 'h' | 'm' | 's' | 'YM' | 'hm' | 'ms' | 'YMD' | 'hms' | 'YMDh' | 'YMDhm' | 'YMDhms';
	yearProps?: TimePickerItem;
	monthProps?: TimePickerItem;
	dayProps?: TimePickerItem;
	hourProps?: TimePickerItem;
	minuteProps?: TimePickerItem;
	secondProps?: TimePickerItem;
	initYear?: string;
	initMonth?: string;
	initDay?: string;
	initHour?: string;
	initMinute?: string;
	initSecond?: string;
	minuteStep?: number;
	secondStep?: number;
	yearRange?: [number, number] | [];
	monthRange?: [number, number];
	hourRange?: [number, number];
	minuteRange?: [number, number];
	secondRange?: [number, number];
	showTips?: boolean;
	cancelText?: string;
	confirmText?: string;
	title?: string;
	yearText?: string;
	monthText?: string;
	dayText?: string;
	hourText?: string;
	minuteText?: string;
	secondText?: string;
	outFormat?: 'object' | '' | string;
	popup?: Popup;
	oncancel?: () => void;
	onconfirm?: (times: string | object) => void;
	onopen?: () => void;
	onclose?: () => void;
};

export type Toast = {
	message?: string;
	visible?: boolean;
	duration?: number;
	position?: 'center' | 'top' | 'bottom';
	py?: '0' | '10' | '20' | '40' | '60' | '80';
	radius?: 'none' | 'sm' | 'base' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
	transitionType?: 'scale' | 'fly' | 'fade' | 'slide' | 'blur' | 'none';
	transitionParams?: object;
	outDuration?: number;
	zIndex?: number;
	type?: 'success' | 'error' | 'warning' | 'info' | 'loading' | '' | string;
	mask?: Mask;
	loading?: Loading;
	icon?: Icon;
	clickable?: boolean;
	dynamicFixed?: boolean;
	children?: Snippet;
	onopen?: () => void;
	onclose?: () => void;
};

type SvelteEasing =
	| 'backIn'
	| 'backInOut'
	| 'backOut'
	| 'bounceIn'
	| 'bounceInOut'
	| 'bounceOut'
	| 'circIn'
	| 'circInOut'
	| 'circOut'
	| 'cubicIn'
	| 'cubicInOut'
	| 'cubicOut'
	| 'elasticIn'
	| 'elasticInOut'
	| 'elasticOut'
	| 'expoIn'
	| 'expoInOut'
	| 'expoOut'
	| 'linear'
	| 'quadIn'
	| 'quadInOut'
	| 'quadOut'
	| 'quartIn'
	| 'quartInOut'
	| 'quartOut'
	| 'quintIn'
	| 'quintInOut'
	| 'quintOut'
	| 'sineIn'
	| 'sineInOut'
	| 'sineOut';
