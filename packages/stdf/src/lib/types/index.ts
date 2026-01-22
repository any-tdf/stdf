import type { Snippet, Component } from 'svelte';

// 大区域组件圆角类型（容器、面板、卡片等）
// Large area component radius type (containers, panels, cards, etc.)
export type LargeAreaRadius = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '';

// 小型控件圆角类型（徽标、标签、指示器等）
// Small control radius type (badges, tags, indicators, etc.)
export type SmallAreaRadius = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full' | '';

export type ActionProps = {
	content: string;
	style?: 'normal' | 'theme' | 'success' | 'warning' | 'error' | 'info';
	disabled?: boolean;
	desc?: string;
	showImg?: boolean;
	imgRadius?: SmallAreaRadius;
	imgSrc?: string;
	icon?: IconProps | null;
};
export type ActionSheetProps = {
	visible?: boolean;
	title?: string;
	titleAlign?: 'left' | 'center' | 'right';
	actions: ActionProps[];
	popup?: PopupProps;
	showCancel?: boolean;
	cancelText?: string;
	actionClosable?: boolean;
	align?: 'left' | 'center' | 'right';
	oncancel?: () => void;
	onclickAction?: (index: number, action: ActionProps) => void;
	onclose?: () => void;
};
// 环形布局操作项类型（仅支持图标）
// Ring layout action item type (icon only)
export type RingActionProps = {
	icon: IconProps;
	style?: 'normal' | 'theme' | 'success' | 'warning' | 'error' | 'info';
	disabled?: boolean;
};

export type ActionPopoverProps = {
	visible?: boolean;
	title?: string;
	titleAlign?: 'left' | 'center' | 'right';
	actions: ActionProps[];
	showCancel?: boolean;
	cancelText?: string;
	actionClosable?: boolean;
	align?: 'left' | 'center' | 'right';
	inverse?: boolean;
	layout?: 'v' | 'h' | 'grid' | 'ring';
	gridColumns?: 2 | 3 | 4;
	// inline 模式相关属性
	// inline mode related props
	triggerRef?: HTMLElement | null;
	inlineAlign?: 'left' | 'center' | 'right';
	inlineDirection?: 'auto' | 'up' | 'down';
	inlineOffset?: number;
	inlineShadow?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
	inlineRadius?: LargeAreaRadius;
	// 环形布局相关属性
	// ring layout related props
	ringActions?: RingActionProps[];
	ringRadius?: number;
	ringItemSize?: number;
	ringShape?: 'auto' | 'full' | 'half' | 'quarter';
	oncancel?: () => void;
	onclickAction?: (index: number, action: ActionProps | RingActionProps) => void;
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
	height?: number;
	popup?: PopupProps | null;
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
	radius?: SmallAreaRadius;
	size?: 'xs' | 'sm' | 'base' | 'md' | 'lg' | 'xl' | '2xl';
	imgSize?: 's' | 'm' | 'l';
	line?: 'none' | 'solid' | 'dashed' | 'dotted';
	injClass?: string;
	onclick?: () => void;
};
export type AvatarGroupProps = {
	data: AvatarProps[];
	radius?: SmallAreaRadius;
	size?: 'xs' | 'sm' | 'base' | 'md' | 'lg' | 'xl' | '2xl';
	compact?: number;
	lineWidth?: '0' | '1' | '2' | '3' | '4' | '8';
	reverse?: boolean;
	max?: number;
	top?: 'totle' | 'add' | null | Snippet;
	injClass?: string;
	onclick?: () => void;
};

export type AccordionItemProps = {
	title: string;
	content?: string;
	disabled?: boolean;
	icon?: IconProps;
};
export type AccordionProps = {
	items: AccordionItemProps[];
	activeIndex?: number | number[];
	multiple?: boolean;
	radius?: LargeAreaRadius;
	border?: 'none' | 'solid' | 'dashed' | 'dotted';
	divider?: boolean;
	expandIcon?: 'arrow' | 'plus' | null;
	iconPosition?: 'left' | 'right';
	transitionDuration?: number;
	injClass?: string;
	titleClass?: string;
	contentClass?: string;
	children?: Snippet<[item: AccordionItemProps, index: number]>;
	onchange?: (index: number | number[] | undefined) => void;
};

export type AlertProps = {
	visible?: boolean;
	title?: string;
	message?: string;
	duration?: number;
	position?: 'top' | 'bottom';
	py?: '0' | '10' | '20' | '40' | '60' | '80';
	type?: 'success' | 'error' | 'warning' | 'info' | null;
	showIcon?: boolean;
	icon?: IconProps;
	closable?: boolean;
	inverse?: boolean;
	card?: CardProps;
	transitionType?: 'scale' | 'fly' | 'fade' | 'slide' | 'blur' | null;
	transitionParams?: object;
	outDuration?: number;
	easeType?: SvelteEasingProps;
	easeOutType?: SvelteEasingProps;
	zIndex?: number;
	clickable?: boolean;
	injClass?: string;
	children?: Snippet;
	onclose?: () => void;
};

export type BadgeProps = {
	text?: string;
	radius?: SmallAreaRadius | 'leaf';
	isLeft?: boolean;
	isShow?: boolean;
	offsetY?: number;
	offsetX?: number;
	isInner?: boolean;
	injClass?: string;
	children?: Snippet;
};

