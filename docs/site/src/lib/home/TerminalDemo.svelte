<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { fadeInUp } from '../../actions';
	import codeGroupSvgData from '../../utils/code-group-svg-data';

	interface Props {
		lang?: 'zh_CN' | 'en_US';
	}

	let { lang = 'zh_CN' }: Props = $props();
	let isZh = $derived(lang === 'zh_CN');

	// 检测操作系统
	const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad|iPod/.test(navigator.userAgent);

	// 包管理器配置
	const packageManagers = ['bun', 'npm', 'pnpm', 'yarn'] as const;
	type PackageManager = (typeof packageManagers)[number];

	// 获取包管理器图标
	const getManagerIcon = (pm: PackageManager) => {
		const item = codeGroupSvgData.find((d) => d.name === pm);
		return item?.svg || '';
	};

	let activeManager = $state<PackageManager>('bun');

	// 根据包管理器生成命令
	const getCommands = (pm: PackageManager) => {
		const createCmd = {
			bun: 'bun create stdf@latest',
			npm: 'npm create stdf@latest',
			pnpm: 'pnpm create stdf@latest',
			yarn: 'yarn create stdf@latest'
		};
		const installCmd = {
			bun: 'bun i',
			npm: 'npm i',
			pnpm: 'pnpm i',
			yarn: 'yarn'
		};
		const devCmd = {
			bun: 'bun dev',
			npm: 'npm run dev',
			pnpm: 'pnpm dev',
			yarn: 'yarn dev'
		};

		const devOutput = `  VITE v6.0.0  ready in 320 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose`;

		return [
			{ cmd: createCmd[pm], output: isZh ? '正在创建 STDF 项目...' : 'Creating STDF project...', delay: 800 },
			{ cmd: 'cd my-stdf', output: '', delay: 200 },
			{ cmd: installCmd[pm], output: isZh ? '安装依赖中...' : 'Installing dependencies...', delay: 1000 },
			{ cmd: devCmd[pm], output: devOutput, delay: 600, isDevOutput: true }
		];
	};

	// 命令高亮处理
	const highlightCommand = (cmd: string) => {
		// 定义关键字
		const keywords = ['bun', 'npm', 'pnpm', 'yarn', 'cd', 'create', 'install', 'i', 'run', 'dev'];
		const parts = cmd.split(' ');

		return parts
			.map((part, index) => {
				if (index === 0 || keywords.includes(part)) {
					// 命令关键字
					return `<span class="text-primary dark:text-dark">${part}</span>`;
				} else if (part.startsWith('stdf@') || part === 'stdf') {
					// 包名
					return `<span class="text-cyan-600 dark:text-cyan-400">${part}</span>`;
				} else if (part.startsWith('my-')) {
					// 目录名
					return `<span class="text-amber-600 dark:text-amber-400">${part}</span>`;
				} else {
					return `<span class="text-gray-700 dark:text-gray-300">${part}</span>`;
				}
			})
			.join(' ');
	};

	let commands = $derived(getCommands(activeManager));

	let currentStep = $state(0);
	let currentText = $state('');
	let showOutput = $state(false);
	let showCursor = $state(true);
	let completedCommands = $state<{ cmd: string; output: string; isDevOutput?: boolean }[]>([]);
	let isAnimating = $state(true);
	let copied = $state(false);

	let typingTimer: ReturnType<typeof setInterval>;
	let cursorTimer: ReturnType<typeof setInterval>;
	let stepTimer: ReturnType<typeof setTimeout>;
	let copiedTimer: ReturnType<typeof setTimeout>;
	let hasStarted = $state(false); // 是否已经开始过动画

	// 复制第一条命令
	const copyFirstCommand = async () => {
		const firstCmd = getCommands(activeManager)[0].cmd;
		try {
			await navigator.clipboard.writeText(firstCmd);
			copied = true;
			clearTimeout(copiedTimer);
			copiedTimer = setTimeout(() => {
				copied = false;
			}, 2000);
		} catch (err) {
			console.error('Failed to copy:', err);
		}
	};

	const typeCommand = (text: string, callback: () => void) => {
		let index = 0;
		currentText = '';
		showOutput = false;

		typingTimer = setInterval(() => {
			if (index < text.length) {
				currentText += text[index];
				index++;
			} else {
				clearInterval(typingTimer);
				callback();
			}
		}, 80);
	};

	const nextStep = () => {
		const cmds = getCommands(activeManager);
		if (currentStep >= cmds.length) {
			// 动画完成后停止，不再自动重新播放
			isAnimating = false;
			return;
		}

		const command = cmds[currentStep];
		typeCommand(command.cmd, () => {
			showOutput = true;
			stepTimer = setTimeout(() => {
				completedCommands = [...completedCommands, { cmd: command.cmd, output: command.output, isDevOutput: 'isDevOutput' in command ? command.isDevOutput : false }];
				currentStep++;
				currentText = '';
				showOutput = false;
				nextStep();
			}, command.delay);
		});
	};

	const startAnimation = () => {
		isAnimating = true;
		nextStep();
	};

	const resetAnimation = () => {
		clearInterval(typingTimer);
		clearTimeout(stepTimer);
		completedCommands = [];
		currentStep = 0;
		currentText = '';
		showOutput = false;
		startAnimation();
	};

	const switchManager = (pm: PackageManager) => {
		if (pm === activeManager) return;
		activeManager = pm;
		resetAnimation();
	};

	onMount(() => {
		// 光标闪烁
		cursorTimer = setInterval(() => {
			showCursor = !showCursor;
		}, 530);

		// 使用 IntersectionObserver 检测进入视口后才开始动画
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting && !hasStarted) {
					hasStarted = true;
					startAnimation();
				}
			},
			{ threshold: 0.3 }
		);

		const section = document.getElementById('terminal-demo');
		if (section) observer.observe(section);

		// 页面可见性处理
		const handleVisibility = () => {
			if (document.visibilityState === 'visible') {
				// 只有在动画进行中且未完成时才恢复
				if (isAnimating && currentStep < getCommands(activeManager).length) {
					// 继续当前动画
				}
			} else {
				clearInterval(typingTimer);
				clearTimeout(stepTimer);
			}
		};
		window.addEventListener('visibilitychange', handleVisibility);

		return () => {
			observer.disconnect();
			window.removeEventListener('visibilitychange', handleVisibility);
		};
	});

	onDestroy(() => {
		clearInterval(typingTimer);
		clearInterval(cursorTimer);
		clearTimeout(stepTimer);
		clearTimeout(copiedTimer);
	});
