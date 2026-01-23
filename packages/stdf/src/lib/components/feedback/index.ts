/**
 * 全局反馈组件函数式 API
 * Global feedback component functional API
 */

import { feedbackState } from './state.svelte.js';
import type { DialogResult, ModalResult } from './state.types.js';
import type { ToastProps, DialogProps, ModalProps, AlertProps, LoadingProps } from '../../types/index.js';

// ==================== Toast API ====================

type ToastOptions = Omit<ToastProps, 'visible' | 'children'>;

/**
 * 显示 Toast 提示
 * Show Toast message
 */
function showToast(options: ToastOptions | string): string {
	const props: ToastOptions = typeof options === 'string' ? { message: options } : options;
	const id = feedbackState.generateId();

	feedbackState.toastQueue = [
		...feedbackState.toastQueue,
		{ ...props, id, visible: true }
	];

	return id;
}

/**
 * 隐藏指定 Toast
 * Hide specific Toast
 */
function hideToast(id?: string): void {
	if (id) {
		feedbackState.toastQueue = feedbackState.toastQueue.filter(t => t.id !== id);
	} else if (feedbackState.toastQueue.length > 0) {
		// 关闭最新的一个
		// Close the latest one
		feedbackState.toastQueue = feedbackState.toastQueue.slice(0, -1);
	}
}

/**
 * 清除所有 Toast
 * Clear all Toasts
 */
function clearAllToasts(): void {
	feedbackState.toastQueue = [];
}

/**
 * Toast 函数式 API
 * Toast functional API
 */
export const toast = Object.assign(showToast, {
	success: (message: string, options?: Omit<ToastOptions, 'message' | 'type'>) =>
		showToast({ message, type: 'success', ...options }),
	error: (message: string, options?: Omit<ToastOptions, 'message' | 'type'>) =>
		showToast({ message, type: 'error', ...options }),
	warning: (message: string, options?: Omit<ToastOptions, 'message' | 'type'>) =>
		showToast({ message, type: 'warning', ...options }),
	info: (message: string, options?: Omit<ToastOptions, 'message' | 'type'>) =>
		showToast({ message, type: 'info', ...options }),
	loading: (message: string, options?: Omit<ToastOptions, 'message' | 'type'>) =>
		showToast({ message, type: 'loading', duration: 0, ...options }),
	hide: hideToast,
	clear: clearAllToasts
});

// ==================== Alert API ====================

type AlertOptions = Omit<AlertProps, 'visible' | 'children'>;

/**
 * 显示 Alert 提示
 * Show Alert message
 */
function showAlertFn(options: AlertOptions | string): string {
	const props: AlertOptions = typeof options === 'string' ? { message: options } : options;
	const id = feedbackState.generateId();

	feedbackState.alertQueue = [
		...feedbackState.alertQueue,
		{ ...props, id, visible: true }
	];

	return id;
}

/**
 * 隐藏指定 Alert
 * Hide specific Alert
 */
function hideAlert(id?: string): void {
	if (id) {
		feedbackState.alertQueue = feedbackState.alertQueue.filter(a => a.id !== id);
	} else if (feedbackState.alertQueue.length > 0) {
		feedbackState.alertQueue = feedbackState.alertQueue.slice(0, -1);
	}
}

/**
 * 清除所有 Alert
 * Clear all Alerts
 */
function clearAllAlerts(): void {
	feedbackState.alertQueue = [];
}

/**
 * Alert 函数式 API（使用 showAlert 避免与 window.alert 冲突）
 * Alert functional API (use showAlert to avoid conflict with window.alert)
 */
export const showAlert = Object.assign(showAlertFn, {
	success: (message: string, options?: Omit<AlertOptions, 'message' | 'type'>) =>
		showAlertFn({ message, type: 'success', ...options }),
	error: (message: string, options?: Omit<AlertOptions, 'message' | 'type'>) =>
		showAlertFn({ message, type: 'error', ...options }),
	warning: (message: string, options?: Omit<AlertOptions, 'message' | 'type'>) =>
		showAlertFn({ message, type: 'warning', ...options }),
	info: (message: string, options?: Omit<AlertOptions, 'message' | 'type'>) =>
		showAlertFn({ message, type: 'info', ...options }),
	hide: hideAlert,
	clear: clearAllAlerts
});

