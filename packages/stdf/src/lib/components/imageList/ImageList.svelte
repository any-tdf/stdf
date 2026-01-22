<script lang="ts">
	import Icon from '../icon/Icon.svelte';
	import Loading from '../loading/Loading.svelte';
	import ImagePreview from '../imagePreview/ImagePreview.svelte';
	import type { ImageListProps, ImageListItemProps, LoadingProps } from '../../types/index.js';
	import { radiusObj } from '../utils/index.js';

	let {
		value = $bindable([]),
		columns = 4,
		max = 9,
		maxSize = 10,
		disabled = false,
		readonly = false,
		deletable = true,
		previewable = true,
		gap = '2',
		radius = '',
		aspectRatio = [1, 1],
		uploadText = '',
		loading = {},
		icon = {},
		deleteIcon = {},
		injClass = '',
		itemInjClass = '',
		uploadChild,
		itemChild,
		statusChild,
		onadd,
		ondelete,
		onretry,
		onpreview,
		onexceed,
		onoversized,
		onclickUpload
	}: ImageListProps = $props();

	// 预览相关状态
	// Preview related states
	let previewVisible = $state(false);
	let previewIndex = $state(0);

	// 间距映射
	// Gap mapping
	const gapObj: Record<string, string> = {
		'0': 'gap-0',
		'1': 'gap-1',
		'2': 'gap-2',
		'3': 'gap-3',
		'4': 'gap-4'
	};

	// 列数映射
	// Columns mapping
	const columnsObj: Record<number, string> = {
		3: 'grid-cols-3',
		4: 'grid-cols-4',
		5: 'grid-cols-5'
	};

	// 圆角类名
	// Radius class
	const radiusClass = $derived(radius ? radiusObj[radius] : 'rounded-(--radius-btn)');

	// 宽高比样式
	// Aspect ratio style
	const aspectRatioStyle = $derived(`aspect-ratio: ${aspectRatio[0]} / ${aspectRatio[1]}`);

	// 是否显示上传按钮
	// Show upload button
	const showUploadBtn = $derived(!readonly && value.length < max);

	// 合并默认图标参数
	// Merge default icon parameters
	const mergedIcon = $derived({
		name: 'ri-add-line',
		size: 28,
		...icon
	});

	// 合并默认删除图标参数
	// Merge default delete icon parameters
	const mergedDeleteIcon = $derived({
		name: 'ri-close-line',
		size: 14,
		...deleteIcon
	});

	// 合并默认加载参数
	// Merge default loading parameters
	const mergedLoading = $derived<LoadingProps>({
		height: '8',
		width: '8',
		inverse: true,
		...loading
	});

	// 生成唯一 ID
	// Generate unique ID
	const generateId = () => {
		return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
	};

	// 点击上传按钮
	// Click upload button
	const handleUploadClick = () => {
		if (disabled || readonly) return;
		onclickUpload?.();
	};

	// 添加文件（供外部调用）
	// Add files (for external use)
	export function addFiles(files: File[]) {
		if (disabled || readonly || files.length === 0) return;

		// 检查数量限制
		// Check count limit
		const remainingSlots = max - value.length;
		let filesToAdd = [...files];
		if (filesToAdd.length > remainingSlots) {
			onexceed?.(filesToAdd, max);
			// 只取允许数量的文件
			// Only take allowed number of files
			filesToAdd = filesToAdd.slice(0, remainingSlots);
		}

		// 检查文件大小
		// Check file size
		const validFiles: File[] = [];
		for (const file of filesToAdd) {
			const sizeMB = file.size / (1024 * 1024);
			if (sizeMB > maxSize) {
				onoversized?.(file, maxSize);
			} else {
				validFiles.push(file);
			}
		}

		if (validFiles.length === 0) return;

		// 创建新的上传项
		// Create new upload items
		const newItems: ImageListItemProps[] = validFiles.map((file) => ({
			id: generateId(),
			file,
			url: URL.createObjectURL(file),
			status: 'pending' as const
		}));

		value = [...value, ...newItems];
		onadd?.(validFiles);
	}

	// 删除图片
	// Delete image
	const handleDelete = (item: ImageListItemProps, index: number) => {
		if (disabled || readonly) return;
		// 释放 URL
		// Revoke URL
		if (item.url && item.file) {
			URL.revokeObjectURL(item.url);
		}
		value = value.filter((_, i) => i !== index);
		ondelete?.(item, index);
	};

	// 重试上传
	// Retry upload
	const handleRetry = (item: ImageListItemProps, index: number) => {
		if (disabled || readonly) return;
		onretry?.(item, index);
	};

	// 预览图片
	// Preview image
	const handlePreview = (item: ImageListItemProps, index: number) => {
		if (!previewable) return;
		previewIndex = index;
		previewVisible = true;
		onpreview?.(item, index);
	};

	// 获取预览图片列表
	// Get preview image list
	const previewImages = $derived(value.filter((item) => item.url).map((item) => ({ url: item.url || '', alt: item.message })));
