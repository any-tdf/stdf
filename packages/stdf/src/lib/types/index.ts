import type { Snippet, Component } from 'svelte';

export type ActionProps = {
	content: string;
	style?: 'normal' | 'theme' | 'danger' | 'disabled';
	desc?: string;
	showImg?: boolean;
	imgRadius?: 'none' | 'sm' | 'full' | 'lg';
	imgSrc?: string;
};
export type ActionSheetProps = {
	visible?: boolean;
	title?: string;
	titleAlign?: 'left' | 'center' | 'right';
	actions?: ActionProps[];
	popup?: PopupProps;
	showCancel?: boolean;
	cancelText?: string;
	actionClosable?: boolean;
	align?: 'left' | 'center' | 'right';
	oncancel?: () => void;
	onclickAction?: (index: number, action: ActionProps) => void;
	onclose?: () => void;
};

export type AsyncPickerProps = {
	visible?: boolean;
	data?: Record<string, unknown>[];
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
	popup?: PopupProps;
	loading?: LoadingProps;
	oncancel?: () => void;
	onprev?: () => void;
	onconfirm?: (items: Record<string, unknown>[], indexs: number[]) => void;
	onnext?: (index: number) => void;
	onclose?: () => void;
};

export type AvatarProps = {
	image?: string;
	alt?: string;
	icon?: IconProps;
	altSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
	radius?: 'none' | 'sm' | 'xl' | '2xl' | '3xl' | 'full';
	size?: 'xs' | 'sm' | 'base' | 'md' | 'lg' | 'xl' | '2xl';
	imgSize?: 's' | 'm' | 'l';
	line?: 'none' | 'solid' | 'dashed' | 'dotted';
	injClass?: string;
	onclick?: () => void;
};
export type AvatarsProps = {
	data: AvatarProps[];
	radius?: 'none' | 'sm' | 'xl' | '2xl' | '3xl' | 'full';
	size?: 'xs' | 'sm' | 'base' | 'md' | 'lg' | 'xl' | '2xl';
	compact?: number;
	lineWidth?: '0' | '1' | '2' | '3' | '4' | '8';
	reverse?: boolean;
	max?: number;
	top?: 'totle' | 'add' | null | Snippet;
	injClass?: string;
	onclick?: () => void;
};

export type BadgeProps = {
	text?: string;
	radius?: 'full' | 'sm' | 'none' | 'leaf';
	isLeft?: boolean;
	isShow?: boolean;
	offsetY?: number;
	offsetX?: number;
	isInner?: boolean;
	injClass?: string;
	children?: Snippet;
};

export type BottomSheetProps = {
	visible?: boolean;
	title?: string;
	titleAlign?: 'left' | 'center' | 'right';
	showBackIcon?: boolean;
	closeContent?: 'downIcon' | 'closeIcon' | '' | string;
	showDivider?: boolean;
	duration?: number;
	outDuration?: number;
	mask?: MaskProps;
	maskClosable?: boolean;
	zIndex?: number;
	stayHeightList?: number[];
	stayHeightIndex?: number;
	closeHeight?: number;
	radius?: 'none' | 'middle' | 'full';
	children?: Snippet;
	onheightChange?: (height: number) => void;
	onclickMask?: () => void;
	onclose?: () => void;
	onback?: () => void;
};

export type ButtonProps = {
	fill?: 'base' | 'line' | 'lineLight' | 'lineTheme' | 'text' | 'textTheme' | 'colorLight';
	state?: 'theme' | 'success' | 'warning' | 'error' | 'info';
	radius?: 'none' | 'sm' | 'xl' | '2xl' | 'full';
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
	icon?: IconProps | null;
	loading?: LoadingProps | null;
	disabledLoading?: boolean;
	children?: Snippet;
	onclick?: () => void;
};

export type InfoDateProps = { text: string; info: string };
export type CalendarProps = {
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
	infoDates?: InfoDateProps[];
	disabledDates?: string[];
	radius?: 'none' | 'sm' | 'xl' | '2xl';
	showSelectedDay?: boolean;
	confirmText?: string;
	selectedText?: string;
	dayText?: string;
	quickSelects?: ('week' | 'month' | 'quarter' | number)[];
	includeToday?: boolean;
	useAnimation?: boolean;
	highlightToday?: boolean;
	outFormat?: string;
	popup?: PopupProps;
	button?: ButtonProps;
	clear?: boolean;
	onconfirm?: (dates: string[]) => void;
	onclose?: () => void;
};

