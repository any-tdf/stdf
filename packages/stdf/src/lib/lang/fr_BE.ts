import type { LangProps } from './index.js';

const fr_BE: LangProps = {
	common: {
		slotEmpty: 'Emplacement libre!',
		loading: 'Chargement en cours...',
		noData: 'Aucune donnée',
		noMoreData: 'Plus de données',
		done: 'Terminé'
	},
	actionSheet: {
		cancelText: 'Annuler'
	},
	bottomSheet: {
		title: 'Titre'
	},
	dialog: {
		title: 'Avertissement',
		content: 'Contenu',
		primaryText: 'Confirmer',
		secondaryText: 'Annuler'
	},
	input: {
		pleaseInput: 'Veuillez renseigner'
	},
	modal: {
		title: 'Titre',
		content: 'Contenu',
		btnText: 'OK'
	},
	navBar: {
		title: 'Titre'
	},
	pagination: {
		defaultOnlyOnePage: 'Une seule page'
	},
	picker: {
		defaultTitle: 'Choisir',
		defaultCancel: 'Annuler',
		defaultConfirm: 'OK'
	},
	asyncPicker: {
		defaultTitle: 'Sélectionner',
		defaultCancel: 'Annuler',
		defaultConfirm: 'OK',
		defaultNext: 'Suivant',
		defaultPrev: 'Précédent',
		defaultSelected: 'Sélectionné'
	},
	rate: {
		error1: "L'évaluation ne doit pas être supérieure à votre résumé !",
		error2: "L'évaluation doit être remplie au moins une fois !",
		error3: "L'évaluation est en morceaux, alors la chouette est endormie !",
		error4: "L'évaluation doit être un nombre impair pour la rendre chouette!",
		error5: "La hauteur ou la largeur de l'évaluation est trop petite sur un téléphone !"
	},
	timePicker: {
		defaultTitle: 'Choisir',
		defaultCancel: 'Annuler',
		defaultConfirm: 'OK',
		defaultYear: 'Année',
		defaultMonth: 'Mois',
		defaultDay: 'Jour',
		defaultHour: 'Heure',
		defaultMinute: 'Minute',
		defaultSecond: 'Seconde'
	},
	calendar: {
		weekTextList: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
		weekSundayStartTextList: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
		monthTextList: [
			'Janvier',
			'Février',
			'Mars',
			'Avril',
			'Mai',
			'Juin',
			'Juillet',
			'Août',
			'Septembre',
			'Octobre',
			'Novembre',
			'Décembre'
		],
		confirmText: 'OK',
		selectedText: 'Sélectionné',
		dayText: 'Jour',
		beforeText: 'Avant',
		afterText: 'Après',
		currentWeekText: 'Semaine en cours',
		currentMonthText: 'Mois en cours',
		currentQuarterText: 'Trimestre en cours'
	}
};

export default fr_BE;