export type TagProps = {
	text?: string;
	state?: 'theme' | 'success' | 'warning' | 'error' | 'info' | 'neutral';
	fill?: 'base' | 'line' | 'light';
	size?: 'xs' | 'sm' | 'md' | 'lg';
	radius?: SmallAreaRadius;
	mark?: boolean;
	closable?: boolean;
	disabled?: boolean;
	injClass?: string;
	children?: Snippet;
	onclick?: () => void;
	onclose?: () => void;
};

export type TimeData = {
	days: number;
	hours: number;
	minutes: number;
	seconds: number;
	milliseconds: number;
};

export type CountDownProps = {
	time?: number;
	format?: string;
	autoStart?: boolean;
	millisecond?: boolean;
	injClass?: string;
	children?: Snippet<[TimeData]>;
	onfinish?: () => void;
	onchange?: (timeData: TimeData) => void;
};

// 字符滚动组件预设字符集类型
// Character roll preset character set type
export type CharRollPreset = 'number' | 'letter' | 'letterUpper' | 'letterLower' | 'alphanumeric' | 'hex' | 'hexUpper' | 'binary' | 'octal';

// 字符滚动组件属性
// Character roll component props
export type CharRollProps = {
	value?: string | number; // 显示的值 Value to display
	duration?: number; // 动画持续时间（毫秒）Animation duration (ms)
	delay?: number; // 动画延迟（毫秒）Animation delay (ms)
	stagger?: number; // 每个字符的错开延迟（毫秒）Stagger delay per character (ms)
	direction?: 'up' | 'down'; // 滚动方向 Scroll direction
	height?: number; // 字符高度（像素）Character height (px)
	separator?: boolean; // 是否显示千分位分隔符 Show thousand separator
	decimal?: number; // 小数位数 Decimal places
	prefix?: string; // 前缀 Prefix
	suffix?: string; // 后缀 Suffix
	charSet?: string; // 自定义字符集 Custom character set
	preset?: CharRollPreset; // 预设字符集 Preset character set
	loops?: number; // 循环圈数 Number of loops
	autoStart?: boolean; // 是否自动开始动画 Auto start animation
	loop?: boolean; // 是否循环播放 Loop animation
	loopInterval?: number; // 循环间隔（毫秒）Loop interval (ms)
	easing?: SvelteEasingProps; // 缓动函数 Easing function
	radius?: SmallAreaRadius; // 圆角 Border radius
	bg?: 'none' | 'surface' | 'gray' | 'theme'; // 背景色 Background color
	gap?: '0' | '1' | '2' | '3' | '4'; // 字符间距 Character gap
	fontSize?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'; // 字体大小 Font size
	fontWeight?: 'normal' | 'medium' | 'semibold' | 'bold'; // 字体粗细 Font weight
	injClass?: string; // 注入 CSS 类 Inject CSS class
	charClass?: string; // 字符 CSS 类 Character CSS class
	children?: Snippet<[char: string, index: number]>; // 自定义字符渲染 Custom character render
	onstart?: () => void; // 动画开始回调 Animation start callback
	oncomplete?: () => void; // 动画完成回调 Animation complete callback
	onchange?: (value: string) => void; // 值变化回调 Value change callback
};

export type CodeInputProps = {
	value?: string;
	length?: number;
	mask?: boolean | string;
	gutter?: '0' | '1' | '2' | '3' | '4';
	focused?: boolean;
	type?: 'number' | 'text';
	inputMode?: 'text' | 'decimal' | 'email' | 'none' | 'numeric' | 'search' | 'tel' | 'url' | '';
	native?: boolean;
	info?: string;
	errorInfo?: string;
	radius?: SmallAreaRadius;
	cellSize?: 'sm' | 'md' | 'lg';
	cellStyle?: 'box' | 'line';
	cellBg?: 'surface' | 'gray' | 'theme';
	cellBorder?: 'none' | 'solid' | 'dashed' | 'dotted';
	cursorStyle?: 'line' | 'underline';
	cursorAnimation?: 'pulse' | 'blink';
	keyboardVisible?: boolean;
	autoClose?: boolean;
	autoScroll?: boolean | number;
	bold?: boolean;
	injClass?: string;
	onfinish?: (value: string) => void;
	onclose?: () => void;
	onfocus?: () => void;
};

export type FullKeyboardProps = {
	value?: string;
	visible?: boolean;
	type?: 'button' | 'block';
	mode?: 'letter' | 'letterNumber' | 'full';
	done?: boolean;
	doneText?: string;
	doneDisabled?: boolean;
	radius?: SmallAreaRadius;
	preview?: boolean;
	previewMask?: boolean;
	panelClass?: string;
	keyClass?: string;
	doneClass?: string;
	popup?: PopupProps | null;
	onclick?: (key: string) => void;
	onopen?: (height: number) => void;
	onclose?: () => void;
};

