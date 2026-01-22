<script lang="ts">
	// 全局反馈组件容器
	// Global feedback component container
	// 使用方式：在应用根布局中添加此组件
	// Usage: Add this component to your app's root layout

	import { getContext, onMount } from 'svelte';
	import { feedbackState } from './state.svelte.js';
	import Toast from '../toast/Toast.svelte';
	import Dialog from '../dialog/Dialog.svelte';
	import Modal from '../modal/Modal.svelte';
	import Alert from '../alert/Alert.svelte';
	import Loading from '../loading/Loading.svelte';
	import Mask from '../mask/Mask.svelte';
	import { zh_CN, type LangProps } from '../../lang/index.js';

	// 从 Context 获取语言配置
	// Get language configuration from Context
	const lang = (getContext('STDF_lang') || zh_CN) as LangProps;

	// 同步语言配置到全局状态
	// Sync language configuration to global state
	onMount(() => {
		feedbackState.lang = lang;
	});

	// 处理 Toast 关闭
	// Handle Toast close
	function handleToastClose(id: string) {
		feedbackState.toastQueue = feedbackState.toastQueue.filter(t => t.id !== id);
	}

	// 处理 Alert 关闭
	// Handle Alert close
	function handleAlertClose(id: string) {
		feedbackState.alertQueue = feedbackState.alertQueue.filter(a => a.id !== id);
	}

	// 处理 Dialog 关闭
	// Handle Dialog close
	function handleDialogClose() {
		feedbackState.dialogVisible = false;
		feedbackState.dialogResolve?.('close');
	}

	// 处理 Dialog 主按钮点击
	// Handle Dialog primary button click
	function handleDialogPrimary() {
		feedbackState.dialogVisible = false;
		feedbackState.dialogResolve?.('primary');
	}

	// 处理 Dialog 次按钮点击
	// Handle Dialog secondary button click
	function handleDialogSecondary() {
		feedbackState.dialogVisible = false;
		feedbackState.dialogResolve?.('secondary');
	}

	// 处理 Modal 关闭
	// Handle Modal close
	function handleModalClose() {
		feedbackState.modalVisible = false;
		feedbackState.modalResolve?.('close');
	}

	// Toast 堆叠位置计算
	// Toast stack position calculation
	function getToastStyle(index: number, position: string): string {
		const baseGap = 60;
		const gap = 8;
		const offset = index * (baseGap + gap);

		if (position === 'top') {
			return `margin-top: ${offset}px`;
		} else if (position === 'bottom') {
			return `margin-bottom: ${offset}px`;
		}
		return '';
	}

	// Alert 堆叠位置计算
	// Alert stack position calculation
	function getAlertStyle(index: number, position: string): string {
		const baseGap = 70;
		const gap = 8;
		const offset = index * (baseGap + gap);

		if (position === 'top' || !position) {
			return `margin-top: ${offset}px`;
		} else if (position === 'bottom') {
			return `margin-bottom: ${offset}px`;
		}
		return '';
	}
</script>

<!-- Toast 队列渲染 -->
<!-- Toast queue rendering -->
{#each feedbackState.toastQueue as item, index (item.id)}
	<div style={getToastStyle(index, item.position || 'center')}>
		<Toast
			message={item.message}
			visible={item.visible}
			duration={item.duration}
			position={item.position}
			py={item.py}
			radius={item.radius}
			transitionType={item.transitionType}
			transitionParams={item.transitionParams}
			outDuration={item.outDuration}
			type={item.type}
			mask={item.mask}
			loading={item.loading}
			icon={item.icon}
			zIndex={1000 + index}
			clickable={item.clickable}
			dynamicFixed={item.dynamicFixed}
			onclose={() => handleToastClose(item.id)}
		/>
	</div>
{/each}

<!-- Alert 堆叠渲染 -->
<!-- Alert stack rendering -->
{#each feedbackState.alertQueue as item, index (item.id)}
	<div style={getAlertStyle(index, item.position || 'top')}>
		<Alert
			bind:visible={item.visible}
			title={item.title}
			message={item.message}
			duration={item.duration}
			position={item.position}
			py={item.py}
			type={item.type}
			showIcon={item.showIcon}
			icon={item.icon}
			closable={item.closable}
			inverse={item.inverse}
			card={item.card}
			transitionType={item.transitionType}
			transitionParams={item.transitionParams}
			outDuration={item.outDuration}
			easeType={item.easeType}
			easeOutType={item.easeOutType}
			zIndex={1100 + index}
			clickable={item.clickable}
			injClass={item.injClass}
			onclose={() => handleAlertClose(item.id)}
		/>
	</div>
{/each}

<!-- Dialog 单例 -->
<!-- Dialog singleton -->
{#if feedbackState.dialogProps && feedbackState.dialogVisible}
	<Dialog
		visible={feedbackState.dialogVisible}
		title={feedbackState.dialogProps.title}
		titleAlign={feedbackState.dialogProps.titleAlign}
		content={feedbackState.dialogProps.content}
		popup={feedbackState.dialogProps.popup}
		showIcon={feedbackState.dialogProps.showIcon}
		icon={feedbackState.dialogProps.icon}
		btnStyle={feedbackState.dialogProps.btnStyle}
		primaryText={feedbackState.dialogProps.primaryText}
		primaryButton={feedbackState.dialogProps.primaryButton}
		secondaryText={feedbackState.dialogProps.secondaryText}
		secondaryButton={feedbackState.dialogProps.secondaryButton}
		btnRatio={feedbackState.dialogProps.btnRatio}
		btnReverse={feedbackState.dialogProps.btnReverse}
		secondaryClose={feedbackState.dialogProps.secondaryClose}
		btnGap={feedbackState.dialogProps.btnGap}
		onprimary={handleDialogPrimary}
		onsecondary={handleDialogSecondary}
		onclose={handleDialogClose}
	/>
{/if}

<!-- Modal 单例 -->
<!-- Modal singleton -->
{#if feedbackState.modalProps && feedbackState.modalVisible}
	<Modal
		visible={feedbackState.modalVisible}
		title={feedbackState.modalProps.title}
		titleAlign={feedbackState.modalProps.titleAlign}
		content={feedbackState.modalProps.content}
		popup={feedbackState.modalProps.popup}
		showIcon={feedbackState.modalProps.showIcon}
		icon={feedbackState.modalProps.icon}
		showBtn={feedbackState.modalProps.showBtn}
		btnText={feedbackState.modalProps.btnText}
		button={feedbackState.modalProps.button}
		onclose={handleModalClose}
	/>
{/if}

<!-- Loading 全局遮罩 -->
<!-- Loading global mask -->
{#if feedbackState.loadingVisible}
	<Mask visible={true} opacity="0.5" zIndex={2000}>
		<div class="flex h-full flex-col items-center justify-center">
			<Loading
				type={feedbackState.loadingProps.type}
				height={feedbackState.loadingProps.height || '16'}
				width={feedbackState.loadingProps.width || '16'}
				theme={feedbackState.loadingProps.theme}
				inverse={feedbackState.loadingProps.inverse}
				customColor={feedbackState.loadingProps.customColor}
			/>
			{#if feedbackState.loadingMessage}
				<div class="mt-3 text-sm text-white dark:text-black">
					{feedbackState.loadingMessage}
				</div>
			{/if}
		</div>
	</Mask>
{/if}