// ==================== Dialog API ====================

type DialogOptions = Omit<DialogProps, 'visible' | 'onprimary' | 'onsecondary' | 'onclose' | 'contentChild' | 'primaryChild'>;

/**
 * 显示 Dialog 对话框
 * Show Dialog
 */
function showDialog(options: DialogOptions): Promise<DialogResult> {
	return new Promise((resolve) => {
		feedbackState.dialogProps = {
			...options,
			onprimary: () => {
				feedbackState.dialogVisible = false;
				resolve('primary');
			},
			onsecondary: () => {
				feedbackState.dialogVisible = false;
				resolve('secondary');
			},
			onclose: () => {
				feedbackState.dialogVisible = false;
				resolve('close');
			}
		};
		feedbackState.dialogVisible = true;
		feedbackState.dialogResolve = resolve;
	});
}

/**
 * 关闭 Dialog
 * Close Dialog
 */
function closeDialog(): void {
	feedbackState.dialogVisible = false;
	feedbackState.dialogResolve?.('close');
}

/**
 * Dialog 函数式 API
 * Dialog functional API
 */
export const dialog = Object.assign(showDialog, {
	/**
	 * 确认对话框快捷方法
	 * Confirm dialog shortcut
	 */
	confirm: (content: string, title?: string): Promise<boolean> => {
		return showDialog({
			title: title || feedbackState.lang?.dialog?.title || '提示',
			content,
			primaryText: feedbackState.lang?.dialog?.primaryText || '确定',
			secondaryText: feedbackState.lang?.dialog?.secondaryText || '取消'
		}).then(result => result === 'primary');
	},
	close: closeDialog
});

// ==================== Modal API ====================

type ModalOptions = Omit<ModalProps, 'visible' | 'onclose' | 'contentChild'>;

/**
 * 显示 Modal 弹框
 * Show Modal
 */
function showModal(options: ModalOptions): Promise<ModalResult> {
	return new Promise((resolve) => {
		feedbackState.modalProps = {
			...options,
			onclose: () => {
				feedbackState.modalVisible = false;
				resolve('close');
			}
		};
		feedbackState.modalVisible = true;
		feedbackState.modalResolve = resolve;
	});
}

/**
 * 关闭 Modal
 * Close Modal
 */
function closeModal(): void {
	feedbackState.modalVisible = false;
	feedbackState.modalResolve?.('close');
}

/**
 * Modal 函数式 API
 * Modal functional API
 */
export const modal = Object.assign(showModal, {
	/**
	 * 信息弹框快捷方法
	 * Info modal shortcut
	 */
	info: (content: string, title?: string): Promise<ModalResult> => {
		return showModal({
			title: title || feedbackState.lang?.modal?.title || '提示',
			content,
			btnText: feedbackState.lang?.modal?.btnText || '我知道了'
		});
	},
	close: closeModal
});

// ==================== Loading API ====================

type LoadingOptions = Partial<LoadingProps> & { message?: string };

/**
 * 显示 Loading
 * Show Loading
 */
function showLoadingFn(options?: LoadingOptions | string): void {
	if (typeof options === 'string') {
		feedbackState.loadingMessage = options;
		feedbackState.loadingProps = {};
	} else if (options) {
		feedbackState.loadingMessage = options.message || '';
		const { message, ...rest } = options;
		feedbackState.loadingProps = rest;
	} else {
		feedbackState.loadingMessage = '';
		feedbackState.loadingProps = {};
	}
	feedbackState.loadingVisible = true;
}

/**
 * 隐藏 Loading
 * Hide Loading
 */
function hideLoading(): void {
	feedbackState.loadingVisible = false;
}

/**
 * Loading 函数式 API
 * Loading functional API
 */
export const loading = {
	show: showLoadingFn,
	hide: hideLoading
};

// ==================== 配置 API ====================

import type { LangProps } from '../../lang/index.js';

/**
 * 设置反馈组件语言配置
 * Set feedback component language configuration
 */
export function setFeedbackLang(lang: LangProps): void {
	feedbackState.lang = lang;
}

// 导出状态（供 Feedback 使用）
// Export state (for Feedback)
export { feedbackState };