export type CardProps = {
	bg?: 'none' | 'surface' | 'gray' | 'theme';
	radius?: LargeAreaRadius;
	shadow?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
	border?: 'none' | 'solid' | 'dashed' | 'dotted';
	borderWidth?: '0' | '1' | '2' | '4';
	mx?: '0' | '1' | '2' | '3' | '4' | '6' | '8';
	my?: '0' | '1' | '2' | '3' | '4' | '6' | '8';
	p?: '0' | '1' | '2' | '3' | '4' | '6' | '8';
	px?: '0' | '1' | '2' | '3' | '4' | '6' | '8';
	py?: '0' | '1' | '2' | '3' | '4' | '6' | '8';
	overflow?: boolean;
	headerLine?: boolean;
	footerLine?: boolean;
	injClass?: string;
	headerClass?: string;
	bodyClass?: string;
	footerClass?: string;
	header?: Snippet;
	children?: Snippet;
	footer?: Snippet;
	onclick?: () => void;
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
	radius?: LargeAreaRadius;
	iconRadius?: SmallAreaRadius;
	children?: Snippet;
	onheightChange?: (height: number) => void;
	onclickMask?: () => void;
	onclose?: () => void;
	onback?: () => void;
};

export type ButtonProps = {
	fill?: 'base' | 'line' | 'lineLight' | 'lineState' | 'text' | 'textState' | 'colorLight';
	state?: 'theme' | 'success' | 'warning' | 'error' | 'info';
	radius?: SmallAreaRadius;
	size?: 'full' | 'big' | 'md' | 'sm' | 'auto';
	border?: 'solid' | 'dashed' | 'dotted';
	injClass?: string;
	love?: boolean;
	heightOut?: '0' | '1' | '2' | '3' | '4';
	heightIn?: '0' | '1' | '2' | '3' | '4';
	disabled?: boolean;
	customSize?: boolean;
	customWidth?: number;
	customHeight?: number;
	icon?: IconProps | null;
	iconPosition?: 'left' | 'right';
	loading?: LoadingProps | null;
	disabledLoading?: boolean;
	type?: 'submit' | 'reset' | 'button';
	children?: Snippet;
	onclick?: () => void;
};

// 按钮组中单个按钮项的属性
// Button item props in ButtonGroup
export type ButtonGroupItemProps = {
	text?: string;
	icon?: IconProps | null;
	iconPosition?: 'left' | 'right';
	disabled?: boolean;
	onclick?: () => void;
};

// 按钮组整体属性
// ButtonGroup props
export type ButtonGroupProps = {
	items?: ButtonGroupItemProps[];
	fill?: 'base' | 'line' | 'lineLight' | 'lineState' | 'text' | 'textState' | 'colorLight';
	state?: 'theme' | 'success' | 'warning' | 'error' | 'info';
	radius?: SmallAreaRadius;
	size?: 'full' | 'big' | 'md' | 'sm' | 'auto';
	border?: 'solid' | 'dashed' | 'dotted';
	dividerHeight?: 'full' | 'mid' | 'short';
	heightIn?: '0' | '1' | '2' | '3' | '4';
	heightOut?: '0' | '1' | '2' | '3' | '4';
	injClass?: string;
	children?: Snippet;
};

export type InfoDateProps = { text: string; info: string };
export type CalendarProps = {
	visible?: boolean;
	startMonth?: string;
	endMonth?: string;
	initMonth?: string;
	initSelectedDates?: string[];
	mode?: 'single' | 'multiple' | 'range';
	startSunday?: boolean;
	weekendRed?: boolean;
	monthCard?: boolean;
	monthMark?: boolean;
	monthMarkSize?: '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | '8xl' | '9xl';
	height?: number;
	infoDates?: InfoDateProps[];
	disabledDates?: string[];
	radius?: SmallAreaRadius;
	showSelectedDay?: boolean;
	confirmText?: string;
	selectedText?: string;
	dayText?: string;
	quickSelects?: ('week' | 'month' | 'quarter' | number)[];
	includeToday?: boolean;
	useAnimation?: boolean;
	highlightToday?: boolean;
	outFormat?: string;
	popup?: PopupProps | null;
	button?: ButtonProps;
	card?: CardProps;
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
	bg?: 'surface' | 'gray' | 'theme' | 'white';
	my?: '0' | '1' | '2' | '3' | '4' | '6' | '8';
	mx?: '0' | '1' | '2' | '3' | '4' | '6' | '8';
	radius?: LargeAreaRadius;
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
	radius?: LargeAreaRadius;
	shadow?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
	bg?: 'surface' | 'gray' | 'theme' | 'white';
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
	type?: 'symbol' | 'iconify' | 'iconify-color';
	name?: string;
	size?: number;
	width?: number;
	height?: number;
	state?: 'theme' | 'success' | 'warning' | 'error' | 'info';
	theme?: boolean;
	opacity?: number;
	path?: string;
	y?: number;
	injClass?: string;
	children?: Snippet;
	onclick?: () => void;
};

export type IndexBarItemProps<T = string> = {
	index: string;
	title: string;
	child: T[];
	height?: number;
};
export type IndexBarProps<T = string> = {
	data: IndexBarItemProps<T>[];
	current?: number;
	top?: number;
	height: number;
	radius?: SmallAreaRadius;
	scrollAlign?: boolean;
	titleInjClass?: string;
	textInjClass?: string;
	children?: Snippet<[T, number, IndexBarItemProps<T>, number]>;
	onclickChild?: (index: number, group: IndexBarItemProps<T>, childIndex: number, child: T) => void;
};

