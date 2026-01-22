/**
 * 全局反馈组件状态管理
 * Global feedback component state management
 */

import type { ToastItem, AlertItem, DialogResolve, ModalResolve, DialogStateProps, ModalStateProps } from './state.types.js';
import type { LangProps } from '../../lang/index.js';
import type { LoadingProps } from '../../types/index.js';

/**
 * 全局反馈状态类
 * Global feedback state class
 */
class FeedbackState {
	// Toast 队列
	// Toast queue
	toastQueue: ToastItem[] = $state([]);

	// Alert 队列
	// Alert queue
	alertQueue: AlertItem[] = $state([]);

	// Dialog 状态
	// Dialog state
	dialogVisible = $state(false);
	dialogProps: DialogStateProps | null = $state(null);
	dialogResolve: DialogResolve | null = null;

	// Modal 状态
	// Modal state
	modalVisible = $state(false);
	modalProps: ModalStateProps | null = $state(null);
	modalResolve: ModalResolve | null = null;

	// Loading 状态
	// Loading state
	loadingVisible = $state(false);
	loadingProps: Partial<LoadingProps> = $state({});
	loadingMessage = $state('');

	// 语言配置
	// Language configuration
	lang: LangProps | null = $state(null);

	// ID 计数器
	// ID counter
	idCounter = 0;

	/**
	 * 生成唯一 ID
	 * Generate unique ID
	 */
	generateId() {
		return `feedback_${++this.idCounter}_${Date.now()}`;
	}

	/**
	 * 重置所有状态
	 * Reset all states
	 */
	reset() {
		this.toastQueue = [];
		this.alertQueue = [];
		this.dialogVisible = false;
		this.dialogProps = null;
		this.dialogResolve = null;
		this.modalVisible = false;
		this.modalProps = null;
		this.modalResolve = null;
		this.loadingVisible = false;
		this.loadingProps = {};
		this.loadingMessage = '';
	}
}

// 导出全局单例
// Export global singleton
export const feedbackState = new FeedbackState();
