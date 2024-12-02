import type { LangProps } from './index.js';

const hu_HU: LangProps = {
	common: {
		slotEmpty: 'A bemenet tartalma üres!',
		loading: 'Betöltés...',
		noData: 'Nincsenek adatok',
		noMoreData: 'Nincs több adat',
		done: 'Kész'
	},
	actionSheet: {
		cancelText: 'Mégsem'
	},
	bottomSheet: {
		title: 'Cím'
	},
	dialog: {
		title: 'Tipp',
		content: 'Tartalom',
		primaryText: 'Megerősít',
		secondaryText: 'Mégsem'
	},
	input: {
		pleaseInput: 'Kérem írja be'
	},
	modal: {
		title: 'Cím',
		content: 'Tartalom',
		btnText: 'Értettem'
	},
	navBar: {
		title: 'Cím'
	},
	pagination: {
		defaultOnlyOnePage: 'Csak egy oldal'
	},
	picker: {
		defaultTitle: 'Kérem válasszon',
		defaultCancel: 'Mégsem',
		defaultConfirm: 'Megerősít'
	},
	asyncPicker: {
		defaultTitle: 'Kérem válasszon',
		defaultCancel: 'Mégsem',
		defaultConfirm: 'Megerősít',
		defaultNext: 'Következő',
		defaultPrev: 'Előző',
		defaultSelected: 'Kiválasztott'
	},
	rate: {
		error1: 'Az érték nem lehet nagyobb, mint az Összeg!',
		error2: 'Az Összeget 1-gyel csökkenteni kell!',
		error3: 'Az értéket 1-gyel csökkenteni kell, ha nem félkiválasztva!',
		error4: 'Az értéknek 0,5-tel kell csökkennie, ha félkiválasztva!',
		error5: 'A szélesség vagy a magasság 20-nál kisebb, ami nehezíti a mobil eszközön történő kattintást!'
	},
	timePicker: {
		defaultTitle: 'Kérem válasszon',
		defaultCancel: 'Mégsem',
		defaultConfirm: 'Megerősít',
		defaultYear: 'Év',
		defaultMonth: 'Hónap',
		defaultDay: 'Nap',
		defaultHour: 'Óra',
		defaultMinute: 'Perc',
		defaultSecond: 'Másodperc'
	},
	calendar: {
		weekTextList: ['Hét', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek', 'Szombat', 'Vasárnap'],
		weekSundayStartTextList: ['Vas', 'Hét', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek', 'Szombat'],
		monthTextList: [
			'Január',
			'Február',
			'Március',
			'Április',
			'Május',
			'Június',
			'Július',
			'Augusztus',
			'Szeptember',
			'Október',
			'November',
			'December'
		],
		confirmText: 'Megerősít',
		selectedText: 'Kiválasztva',
		dayText: 'Nap',
		beforeText: 'Friss',
		afterText: 'Jövő',
		currentWeekText: 'Ezen a héten',
		currentMonthText: 'Ebben a hónapban',
		currentQuarterText: 'Ebben a negyedévben'
	}
};

export default hu_HU;
