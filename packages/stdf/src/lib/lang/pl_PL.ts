import type { LangProps } from './index.js';

const pl_PL: LangProps = {
	common: {
		slotEmpty: 'To miejsce jest puste!',
		loading: 'Wczytywanie...',
		noData: 'Brak danych',
		noMoreData: 'Brak dalszych danych',
		done: 'Gotowe'
	},
	actionSheet: {
		cancelText: 'Anuluj'
	},
	bottomSheet: {
		title: 'Tytuł'
	},
	dialog: {
		title: 'Tytuł',
		content: 'Treść',
		primaryText: 'Potwierdź',
		secondaryText: 'Anuluj'
	},
	input: {
		pleaseInput: 'Wprowadź'
	},
	modal: {
		title: 'Tytuł',
		content: 'Treść',
		btnText: 'OK'
	},
	navBar: {
		title: 'Tytuł'
	},
	pagination: {
		defaultOnlyOnePage: 'Tylko jedna strona'
	},
	picker: {
		defaultTitle: 'Proszę wybrać',
		defaultCancel: 'Anuluj',
		defaultConfirm: 'OK'
	},
	asyncPicker: {
		defaultTitle: 'Proszę wybrać',
		defaultCancel: 'Anuluj',
		defaultConfirm: 'OK',
		defaultNext: 'Następny',
		defaultPrev: 'Poprzedni',
		defaultSelected: 'Wybrano'
	},
	rate: {
		error1: 'Ocena nie może być pusta!',
		error2: 'Ocena musi być większa niż 1!',
		error3: 'Częściowa ocena musi zawierać co najmniej 1 wartość!',
		error4: 'Częściowa ocena nie może zawierać więcej niż 1 wartość!',
		error5: 'Szerokość lub wysokość mniejsza niż 20, nie można kliknąć na urządzeniach mobilnych.'
	},
	timePicker: {
		defaultTitle: 'Proszę wybrać',
		defaultCancel: 'Anuluj',
		defaultConfirm: 'OK',
		defaultYear: 'Rok',
		defaultMonth: 'Miesiąc',
		defaultDay: 'Dzień',
		defaultHour: 'Godzina',
		defaultMinute: 'Minuta',
		defaultSecond: 'Sekunda'
	},
	calendar: {
		weekTextList: ['Pn', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob', 'Niedz'],
		weekSundayStartTextList: ['Niedz', 'Pn', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob'],
		monthTextList: [
			'Styczeń',
			'Luty',
			'Marzec',
			'Kwiecień',
			'Maj',
			'Czerwiec',
			'Lipiec',
			'Sierpień',
			'Wrzesień',
			'Październik',
			'Listopad',
			'Grudzień'
		],
		confirmText: 'OK',
		selectedText: 'Wybrano',
		dayText: 'Dzień',
		beforeText: 'Przed',
		afterText: 'Po',
		currentWeekText: 'Bieżący tydzień',
		currentMonthText: 'Bieżący miesiąc',
		currentQuarterText: 'Bieżący kwartał'
	}
};

export default pl_PL;
