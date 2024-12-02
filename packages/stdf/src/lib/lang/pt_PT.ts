import type { LangProps } from './index.js';

const pt_PT: LangProps = {
	common: {
		slotEmpty: 'Este espaço está vazio!',
		loading: 'A carregar...',
		noData: 'Sem dados',
		noMoreData: 'Não há mais dados',
		done: 'Feito'
	},
	actionSheet: {
		cancelText: 'Cancelar'
	},
	bottomSheet: {
		title: 'Título'
	},
	dialog: {
		title: 'Título',
		content: 'Conteúdo',
		primaryText: 'Confirmar',
		secondaryText: 'Cancelar'
	},
	input: {
		pleaseInput: 'Por favor, insira'
	},
	modal: {
		title: 'Título',
		content: 'Conteúdo',
		btnText: 'OK'
	},
	navBar: {
		title: 'Título'
	},
	pagination: {
		defaultOnlyOnePage: 'Apenas uma página'
	},
	picker: {
		defaultTitle: 'Por favor selecione',
		defaultCancel: 'Cancelar',
		defaultConfirm: 'Confirmar'
	},
	asyncPicker: {
		defaultTitle: 'Por favor selecione',
		defaultCancel: 'Cancelar',
		defaultConfirm: 'Confirmar',
		defaultNext: 'Próximo',
		defaultPrev: 'Anterior',
		defaultSelected: 'Selecionado'
	},
	rate: {
		error1: 'A avaliação não pode estar vazia!',
		error2: 'A avaliação precisa ser maior que 1!',
		error3: 'Uma avaliação parcial deve ter pelo menos 1 valor!',
		error4: 'Uma avaliação parcial não pode ter mais de 1 valor!',
		error5: 'Largura ou altura inferior a 20, não permitido clicar em dispositivos móveis.'
	},
	timePicker: {
		defaultTitle: 'Por favor selecione',
		defaultCancel: 'Cancelar',
		defaultConfirm: 'Confirmar',
		defaultYear: 'Ano',
		defaultMonth: 'Mês',
		defaultDay: 'Dia',
		defaultHour: 'Hora',
		defaultMinute: 'Minuto',
		defaultSecond: 'Segundo'
	},
	calendar: {
		weekTextList: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
		weekSundayStartTextList: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
		monthTextList: [
			'Janeiro',
			'Fevereiro',
			'Março',
			'Abril',
			'Maio',
			'Junho',
			'Julho',
			'Agosto',
			'Setembro',
			'Outubro',
			'Novembro',
			'Dezembro'
		],
		confirmText: 'Confirmar',
		selectedText: 'Selecionado',
		dayText: 'Dia',
		beforeText: 'Antes',
		afterText: 'Depois',
		currentWeekText: 'Esta semana',
		currentMonthText: 'Este mês',
		currentQuarterText: 'Este trimestre'
	}
};

export default pt_PT;
