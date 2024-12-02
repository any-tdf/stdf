import type { LangProps } from './index.js';

const it_IT: LangProps = {
	common: {
		slotEmpty: 'Il contenuto dello slot è vuoto!',
		loading: 'Caricamento...',
		noData: 'Nessun dato',
		noMoreData: 'Non ci sono più dati',
		done: 'Fatto'
	},
	actionSheet: {
		cancelText: 'Annulla'
	},
	bottomSheet: {
		title: 'Titolo'
	},
	dialog: {
		title: 'Suggerimento',
		content: 'Contenuto',
		primaryText: 'Conferma',
		secondaryText: 'Annulla'
	},
	input: {
		pleaseInput: 'Si prega di inserire'
	},
	modal: {
		title: 'Titolo',
		content: 'Contenuto',
		btnText: 'Ho capito'
	},
	navBar: {
		title: 'Titolo'
	},
	pagination: {
		defaultOnlyOnePage: 'Solo una pagina'
	},
	picker: {
		defaultTitle: 'Si prega di scegliere',
		defaultCancel: 'Annulla',
		defaultConfirm: 'Conferma'
	},
	asyncPicker: {
		defaultTitle: 'Si prega di scegliere',
		defaultCancel: 'Annulla',
		defaultConfirm: 'Conferma',
		defaultNext: 'Successivo',
		defaultPrev: 'Precedente',
		defaultSelected: 'Selezionato'
	},
	rate: {
		error1: 'Il valore non può essere maggiore di Totale!',
		error2: 'Il Totale deve essere sottratto di 1!',
		error3: 'Il valore deve essere sottratto di 1 quando non selezionato!',
		error4: 'Il valore deve essere sottratto di 0,5 quando selezionato a metà!',
		error5: 'Larghezza o altezza inferiore a 20, rende difficoltoso il clic sul terminale mobile!'
	},
	timePicker: {
		defaultTitle: 'Si prega di scegliere',
		defaultCancel: 'Annulla',
		defaultConfirm: 'Conferma',
		defaultYear: 'Anno',
		defaultMonth: 'Mese',
		defaultDay: 'Giorno',
		defaultHour: 'Ora',
		defaultMinute: 'Minuto',
		defaultSecond: 'Secondo'
	},
	calendar: {
		weekTextList: ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'],
		weekSundayStartTextList: ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'],
		monthTextList: [
			'Gennaio',
			'Febbraio',
			'Marzo',
			'Aprile',
			'Maggio',
			'Giugno',
			'Luglio',
			'Agosto',
			'Settembre',
			'Ottobre',
			'Novembre',
			'Dicembre'
		],
		confirmText: 'Conferma',
		selectedText: 'Selezionato',
		dayText: 'giorno',
		beforeText: 'Recente',
		afterText: 'Futuro',
		currentWeekText: 'Questa settimana',
		currentMonthText: 'Questo mese',
		currentQuarterText: 'Questo trimestre'
	}
};

export default it_IT;
