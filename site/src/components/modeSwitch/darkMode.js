/**
 * 给 HTML 元素增加或删除 dark 类名，实现 Mode 切换
 * Add or remove the dark class name to the HTML element to implement Mode switching
 * @param {boolean} [isDark] 是否为 dark 模式
 * @returns {void}
 * @example
 */
// @ts-ignore
export default (isDark = true, ev) => {
	document.documentElement.style.setProperty('--x', ev.clientX + 'px');
	document.documentElement.style.setProperty('--y', ev.clientY + 'px');

	if (isDark) {
		// @ts-ignore
		if (document.startViewTransition) {
			// @ts-ignore
			document.startViewTransition(() => {
				document.documentElement.classList.add('dark');
			});
		} else {
			document.documentElement.classList.add('dark');
		}
	} else {
		// @ts-ignore
		if (document.startViewTransition) {
			// @ts-ignore
			document.startViewTransition(() => {
				document.documentElement.classList.remove('dark');
			});
		} else {
			document.documentElement.classList.remove('dark');
		}
	}
};