</script>

<section id="terminal-demo" class="relative overflow-hidden py-8">
	<div class="relative z-10 mx-auto">
		<div class="mb-12 text-center">
			<!-- 标签 -->
			<div
				class="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary dark:border-dark/20 dark:bg-dark/5 dark:text-dark"
			>
				<svg class="size-4" viewBox="0 0 24 24" fill="currentColor">
					<path d="M3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM4 5V19H20V5H4ZM6 7H8V9H6V7ZM10 7H18V9H10V7ZM6 11H8V13H6V11ZM10 11H18V13H10V11Z" />
				</svg>
				<span>{isZh ? '快速开始' : 'Quick Start'}</span>
			</div>

			<h2 class="mb-4 bg-linear-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-3xl font-bold text-transparent md:text-4xl dark:from-white dark:via-gray-300 dark:to-white">
				{isZh ? '一个命令，即刻启程' : 'One Command to Start'}
			</h2>
			<p class="mx-auto max-w-2xl text-base opacity-70">
				{isZh
					? '一键创建项目，快速开始开发。'
					: 'Create project with one command and start developing quickly.'}
			</p>
		</div>

		<div use:fadeInUp={{ delay: 200, duration: 800, distance: 30 }} class="mx-auto w-full max-w-xl">
			<!-- 终端窗口 -->
			<div class="flex h-95 flex-col overflow-hidden rounded-xl border border-gray-200/30 bg-bg-overlay shadow-xl backdrop-blur-md dark:border-gray-700/20 dark:bg-bg-overlay-dark">
				<!-- 标题栏 -->
				<div class="flex items-center justify-between border-b border-gray-200/30 bg-bg-surface px-4 py-3 dark:border-gray-700/20 dark:bg-bg-surface-dark">
					{#if isMac}
						<!-- Mac: 窗口按钮在左，重播在右 -->
						<div class="flex gap-2">
							<div class="size-3 rounded-full bg-red-400/80"></div>
							<div class="size-3 rounded-full bg-yellow-400/80"></div>
							<div class="size-3 rounded-full bg-green-400/80"></div>
						</div>
						<button
							onclick={resetAnimation}
							class="flex items-center gap-1 rounded-md px-2 py-1 text-xs transition-colors {!isAnimating && currentStep >= commands.length
								? 'text-gray-500 hover:bg-gray-200/60 hover:text-gray-700 dark:hover:bg-gray-700/60 dark:hover:text-gray-300'
								: 'pointer-events-none invisible'}"
						>
							<svg class="size-3.5" viewBox="0 0 24 24" fill="currentColor">
								<path d="M5.46257 4.43262C7.21556 2.91688 9.5007 2 12 2C17.5228 2 22 6.47715 22 12C22 14.1361 21.3302 16.1158 20.1892 17.7406L17 12H20C20 7.58172 16.4183 4 12 4C9.84982 4 7.89777 4.84827 6.46023 6.22842L5.46257 4.43262ZM18.5374 19.5674C16.7844 21.0831 14.4993 22 12 22C6.47715 22 2 17.5228 2 12C2 9.86386 2.66979 7.88416 3.8108 6.25944L7 12H4C4 16.4183 7.58172 20 12 20C14.1502 20 16.1022 19.1517 17.5398 17.7716L18.5374 19.5674Z" />
							</svg>
							{isZh ? '重播' : 'Replay'}
						</button>
					{:else}
						<!-- Windows: 重播在左，窗口按钮在右 -->
						<button
							onclick={resetAnimation}
							class="flex items-center gap-1 rounded-md px-2 py-1 text-xs transition-colors {!isAnimating && currentStep >= commands.length
								? 'text-gray-500 hover:bg-gray-200/60 hover:text-gray-700 dark:hover:bg-gray-700/60 dark:hover:text-gray-300'
								: 'pointer-events-none invisible'}"
						>
							<svg class="size-3.5" viewBox="0 0 24 24" fill="currentColor">
								<path d="M5.46257 4.43262C7.21556 2.91688 9.5007 2 12 2C17.5228 2 22 6.47715 22 12C22 14.1361 21.3302 16.1158 20.1892 17.7406L17 12H20C20 7.58172 16.4183 4 12 4C9.84982 4 7.89777 4.84827 6.46023 6.22842L5.46257 4.43262ZM18.5374 19.5674C16.7844 21.0831 14.4993 22 12 22C6.47715 22 2 17.5228 2 12C2 9.86386 2.66979 7.88416 3.8108 6.25944L7 12H4C4 16.4183 7.58172 20 12 20C14.1502 20 16.1022 19.1517 17.5398 17.7716L18.5374 19.5674Z" />
							</svg>
							{isZh ? '重播' : 'Replay'}
						</button>
						<div class="flex gap-1.5">
							<div class="flex size-4 items-center justify-center rounded-sm hover:bg-gray-300/60 dark:hover:bg-gray-600/60">
								<svg class="size-2.5 text-gray-600 dark:text-gray-400" viewBox="0 0 24 24" fill="currentColor">
									<path d="M6 19H18V21H6V19Z" />
								</svg>
							</div>
							<div class="flex size-4 items-center justify-center rounded-sm hover:bg-gray-300/60 dark:hover:bg-gray-600/60">
								<svg class="size-2.5 text-gray-600 dark:text-gray-400" viewBox="0 0 24 24" fill="currentColor">
									<path d="M4 3H20V21H4V3ZM6 5V19H18V5H6Z" />
								</svg>
							</div>
							<div class="flex size-4 items-center justify-center rounded-sm hover:bg-red-500/80">
								<svg class="size-2.5 text-gray-600 hover:text-white dark:text-gray-400" viewBox="0 0 24 24" fill="currentColor">
									<path d="M12 10.5858L6.34315 4.92893L4.92893 6.34315L10.5858 12L4.92893 17.6569L6.34315 19.0711L12 13.4142L17.6569 19.0711L19.0711 17.6569L13.4142 12L19.0711 6.34315L17.6569 4.92893L12 10.5858Z" />
								</svg>
							</div>
						</div>
					{/if}
				</div>

				<!-- Tab 切换 -->
				<div class="flex border-b border-gray-200/30 bg-bg-surface dark:border-gray-700/20 dark:bg-bg-surface-dark">
					{#each packageManagers as pm (pm)}
						<button
							onclick={() => switchManager(pm)}
							class="relative flex items-center gap-1.5 px-4 py-2 text-sm transition-colors {activeManager === pm
								? 'text-gray-900 dark:text-white'
								: 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}"
						>
							<span class="size-4">{@html getManagerIcon(pm)}</span>
							{pm}
							{#if activeManager === pm}
								<div class="bg-primary dark:bg-dark absolute bottom-0 left-0 right-0 h-0.5"></div>
							{/if}
						</button>
					{/each}
				</div>

				<!-- 命令行区域 -->
				<div class="flex-1 overflow-hidden bg-bg-base p-4 font-mono text-sm leading-relaxed dark:bg-bg-base-dark">
					<!-- 已完成的命令 -->
					{#each completedCommands as item, index (index)}
						<div class="mb-4">
							<div class="flex items-center gap-2">
								<span class="text-green-600 dark:text-green-400">$</span>
								<span>{@html highlightCommand(item.cmd)}</span>
								{#if index === 0}
									<button
										onclick={copyFirstCommand}
										class="ml-1 text-gray-400 transition-colors hover:text-gray-600 dark:hover:text-gray-300"
										title={isZh ? '复制命令' : 'Copy command'}
									>
										{#if copied}
											<svg class="size-3.5 text-green-500" viewBox="0 0 24 24" fill="currentColor">
												<path d="M9.9997 15.1709L19.1921 5.97852L20.6063 7.39273L9.9997 17.9993L3.63574 11.6354L5.04996 10.2212L9.9997 15.1709Z" />
											</svg>
										{:else}
											<svg class="size-3.5" viewBox="0 0 24 24" fill="currentColor">
												<path d="M6.9998 6V3C6.9998 2.44772 7.44752 2 7.9998 2H19.9998C20.5521 2 20.9998 2.44772 20.9998 3V17C20.9998 17.5523 20.5521 18 19.9998 18H16.9998V21C16.9998 21.5523 16.5521 22 15.9998 22H3.9998C3.44752 22 2.9998 21.5523 2.9998 21V7C2.9998 6.44772 3.44752 6 3.9998 6H6.9998ZM8.9998 6H15.9998C16.5521 6 16.9998 6.44772 16.9998 7V16H18.9998V4H8.9998V6ZM4.9998 8V20H14.9998V8H4.9998Z" />
											</svg>
										{/if}
									</button>
								{/if}
							</div>
							{#if item.output}
								{#if item.isDevOutput}
									<div class="ml-4 whitespace-pre text-xs">
										<span class="text-green-500">➜</span><span class="text-gray-500">  Local:   </span><span class="text-cyan-500">http://localhost:5173/</span>
										<br />
										<span class="text-gray-600 dark:text-gray-400">➜  Network: use --host to expose</span>
									</div>
								{:else}
									<div class="ml-4 text-gray-500 dark:text-gray-500">{item.output}</div>
								{/if}
							{/if}
						</div>
					{/each}

					<!-- 当前输入 -->
					{#if currentStep < commands.length}
						<div class="flex items-center gap-2">
							<span class="text-green-600 dark:text-green-400">$</span>
							<span>{@html highlightCommand(currentText)}</span>
							<span class="inline-block h-4 w-2 {showCursor ? 'bg-gray-800 dark:bg-gray-100' : 'bg-transparent'}"></span>
						</div>
						{#if showOutput && commands[currentStep]?.output}
							{#if 'isDevOutput' in commands[currentStep] && commands[currentStep].isDevOutput}
								<div class="ml-4 whitespace-pre text-xs">
									<span class="text-green-500">➜</span><span class="text-gray-500">  Local:   </span><span class="text-cyan-500">http://localhost:5173/</span>
									<br />
									<span class="text-gray-600 dark:text-gray-400">➜  Network: use --host to expose</span>
								</div>
							{:else}
								<div class="ml-4 text-gray-500 dark:text-gray-500">{commands[currentStep].output}</div>
							{/if}
						{/if}
					{:else}
						<!-- 完成提示 - 保持与命令行相同的高度结构 -->
						<div class="flex items-center gap-2">
							<span class="text-green-600 dark:text-green-400">✓</span>
							<span class="text-green-600 dark:text-green-400">
								{isZh ? '项目已就绪！访问' : 'Project is ready! Visit'} <span class="text-cyan-500">http://localhost:5173</span>
							</span>
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>
</section>