</script>

<!-- 网格容器 Grid container -->
<div class="grid {columnsObj[columns]} {gapObj[gap]} {injClass}">
	<!-- 已上传图片列表 Uploaded images list -->
	{#each value as item, index (item.id)}
		<div class="relative overflow-hidden {radiusClass} {itemInjClass}" style={aspectRatioStyle}>
			{#if itemChild}
				{@render itemChild(item, index)}
			{:else}
				<!-- 图片 Image -->
				{#if item.url}
					<button class="h-full w-full" onclick={() => handlePreview(item, index)} {disabled}>
						<img src={item.thumbnail || item.url} alt={item.message || ''} class="h-full w-full object-cover" />
					</button>
				{/if}

				<!-- 状态遮罩 Status overlay -->
				{#if item.status && item.status !== 'success'}
					<div class="absolute inset-0 flex flex-col items-center justify-center bg-black/50">
						{#if statusChild}
							{@render statusChild(item)}
						{:else if item.status === 'uploading'}
							<!-- 上传中 Uploading -->
							<Loading {...mergedLoading} />
						{:else if item.status === 'error'}
							<!-- 上传失败 Upload error -->
							<button class="flex flex-col items-center text-white" onclick={() => handleRetry(item, index)}>
								<Icon name="ri-refresh-line" size={24} />
								<span class="mt-1 text-xs">{item.message || '重试'}</span>
							</button>
						{:else if item.status === 'pending'}
							<!-- 等待上传 Pending -->
							<span class="text-xs text-white">等待上传</span>
						{/if}
					</div>
				{/if}

				<!-- 删除按钮 Delete button -->
				{#if deletable && !disabled && !readonly}
					<button
						class="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/60 text-white"
						onclick={() => handleDelete(item, index)}
					>
						<Icon {...mergedDeleteIcon} />
					</button>
				{/if}
			{/if}
		</div>
	{/each}

	<!-- 上传按钮 Upload button -->
	{#if showUploadBtn}
		<button
			class="flex flex-col items-center justify-center bg-black/5 dark:bg-white/5 {radiusClass} {disabled
				? 'cursor-not-allowed opacity-50'
				: 'active:bg-black/10 dark:active:bg-white/10'}"
			style={aspectRatioStyle}
			onclick={handleUploadClick}
			{disabled}
		>
			{#if uploadChild}
				{@render uploadChild()}
			{:else}
				<Icon {...mergedIcon} opacity={0.5} />
				{#if uploadText}
					<span class="mt-1 text-xs text-black/50 dark:text-white/50">{uploadText}</span>
				{/if}
			{/if}
		</button>
	{/if}
</div>

<!-- 图片预览 Image preview -->
<ImagePreview bind:visible={previewVisible} images={previewImages} bind:current={previewIndex} />
