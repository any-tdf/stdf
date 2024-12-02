import type { LangProps } from './index.js';

const bg_BG: LangProps = {
	common: {
		slotEmpty: 'Съдържанието на слота е празно!',
		loading: 'Зареждане...',
		noData: 'Няма данни',
		noMoreData: 'Няма повече данни',
		done: 'Готово'
	},
	actionSheet: {
		cancelText: 'Отказ'
	},
	bottomSheet: {
		title: 'Заглавие'
	},
	dialog: {
		title: 'Подсказка',
		content: 'Съдържание',
		primaryText: 'Потвърди',
		secondaryText: 'Откажи'
	},
	input: {
		pleaseInput: 'Моля, въведете'
	},
	modal: {
		title: 'Заглавие',
		content: 'Съдържание',
		btnText: 'Разбрах'
	},
	navBar: {
		title: 'Заглавие'
	},
	pagination: {
		defaultOnlyOnePage: 'Само една'
	},
	picker: {
		defaultTitle: 'Моля, изберете',
		defaultCancel: 'Отказ',
		defaultConfirm: 'Потвърди'
	},
	asyncPicker: {
		defaultTitle: 'Моля, изберете',
		defaultCancel: 'Отказ',
		defaultConfirm: 'Потвърди',
		defaultNext: 'Следващ',
		defaultPrev: 'Предишен',
		defaultSelected: 'Избрано'
	},
	rate: {
		error1: 'Стойността не може да бъде по-голяма от общата!',
		error2: 'Общата трябва да се раздели с 1!',
		error3: 'Стойността трябва да се раздели с 1, когато не е наполовина избрана!',
		error4: 'Стойността трябва да се раздели с 0,5, когато е наполовина избрана!',
		error5: 'Широчината или височината има стойност по-малка от 20, което прави щракването на мобилното устройство трудно!'
	},
	timePicker: {
		defaultTitle: 'Моля, изберете',
		defaultCancel: 'Отказ',
		defaultConfirm: 'Потвърди',
		defaultYear: 'Година',
		defaultMonth: 'Месец',
		defaultDay: 'Ден',
		defaultHour: 'Час',
		defaultMinute: 'Минута',
		defaultSecond: 'Секунда'
	},
	calendar: {
		weekTextList: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'],
		weekSundayStartTextList: ['Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
		monthTextList: ['Януари', 'Февруари', 'Март', 'Април', 'Май', 'Юни', 'Юли', 'Август', 'Септември', 'Октомври', 'Ноември', 'Декември'],
		confirmText: 'Потвърди',
		selectedText: 'Избрано',
		dayText: 'ден',
		beforeText: 'Последен',
		afterText: 'Следващ',
		currentWeekText: 'Тази седмица',
		currentMonthText: 'Този месец',
		currentQuarterText: 'Това тримесечие'
	}
};

export default bg_BG;