export type InputProps = {
	title?: string;
	titlePosition?: 'in' | 'out' | null;
	inputPosition?: 'left' | 'right';
	placeholder?: string;
	radius?: LargeAreaRadius;
	inputStyle?: 'block' | 'line';
	lineTransition?: null | 'center' | 'left';
	duration?: 'fast' | 'base' | 'slow' | 'slower';
	autocomplete?: boolean;
	py?: '0' | '0.5' | '1' | '2' | '3' | '4' | '6';
	disabled?: boolean;
	state?: 'theme' | 'success' | 'warning' | 'error' | 'info';
	type?: 'text' | 'decimal' | 'email' | 'none' | 'numeric' | 'search' | 'tel' | 'url' | 'password' | 'number' | 'textarea';
	inputmode?: 'text' | 'decimal' | 'email' | 'none' | 'numeric' | 'search' | 'tel' | 'url' | '';
	readonly?: boolean;
	select?: boolean;
	required?: boolean;
	maxlength?: number;
	textareaMaxlength?: number;
	rows?: number;
	autosize?: boolean;
	negative?: boolean;
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
	inputChild?: Snippet;
	children?: Snippet;
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
	leftIcon?: IconProps | null | 'volume';
	rightIcon?: 'close' | 'arrow' | null;
	space?: number;
	speed?: number;
	vertical?: boolean;
	duration?: 100 | 300 | 500 | 700 | 1000;
	interval?: number;
	injClass?: string;
	radius?: LargeAreaRadius;
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
	radius?: SmallAreaRadius;
	clear?: boolean;
	preview?: boolean;
	previewMask?: boolean;
	panelClass?: string;
	keyClass?: string;
	doneClass?: string;
	popup?: PopupProps | null;
	onclick?: (key: '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '.' | 'delete' | 'close' | 'done') => void;
	onopen?: (height: number) => void;
	onclose?: () => void;
};

export type PaginationProps = {
	total: number;
	pageSize?: number;
	current?: number;
	maxShowPage?: 5 | 7 | 9 | 11;
	radius?: SmallAreaRadius;
	type?: 'border' | 'block' | 'bold';
	bg?: 'surface' | 'gray' | 'theme' | 'white';
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
export type PickerMultipleItem = {
	indexs: number[];
	items: { [key: string]: string }[];
	label: string;
};
export type PickerProps = {
	visible?: boolean;
	datas: PickerDatasProps[] | PickerDataChildProps[];
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
	height?: number;
	popup?: PopupProps | null;
	multiple?: boolean;
	multipleIcon?: IconProps;
	multipleIconActive?: IconProps;
	multipleSelected?: PickerMultipleItem[];
	onclose?: () => void;
	onconfirm?: (items: { [key: string]: string }[], indexs: number[]) => void;
	oncancel?: () => void;
	onmultiplechange?: (selected: PickerMultipleItem[]) => void;
};

export type PlaceholderProps = {
	py?: '0' | '1' | '2' | '3' | '4' | '8';
	height?: 'full' | '1' | '2' | '4' | '8' | '16' | '24' | '32' | '48' | '64' | '96';
	radius?: LargeAreaRadius;
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
	radiusPosition?: 'auto' | 'all' | 'top' | 'bottom' | 'left' | 'right' | 'none';
	radius?: LargeAreaRadius;
	transitionDistance?: number;
	transparent?: boolean;
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
	radius?: SmallAreaRadius;
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
	radius?: LargeAreaRadius;
	space?: '0.5' | '1' | '2' | '4' | '8';
	lines?: number;
	iconRatio?: number;
	effect?: 'pulse' | 'wave' | 'breathe' | 'none';
	bg?: 'gray' | 'theme';
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
	showSteps?: boolean;
	stepsStyle?: 'block' | 'break';
	stepLabels?: string[];
	radius?: SmallAreaRadius;
	lineBlock?: boolean;
	disabled?: boolean;
	readonly?: boolean;
	children?: Snippet;
	onchange?: (value: number, valueRange?: [number, number], label?: string | number, labelRange?: [string | number, string | number]) => void;
};

export type StepperProps = {
	value?: number;
	min?: number;
	max?: number;
	step?: number;
	vertical?: boolean;
	numberHighlight?: boolean;
	theme?: boolean;
	radius?: SmallAreaRadius;
	decimal?: number;
	async?: boolean;
	asyncLoading?: boolean;
	loading?: LoadingProps;
	padding?: boolean;
	width?: number;
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
	radius?: SmallAreaRadius;
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
	indicateRadius?: SmallAreaRadius;
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
	radius?: LargeAreaRadius;
	triggerLong?: number;
	notTriggerLong?: number;
	triggerSpeed?: number;
	innerInjClass?: string;
	onchange?: (current: number) => void;
	onclick?: (current: number) => void;
};

export type SwitchProps = {
	active?: boolean;
	radius?: SmallAreaRadius;
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
	radius?: SmallAreaRadius;
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
	height?: number;
	popup?: PopupProps | null;
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
	radius?: LargeAreaRadius;
	transitionType?: 'scale' | 'fly' | 'fade' | 'slide' | 'blur' | null;
	transitionParams?: object;
	outDuration?: number;
	easeType?: SvelteEasingProps;
	easeOutType?: SvelteEasingProps;
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

export type FormInputValue = string;
export type FormTimePickerValue = { timeStr?: string; timeObj?: TimePickerObjProps };
export type FormActionSheetValue = { action?: ActionProps; index?: number };
export type FormCalendarValue = { dates?: string[] };
export type FormNumKeyboardValue = string;
export type FormFullKeyboardValue = string;
export type FormPickerValue = {
	items?: { [key: string]: string }[];
	indexs?: number[];
	multipleSelected?: PickerMultipleItem[];
};
export type FormColorPickerValue = ColorPickerValue | undefined;
export type FormCheckboxValue = string[];
export type FormRadioValue = string;
export type FormSliderValue = { value?: number; valueRange?: [number, number] };
export type FormSwitchValue = boolean;
export type FormStepperValue = number;
export type FormInputProps = {
	type?: 'input';
	name: string;
	label: string;
	initValue?: string;
	required?: boolean;
	input?: InputProps;
};
export type FormTimePickerProps = {
	type?: 'timePicker';
	name: string;
	label: string;
	initValue?: string;
	required?: boolean;
	timePicker?: TimePickerProps;
	input?: InputProps;
};
export type FormActionSheetProps = {
	type?: 'actionSheet';
	name: string;
	label: string;
	initValue?: string;
	required?: boolean;
	actionSheet: ActionSheetProps;
	input?: InputProps;
};
export type FormCalendarProps = {
	type?: 'calendar';
	name: string;
	label: string;
	initValue?: string;
	required?: boolean;
	calendar?: CalendarProps;
	input?: InputProps;
};
export type FormNumKeyboardProps = {
	type?: 'numKeyboard';
	name: string;
	label: string;
	initValue?: string;
	required?: boolean;
	numKeyboard?: NumKeyboardProps;
	input?: InputProps;
};
export type FormFullKeyboardProps = {
	type?: 'fullKeyboard';
	name: string;
	label: string;
	initValue?: string;
	required?: boolean;
	fullKeyboard?: FullKeyboardProps;
	input?: InputProps;
};
export type FormPickerProps = {
	type?: 'picker';
	name: string;
	label: string;
	initValue?: string;
	linkageSeparator?: string;
	required?: boolean;
	picker?: PickerProps;
	input?: InputProps;
};
export type FormColorPickerProps = {
	type?: 'colorPicker';
	name: string;
	label: string;
	initValue?: ColorPickerValue;
	required?: boolean;
	colorPicker?: ColorPickerProps;
	input?: InputProps;
};
export type FormCheckboxProps = {
	type?: 'checkbox';
	name: string;
	label: string;
	initValue?: string[];
	required?: boolean;
	checkbox?: CheckboxProps;
};
export type FormRadioProps = {
	type?: 'radio';
	name: string;
	label: string;
	initValue?: string;
	required?: boolean;
	radio?: RadioProps;
};
export type FormSliderProps = {
	type?: 'slider';
	name: string;
	label: string;
	initValue?: number | number[];
	required?: boolean;
	slider?: SliderProps;
};
export type FormSwitchProps = {
	type?: 'switch';
	name: string;
	label: string;
	initValue?: boolean;
	required?: boolean;
	switch?: SwitchProps;
};
export type FormStepperProps = {
	type?: 'stepper';
	name: string;
	label: string;
	initValue?: number;
	required?: boolean;
	stepper?: StepperProps;
};
export type FormItemProps =
	| FormInputProps
	| FormTimePickerProps
	| FormActionSheetProps
	| FormCalendarProps
	| FormNumKeyboardProps
	| FormFullKeyboardProps
	| FormPickerProps
	| FormColorPickerProps
	| FormCheckboxProps
	| FormRadioProps
	| FormSliderProps
	| FormSwitchProps
	| FormStepperProps;
export type FormValueProps =
	| FormInputValue
	| FormTimePickerValue
	| FormActionSheetValue
	| FormCalendarValue
	| FormNumKeyboardValue
	| FormFullKeyboardValue
	| FormPickerValue
	| FormColorPickerValue
	| FormCheckboxValue
	| FormRadioValue
	| FormSliderValue
	| FormSwitchValue
	| FormStepperValue;
export type FormProps = {
	form: FormItemProps[];
	submitText?: string;
	submitButton?: ButtonProps;
	resetText?: string | null;
	resetButton?: ButtonProps;
	submitChildren?: Snippet;
	resetChildren?: Snippet;
	space?: '0' | '1' | '2' | '4' | '6' | '8';
	card?: CardProps;
	onchange?: (data: Record<string, FormValueProps>) => void;
	onsubmit?: (data: Record<string, FormValueProps>) => void;
	onreset?: () => void;
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

// List 过渡动画类型
// List transition animation type
export type ListTransition = 'slideRight' | 'slideUp' | 'fadeScale' | 'stagger' | null;

// List 滑动操作项背景色类型
// List swipe action background color type
export type SwipeActionBgColor = 'theme' | 'primary' | 'success' | 'warning' | 'error' | 'info';

// List 滑动操作项类型
// List swipe action props
export type SwipeActionProps = {
	icon?: string; // 图标名称 Icon name
	text?: string; // 文字 Text
	bgColor?: SwipeActionBgColor; // 背景色 Background color
	onclick?: () => void; // 点击事件 Click event
};

// List 滑动提示显示模式
// List swipe hint display mode
export type SwipeHintMode = 'none' | 'first' | 'all';

// List 批量操作项类型
// List batch action item type
export type BatchActionProps = {
	text: string; // 文字 Text
	status?: 'theme' | 'success' | 'warning' | 'error' | 'info'; // 文字颜色 Text color
	onclick?: (selected: (string | number)[]) => void; // 点击事件，传入当前选中项 Click event with selected items
};

// List 组件属性
// List component props
export type ListProps<T = Record<string, unknown>> = {
	data: T[];
	keyField?: string;
	gap?: '0' | '1' | '2' | '3' | '4' | '6' | '8';
	mx?: '0' | '1' | '2' | '3' | '4' | '6' | '8';
	my?: '0' | '1' | '2' | '3' | '4' | '6' | '8';
	transition?: ListTransition;
	transitionDelay?: number;
	batchMode?: boolean;
	batchSelected?: (string | number)[];
	batchSelectable?: boolean; // 是否显示批量选择功能 Show batch selection feature
	batchActions?: BatchActionProps[]; // 批量操作按钮 Batch action buttons
	injClass?: string;
	itemInjClass?: string; // 列表项注入 CSS 类 Item inject class
	clickable?: boolean; // 是否可点击 Whether clickable
	arrow?: boolean; // 是否显示右侧箭头 Show right arrow
	divider?: boolean; // 是否显示分割线 Show divider
	itemRadius?: LargeAreaRadius; // 列表项圆角 Item radius
	itemPx?: '0' | '1' | '2' | '3' | '4' | '6' | '8'; // 列表项水平内间距 Item horizontal padding
	itemPy?: '0' | '1' | '2' | '3' | '4' | '6' | '8'; // 列表项垂直内间距 Item vertical padding
	// 滑动操作相关 Swipe action related
	swipeActions?: SwipeActionProps[]; // 滑动操作项（最多 4 项）Swipe actions (max 4)
	swipeHint?: SwipeHintMode; // 滑动提示显示模式 Swipe hint display mode
	swipeThreshold?: number; // 触发滑动的阈值（像素）Swipe threshold (px)
	// Snippets
	itemChild: Snippet<[item: T, index: number]>;
	headerChild?: Snippet; // 列表头部 List header
	footerChild?: Snippet; // 列表底部 List footer
	// Events
	onbatchChange?: (selected: (string | number)[]) => void;
	onclickItem?: (item: T, index: number) => void; // 点击列表项 Click list item
	onswipeAction?: (actionIndex: number, action: SwipeActionProps, item: T, itemIndex: number) => void; // 滑动操作点击 Swipe action click
};

// ColorPicker 颜色值类型
// ColorPicker color value type
export type OklchColor = {
	l: number; // 亮度 Lightness 0-1
	c: number; // 彩度 Chroma 0-0.4
	h: number; // 色相 Hue 0-360
};

// ColorPicker 模式类型
// ColorPicker mode type
export type ColorPickerMode = 'oklch' | 'rgb' | 'hex';

// ColorPicker 颜色值类型（支持多种格式）
// ColorPicker color value type (supports multiple formats)
export type ColorPickerValue = OklchColor | [number, number, number] | string;

// ColorPicker 组件属性
// ColorPicker component props
export type ColorPickerProps = {
	visible?: boolean; // 是否显示（Popup 模式）Visibility (Popup mode)
	value?: ColorPickerValue; // 颜色值，格式与 modes[0] 对应：oklch 为对象，rgb 为数组，hex 为字符串 Color value matching modes[0]: oklch as object, rgb as array, hex as string
	modes?: ColorPickerMode[]; // 支持的模式数组，默认第一个为初始模式 Supported modes array, first one is initial mode
	showPreview?: boolean; // 显示颜色预览 Show color preview
	showPanel?: boolean; // 显示颜色面板 Show color panel (canvas)
	showInputs?: boolean; // 显示输入框 Show input fields
	showCopy?: boolean; // 显示复制功能 Show copy feature
	panelHeight?: number; // 面板高度 Panel height
	sliderHeight?: number; // 滑动条高度 Slider height
	radius?: LargeAreaRadius; // 圆角 Border radius
	injClass?: string; // 自定义类名 Custom class name
	popup?: PopupProps | null; // Popup 配置，null 时直接显示 Popup config, null for direct display
	tab?: TabProps; // Tab 配置 Tab config
	onchange?: (colors: string[]) => void; // 颜色变化回调（直接显示模式）Color change callback (direct display mode)
	onclose?: (colors: string[]) => void; // 关闭回调（Popup 模式）Close callback (Popup mode)
	oncopy?: (text: string) => void; // 复制回调 Copy callback
};

export type TooltipProps = {
	content?: string; // 提示内容文本 Tooltip content text
	position?: 'top' | 'bottom' | 'left' | 'right'; // 显示位置 Display position
	visible?: boolean; // 是否显示（支持 $bindable）Visibility (supports $bindable)
	delay?: number; // 显示延迟，毫秒 Show delay in milliseconds
	hideDelay?: number; // 隐藏延迟，毫秒 Hide delay in milliseconds
	arrow?: boolean; // 是否显示箭头 Show arrow
	radius?: SmallAreaRadius; // 圆角风格 Border radius style
	state?: 'theme' | 'success' | 'warning' | 'error' | 'info' | 'black'; // 配色方案 Color scheme
	maxWidth?: number; // 最大宽度，像素 Max width in pixels
	zIndex?: number; // z-index 层级 z-index level
	disabled?: boolean; // 是否禁用 Disabled state
	injClass?: string; // 注入 CSS 类 Inject CSS class
	contentClass?: string; // 内容区域 CSS 类 Content area CSS class
	children?: Snippet; // 触发元素 Trigger element
	contentSnippet?: Snippet; // 自定义内容 Custom content
	onshow?: () => void; // 显示回调 Show callback
	onhide?: () => void; // 隐藏回调 Hide callback
};

// ==================== ImagePreview 组件类型 ====================
// ==================== ImagePreview Component Types ====================

// 图片预览项类型
// Image preview item type
export type ImagePreviewItemProps = {
	url: string; // 图片地址 Image URL
	thumbnail?: string; // 缩略图地址 Thumbnail URL
	alt?: string; // 图片描述 Image description
};

export type ImagePreviewClosePosition = 'tl' | 'tr' | 'bl' | 'br';

// 图片预览组件属性
// ImagePreview component props
export type ImagePreviewProps = {
	visible?: boolean; // 是否显示（$bindable）Visibility (supports $bindable)
	images?: string[] | ImagePreviewItemProps[]; // 图片列表 Image list
	current?: number; // 当前索引（$bindable）Current index (supports $bindable)
	loop?: boolean; // 是否循环切换 Loop switch
	swipeDuration?: number; // 切换动画时长 Switch animation duration
	minScale?: number; // 最小缩放 Minimum scale
	maxScale?: number; // 最大缩放 Maximum scale
	closePosition?: ImagePreviewClosePosition; // 关闭按钮位置 Close button position
	showNavigation?: boolean; // 是否显示左右切换图标 Show prev/next navigation icons
	navigationPosition?: 'center' | 'bottom'; // 导航图标垂直位置 Navigation icons vertical position
	maskClosable?: boolean; // 点击蒙层是否关闭 Close on mask click
	showIndex?: boolean; // 是否显示索引 Show index
	indicatorType?: 'dot' | 'number' | null; // 指示器类型 Indicator type
	zIndex?: number; // z-index 层级 z-index level
	duration?: number; // 进入动画时长 Enter animation duration
	outDuration?: number; // 退出动画时长 Exit animation duration
	mask?: MaskProps; // 遮罩层参数 Mask layer parameters
	icon?: IconProps; // 关闭图标参数 Close icon parameters
	showRotation?: boolean; // 是否显示旋转按钮 Show rotation button
	rotationIcon?: IconProps; // 旋转图标参数 Rotation icon parameters
	children?: Snippet<[item: ImagePreviewItemProps, index: number]>; // 自定义内容（如图片描述）Custom content (like image description)
	loadingChild?: Snippet; // 自定义加载中 Custom loading
	errorChild?: Snippet; // 自定义加载失败 Custom error
	indexChild?: Snippet<[current: number, total: number]>; // 自定义索引 Custom index
	onchange?: (index: number) => void; // 切换图片回调 Switch image callback
	onclose?: () => void; // 关闭回调 Close callback
	onscale?: (scale: number) => void; // 缩放回调 Scale callback
	onrotate?: (rotation: 0 | 90 | 180 | 270) => void; // 旋转回调 Rotation callback
};

// ==================== ImageList 组件类型 ====================
// ==================== ImageList Component Types ====================

// 图片列表状态类型
// Image list status type
export type ImageListStatus = 'pending' | 'uploading' | 'success' | 'error';

// 图片列表项类型
// Image list item type
export type ImageListItemProps = {
	id: string | number; // 唯一标识 Unique identifier
	url?: string; // 图片地址 Image URL
	file?: File; // 文件对象 File object
	status?: ImageListStatus; // 状态 Status
	message?: string; // 状态信息 Status message
	thumbnail?: string; // 缩略图地址 Thumbnail URL
};

// 图片列表组件属性
// ImageList component props
export type ImageListProps = {
	value?: ImageListItemProps[]; // 图片列表（$bindable）Image list (supports $bindable)
	columns?: 3 | 4 | 5; // 每行数量 Columns per row
	max?: number; // 最大数量 Maximum count
	maxSize?: number; // 单张最大 MB Maximum size per image in MB
	accept?: string; // 文件类型 Accept file types
	multiple?: boolean; // 是否多选 Allow multiple selection
	disabled?: boolean; // 是否禁用 Disabled state
	readonly?: boolean; // 是否只读 Readonly state
	deletable?: boolean; // 是否可删除 Allow delete
	previewable?: boolean; // 是否可预览 Allow preview
	gap?: '0' | '1' | '2' | '3' | '4'; // 间距 Gap
	radius?: SmallAreaRadius; // 圆角 Border radius
	aspectRatio?: [number, number]; // 宽高比 Aspect ratio
	uploadText?: string; // 上传按钮文字 Upload button text
	loading?: LoadingProps; // 加载组件参数 Loading component parameters
	icon?: IconProps; // 上传图标参数 Upload icon parameters
	deleteIcon?: IconProps; // 删除图标参数 Delete icon parameters
	injClass?: string; // 注入 CSS 类 Inject CSS class
	itemInjClass?: string; // 项注入 CSS 类 Item inject CSS class
	uploadChild?: Snippet; // 自定义上传按钮 Custom upload button
	itemChild?: Snippet<[item: ImageListItemProps, index: number]>; // 自定义每项 Custom item
	statusChild?: Snippet<[item: ImageListItemProps]>; // 自定义状态 Custom status
	onadd?: (files: File[]) => void; // 添加文件回调 Add files callback
	ondelete?: (item: ImageListItemProps, index: number) => void; // 删除回调 Delete callback
	onretry?: (item: ImageListItemProps, index: number) => void; // 重试回调 Retry callback
	onpreview?: (item: ImageListItemProps, index: number) => void; // 预览回调 Preview callback
	onexceed?: (files: File[], max: number) => void; // 超出数量回调 Exceed count callback
	onoversized?: (file: File, maxSize: number) => void; // 超出大小回调 Oversized callback
	onclickUpload?: () => void; // 点击上传回调 Click upload callback
};

// ==================== 函数式反馈 API 类型 ====================
// ==================== Functional Feedback API Types ====================

// Toast 函数式 API 选项类型
// Toast functional API options type
export type ToastFnOptions = Omit<ToastProps, 'visible' | 'children'>;

// Alert 函数式 API 选项类型
// Alert functional API options type
export type AlertFnOptions = Omit<AlertProps, 'visible' | 'children'>;

// Dialog 函数式 API 选项类型
// Dialog functional API options type
export type DialogFnOptions = Omit<DialogProps, 'visible' | 'onprimary' | 'onsecondary' | 'onclose' | 'contentChild' | 'primaryChild'>;

// Dialog 返回结果类型
// Dialog result type
export type DialogResult = 'primary' | 'secondary' | 'close';

// Modal 函数式 API 选项类型
// Modal functional API options type
export type ModalFnOptions = Omit<ModalProps, 'visible' | 'onclose' | 'contentChild'>;

// Modal 返回结果类型
// Modal result type
export type ModalResult = 'confirm' | 'close';

// Loading 函数式 API 选项类型
// Loading functional API options type
export type LoadingFnOptions = Partial<LoadingProps> & { message?: string };

// Toast 函数类型
// Toast function type
export interface ToastFunction {
	(options: ToastFnOptions | string): string;
	success: (message: string, options?: Omit<ToastFnOptions, 'message' | 'type'>) => string;
	error: (message: string, options?: Omit<ToastFnOptions, 'message' | 'type'>) => string;
	warning: (message: string, options?: Omit<ToastFnOptions, 'message' | 'type'>) => string;
	info: (message: string, options?: Omit<ToastFnOptions, 'message' | 'type'>) => string;
	loading: (message: string, options?: Omit<ToastFnOptions, 'message' | 'type'>) => string;
	hide: (id?: string) => void;
	clear: () => void;
}

// Alert 函数类型
// Alert function type
export interface AlertFunction {
	(options: AlertFnOptions | string): string;
	success: (message: string, options?: Omit<AlertFnOptions, 'message' | 'type'>) => string;
	error: (message: string, options?: Omit<AlertFnOptions, 'message' | 'type'>) => string;
	warning: (message: string, options?: Omit<AlertFnOptions, 'message' | 'type'>) => string;
	info: (message: string, options?: Omit<AlertFnOptions, 'message' | 'type'>) => string;
	hide: (id?: string) => void;
	clear: () => void;
}

// Dialog 函数类型
// Dialog function type
export interface DialogFunction {
	(options: DialogFnOptions): Promise<DialogResult>;
	confirm: (content: string, title?: string) => Promise<boolean>;
	close: () => void;
}

// Modal 函数类型
// Modal function type
export interface ModalFunction {
	(options: ModalFnOptions): Promise<ModalResult>;
	info: (content: string, title?: string) => Promise<ModalResult>;
	close: () => void;
}

// Loading 函数类型
// Loading function type
export interface LoadingFunction {
	show: (options?: LoadingFnOptions | string) => void;
	hide: () => void;
}

// ==================== Signature 签名组件类型 ====================
// ==================== Signature Component Types ====================

// 签名旋转角度类型
// Signature rotation angle type
export type SignatureRotation = 0 | 90 | 180 | 270;

// 签名组件输出结果类型
// Signature component output result type
export type SignatureResult = {
	dataUrl: string; // Base64 图片数据 Base64 image data
	isEmpty: boolean; // 是否为空签名 Is empty signature
};

// 签名组件属性
// Signature component props
export type SignatureProps = {
	aspectRatio?: [number, number]; // 画板宽高比 Canvas aspect ratio
	lineWidth?: number; // 画笔粗细 Line width
	lineColor?: string; // 画笔颜色（默认黑色）Line color (default black)
	bgColor?: string; // 画板背景色（默认白色）Background color (default white)
	radius?: LargeAreaRadius; // 画板圆角 Canvas border radius
	showButtons?: boolean; // 是否显示操作按钮 Show action buttons
	clearText?: string; // 清空按钮文字 Clear button text
	confirmText?: string; // 确认按钮文字 Confirm button text
	clearButton?: ButtonProps; // 清空按钮配置 Clear button config
	confirmButton?: ButtonProps; // 确认按钮配置 Confirm button config
	imageType?: 'png' | 'jpeg' | 'webp'; // 导出图片格式 Export image format
	imageQuality?: number; // 导出图片质量（0-1，仅 jpeg/webp 有效）Export image quality (0-1, only for jpeg/webp)
	injClass?: string; // 注入 CSS 类 Inject CSS class
	canvasClass?: string; // 画布注入 CSS 类 Canvas inject CSS class
	onclear?: () => void; // 清空回调 Clear callback
	onconfirm?: (result: SignatureResult) => void; // 确认回调 Confirm callback
	ondrawStart?: () => void; // 开始绘制回调 Draw start callback
	ondrawEnd?: () => void; // 结束绘制回调 Draw end callback
};