export type CellRightProps = { type: 'switch' | 'icon'; switch?: SwitchProps; icon?: IconProps };
export type CellProps = {
	title?: string;
	detail?: string;
	right?: null | 'arrow' | CellRightProps;
	left?: null | IconProps;
	subTitle?: string;
	info?: string;
	line?: boolean;
	my?: '0' | '1' | '2' | '3' | '4' | '6' | '8';
	mx?: '0' | '1' | '2' | '3' | '4' | '6' | '8';
	radius?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
	switchActive?: boolean;
	shadow?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
	injClass?: string;
	love?: boolean;
	clickAll?: boolean;
	leftChild?: Snippet;
	rightChild?: Snippet;
	detailChild?: Snippet;
	onclick?: () => void;
};
export type CellGroupProps = {
	radius?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
	shadow?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
	my?: '0' | '1' | '2' | '3' | '4' | '6' | '8';
	mx?: '0' | '1' | '2' | '3' | '4' | '6' | '8';
	children?: Snippet;
};

export type CheckboxItemProps = {
	name: string;
	label?: string;
	layout?: 'h' | 'v' | 'inline';
	textPosition?: 'l' | 'r' | 't' | 'b';
	icon?: null | 'default' | IconProps;
	iconChecked?: null | 'default' | IconProps;
	checked?: boolean;
	children?: Snippet;
	onclick?: (name: string) => void;
};
export type CheckboxProps = {
	data: CheckboxItemProps[];
	layout?: 'h' | 'v' | 'inline';
	checkeds?: string[];
	textPosition?: 'l' | 'r' | 't' | 'b';
	icon?: null | 'default' | IconProps;
	iconChecked?: null | 'default' | IconProps;
	checkboxChild?: Snippet<[{ item: CheckboxItemProps & Record<string, unknown> }]>;
	onchange?: (checkeds: string[]) => void;
};

export type DialogProps = {
	visible?: boolean;
	title?: string;
	titleAlign?: 'left' | 'center' | 'right';
	content?: string;
	popup?: PopupProps;
	showIcon?: boolean;
	icon?: IconProps;
	btnStyle?: 'button' | 'text' | 'textLine';
	primaryText?: string;
	primaryButton?: ButtonProps;
	secondaryText?: string;
	secondaryButton?: ButtonProps;
	btnRatio?: [number, number];
	btnReverse?: boolean;
	secondaryClose?: boolean;
	btnGap?: '0' | '1' | '2' | '4' | '8' | '12' | '16';
	onsecondary?: () => void;
	onprimary?: () => void;
	onclose?: () => void;
	contentChild?: Snippet;
	primaryChild?: Snippet;
};

