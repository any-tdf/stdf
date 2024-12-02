import type { LangProps } from './index.js';

const en_GB: LangProps = {
	common: {
		slotEmpty: 'Slot is empty!',
		loading: 'Loading...',
		noData: 'No data',
		noMoreData: 'No more data',
		done: 'Done'
	},
	actionSheet: {
		cancelText: 'Cancel'
	},
	bottomSheet: {
		title: 'Title'
	},
	dialog: {
		title: 'Warning',
		content: 'Content',
		primaryText: 'OK',
		secondaryText: 'Cancel'
	},
	input: {
		pleaseInput: 'Please input'
	},
	modal: {
		title: 'Title',
		content: 'Content',
		btnText: 'OK'
	},
	navBar: {
		title: 'Title'
	},
	pagination: {
		defaultOnlyOnePage: 'Only one'
	},
	picker: {
		defaultTitle: 'Please select',
		defaultCancel: 'Cancel',
		defaultConfirm: 'Confirm'
	},
	asyncPicker: {
		defaultTitle: 'Please select',
		defaultCancel: 'Cancel',
		defaultConfirm: 'Confirm',
		defaultNext: 'Next',
		defaultPrev: 'Prev',
		defaultSelected: 'Selected'
	},
	rate: {
		error1: 'Rating should not be greater than your overall feedback!',
		error2: 'Rating should be completed at least once as a whole!',
		error3: 'Rating is not high, so the hedgehog is sleeping!',
		error4: 'Rating should be an odd number, so that it can develop into a hedgehog!',
		error5: 'The height or width of the rating is difficult to touch on the mobile phone!'
	},
	timePicker: {
		defaultTitle: 'Please select',
		defaultCancel: 'Cancel',
		defaultConfirm: 'Confirm',
		defaultYear: 'Year',
		defaultMonth: 'Month',
		defaultDay: 'Day',
		defaultHour: 'Hour',
		defaultMinute: 'Minute',
		defaultSecond: 'Second'
	},
	calendar: {
		weekTextList: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
		weekSundayStartTextList: ['Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr'],
		monthTextList: [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December'
		],
		confirmText: 'Confirm',
		selectedText: 'Selected',
		dayText: 'day',
		beforeText: 'Before',
		afterText: 'After',
		currentWeekText: 'This week',
		currentMonthText: 'This month',
		currentQuarterText: 'This quarter'
	}
};

export default en_GB;
