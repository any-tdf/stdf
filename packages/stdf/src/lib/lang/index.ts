export { default as zh_CN } from './zh_CN.js';
export { default as en_US } from './en_US.js';

export type LangProps = {
	common: {
		slotEmpty: string;
		loading: string;
		noData: string;
		noMoreData: string;
		done: string;
	};
	actionSheet: {
		cancelText: string;
	};
	bottomSheet: {
		title: string;
	};
	dialog: {
		title: string;
		content: string;
		primaryText: string;
		secondaryText: string;
	};
	input: {
		pleaseInput: string;
	};
	modal: {
		title: string;
		content: string;
		btnText: string;
	};
	navBar: {
		title: string;
	};
	pagination: {
		defaultOnlyOnePage: string;
	};
	picker: {
		defaultTitle: string;
		defaultCancel: string;
		defaultConfirm: string;
	};
	asyncPicker: {
		defaultTitle: string;
		defaultCancel: string;
		defaultConfirm: string;
		defaultNext: string;
		defaultPrev: string;
		defaultSelected: string;
	};
	rate: {
		error1: string;
		error2: string;
		error3: string;
		error4: string;
		error5: string;
	};
	timePicker: {
		defaultTitle: string;
		defaultCancel: string;
		defaultConfirm: string;
		defaultYear: string;
		defaultMonth: string;
		defaultDay: string;
		defaultHour: string;
		defaultMinute: string;
		defaultSecond: string;
	};
	calendar: {
		weekTextList: string[];
		weekSundayStartTextList: string[];
		monthTextList: string[];
		confirmText: string;
		selectedText: string;
		dayText: string;
		beforeText: string;
		afterText: string;
		currentWeekText: string;
		currentMonthText: string;
		currentQuarterText: string;
	};
};