export type DividerProps = {
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

export type GridProps = {
	col?: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12';
	row?: '1' | '2' | '3' | '4' | '5' | '6';
	children?: Snippet;
};
export type GridsProps = {
	cols?: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12';
	gap?: '0' | '1' | '2' | '4' | '8';
	mx?: '0' | '1' | '2' | '4' | '8';
	my?: '0' | '1' | '2' | '4' | '8';
	children?: Snippet;
};

export type IconProps = {
	name?: string;
	size?: number | 'full';
	theme?: boolean;
	alpha?: number;
	path?: string;
	top?: number;
	injClass?: string;
	children?: Snippet;
	onclick?: () => void;
};

export type IndexBarItemProps = {
	index: string;
	title: string;
	child: string[];
	height?: number;
};
export type IndexBarProps = {
	data: IndexBarItemProps[];
	current?: number;
	top?: number;
	height: number;
	radius?: 'none' | 'middle' | 'full';
	scrollAlign?: boolean;
	titleInjClass?: string;
	textInjClass?: string;
	onclickChild?: (index: number, group: IndexBarItemProps, childIndex: number, child: string) => void;
};

export type InputProps = {
	title?: string;
	titlePosition?: 'in' | 'out' | null;
	inputPosition?: 'left' | 'right';
	placeholder?: string;
	radius?: 'none' | 'sm' | 'xl' | 'full';
	inputStyle?: 'block' | 'line';
	lineTransition?: null | 'center' | 'left';
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
	label1?: null | IconProps;
	label2?: null | string;
	label3?: null | IconProps;
	label4?: null | IconProps;
	label5?: null | string;
	label6?: null | IconProps;
	tip?: string | null;
	data1?: null | string;
	data2?: null | string;
	data3?: null | string;
	value?: string;
	clear?: boolean;
	onfocus?: (value: string) => void;
	onblur?: (value: string) => void;
	onchange?: (value: string) => void;
	onclear?: () => void;
	onclickLabel1?: () => void;
	onclickLabel2?: () => void;
	onclickLabel3?: () => void;
	onclickLabel4?: () => void;
	onclickLabel5?: () => void;
	onclickLabel6?: () => void;
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

export type LoadingProps = {
	type?: string;
	height?: '2' | '4' | '6' | '8' | '12' | '16' | '20' | '28' | '36' | '48' | '56' | '64' | '72' | '80' | '96' | 'full';
	width?: '2' | '4' | '6' | '8' | '12' | '16' | '20' | '28' | '36' | '48' | '56' | '64' | '72' | '80' | '96' | 'full';
	theme?: boolean;
	inverse?: boolean;
	customColor?: string[];
	lazyAnimation?: boolean;
	speed?: number;
};

export type MaskProps = {
	visible?: boolean;
	opacity?: '0' | '0.1' | '0.2' | '0.3' | '0.4' | '0.5' | '0.6' | '0.7' | '0.8' | '0.9' | '1';
	clickable?: boolean;
	inverse?: boolean;
	backdropBlur?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
	duration?: number;
	outDuration?: number;
	zIndex?: number;
	children?: Snippet;
	onclickMask?: () => void;
};

export type ModalProps = {
	visible?: boolean;
	title?: string;
	titleAlign?: 'left' | 'center' | 'right';
	content?: string;
	popup?: PopupProps;
	showIcon?: boolean;
	icon?: IconProps;
	showBtn?: boolean;
	btnText?: string;
	button?: ButtonProps;
	contentChild?: Snippet;
	onclose?: () => void;
};

export type NavBarProps = {
	title?: string;
	titleAlign?: 'left' | 'center' | 'right';
	left?: 'back' | null | IconProps;
	rights?: IconProps[];
	line?: boolean;
	injClass?: string;
	love?: boolean;
	onclickLeft?: () => void;
	onclickRight?: (index: number) => void;
	titleChild?: Snippet;
	leftChild?: Snippet;
	rightChild?: Snippet;
};

export type NoticeBarProps = {
	textList: string[];
	leftIcon?: IconProps | null;
	rightIcon?: 'close' | 'arrow' | null;
	fontSize?: 'xs' | 'sm' | 'base' | 'lg';
	space?: number;
	speed?: number;
	vertical?: boolean;
	duration?: 100 | 300 | 500 | 700 | 1000;
	interval?: number;
	injClass?: string;
	leftChild?: Snippet;
	rightChild?: Snippet;
	onclickRight?: () => void;
};

export type NumKeyboardProps = {
	value?: string;
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
	radius?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';
	clear?: boolean;
	panelClass?: string;
	keyClass?: string;
	doneClass?: string;
	popup?: PopupProps;
	onclick?: (key: string) => void;
	onopen?: (height: number) => void;
	onclose?: () => void;
};

export type PaginationProps = {
	total: number;
	pageSize?: number;
	current?: number;
	maxShowPage?: 5 | 7 | 9 | 11;
	radius?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
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

export type PickerDataChildProps = {
	[key: string]: string | PickerDataChildProps[] | undefined | number;
	children?: PickerDataChildProps[];
	initIndex?: number;
};
export type PickerDatasProps = {
	data: { [key: string]: string }[];
	showRow?: 3 | 5 | 7;
	initIndex?: number;
	useAnimation?: boolean;
	labelKey?: string;
	flex?: number;
	align?: 'left' | 'center' | 'right';
	lastSelectedIndex?: number;
};
export type PickerProps = {
	visible?: boolean;
	datas?: PickerDatasProps[] | PickerDataChildProps[];
	autoScrollToLast?: boolean;
	cancelText?: string;
	confirmText?: string;
	title?: string;
	isLinkage?: boolean;
	linkageInitIndexs?: number[];
	linkageShowRows?: number[];
	linkageFlexs?: number[];
	linkageAligns?: ('left' | 'center' | 'right')[];
	linkageLabelKeys?: string[];
	linkageChildrenKey?: string;
	popup?: PopupProps;
	onclose?: () => void;
	onconfirm?: (items: { [key: string]: string }[], indexs: number[]) => void;
	oncancel?: () => void;
};

export type PlaceholderProps = {
	py?: '0' | '1' | '2' | '3' | '4' | '8';
	height?: 'full' | '1' | '2' | '4' | '8' | '16' | '24' | '32' | '48' | '64' | '96';
	radius?: 'none' | 'sm' | 'md' | 'xl' | '2xl' | '3xl' | 'full';
	shadow?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
	injClass?: string;
	children?: Snippet;
};

export type PopupProps = {
	visible?: boolean;
	size?: number;
	position?: 'center' | 'top' | 'bottom' | 'left' | 'right';
	duration?: number;
	outDuration?: number;
	easeType?: SvelteEasingProps;
	easeOutType?: SvelteEasingProps;
	px?: '0' | '1' | '2' | '3' | '4' | '5' | '6' | '8' | '10' | '12' | '16' | '20';
	py?: '0' | '1' | '2' | '3' | '4' | '5' | '6' | '8' | '10' | '12' | '16' | '24' | '32' | '48' | '64';
	mask?: MaskProps;
	maskClosable?: boolean;
	radiusPosition?: 'all' | 'top' | 'bottom' | 'left' | 'right';
	radius?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';
	transitionDistance?: number;
	transparent?: boolean;
	allowBodyScroll?: boolean;
	zIndex?: number;
	dynamicFixed?: boolean;
	hideScrollbar?: boolean;
	children?: Snippet;
	onclose?: () => void;
	onclickMask?: () => void;
};

export type ProgressProps = {
	percent?: number;
	percentPosition?: 'inner' | 'right' | 'block' | null;
	height?: '1' | '2' | '3' | '4';
	radius?: 'full' | 'middle' | 'none';
	inactive?: boolean;
	overflowPercent?: number;
	duration?: '150' | '300' | '500' | '700' | '1000';
	injClass?: string;
	trackInjClass?: string;
	children?: Snippet;
};

export type ProgressLoopProps = {
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

export type RadioItemProps = {
	name: string;
	label?: string;
	layout?: 'v' | 'h' | 'inline';
	textPosition?: 'l' | 'r' | 't' | 'b';
	icon?: 'default' | null | IconProps;
	iconChecked?: 'default' | null | IconProps;
	checked?: boolean;
	children?: Snippet;
	onclick?: (name: string) => void;
};
export type RadioProps = {
	data: RadioItemProps[];
	layout?: 'v' | 'h' | 'inline';
	value?: string;
	textPosition?: 'l' | 'r' | 't' | 'b';
	icon?: 'default' | null | IconProps;
	iconChecked?: 'default' | null | IconProps;
	radioChild?: Snippet<[{ item: RadioItemProps & Record<string, unknown> }]>;
	onchange?: (value: string) => void;
};

export type RateProps = {
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
	animation?: 'current' | 'active' | null;
	children?: Snippet;
	onclick?: (value: number) => void;
};

export type SkeletonProps = {
	type?: 'div' | 'p' | 'img' | 'video' | 'code' | 'qrcode' | 'barcode';
	width?: 'full' | '2' | '4' | '6' | '8' | '12' | '16' | '24' | '32' | '48' | '64' | '96';
	height?: '1' | '2' | '4' | '6' | '8' | '12' | '16' | '24' | '32' | '48' | '64' | '96';
	radius?: 'none' | 'sm' | 'md' | 'xl' | '2xl' | '3xl' | 'full';
	space?: '0.5' | '1' | '2' | '4' | '8';
	lines?: number;
	iconRatio?: number;
};

export type SliderProps = {
	value?: number;
	step?: number;
	minRange?: number;
	maxRange?: number;
	isRange?: boolean;
	valueRange?: [number, number];
	startValue?: number;
	endValue?: number;
	showTip?: 'always' | 'touch' | 'never';
	radius?: 'none' | 'sm' | 'xl' | 'full';
	lineBlock?: boolean;
	disabled?: boolean;
	readonly?: boolean;
	children?: Snippet;
	onchange?: (value: number, valueRange?: [number, number]) => void;
};

export type StepperProps = {
	value?: number;
	min?: number;
	max?: number;
	step?: number;
	vertical?: boolean;
	numberHighlight?: boolean;
	theme?: boolean;
	radius?: 'none' | 'sm' | 'xl' | 'full';
	decimal?: number;
	async?: boolean;
	asyncLoading?: boolean;
	loading?: LoadingProps;
	padding?: boolean;
	injClassOut?: string;
	injClassBtn?: string;
	injClassNum?: string;
	onchange?: (value: number) => void;
	ondecrease?: () => void;
	onincrease?: () => void;
};

export type StepsStepBarIconProps = { type: 'icon'; content: IconProps };
export type StepsStepBarImageProps = { type: 'image'; content: string };
export type StepsStepBarStringProps = { type: 'string'; content: string };
export type StepsStepProps = {
	title?: string;
	desc?: string;
	bar?: StepsStepBarIconProps | StepsStepBarImageProps | StepsStepBarStringProps;
	injComponent?: Component;
};
export type StepsFinishStepProps = {
	title?: string;
	desc?: string;
	bar?: StepsStepBarIconProps | StepsStepBarImageProps | StepsStepBarStringProps;
	injComponent?: Component;
};
export type StepsItemProps = {
	step: StepsStepProps;
	finishStep?: StepsFinishStepProps;
	height?: number;
};
export type StepsProps = {
	steps: StepsItemProps[];
	current?: number;
	radius?: 'none' | 'sm' | 'xl' | 'full';
	barBorder?: boolean;
	vertical?: boolean;
};

export type SwiperImgProps = { type: 'img'; url: string };
export type SwiperComponentProps = { type: 'component'; component: Component };
export type SwiperProps = {
	data: (SwiperImgProps | SwiperComponentProps)[];
	interval?: number;
	duration?: number;
	autoplay?: boolean;
	lazyplay?: boolean;
	initActive?: number;
	indicatePosition?: 'inner' | 'out' | null;
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
	radius?: 'none' | 'sm' | 'xl' | '2xl' | 'full';
	triggerLong?: number;
	notTriggerLong?: number;
	triggerSpeed?: number;
	innerInjClass?: string;
	onchange?: (current: number) => void;
	onclick?: (current: number) => void;
};

export type SwitchProps = {
	active?: boolean;
	radius?: 'none' | 'middle' | 'full';
	inside?: 'state' | 'loading' | [string, string] | null;
	injClass?: string;
	disabled?: boolean;
	async?: boolean;
	loading?: LoadingProps;
	trueChild?: Snippet;
	falseChild?: Snippet;
	onchange?: (active: boolean) => void;
	onclick?: () => void;
};

export type TabBarLabelProps = { text?: string; icon?: IconProps; activeIcon?: IconProps };
export type TabBarProps = {
	labels: TabBarLabelProps[];
	active?: number;
	line?: boolean;
	lineW?: number;
	love?: boolean;
	injClass?: string;
	tabInjClass?: string;
	activeTabInjClass?: string;
	activeInjClass?: string;
	onchange?: (active: number) => void;
};

export type TabContentProps = { show?: boolean; children?: Snippet };
export type TabLabelProps = { text?: string; icon?: IconProps };
export type TabProps = {
	labels?: TabLabelProps[];
	active?: number;
	lineType?: boolean;
	radius?: 'none' | 'sm' | 'xl' | 'full';
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
export type TabsProps = {
	tab: TabProps;
	duration?: 'fast' | 'base' | 'slow' | 'slower';
	position?: 't' | 'b' | 'l' | 'r';
	transition?: boolean;
	active?: number;
	onchange?: (active: number) => void;
	children?: Snippet<[{ active: number }]>;
};

export type TimePickerItemProps = {
	showRow?: 3 | 5 | 7;
	flex?: number;
	align?: 'left' | 'center' | 'right';
};
export type TimePickerObjProps = {
	YYYY: string;
	MM: string;
	DD: string;
	hh: string;
	mm: string;
	ss: string;
};
export type TimePickerTypeProps =
	| 'YYYY'
	| 'MM'
	| 'hh'
	| 'mm'
	| 'ss'
	| 'YYYYMM'
	| 'hhmm'
	| 'mmss'
	| 'YYYYMMDD'
	| 'hhmmss'
	| 'YYYYMMDDhh'
	| 'YYYYMMDDhhmm'
	| 'YYYYMMDDhhmmss';
export type TimePickerProps = {
	visible?: boolean;
	type?: TimePickerTypeProps;
	yearProps?: TimePickerItemProps;
	monthProps?: TimePickerItemProps;
	dayProps?: TimePickerItemProps;
	hourProps?: TimePickerItemProps;
	minuteProps?: TimePickerItemProps;
	secondProps?: TimePickerItemProps;
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
	outFormat?: string;
	popup?: PopupProps;
	oncancel?: () => void;
	onconfirm?: (timeStr: string, timeObj: TimePickerObjProps) => void;
	onclose?: () => void;
};

export type ToastProps = {
	message?: string;
	visible?: boolean;
	duration?: number;
	position?: 'center' | 'top' | 'bottom';
	py?: '0' | '10' | '20' | '40' | '60' | '80';
	radius?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
	transitionType?: 'scale' | 'fly' | 'fade' | 'slide' | 'blur' | null;
	transitionParams?: object;
	outDuration?: number;
	type?: 'success' | 'error' | 'warning' | 'info' | 'loading' | 'icon' | null;
	mask?: MaskProps;
	loading?: LoadingProps;
	icon?: IconProps;
	zIndex?: number;
	clickable?: boolean;
	dynamicFixed?: boolean;
	children?: Snippet;
	onclose?: () => void;
};

export type SvelteEasingProps =
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
